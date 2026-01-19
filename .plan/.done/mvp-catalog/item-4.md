# Item #4: List all catalog entries

## Requirements

Implement functionality to view/browse all entries in the catalog.

## Implementation

The `list()` method was already implemented in CatalogService (item #3).

For this item, create a CLI entry point to make the catalog usable:
- `src/cli.ts` - Command-line interface for the catalog

## CLI Commands

- `catalog list` - List all entries
- `catalog add <name> <description> [--in-stack] [--pressure-tested]` - Add entry
- `catalog what <name>` - Lookup entry by name
