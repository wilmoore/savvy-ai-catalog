import type { Catalog } from "./types.js";
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
export declare class JsonFileCatalogStore implements CatalogStore {
    private readonly filePath;
    constructor(filePath: string);
    load(): Catalog;
    save(catalog: Catalog): void;
}
/**
 * Default catalog file path.
 */
export declare const DEFAULT_CATALOG_PATH: string;
/**
 * Create a store instance with the default path.
 */
export declare function createStore(filePath?: string): CatalogStore;
