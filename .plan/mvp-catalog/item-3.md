# Item #3: Add new catalog entry

## Requirements

Implement functionality to add a new entry to the catalog:
- Entry must have all four required attributes: name, description, inCurrentStack, pressureTested
- Prevent duplicate entries (by name)
- Persist to storage

## Implementation Approach

1. Create a catalog service module with add functionality
2. Validate that name is not empty
3. Check for duplicates before adding
4. Use the store to persist

## Files to Create

- `src/catalog.ts` - Catalog service with CRUD operations
