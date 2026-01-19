import * as fs from "fs";
import * as path from "path";
import type { Catalog, CatalogEntry } from "./types.js";

/**
 * Storage interface for the catalog.
 * Allows swapping implementations (JSON file, database, etc.)
 */
export interface CatalogStore {
  load(): Catalog;
  save(catalog: Catalog): void;
}

/**
 * JSON file-based storage implementation.
 * Simple and portable for v0.
 */
export class JsonFileCatalogStore implements CatalogStore {
  private readonly filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  load(): Catalog {
    if (!fs.existsSync(this.filePath)) {
      return [];
    }
    const content = fs.readFileSync(this.filePath, "utf-8");
    return JSON.parse(content) as Catalog;
  }

  save(catalog: Catalog): void {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(this.filePath, JSON.stringify(catalog, null, 2), "utf-8");
  }
}

/**
 * Default catalog file path.
 */
export const DEFAULT_CATALOG_PATH = path.join(
  process.cwd(),
  "data",
  "catalog.json"
);

/**
 * Create a store instance with the default path.
 */
export function createStore(
  filePath: string = DEFAULT_CATALOG_PATH
): CatalogStore {
  return new JsonFileCatalogStore(filePath);
}
