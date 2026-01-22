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
      ...(entry.websiteUrl && { websiteUrl: entry.websiteUrl.trim() }),
      ...(entry.pricingUrl && { pricingUrl: entry.pricingUrl.trim() }),
      ...(entry.affiliateUrl && { affiliateUrl: entry.affiliateUrl.trim() }),
      ...(entry.apiUrl && { apiUrl: entry.apiUrl.trim() }),
      ...(entry.replacedBy && { replacedBy: entry.replacedBy.trim() }),
      ...(entry.replacementReason && { replacementReason: entry.replacementReason.trim() }),
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

  /**
   * Update an existing entry in the catalog.
   * @param name - The name of the entry to update (case-insensitive)
   * @param updates - Partial entry with fields to update
   * @throws Error if entry is not found
   */
  update(name: string, updates: Partial<Omit<CatalogEntry, "name">>): void {
    const catalog = this.store.load();
    const index = catalog.findIndex(
      (e) => e.name.toLowerCase() === name.toLowerCase()
    );

    if (index === -1) {
      throw new Error(`Entry "${name}" not found in the catalog`);
    }

    const existing = catalog[index];
    catalog[index] = {
      ...existing,
      ...(updates.description !== undefined && {
        description: updates.description.trim(),
      }),
      ...(updates.inCurrentStack !== undefined && {
        inCurrentStack: updates.inCurrentStack,
      }),
      ...(updates.pressureTested !== undefined && {
        pressureTested: updates.pressureTested,
      }),
      ...(updates.websiteUrl !== undefined && {
        websiteUrl: updates.websiteUrl.trim(),
      }),
      ...(updates.pricingUrl !== undefined && {
        pricingUrl: updates.pricingUrl.trim(),
      }),
      ...(updates.affiliateUrl !== undefined && {
        affiliateUrl: updates.affiliateUrl.trim(),
      }),
      ...(updates.apiUrl !== undefined && {
        apiUrl: updates.apiUrl.trim(),
      }),
      ...(updates.replacedBy !== undefined && {
        replacedBy: updates.replacedBy.trim(),
      }),
      ...(updates.replacementReason !== undefined && {
        replacementReason: updates.replacementReason.trim(),
      }),
    };

    this.store.save(catalog);
  }
}

/**
 * Create a catalog service instance.
 */
export function createCatalogService(store?: CatalogStore): CatalogService {
  return new CatalogService(store);
}
