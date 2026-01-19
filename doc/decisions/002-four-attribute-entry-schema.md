# 002. Four-attribute entry schema

Date: 2026-01-18

## Status

Accepted

## Context

The catalog needs a schema for entries. The product brief specifies exactly four attributes with clear definitions. The question was whether to add additional fields like:
- `id` or `slug`
- `createdAt` / `updatedAt` timestamps
- `tags` or `categories`
- `url` or `links`

## Decision

Keep exactly four attributes as specified in the product brief:
1. `name` (string) - The commonly used name
2. `description` (string) - One plain-language sentence
3. `inCurrentStack` (boolean) - Part of working setup
4. `pressureTested` (boolean) - Used in real work

## Consequences

**Positive:**
- Aligns exactly with product brief
- Forces editorial discipline (one sentence descriptions)
- Simple to maintain and understand
- Avoids scope creep toward recommendations or ratings

**Negative:**
- No automatic deduplication (rely on name matching)
- No timestamps for change tracking
- No categorization or tagging

These are acceptable per the product brief's explicit non-goals.

## Alternatives Considered

- **Add id field:** Would help deduplication, but name serves as natural key
- **Add timestamps:** Useful for tracking, but adds complexity beyond v0 scope
- **Add categories/tags:** Product brief explicitly excludes categorization

## Related

- Planning: `.plan/.done/mvp-catalog/`
- Product Brief: `.plan/product/briefs/2026-01-17-savvy-ai-catalog.md`
