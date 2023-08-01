//! Handles migrations for the config database.

use std::any;

use rusqlite::Connection;
use anyhow::{anyhow, Result};


/// Run all migrations until the database is up to date.
pub fn run_migrations(conn: &Connection) -> Result<()> {
    // Get the current version...
    let current_version = get_current_schema_version(conn)
        .map_err(|err| anyhow!("Failed to get current schema version. Err: {}", err))?;
    
    // Should we run migration 0?
    if current_version < 1 {
        run_migration_v1(conn)
            .map_err(|err| anyhow!("Failed to run migration 0. Err: {}", err))?;
    }

    // Should we run migration 1?
    if current_version < 2 {
        run_migration_v2(conn)
            .map_err(|err| anyhow!("Failed to run migration 1. Err: {}", err))?;
    }

    // NOTE: More migrations should be added here as needed...
    // ...

    // Success! 
    Ok(())
}


/// Returns the current schema version of the database.
/// 
/// Works by checking the settings table for the version number.
/// 
/// If the database was just created, then the version will be
/// set to `0`. The version number `1` isn't stored in the database
/// (since versioning wasn't configured yet) but it is assumed
/// if the database exists but the settings table doesn't.
fn get_current_schema_version(conn: &Connection) -> Result<usize> {
    // Do any tables exist?
    let s = "SELECT COUNT(*) FROM sqlite_master WHERE type = 'table';";
    let mut stmt = conn.prepare(s)
        .map_err(|err| anyhow!("Failed to prepare statement for table count: {}", err))?;
    let mut rows = stmt.query([])?;
    let count: usize = rows
        .next()
        .map_err(|err| anyhow!("Failed to get row for table count: {}", err))?
        .ok_or(anyhow!("No records to return from table count"))?
        .get(0)
        .map_err(|err| anyhow!("Failed to get table count: {}", err))?;

    // If no tables exist, return `0`, meaning the database was just created...
    if count == 0 {
        return Ok(0);
    }

    // Does the settings table exist?
    let s = "SELECT COUNT(*) FROM sqlite_master WHERE type = 'table' AND name = 'settings';";
    let mut stmt = conn.prepare(s)
        .map_err(|err| anyhow!("Failed to prepare statement for settings table check: {}", err))?;
    let mut rows = stmt.query([])?;
    let count: usize = rows
        .next()
        .map_err(|err| anyhow!("Failed to get row for settings table check: {}", err))?
        .ok_or(anyhow!("No records to return from settings table check"))?
        .get(0)
        .map_err(|err| anyhow!("Failed to get settings table check: {}", err))?;

    // If the count is 0, then the settings table doesn't exist. Return `1`...
    if count == 0 {
        return Ok(1);
    }

    // Is there a version number in the settings table?
    // Note: There should only be one record in the settings table...
    let s = "SELECT version FROM settings;";
    let mut stmt = conn.prepare(s)
        .map_err(|err| anyhow!("Failed to prepare statement for settings query: {}", err))?;
    let mut rows = stmt.query([])?;
    let version: usize = rows
        .next()
        .map_err(|err| anyhow!("Failed to get row for settings query: {}", err))?
        .ok_or(anyhow!("No records to return from settings query"))?
        .get(0)
        .map_err(|err| anyhow!("Failed to get settings query: {}", err))?;

    // Return the version number...
    Ok(version)
}


fn run_migration_v1(conn: &Connection) -> Result<()> {
    // Create the chats table...
    let s = "CREATE TABLE IF NOT EXISTS chats (
        id INT,
        name TEXT
    );";
    conn.execute(s, [])
        .map_err(|err| anyhow!("Failed to create chats table: {}", err))?;

    // Create the chat messages table...
    let s = "CREATE TABLE IF NOT EXISTS chat_messages (
        id INT,
        chat_id INT,
        role TEXT,
        content TEXT
    );";
    conn.execute(s, [])
        .map_err(|err| anyhow!("Failed to create chat messages table: {}", err))?;


    // Note: Intentionally not adding settings table or 
    // version number, for consistency...

    // Success!
    Ok(())
}


fn run_migration_v2(conn: &Connection) -> Result<()> {
    // Create the settings table...
    let s = "CREATE TABLE IF NOT EXISTS settings (
        schema_version INT
    );";
    conn.execute(s, [])
        .map_err(|err| anyhow!("Failed to create settings table: {}", err))?;
    
    // Add the settings config...
    let version = 2;
    let s = "INSERT INTO settings (
        schema_version INT
    ) VALUES (?);";
    conn.execute(s, [version])
        .map_err(|err| anyhow!("Failed to add record to settings table: {}", err))?;

    // Update the chats table...
    // ...
    
    // Update the chat messages table...
    // ...

    // Add the templates table...
    // ...

    // Add the template messages table...
    // ...

    
    // Success!
    Ok(())
}


