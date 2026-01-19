import type { Catalog, CatalogEntry } from "./types.js";
import type { CatalogStore } from "./store.js";
/**
 * Catalog service for managing entries.
 */
export declare class CatalogService {
    private store;
    constructor(store?: CatalogStore);
    /**
     * Add a new entry to the catalog.
     * @throws Error if name is empty or entry already exists
     */
    add(entry: CatalogEntry): void;
    /**
     * List all entries in the catalog.
     */
    list(): Catalog;
    /**
     * Find an entry by exact name match (case-insensitive).
     * @returns The entry if found, undefined otherwise
     */
    findByName(name: string): CatalogEntry | undefined;
}
/**
 * Create a catalog service instance.
 */
export declare function createCatalogService(store?: CatalogStore): CatalogService;
