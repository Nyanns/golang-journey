---
name: harness-engineering
description: >-
  Autonomous agent harness design: locked/editable/append-only surface classes,
  deterministic verification gates, durable state externalization, failure
  diagnosis loops, search discipline, and governance boundaries. Based on
  Karpathy autoresearch, Prime Intellect nanoGPT, and CMU Harness Engineering 2026.
---

# ⚙️ Harness Engineering & Quality Gate Standard

Based on **Awesome-Harness-Engineering** (CMU, Yale, Amazon 2026), Karpathy `autoresearch`,
Prime Intellect autonomous nanoGPT, and 12-Factor Agents.

---

## 1. 🏗️ Surface Classification (Harness Boundary)
Separate the agent from the environment. The agent proposes; the harness enforces.

| Surface | Examples | Rule |
|---------|----------|------|
| **Locked** | Eval metric, validation script, rubric, merge policy | Agent may read and propose changes but cannot self-score with modified rules |
| **Editable** | Source code, config, skill draft, prompt under test | Agent may mutate during work loop |
| **Append-only** | Results log, research thread, rejected ideas, `learning_progress.md` | Agent may append, never rewrite history |
| **Human-controlled** | Merge, production deploy, credentials, destructive DB operations | Requires explicit human approval |

---

## 2. 🚦 Deterministic Verification Gates
**Never declare done on assumptions.** Execute the mechanical verification suite:

1. **Compilation**: `go build ./...`
2. **Lint & Vet**: `go vet ./...` / `golangci-lint run`
3. **Unit & Integration Tests**: `go test -v -race ./...`
4. **Migration Integrity**: Check `up.sql` and `down.sql` consistency.

**Fail Fast Protocol**: If a test fails, do NOT guess. Inspect the specific stack trace,
line number, and error payload. Then apply a surgical fix and re-verify.

---

## 3. 🔍 Invariant Checking & Ground Truth
- **Cross-Reference Active Code**: Never trust stale memories. Always read actual struct
  definitions, interfaces, and function signatures using `grep_search` or `view_file`.
- **Database Model ↔ Migration Consistency**: Verify GORM model tags match SQL migration
  constraints (foreign keys, unique indices, nullable columns).

---

## 4. 📝 Durable State Externalization
Long-running agents must externalize state to files (not rely on chat history).
Use **append-only logs** recording:

- What was tried and what improved or failed
- Why a candidate was kept, discarded, or routed to review
- Which files were modified and what changed (function-level, not just file names)
- What the next agent/session should do

Format: JSONL or Markdown with mandatory sections.

---

## 5. 🔄 Failure Diagnosis Loop
```
[ Trigger Action ] → [ Run Verification ] → [ Intercept Error ]
    → [ Isolate Root Cause from stack trace ] → [ Surgical Fix ]
    → [ Re-Verify (no regressions) ]
```
- Capture exact log/output with line numbers.
- Formulate a minimal, targeted patch.
- Re-run full verification to confirm fix without side effects.
- **Log the failure and fix** in append-only state for future reference.

---

## 6. 🧪 Production Testing Standards
- **Table-Driven Tests**: `tests := []struct{ name string; input ...; expected ...; wantErr bool }{...}`
- **Mock Interfaces**: Test service logic in isolation with `testify/mock`.
- **Verify Expectations**: `mockRepo.AssertExpectations(t)`.

---

## 7. 🏛️ Governance
- Agents may prepare PRs, draft changes, run checks, and write summaries.
- Agents should **NOT** merge, deploy, or push without explicit human approval.
- Changes to evaluators, acceptance gates, or editable surface expansion require human review.
