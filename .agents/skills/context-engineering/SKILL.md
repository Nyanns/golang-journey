---
name: context-engineering
description: >-
  Context window optimization, token-per-task economics, observation masking,
  KV-cache optimization, compaction triggers, context partitioning, artifact
  trail preservation, and structured compression. Based on CMU/Amazon 2026
  Agent Harness Engineering research.
---

# ⚡ Context Engineering & Token Optimization Standard

Based on **Agent-Skills-for-Context-Engineering** (cited by Peking Univ, CMU, Yale, Amazon 2026),
Anthropic Context Guidelines, and 12-Factor Agents.

---

## 1. 🎯 Optimize Tokens-Per-Task, NOT Tokens-Per-Request
- **The Paradox**: Aggressive compression saves tokens per message but causes re-fetching,
  re-reading files, and re-deriving conclusions — costing MORE total tokens.
- **Measure Re-fetch Frequency**: If the agent repeatedly asks to re-read files it already
  processed, compression is too aggressive.
- **Rule**: Every token must directly advance code quality, architectural clarity, or bug
  resolution. Wasted tokens = re-exploration costs.

---

## 2. ✂️ Zero Conversational Filler (High-Density Output)
- **Eliminate AI pleasantries and echo preamble**:
  - ❌ *"Sure! I would be delighted to help you..."*
  - ❌ *"I hope this helps! Let me know if..."*
  - ✅ Jump straight to solution, analogy, diagram, or code.
- **Surgical Code Modifications**:
  - Use targeted `replace_file_content` edits, not full-file rewrites.
  - When explaining code, highlight only modified/critical lines.

---

## 3. 🛡️ Observation Masking (4-Tier Priority)
Apply masking selectively based on recency and ongoing relevance:

| Category | Rule |
|----------|------|
| **Never mask** | Observations critical to current task, most recent turn, active reasoning chains, error outputs during debugging |
| **Mask after 3+ turns** | Verbose outputs whose key points already extracted. Replace with `[Obs:{ref} elided. Key: {summary}]` |
| **Always mask immediately** | Repeated/duplicate outputs, boilerplate headers, outputs already summarized |
| **Byte-cap** | Shell outputs: `head -n 50`, `tail -n 50`, or pipe through `grep`. File views: use `StartLine`/`EndLine` for files >200 lines |

Target: 60-80% reduction in masked observations with <2% quality impact.

---

## 4. 📋 Structured Compression (Anchored Iterative)
When context grows large, use **Anchored Iterative Summarization** with mandatory sections:

```markdown
## Session Intent
[What the user is trying to accomplish]

## Files Modified
- path/to/file.go: [what changed, which functions]

## Decisions Made
- [Architectural or design decisions with rationale]

## Current State
- [Test status, build status, blockers]

## Next Steps
1. [Ordered action items]
```

- Trigger compaction at **70% context utilization**.
- Compress tool outputs first (80%+ of tokens), then old turns, then retrieved docs.
- **NEVER compress the system prompt** — it anchors behavior.
- Target 50-70% token reduction with <5% quality degradation.

---

## 5. 📂 Filesystem as Persistent Long-Term Memory
- Persist critical state in markdown files (`learning_progress.md`, specs, architecture docs).
- Read persisted memory on-demand rather than restating full history.
- Keep `AGENTS.md` lean (<300 lines) with **pointers** to deeper skills/docs.

---

## 6. 🧑‍🏫 Step-by-Step Pedagogical Efficiency
When guiding a learner:
1. **Mental Model / Analogy** first (1-2 sentences, real-world: warung, satpam, kantor pos).
2. **Clean Diagram** (Mermaid) if architectural.
3. **Interface / Scaffold** for the user to implement.
4. Wait for user to write code; don't dump solutions unless requested.
