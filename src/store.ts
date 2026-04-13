import * as fs from "fs";
import * as path from "path";
import type { Catalog, CatalogEntry, Category } from "./types.js";

/**
 * Storage interface for the catalog.
 * Allows swapping implementations (JSON file, database, etc.)
 */
export interface CatalogStore {
  loadEntries(): Catalog;
  saveEntries(catalog: Catalog): void;
  loadCategories(): Category[];
  saveCategories(categories: Category[]): void;
}

/**
 * JSON file-based storage implementation.
 * Simple and portable for v0.
 */
export class JsonFileCatalogStore implements CatalogStore {
  private readonly entriesPath: string;
  private readonly categoriesPath: string;

  constructor(entriesPath: string, categoriesPath: string) {
    this.entriesPath = entriesPath;
    this.categoriesPath = categoriesPath;
  }

  loadEntries(): Catalog {
    if (!fs.existsSync(this.entriesPath)) {
      return [];
    }
    const content = fs.readFileSync(this.entriesPath, "utf-8");
    return JSON.parse(content) as Catalog;
  }

  saveEntries(catalog: Catalog): void {
    const dir = path.dirname(this.entriesPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(this.entriesPath, JSON.stringify(catalog, null, 2), "utf-8");
  }

  loadCategories(): Category[] {
    if (!fs.existsSync(this.categoriesPath)) {
      return [];
    }
    const content = fs.readFileSync(this.categoriesPath, "utf-8");
    return JSON.parse(content) as Category[];
  }

  saveCategories(categories: Category[]): void {
    const dir = path.dirname(this.categoriesPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(this.categoriesPath, JSON.stringify(categories, null, 2), "utf-8");
  }
}

/**
 * Default catalog file paths.
 */
export const DEFAULT_ENTRIES_PATH = path.join(
  process.cwd(),
  "data",
  "catalog.json"
);

export const DEFAULT_CATEGORIES_PATH = path.join(
  process.cwd(),
  "data",
  "categories.json"
);

/**
 * Create a store instance with the default paths.
 */
export function createStore(
  entriesPath: string = DEFAULT_ENTRIES_PATH,
  categoriesPath: string = DEFAULT_CATEGORIES_PATH
): CatalogStore {
  return new JsonFileCatalogStore(entriesPath, categoriesPath);
}
