# 006. Add Categories and Tags

Date: 2026-04-13

## Status

Accepted

## Context

The catalog grew to ~140 entries and remained a flat list. This made it hard to:

- Browse by ecosystem layer (models vs harnesses vs apps)
- Attach cross-cutting use cases (e.g., "ServiceNow scripting") without duplicating notes across many entries
- Keep consistent grouping as the dataset scales to 500+ items

We also needed a way to define categories once and apply them uniformly.

## Decision

1. Add optional classification fields to entries:

- `category?: string` - a single primary category slug
- `tags?: string[]` - secondary facets for cross-cutting classification

2. Introduce a category registry stored in `data/categories.json`:

- Each category has `id`, `name`, and `description`
- Categories are managed via the CLI

3. Keep the existing entries file (`data/catalog.json`) as the source of truth for entries.

This keeps existing data valid while enabling structured taxonomy going forward.

## Consequences

**Positive:**

- Enables consistent grouping and filtering (`catalog list --category <slug>`)
- Supports cross-cutting queries via tags without duplicating prose
- Preserves backward compatibility for existing entries

**Negative:**

- Adds a second persisted dataset (`data/categories.json`)
- Requires maintaining category slugs and definitions over time
- Some tools can plausibly fit multiple categories; we must pick a primary role and use tags for the rest

## Alternatives Considered

- **Use cases on every entry:** Rejected because it duplicates information and becomes brittle as new entries are added.
- **A separate top-level use-cases registry:** Rejected because it introduces a second graph to maintain and complicates simple catalog operations.
- **Keep taxonomy only in notes:** Rejected because it is inconsistent and not queryable.

## Related

- Planning: `.plan/.done/feat-document-gpt51-screenshot-limit/`
- ADR-002: `doc/decisions/002-four-attribute-entry-schema.md` (extended in practice over time)
