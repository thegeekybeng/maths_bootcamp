# Mastery Model (Starter Spec)

A lightweight, interpretable mastery model that distinguishes conceptual errors from careless errors and guides next steps.

## Attempt Event Schema (minimal)

- studentId, questionId, skillIds[]
- timestamp, timeTakenSec
- outcome: correct | incorrect
- errorType?: conceptual | careless | reading | unit | computation
- attemptsCount, hintsUsed

## Scoring

- Initialize per-skill mastery at 0.5 (0..1 scale).
- On correct: +k*(1 - mastery); on incorrect: -k*(mastery), clamp 0..1.
- k small (e.g., 0.1..0.2); careless errors penalize less than conceptual.
- Confidence decays slowly over time without practice.

## Recommendations (rules)

- If conceptual errors on skill X: surface 2-3 scaffolded items for X, include worked example.
- If repeated careless errors: show a “careless sweep” checklist (units, reread, estimate first) and slower-paced items.
- Mix weakest skills with spaced review of near-threshold skills.

## Feedback Tone

- Celebrate effort; offer one actionable tip.
- Explain why the next recommendation appears (transparent).
