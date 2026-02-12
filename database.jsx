{/*
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
        CREATE TABLE IF NOT EXISTS account (
          order_id TEXT NOT NULL,
          order_items TEXT NOT NULL,
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
*/}

import { createContext, useContext, useEffect, useState } from "react";
import initSqlJs from "sql.js/dist/sql-wasm.js";

const DbContext = createContext(null);

export function DbProvider({ children }) {
  const [db, setDb] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function initDB() {
      try {
        console.log("⏳ Initialising SQL.js...");

        const SQL = await initSqlJs({
          locateFile: file =>
            "/sql-wasm.wasm",
        });

        console.log("✅ SQL.js loaded");

        const database = new SQL.Database();

        // ---------- TABLES ----------
        database.run(`
          CREATE TABLE IF NOT EXISTS cart (
            name TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            img_link TEXT
          );
        `);

        database.run(`
          CREATE TABLE IF NOT EXISTS account (
            email TEXT NOT NULL,
            phone_number TEXT NOT NULL,
            date TEXT NOT NULL,
            token TEXT NOT NULL
          );
        `);

        database.run(`
          CREATE TABLE IF NOT EXISTS orders (
            order_id TEXT NOT NULL,
            order_items TEXT NOT NULL,
            date TEXT NOT NULL
          );
        `);

        database.run(`
          CREATE TABLE IF NOT EXISTS products (
            name TEXT PRIMARY KEY,
            quantity INTEGER NOT NULL,
            price REAL NOT NULL,
            img_link TEXT NOT NULL,
            description TEXT NOT NULL
          );
        `);

        if (!cancelled) {
          setDb(database);
          console.log("✅ Database ready");
        }
      } catch (err) {
        console.error("❌ Database init failed:", err);
      }
    }

    initDB();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <DbContext.Provider value={db}>
      {children}
    </DbContext.Provider>
  );
}

export function useDb() {
  return useContext(DbContext);
}