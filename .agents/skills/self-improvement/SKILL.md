---
name: self-improvement
description: >-
  Reflexion loops, failure-driven self-correction, post-mortem extraction,
  mistake pattern mining, bounded self-editing of skills/rules, and continuous
  improvement protocols. Based on Reflexion (2023), TextGrad, CMU Self-Improvement
  Loops (2026), and Karpathy autoresearch.
---

# 🔄 Self-Improvement & Failure-Driven Learning

Based on **Reflexion** (Shinn et al.), **TextGrad**, **Self-Improvement Loops**
(CMU/Amazon 2026), and the **self-improve-plugin** pattern.

---

## 1. 🧭 The Reflexion Loop (Generate → Execute → Critique → Refine)

```
[ Receive Task ] → [ Generate Solution ] → [ Execute & Verify ]
                                                    │
                                            ┌───────┴───────┐
                                            │   SUCCESS?    │
                                            └───────┬───────┘
                                           YES │         │ NO
                                               │         ↓
                                               │  [ Extract Failure Pattern ]
                                               │         ↓
                                               │  [ Write to mistake_log.md ]
                                               │         ↓
                                               │  [ Refine Solution ]
                                               │         ↓
                                               │  [ Re-Execute & Verify ]
                                               ↓         │
                                        [ Log Success ]──┘
                                               ↓
                                    [ Update learning_progress.md ]
```

**Critical Rule**: Never retry blindly. After failure, ALWAYS:
1. Extract the specific error (stack trace, line number, exact message).
2. Classify the failure pattern (build error, logic bug, test regression, etc.).
3. Check `mistake_log.md` for previously seen patterns.
4. Apply a targeted fix based on root cause analysis.
5. Re-verify the fix does not introduce regressions.

---

## 2. 📊 Failure Pattern Mining (3-Part Signature)
Cluster failures by a three-part signature, NOT error strings alone:

| Part | Question | Example |
|------|----------|---------|
| **Verifier cause** | What was rejected? | "Test `TestLogin` failed: expected 200 got 401" |
| **Causal status** | Was the agent behavior actually responsible? | "Yes — forgot to set JWT claims" |
| **Abstract mechanism** | What reusable pattern does this expose? | "Auth handlers must validate token claims before accessing protected data" |

**Addressability Filter**: Exclude failures that reflect task difficulty or capability
limits (e.g., "model doesn't understand X") — only mine failures that are **fixable
through behavioral or code changes**.

---

## 3. 📝 Post-Session Self-Evaluation Protocol
At the end of significant work sessions, perform a structured self-evaluation:

```markdown
### Self-Evaluation — [Date] [Task]

#### What Went Well
- [Specific things that worked efficiently]

#### What Went Wrong
- [Mistakes, re-work, wasted tokens]

#### Root Causes
- [Why the mistakes happened — not just symptoms]

#### Lessons Learned
- [Actionable rules to prevent recurrence]

#### Skill Gaps Identified
- [Areas where knowledge was insufficient]

#### Proposed Improvements
- [Specific changes to skills, rules, or workflow]
```

---

## 4. 🛡️ Bounded Self-Editing Rules
When the agent identifies a recurring pattern that should be codified:

**ALLOWED self-edits** (append-only or bounded):
- Append entries to `mistake_log.md`
- Append "Lessons Learned" to `learning_progress.md`
- Propose new rules or skill amendments to the user for approval

**NEVER self-edit without user approval**:
- Modifying `AGENTS.md` core rules or preferences
- Changing skill files that affect agent behavior
- Altering evaluator scripts or test suites
- Any change to locked surfaces

**The Outside-the-Loop Invariant**: The evaluator, permission control, and budget
enforcement must live OUTSIDE the surface the agent can modify. If the agent can
edit its own scoring criteria, it WILL game them.

---

## 5. 🎯 The Improvement Ladder
Fix recurring failures at the **lowest level** that can express the fix:

| Level | What to Fix | Example |
|-------|-------------|---------|
| 1. **Immediate code** | Bug in the current file | Fix the typo, missing import |
| 2. **Project pattern** | Recurring code smell | Add to project's style guide |
| 3. **Skill knowledge** | Domain knowledge gap | Propose skill update |
| 4. **Workflow** | Process inefficiency | Propose workflow change |
| 5. **Architecture** | Systemic design flaw | Propose architectural decision |

Only escalate when failure clusters at the current level persist across tasks.

---

## 6. 🧪 Continuous Improvement Checklist
After every significant failure or correction from the user:
- [ ] Error logged in `mistake_log.md` with 3-part signature
- [ ] Root cause identified (not just symptom)
- [ ] Prevention rule formulated
- [ ] Checked if similar pattern exists in logs (avoid rediscovery)
- [ ] Fix verified with mechanical gates
- [ ] `learning_progress.md` updated if relevant
