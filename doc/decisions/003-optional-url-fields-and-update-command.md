# 003. Optional URL Fields and Update Command

Date: 2026-01-19

## Status

Accepted

## Context

The catalog needed to track additional metadata about tools beyond the core four attributes (name, description, inCurrentStack, pressureTested). Users wanted to reference official websites, pricing pages, affiliate programs, and API documentation directly from catalog entries.

Additionally, as the catalog grows, users need the ability to modify existing entries without re-adding them. The original CLI only supported `add`, `list`, and `what` commands.

## Decision

1. **Add optional URL fields to CatalogEntry:**
   - `websiteUrl?: string` - Primary website
   - `pricingUrl?: string` - Pricing page
   - `affiliateUrl?: string` - Affiliate program registration
   - `apiUrl?: string` - API documentation

2. **Add `update` command to CLI:**
   - Accepts entry name and optional flags to update specific fields
   - Supports `--website`, `--pricing`, `--affiliate`, `--api`, `--description`
   - Case-insensitive name matching (consistent with existing `what` command)

3. **Make fields optional:**
   - URL fields are not required for entry creation
   - Only populated when explicitly provided
   - Displayed in output only when present

## Consequences

**Positive:**
- Catalog entries become a single source of truth for tool reference links
- Existing entries remain valid (backward compatible)
- Users can incrementally add URLs to entries over time
- CLI remains simple with intuitive flags

**Negative:**
- Entry display becomes more verbose when URLs are present
- Schema expansion may continue (potential for scope creep)

## Alternatives Considered

1. **Separate URL registry file:** Rejected because it fragments data and complicates lookups.
2. **Required URL fields:** Rejected because many tools lack affiliate programs or public APIs.
3. **Generic key-value metadata:** Rejected in favor of typed fields for validation and discoverability.

## Related

- ADR-002: Four-attribute entry schema (this extends that foundation)
