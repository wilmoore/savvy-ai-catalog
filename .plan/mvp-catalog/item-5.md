# Item #5: Lookup entry by name

## Requirements

Implement exact-match lookup by name to answer 'What is this?' queries.
This is the core success criteria for v0.

## Implementation

Already implemented:
- `CatalogService.findByName()` - Case-insensitive exact match lookup
- `catalog what <name>` - CLI command for lookup

## v0 Success Criteria

> If someone asks "What the hell is this?", the catalog answers clearly,
> simply, and without opinion.

The `catalog what <name>` command fulfills this:
- Takes a name as input
- Returns the entry if found with name, description, and status flags
- Returns "not found" message if entry doesn't exist
- Output is neutral and factual
