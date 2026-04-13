# Requirements

## Scope
- Document GPT-5.1 Codex screenshot-read limitation when using `/connect` with OpenAI provider.
- Capture Gemini model + CLI unreliability (timeouts, busy loops, context switching penalty) and current mitigation strategy.
- Note pi-coding-agent lacking built-in plan mode for end users.
- Add new Lemon entry with metadata, modes, strengths, instability, clipboard feature flakiness, and CRM correspondence references.
- Add new Attio CRM entry describing vendor/support tracking workflows.

## Acceptance Criteria
1. `.plan/backlog.json` contains in-progress backlog item for this branch.
2. Planning notes stored under `.plan/feat-document-gpt51-screenshot-limit/` (this folder) covering evidence + tasks.
3. `data/catalog.json` updates:
   - Both OpenAI Codex entries have notes referencing screenshot limitation & workaround.
   - Gemini base + CLI entries capture reliability issues and decision context.
   - `pi-coding-agent` entry states plan-mode gap.
   - New Lemon and Attio entries created with provided metadata and observations.
4. `npm run build` succeeds with no errors.
5. `coderabbit --prompt-only` executed after implementation.
6. Any open issues/follow-ups captured via `/pro:backlog.add` if needed.
