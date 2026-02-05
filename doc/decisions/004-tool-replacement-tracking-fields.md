# 004. Tool Replacement Tracking Fields

Date: 2026-01-22

## Status

Accepted

## Context

The catalog tracks tools in the creator's stack, but there was no way to capture tool migration history. When a tool is removed from the stack and replaced by another, that institutional knowledge was lost.

Users wanted to:
- Track which tools replaced others
- Understand why switches were made
- Query migration patterns over time

## Decision

Add two optional fields to `CatalogEntry`:

```typescript
replacedBy?: string;        // Name of the tool that replaced this one
replacementReason?: string; // Why the switch was made
```

Design choices:
- Both fields are optional to maintain backwards compatibility
- `replacedBy` implies the tool was previously in the stack (no separate flag needed)
- Free-form `replacementReason` captures the "why" which is the most valuable insight
- Simple flat structure over history arrays to minimize maintenance friction

## Consequences

**Positive:**
- Migration history is captured without complex data structures
- Queryable: can grep for all tools with `replacedBy` to see patterns
- Low friction: two optional fields vs. structured history arrays
- Backwards compatible: existing entries remain valid

**Negative:**
- Only tracks most recent replacement (no full history chain)
- `replacedBy` references tool by name string, not enforced foreign key

## Alternatives Considered

1. **History array with timestamps**: More complete but higher maintenance burden. Rejected because users rarely maintain detailed history logs.

2. **Separate `previouslyInStack` boolean**: Redundant if `replacedBy` exists. Rejected to minimize fields.

3. **No tracking**: Status quo. Rejected because migration insights have clear value.

## Related

- Original schema: `doc/decisions/002-four-attribute-entry-schema.md`
- URL fields extension: `doc/decisions/003-optional-url-fields-and-update-command.md`
