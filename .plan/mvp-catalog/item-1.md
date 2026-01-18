# Item #1: Define catalog entry schema

## Requirements

Create the data schema for catalog entries with exactly four attributes:
- `name` (string) - The commonly used name. No renaming or branding spin.
- `description` (string) - One plain-language sentence explaining what it is.
- `inCurrentStack` (boolean) - Whether actively part of the creator's working setup.
- `pressureTested` (boolean) - Whether used in real work with real stakes.

## Implementation Approach

1. Create TypeScript interface for the catalog entry
2. Create a type for the catalog (collection of entries)
3. Keep it simple - no validation logic yet, just the type definitions

## Files to Create

- `src/types.ts` - Type definitions for catalog entries
