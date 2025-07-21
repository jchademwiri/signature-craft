import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";
import { join } from "path";
import { spawn } from "child_process";

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
 */
function getTableNamesFromSchema() {
  try {
    const schemaPath = join(process.cwd(), "src", "db", "schema.ts");
    const schemaContent = readFileSync(schemaPath, "utf-8");
    
    // Extract table names using regex to find pgTable declarations
    const tableRegex = /export const (\w+) = pgTable\("(\w+)"/g;
    const tables = [];
    let match;
    
    while ((match = tableRegex.exec(schemaContent)) !== null) {
      const tableName = match[2]; // The string inside pgTable("tableName")
      tables.push(tableName);
    }
    
    return tables;
  } catch (error) {
    console.error("❌ Error reading schema file:", error);
    return ["signatures", "accounts", "sessions", "verifications", "users"];
  }
}

/**
 * Get drop order based on foreign key dependencies
 */
function getDropOrder(tables) {
  const dependencyOrder = [
    "signatures", "accounts", "sessions", "verifications", "users"
  ];
  return dependencyOrder.filter(table => tables.includes(table));
}

/**
 * Drop all tables
 */
async function dropTables() {
  const schemaTableNames = getTableNamesFromSchema();
  const dropOrder = getDropOrder(schemaTableNames);
  
  console.log("📋 Tables to drop:", dropOrder);
  
  await sql`BEGIN`;
  
  for (const table of dropOrder) {
    console.log(`  🗑️  Dropping: ${table}`);
    await sql`DROP TABLE IF EXISTS ${sql.unsafe(table)} CASCADE`;
  }
  
  await sql`COMMIT`;
  
  return dropOrder;
}

/**
 * Run drizzle-kit push and capture output
 */
function runDrizzlePush() {
  return new Promise((resolve, reject) => {
    const process = spawn('pnpm', ['db:push'], {
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: true
    });
    
    let stdout = '';
    let stderr = '';
    
    process.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(output);
      stdout += output;
    });
    
    process.stderr.on('data', (data) => {
      const output = data.toString();
      console.error(output);
      stderr += output;
    });
    
    process.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject(new Error(`drizzle-kit push failed with code ${code}`));
      }
    });
  });
}

/**
 * Check which tables exist in the database after creation
 */
async function getCreatedTables() {
  try {
    const result = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;
    return result.map(row => row.table_name);
  } catch (error) {
    console.error("❌ Error checking created tables:", error);
    return [];
  }
}

/**
 * Main reset function
 */
async function resetDatabase() {
  try {
    console.log("🚀 SignatureCraft Database Complete Reset");
    console.log("📍 Database:", process.env.DATABASE_URL?.split('@')[1]?.split('/')[0] || "Unknown");
    console.log("⚠️  This will drop ALL tables and recreate them!");
    console.log("");
    
    // Step 1: Drop tables
    console.log("🗑️  STEP 1: Dropping existing tables...");
    const droppedTables = await dropTables();
    console.log("✅ Drop completed!");
    console.log("");
    
    // Step 2: Create tables
    console.log("🏗️  STEP 2: Creating tables from schema...");
    await runDrizzlePush();
    console.log("");
    
    // Step 3: Verify created tables
    console.log("🔍 STEP 3: Verifying created tables...");
    const createdTables = await getCreatedTables();
    
    // Final summary
    console.log("🎉 DATABASE RESET COMPLETE!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📊 SUMMARY:");
    console.log(`  🗑️  Dropped: ${droppedTables.length} tables`);
    console.log(`     └─ ${droppedTables.join(', ')}`);
    console.log(`  🏗️  Created: ${createdTables.length} tables`);
    console.log(`     └─ ${createdTables.join(', ')}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("✨ Your database is ready for development!");
    
  } catch (error) {
    console.error("❌ Database reset failed:", error);
    process.exit(1);
  }
}

resetDatabase();