# Notes

## Evidence References
- Screenshots 1–3: GPT-5.1 Codex UI showing inability to parse screenshots via OpenCode `/connect` > OpenAI.
- Screenshots of Gemini CLI sessions timing out (user description) – no direct images, but repeated anecdotal failures; highlight productivity impact.
- Images 1–4 (Attio CRM): show Lemon support thread stored in CRM, demonstrating tool usage for vendor tracking.
- Images 5–9: Lemon marketing site + UI flows (dictation, assistant tasks).
- Additional CRM screenshots show usability bug list emailed to Lemon support (state persistence, settings fields disappearing, integrations showing unset, need to force quit, etc.).
- Addy Osmani LinkedIn post (https://www.linkedin.com/posts/addyosmani_ai-programming-softwareengineering-ugcPost-7434627082560860160-nuHB) announcing Gemini 3.1 Flash-Lite claims (less verbose, 80% faster than 2.5 Flash, $0.25/M input + $1.50/M output, tunable "thinking levels", handles high-frequency agentic workflows); needs empirical validation on our repos later.
- YouTube recap (https://www.youtube.com/watch?v=pJylXFAC87A): overview of Cursor, Anti-Gravity, Windsurf; notes that Anti-Gravity is effectively Windsurf-next after Google hired the Windsurf team, and reiterates that Gemini models are great for design but stumble on non-trivial coding—matching our own experience.
- Mastra intel: public docs + npm scaffolding (`npm create mastra@latest`) describe an open-source, TypeScript-first framework for agent orchestration/infrastructure (mastra.ai). Capture as accepted entry while we evaluate it against LangChain/LlamaIndex/OpenAI Assistants.
- Sider brief: viral Chrome extension (sider.ai) that embeds multiple AI models in-page for reading/summarizing/writing; AI-assisted layer focused on research workflows, more providers than ChatGPT Sidebar.
- Sider brief: viral Chrome extension (sider.ai) that embeds multiple AI models in-page for reading/summarizing/writing; AI-assisted layer focused on research workflows, more providers than ChatGPT Sidebar. Official walkthrough video (https://www.youtube.com/watch?v=0bTc2DdE0tM) shows install/login flow, multi-model chat, file analysis, Painter image generation, and page/video summarization—essentially an AI sidebar UI atop any webpage.

## Key Observations
- GPT-5.1 Codex cannot interpret screenshot content; must provide text/log context separately.
- Gemini: repeated busy signals/timeouts break flow → prefer cheaper but responsive models; still useful when it works.
- Gemini also struggles with complex coding tasks outside design contexts (per YouTube review + own observation), so treat marketing claims skeptically until we see sustained coding performance.
- Pi coding agent distribution lacks plan mode → requires manual install for responsible workflow.
- Lemon:
  - Voice-first Mac agent (dictation + assistant + clipboard modes).
  - Dictation quality better than Voice Inc; no nag-based limits.
  - Clipboard mode intermittently fails to write content.
  - Settings issues: full name/email fields disappear, email locked to Gmail, Check Updates inert, cannot disable assistant mode or adjust multi-key shortcuts, integrations randomly appear disconnected, notch launcher stops opening; requires force quit.
  - Workaround: keep Lemon closed via Raycast until dictation needed.
  - Support responsive (emails 19–27 Feb 2026 captured in CRM); awaiting fixes.
- Attio CRM used beyond sales: track vendor subscriptions, refunds, support history, tasks for follow-ups/chargebacks.
- GPT-5.1 Codex (OpenCode 1.2.15) now in daily use after initial failed connection; moved back because Claude $20 tier was timing out too often. Considering mix of Claude Code ($20), ChatGPT/Codex ($20), and cheap completion tools instead of $100 Claude tier. Minimax free tier intermittently resets weekly, so it becomes the default when available.

## Subscription Strategy Notes
- $100 Claude Code tier only needed on heavy-contract days; otherwise stack of Claude Code ($20) + GPT-5.1 Codex (within ChatGPT Plus) + Minimax free/cheap + optional $10–$20 Copilot/Cursor should cover throughput.
- First connection to GPT-5.1 Codex inside OpenCode failed, but retry a few hours later succeeded and has been stable for a day.
- Minimax proved reliable during the free week; appears to reset quota weekly, so keep it bookmarked as low-cost backup.

## Decisions Pending
- Determine `inCurrentStack`/`pressureTested` flags for Lemon & Attio (likely true if actively used; confirm with user context: Lemon currently used for dictation, Attio used for vendor tracking) → set `inCurrentStack: true`, `pressureTested: true`.
- Evaluate whether Gemini remains in stack despite unreliability (probably `inCurrentStack: true` but note consideration to drop).
