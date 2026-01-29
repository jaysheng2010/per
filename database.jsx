import { createContext, useContext, useState, useEffect } from 'react';
import initSqlJs from 'sql.js';

const DbContext = createContext();

export function DbProvider({ children }) {
  const [db, setDb] = useState(null);

  useEffect(() => {
    async function initDB() {
      const SQL = await initSqlJs({
        locateFile: file =>
          `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`,
      });

      const database = new SQL.Database(); // In-memory database

      // Create products table
      database.run(`
        CREATE TABLE IF NOT EXISTS cart (
          name TEXT NOT NULL,
          quantity INTEGER NOT NULL
        );
      `);

      database.run(`
        CREATE TABLE IF NOT EXISTS account (
          email TEXT NOT NULL,
          phone_number TEXT NOT NULL,
          date TEXT NOT NULL
        );
      `);

      database.run(`
        CREATE TABLE IF NOT EXISTS products (
          name TEXT NOT NULL,
          quantity INTEGER NOT NULL,
          price NOT NULL,
          img_link TEXT NOT NULL,
          description TEXT NOT NULL
        );
      `); 

      setDb(database);
    }

    initDB();
  }, []);

  return <DbContext.Provider value={db}>{children}</DbContext.Provider>;
}

export function useDb() {
  return useContext(DbContext);
}
