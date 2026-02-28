# 005. Add Status Tracking Fields

Date: 2026-02-28

## Status

Accepted

## Context

The original 4-attribute schema (name, description, inCurrentStack, pressureTested) works well for tracking current state, but doesn't capture the full lifecycle of tool evaluation:

- Tools don't go straight from "not tried" to "in stack"
- Some tools are actively being evaluated
- Some tools are planned to be evaluated
- Contextual notes about each tool are valuable for future reference

Users needed more nuanced tracking for tools in the evaluation pipeline.

## Decision

Add three new optional fields to `CatalogEntry`:

```typescript
evaluating?: boolean; // Actively trying out the tool
planned?: boolean;    // Intent to evaluate in the future
notes?: string;       // Contextual notes, context, observations
```

Design choices:
- All fields are optional to maintain backwards compatibility
- Boolean fields use simple true/false (no tri-state enums)
- `notes` is a free-form string for flexibility
- `evaluating` and `planned` can coexist with each other and with pressureTested

## Consequences

**Positive:**
- Captures full evaluation lifecycle: planned → evaluating → pressureTested → inCurrentStack
- Each tool can have multiple "active" flags (e.g., evaluating AND pressureTested)
- Notes field enables rich contextual information without schema changes
- Backwards compatible: existing entries remain valid

**Negative:**
- More fields to maintain (7 total vs. 4 original)
- `notes` field is unstructured (no enforced formatting)
- Potential for `planned: true, evaluating: true` confusion (but both can be true)

## Alternatives Considered

1. **Single status enum**: Rejected because pressureTested can coexist with any status, making enum awkward.

2. **Planned/evaluating only, no notes**: Rejected because notes provide valuable context that doesn't fit elsewhere.

3. **Status + flags hybrid**: More complex. Booleans are simpler for querying and updating.

## Related

- Original schema: `doc/decisions/002-four-attribute-entry-schema.md`
- Tool replacement tracking: `doc/decisions/004-tool-replacement-tracking-fields.md`
