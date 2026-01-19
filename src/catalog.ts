import type { Catalog, CatalogEntry } from "./types.js";
import type { CatalogStore } from "./store.js";
import { createStore } from "./store.js";

/**
 * Catalog service for managing entries.
 */
export class CatalogService {
  private store: CatalogStore;

  constructor(store?: CatalogStore) {
    this.store = store ?? createStore();
  }

  /**
   * Add a new entry to the catalog.
   * @throws Error if name is empty or entry already exists
   */
  add(entry: CatalogEntry): void {
    if (!entry.name || entry.name.trim() === "") {
      throw new Error("Entry name cannot be empty");
    }

    const catalog = this.store.load();

    const exists = catalog.some(
      (e) => e.name.toLowerCase() === entry.name.toLowerCase()
    );
    if (exists) {
      throw new Error(`Entry "${entry.name}" already exists in the catalog`);
    }

    catalog.push({
      name: entry.name.trim(),
      description: entry.description.trim(),
      inCurrentStack: entry.inCurrentStack,
      pressureTested: entry.pressureTested,
    });

    this.store.save(catalog);
  }

  /**
   * List all entries in the catalog.
   */
  list(): Catalog {
    return this.store.load();
  }

  /**
   * Find an entry by exact name match (case-insensitive).
   * @returns The entry if found, undefined otherwise
   */
  findByName(name: string): CatalogEntry | undefined {
    const catalog = this.store.load();
    return catalog.find((e) => e.name.toLowerCase() === name.toLowerCase());
  }
}

/**
 * Create a catalog service instance.
 */
export function createCatalogService(store?: CatalogStore): CatalogService {
  return new CatalogService(store);
}
