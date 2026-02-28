# Gemini CLI

## Status
- inCurrentStack: true
- pressureTested: true
- evaluating: false
- planned: false

## Notes

Google's official terminal-based interface for interacting with Gemini models, focused on coding workflows, structured planning, and local developer integration.

Utility: Switch to Gemini CLI when Claude Code subscription hits usage limits. Has "huge utility" despite not being the favorite tool.

Issues:
- Sometimes gives up or cannot complete a task, spins forever without doing anything
- Hasn't completed porting Claude Code plugins to Gemini extension format yet
- Commands are *.toml (different from Claude Code)
- Skills map 1-1 fairly well
- Hooks are a bit different
- MCP is set up differently but pretty close - easy port

## Source
- Website: https://google-gemini.github.io/gemini-cli/
- Pricing: Not specified

## Added
- Branch: feat/add-coding-agents
- Date: 2026-02-28
