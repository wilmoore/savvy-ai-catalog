# 001. Use JSON file storage

Date: 2026-01-18

## Status

Accepted

## Context

The catalog needs persistent storage for entries. Options considered:
- SQLite database
- JSON file
- In-memory only
- Cloud storage (Firebase, Supabase)

For v0, we need something simple, portable, and zero-dependency that works immediately without setup.

## Decision

Use a JSON file (`data/catalog.json`) with a swappable `CatalogStore` interface.

## Consequences

**Positive:**
- Zero external dependencies
- Human-readable data format
- Easy to backup and version control
- Portable across environments
- Interface allows future migration to database

**Negative:**
- Not suitable for concurrent writes
- Loads entire catalog into memory
- No query optimization

These limitations are acceptable for v0 personal use. The `CatalogStore` interface allows swapping to a database later.

## Alternatives Considered

- **SQLite:** More robust, but adds dependency and complexity for v0
- **In-memory only:** No persistence between sessions
- **Cloud storage:** Requires accounts and network dependency

## Related

- Planning: `.plan/.done/mvp-catalog/`
