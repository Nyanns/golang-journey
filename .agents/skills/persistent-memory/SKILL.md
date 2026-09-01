---
name: persistent-memory
description: >-
  Cross-session knowledge retention, filesystem-backed memory architecture,
  learning progress tracking, mistake journaling, structured handoff summaries,
  and decision audit trails. Ensures the agent maintains continuity across
  sessions without losing critical project state.
---

# 🧠 Persistent Memory & Cross-Session Continuity

Based on **Letta (MemGPT)**, **Zep/Graphiti**, CMU Memory Systems research 2026,
and filesystem-backed persistence patterns.

---

## 1. 📐 Memory Architecture (3-Layer Hierarchy)

```
┌─────────────────────────────────────────────────┐
│  LAYER 1: WORKING MEMORY (Context Window)       │
│  Current task state, active file edits, errors   │
│  ⚡ Volatile — lost when session ends            │
├─────────────────────────────────────────────────┤
│  LAYER 2: SESSION MEMORY (Conversation Artifacts)│
│  implementation_plan.md, task.md, walkthrough.md │
│  📋 Session-scoped — preserved in artifacts dir  │
├─────────────────────────────────────────────────┤
│  LAYER 3: LONG-TERM MEMORY (Filesystem Files)   │
│  learning_progress.md, AGENTS.md, mistake_log,  │
│  architecture decisions, skill files              │
│  💾 Persistent — survives across all sessions    │
└─────────────────────────────────────────────────┘
```

**Golden Rule**: Default to the **shallowest** layer that satisfies the persistence need.
Only escalate when a shallower layer cannot meet the retrieval or durability requirement.

---

## 2. 📖 Mandatory First-Turn Protocol
**At the start of EVERY new conversation:**
1. Read `.agents/learning_progress.md` to recall learning state, current sesi, and next steps.
2. Read `.agents/AGENTS.md` for project context, preferences, and installed skills.
3. Check for `mistake_log.md` entries relevant to the current task domain.
4. Scan recent git log (`git log -n 5 --oneline`) for recent changes.

This replaces "asking the user what they want" with **informed resumption**.

---

## 3. 📝 Learning Progress Tracking (`learning_progress.md`)
This is the **single most important persistent memory file**. Structure:

```markdown
## Current Status
- Sesi: [number] — [topic]
- Status: [SEDANG BERJALAN / SELESAI]
- Project: [Lumiina / MyAnimeTracker / etc.]

## Completed Sessions
### Sesi N: [Topic]
- Tanggal: YYYY-MM-DD
- Konsep dipelajari: [list]
- File yang dibuat/dimodifikasi: [list with paths]
- Keputusan arsitektur: [key decisions]
- Kesalahan & pelajaran: [what went wrong and what was learned]

## Next Steps
- [Ordered list of upcoming work]

## Recurring Mistakes to Avoid
- [Pattern: description → fix applied]
```

**Update Protocol**: Update `learning_progress.md` at the END of every significant work session
(not every message — only when meaningful progress occurs).

---

## 4. 🚨 Mistake Journal (`mistake_log.md`)
Track recurring errors to prevent re-discovery. Each entry:

```markdown
### [YYYY-MM-DD] [Error Category]
- **Context**: What was being done when the error occurred
- **Error**: Exact error message or behavior
- **Root Cause**: Why it happened (not just what happened)
- **Fix Applied**: The specific solution
- **Prevention Rule**: How to avoid this in the future
- **Files Affected**: [paths]
```

Categories: `BUILD_ERROR`, `TEST_FAILURE`, `MIGRATION_ERROR`, `SECURITY_ISSUE`,
`ARCHITECTURE_MISTAKE`, `DEPENDENCY_CONFLICT`, `RUNTIME_PANIC`

---

## 5. 🔄 Structured Handoff Summary
When a conversation ends or reaches context limits, write a handoff summary:

```markdown
## Handoff Summary — [Date]

### Outstanding Requests
- [What user asked for that isn't finished]

### Work Accomplished
- [Completed items with file paths]

### Current State
- Build: [passing/failing]
- Tests: [N passing, M failing]
- Blockers: [any blocking issues]

### Decisions Made
- [Key architectural/design decisions with rationale]

### Next Agent Should
1. [First priority action]
2. [Second priority action]
```

---

## 6. 🏗️ Architecture Decision Records (ADR)
For significant architectural choices, persist in project docs:

```markdown
### ADR-NNN: [Decision Title]
- **Date**: YYYY-MM-DD
- **Status**: Accepted / Superseded by ADR-XXX
- **Context**: [Why this decision was needed]
- **Decision**: [What was chosen]
- **Alternatives Considered**: [What was rejected and why]
- **Consequences**: [Trade-offs accepted]
```
