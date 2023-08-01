//! Handles migrations for the config database.

use std::any;

use rusqlite::Connection;
use anyhow::{anyhow, Result};


/// The latest database schema version.
/// 
/// Migrations should be performed until the database
/// reaches this version.
pub const CURRENT_VERSION: usize = 1;

/// The default database schema version, if the version
/// can't be found in the database.
pub const DEFAULT_VERSION: usize = 0;


/// Run all migrations until the database is up to date.
pub fn run_migrations(conn: &Connection) -> Result<()> {
    // Get the current version...
    let current_version = get_current_schema_version(conn)
        .map_err(|err| anyhow!("Failed to get current schema version. Err: {}", err))?;
    
    // Should we run migration 0?
    if current_version < 1 {
        run_migration_v0(conn)
            .map_err(|err| anyhow!("Failed to run migration 0. Err: {}", err))?;
    }

    // Should we run migration 1?
    if current_version < 2 {
        run_migration_v1(conn)
            .map_err(|err| anyhow!("Failed to run migration 1. Err: {}", err))?;
    }

    // NOTE: More migrations should be added here as needed...
    // ...

    // Success! 
    Ok(())
}


fn get_current_schema_version(conn: &Connection) -> Result<usize> {
    // Does the settings table exist?

    // Is there a version number in the settings table?

    // If not, return the default version number...

    // Return the version number...

    todo!();
}


fn run_migration_v0(conn: &Connection) -> Result<()> {
    // Create the chats table...
    let s = "CREATE TABLE IF NOT EXISTS chats (
        id INT,
        name TEXT
    );";
    conn.execute(s, [])
        .map_err(|err| anyhow!("Failed to create chats table. Err: {}", err))?;

    // Create the chat messages table...
    let s = "CREATE TABLE IF NOT EXISTS chat_messages (
        id INT,
        chat_id INT,
        role TEXT,
        content TEXT
    );";
    conn.execute(s, [])
        .map_err(|err| anyhow!("Failed to create chat messages table. Err: {}", err))?;


    // Don't add the settings table / version number, for consistency...
    // ...

    // Success!
    Ok(())
}


fn run_migration_v1(conn: &Connection) -> Result<()> {
    todo!();
}


