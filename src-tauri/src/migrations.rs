use anyhow::{anyhow, Result};
use rusqlite::Connection;

pub fn migrate(conn: &Connection) -> Result<()> {
    // Get the current version...
    let version = get_version(conn)?;

    // If no version is returned, create the version 
    // table and set the version to 0...
    if version.is_none() {
        // Create the version table...
        create_version_table(conn)?;

        // Set the version to 0...
        set_version(conn, 0)?;
    }

    // Unwrap the version...
    let version = version.unwrap_or(0);

    // If the version is less than 1, run the migration...
    if version < 1 {
        // Run the migration...
        migration_1(conn)?;

        // Update the version...
        set_version(conn, 1)?;
    }

    Ok(())
}

fn create_version_table(conn: &Connection) -> Result<()> {
    // Create the version table...
    let s = "CREATE TABLE IF NOT EXISTS version (
        version INT
    );";
    match conn.execute(s, []) {
        Ok(_) => {},
        Err(err) => {
            return Err(anyhow!("Failed to create version table: {}", err));
        },
    };

    // Insert version zero...
    let s = "INSERT INTO version (version) VALUES (0);";
    match conn.execute(s, []) {
        Ok(_) => {},
        Err(err) => {
            return Err(anyhow!("Failed to insert version zero: {}", err));
        },
    };
    Ok(())
}

fn get_version(conn: &Connection) -> Result<Option<usize>> {
    // Get the current version...
    let version = match conn.query_row("PRAGMA user_version", [], |row| {
        Ok(row.get(0)?)
    }) {
        Ok(v) => v,
        Err(err) => {
            return Err(anyhow!("Failed to get database version: {}", err));
        },
    };
    Ok(version)
}

fn set_version(conn: &Connection, version: usize) -> Result<()> {
    Ok(())
}

fn migration_1(conn: &Connection) -> Result<()> {
    let s = "CREATE TABLE IF NOT EXISTS chats (
        id INT,
        name TEXT
    );";
    match conn.execute(s, []) {
        Ok(_) => {},
        Err(err) => {
            return Err(anyhow!("Failed to create chats table: {}", err));
        },
    };
    let s = "CREATE TABLE IF NOT EXISTS chat_messages (
        id INT,
        chat_id INT,
        role TEXT,
        content TEXT
    );";
    match conn.execute(s, []) {
        Ok(_) => {},
        Err(err) => {
            println!("Failed to create chats table: {}", err);
        },
    };
    Ok(())
}
