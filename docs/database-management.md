# Database Management Guide

## Overview
This guide covers database operations for the SignatureCraft MVP project using Drizzle ORM with NeonDB PostgreSQL.

## Available Commands

### Development Commands
```bash
# Start development server with database
pnpm dev

# Generate new migration from schema changes
pnpm db:generate

# Apply migrations to database
pnpm db:migrate

# Push schema directly to database (development only)
pnpm db:push

# Open Drizzle Studio (database GUI)
pnpm db:studio
```

### Database Reset Commands
```bash
# Drop all tables (automatically synced with schema)
pnpm db:drop

# Complete reset: drop tables + recreate from schema
pnpm db:reset
```

**✅ Working Status**: Both commands are fully functional and tested!

## Schema Management

### Current Tables
The database schema is defined in `src/lib/schema.ts` and includes:

- **users** - User accounts (Better Auth)
- **sessions** - User sessions (Better Auth)  
- **accounts** - OAuth accounts (Better Auth)
- **verifications** - Email verifications (Better Auth)
- **signatures** - Email signatures (Application data)

### Auto-Sync Drop Script
The `drop-tables.js` script automatically reads the schema file to determine which tables to drop. This ensures:

✅ **Always in sync** - No manual updates needed when schema changes
✅ **Correct order** - Handles foreign key dependencies automatically  
✅ **Safe execution** - Uses transactions for atomic operations
✅ **Error handling** - Rollback on failures

### Schema Update Workflow

1. **Modify schema** in `src/lib/schema.ts`
2. **Generate migration**: `pnpm db:generate`
3. **Apply changes**: `pnpm db:push` (dev) or `pnpm db:migrate` (prod)

If you encounter schema conflicts:
```bash
# Reset database completely
pnpm db:reset
```

## Development Database Reset

### When to Reset
- Schema type conflicts (UUID vs Text)
- Foreign key constraint errors
- Migration conflicts
- Starting fresh development

### How to Reset
```bash
# Quick reset (recommended)
pnpm db:reset

# Manual steps
pnpm db:drop     # Drop all tables
pnpm db:push     # Recreate from schema
```

## Production Considerations

### Migration Strategy
- **Development**: Use `db:push` for rapid iteration
- **Production**: Always use `db:migrate` for tracked changes
- **Staging**: Test migrations before production deployment

### Backup Strategy
- NeonDB provides automatic backups
- Export data before major schema changes
- Test restore procedures regularly

## Troubleshooting

### Common Issues

**Authentication Errors**
```
invalid input syntax for type uuid
```
**Solution**: Schema mismatch - run `pnpm db:reset`

**Migration Conflicts**
```
foreign key constraint cannot be implemented
```
**Solution**: Drop tables and recreate - run `pnpm db:reset`

**Port Conflicts**
```
Port 3000 is already in use
```
**Solution**: Kill existing processes or use different port

### Debug Commands
```bash
# Check database connection
pnpm db:studio

# View current schema
pnpm db:generate --dry-run

# Check running processes
netstat -ano | findstr :3000
```

## Environment Variables

Required environment variables:
```env
DATABASE_URL=postgresql://username:password@host/database
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
```

## Schema Evolution

### Adding New Tables
1. Add table definition to `src/lib/schema.ts`
2. Generate migration: `pnpm db:generate`
3. Apply changes: `pnpm db:push`
4. The drop script will automatically include the new table

### Modifying Existing Tables
1. Update table definition in schema
2. Generate migration: `pnpm db:generate`
3. Review generated SQL in `migrations/` folder
4. Apply changes: `pnpm db:push`

### Removing Tables
1. Remove table definition from schema
2. Generate migration: `pnpm db:generate`
3. The drop script will automatically exclude the removed table

## Best Practices

✅ **Always backup** before major changes
✅ **Test migrations** in development first
✅ **Use transactions** for multi-table operations
✅ **Keep schema simple** during MVP phase
✅ **Document changes** in migration comments
✅ **Verify foreign keys** after schema changes

❌ **Don't edit migrations** after they're applied
❌ **Don't skip migration generation** in production
❌ **Don't use db:push** in production
❌ **Don't ignore foreign key constraints**