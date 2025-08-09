# Proposed Architecture (MVP)

- Client: Web app (tablet/laptop friendly), responsive UI.
- Server: API for auth, content, attempts, mastery, recommendations.
- Data: Relational DB (SQLite for dev; Postgres for prod) via ORM.
- Analytics: Event tracking of attempts and interactions.
- Mastery Engine: Simple per-skill scoring + rules for recommendations.

## Modules

- Auth: email/password first; optional OAuth later. Student accounts with unique IDs.
- Content: Topics, Subtopics, Skills, Questions; versioned to allow trainer curation.
- Practice: Items with hints, explanations, and error tagging.
- Attempts: Log correctness, time-on-task, attempts, hints used, error types.
- Mastery: Skill-level scores; confidence; decay; last-practiced timestamps.
- Recommendations: Next-best practice; review of weak skills; careless patterns.
- Admin/Trainer: CRUD for content, review analytics, export.

## AI/Analytics Pipeline (evolvable)

1. Event tracking: attempt events (correct/incorrect, error taxonomy, time).
2. Mastery scoring: ELO-like or lightweight BKT update per skill.
3. Recommendation rules: mix of weakest skills, recently wrong, spaced review.

## Privacy and Safety

- Minimal PII; secure password storage; audit access.
- Child-friendly UX and language; explain recommendations simply.
- Clear export/delete of student data upon request.

## Extensibility

- Topic/skill taxonomy from JSON/DB; trainers can update.
- Pluggable mastery engine; keep event schema stable.
