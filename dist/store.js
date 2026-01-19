import * as fs from "fs";
import * as path from "path";
/**
 * JSON file-based storage implementation.
 * Simple and portable for v0.
 */
export class JsonFileCatalogStore {
    filePath;
    constructor(filePath) {
        this.filePath = filePath;
    }
    load() {
        if (!fs.existsSync(this.filePath)) {
            return [];
        }
        const content = fs.readFileSync(this.filePath, "utf-8");
        return JSON.parse(content);
    }
    save(catalog) {
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
export const DEFAULT_CATALOG_PATH = path.join(process.cwd(), "data", "catalog.json");
/**
 * Create a store instance with the default path.
 */
export function createStore(filePath = DEFAULT_CATALOG_PATH) {
    return new JsonFileCatalogStore(filePath);
}
