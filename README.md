# PSLE Maths Bootcamp LMS (Community-Driven)

An encouraging, mistake-friendly learning platform to help Singapore PSLE students build confidence and mastery in Mathematics. Designed for tablets and laptops, with engaging practice, gentle feedback, and targeted recommendations.

## Goals

- Keep learning fun, motivating, and growth-oriented.
- Encourage making mistakes and learning from them.
- Track individual learning patterns to surface strengths and gaps.
- Provide actionable, friendly recommendations to improve mastery.
- Remain flexible so trainers can adapt/curate materials.

## What’s here now

- Vision, principles, and user stories (see `docs/vision.md`).
- PSLE-aligned topic map with difficulty bands (see `docs/syllabus_psle.md`).
- Proposed architecture and AI mastery approach (see `docs/architecture.md` and `design/mastery_model.md`).
- Topics taxonomy (see `data/topics/psle_topics.json`).
- Sample question schema (see `data/samples/sample_questions.json`).

## Suggested default stack (to be confirmed)

- Web: Next.js + TypeScript (tablet/laptop friendly UI)
- Data: Prisma + SQLite (local dev) / Postgres (prod)
- Auth: Auth.js (email/password, OAuth optional)
- Analytics: Event stream -> mastery engine -> recommendations

We’ve kept the repo stack-agnostic so we can confirm choices before scaffolding code.

## Roadmap (MVP)

1. Scaffold app (Next.js + Prisma + SQLite + Auth.js) and secure routes.
2. Seed topics and a tiny set of questions to demo mastery tracking.
3. Attempt logging, feedback UI, and basic recommendation loop.
4. Trainer dashboard (assignments, review common errors, export progress).
5. Parent/student views (progress, tips, suggested next steps).

## Contributing

- Propose topic changes in `docs/syllabus_psle.md` or `data/topics/psle_topics.json`.
- Add sample items with care: short, clear, child-friendly.
- Keep tone encouraging and strengths-based.

## Next steps

After we confirm the stack, we’ll scaffold the app and wire up the data model:

- Create Next.js app, add Prisma, Auth.js, and a minimal UI.
- Implement DB entities for Students, Attempts, Questions, Skills, Mastery, and Recommendations.
- Render a simple practice flow with feedback and logging.

If you want me to scaffold the app now, say “scaffold the app.”
