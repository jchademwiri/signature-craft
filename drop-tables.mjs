import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";
import { join } from "path";

// Manually load .env file since Node.js doesn't do it automatically
function loadEnvFile() {
  try {
    const envPath = join(process.cwd(), ".env");
    const envContent = readFileSync(envPath, "utf-8");
    
    // Parse .env file
    envContent.split('\n').forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=');
          process.env[key] = value;
        }
      }
    });
  } catch (error) {
    console.warn("⚠️  Could not load .env file:", error.message);
  }
}

// Load environment variables
loadEnvFile();

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL environment variable is not set");
  console.error("💡 Make sure your .env file exists and contains DATABASE_URL");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

/**
 * Automatically extract table names from the schema file
 * This keeps the drop script in sync with the actual schema
 */
function getTableNamesFromSchema() {
  try {
    const schemaPath = join(process.cwd(), "src", "lib", "schema.ts");
    const schemaContent = readFileSync(schemaPath, "utf-8");
    
    // Extract table names using regex to find pgTable declarations
    const tableRegex = /export const (\w+) = pgTable\("(\w+)"/g;
    const tables = [];
    let match;
    
    while ((match = tableRegex.exec(schemaContent)) !== null) {
      const tableName = match[2]; // The string inside pgTable("tableName")
      tables.push(tableName);
    }
    
    console.log("📋 Found tables in schema:", tables);
    return tables;
  } catch (error) {
    console.error("❌ Error reading schema file:", error);
    // Fallback to hardcoded table names if schema reading fails
    console.log("🔄 Using fallback table names");
    return ["signatures", "accounts", "sessions", "verifications", "users"];
  }
}

/**
 * Determine the order to drop tables based on foreign key dependencies
 * Tables with foreign keys should be dropped before their referenced tables
 */
function getDropOrder(tables) {
  // Define dependency order (tables that reference others should come first)
  const dependencyOrder = [
    "signatures",    // references users
    "accounts",      // references users  
    "sessions",      // references users
    "verifications", // no dependencies
    "users"          // referenced by others, drop last
  ];
  
  // Filter to only include tables that actually exist in schema
  return dependencyOrder.filter(table => tables.includes(table));
}

async function dropTables() {
  try {
    console.log("🗑️  Starting database cleanup...");
    
    // Get current table names from schema
    const schemaTableNames = getTableNamesFromSchema();
    const dropOrder = getDropOrder(schemaTableNames);
    
    console.log("📝 Drop order:", dropOrder);
    
    console.log("🔄 Executing drop statements...");
    
    // Execute each DROP statement separately within a transaction
    await sql`BEGIN`;
    
    for (const table of dropOrder) {
      console.log(`  🗑️  Dropping table: ${table}`);
      await sql`DROP TABLE IF EXISTS ${sql.unsafe(table)} CASCADE`;
    }
    
    await sql`COMMIT`;
    
    console.log("✅ All tables dropped successfully!");
    console.log("📊 Dropped tables:", dropOrder);
    
  } catch (error) {
    console.error("❌ Error dropping tables:", error);
    // Try to rollback in case of error
    try {
      await sql`ROLLBACK`;
      console.log("🔄 Transaction rolled back");
    } catch (rollbackError) {
      console.error("❌ Error during rollback:", rollbackError);
    }
  }
}

// Add some helpful information
console.log("🚀 SignatureCraft Database Reset Tool");
console.log("📍 Database:", process.env.DATABASE_URL?.split('@')[1]?.split('/')[0] || "Unknown");
console.log("⚠️  This will drop ALL tables in the database!");
console.log("");

dropTables();