# Item #2: Create catalog data storage

## Requirements

Implement storage mechanism for catalog entries:
- Start simple (JSON file) with clear interface for future migration
- Must support reading and writing catalog data
- Should be easy to swap implementations later

## Implementation Approach

1. Create a CatalogStore interface that defines the storage contract
2. Implement a JSON file-based storage adapter
3. Use a simple data directory for persistence

## Files to Create

- `src/store.ts` - Storage interface and JSON implementation
- `data/catalog.json` - Initial empty catalog data file
