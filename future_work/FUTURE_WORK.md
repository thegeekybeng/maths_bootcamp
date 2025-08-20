# Future Work for Maths Bootcamp LMS

This document lists prioritized improvements and features to consider for the next phases of development.

## 1. Content & Pedagogy

- Standardize `answer_steps` format across all content files and add schema validation.
- Convert all remaining subtopics to use `answer_steps` and `section_test` (complete conversion checklist).
- Add multiple difficulty-tuned question pools per subtopic (S/F/T levels) for randomized tests.
- Add worked-example animations and interactive diagrams (e.g., fraction models, nets).
- Localize content for multiple languages (English variants, Mandarin Chinese, Malay, Tamil).

## 2. Learner Experience

- Improve UI design: responsive layout, nicer forms, accessible color contrast, keyboard navigation.
- Add progress tracking per learner (persisted via backend): per-subtopic mastery, streaks, time spent.
- Implement per-question scaffolding: show hints step-by-step, adaptive hints based on mistakes.
- Add video micro-lessons for tricky concepts and in-lesson quizzes.

## 3. Assessment & Analytics

- Expand Section Test to randomized bank of questions with item metadata.
- Add analytics dashboard for teachers: class-level performance, common mistakes, time-to-complete.
- Build exportable reports (CSV/PDF) for parents and administrators.
- Add automatic difficulty calibration using student performance.

## 4. Platform & Architecture

- Add authentication and roles (student, teacher, admin) using NextAuth or similar.
- Switch to a multi-tenant design for schools or classes.
- Add deployment pipelines and IaC templates (Vercel + Terraform/Azure Static Web Apps).
- Introduce end-to-end tests and component-level unit tests.

## 5. Data & Integrations

- Integrate with LMS standards (LTI) for single sign-on and grade passback.
- Add Analytics integration (e.g., Postgres + Metabase / Azure Application Insights).
- Export/import content JSON for content editors and version control.

## 6. Accessibility & Quality

- WCAG compliance audit and fixes.
- Provide keyboard-first interaction flows and ARIA roles.
- Write a content style guide and QA checklist for new question additions.

## 7. AI & Assistive Features

- Use AI to generate distractors, hint steps and alternative worked solutions (with human review).
- Add an AI tutor chat that can explain the steps and give targeted practice.
- Automatic error-pattern detection to group similar mistakes.

## 8. Monetization & Ops

- Add subscription plans, trial flows, and coupon codes.
- Add billing and usage dashboards.

---

Notes:

- Prioritize schema validation and content standardization before large UI changes.
- Start small with a pilot for a single school/class to iterate on UX and analytics.

## Curriculum Planning (Singapore MOE-aligned)

Planning must follow the current Singapore MOE syllabus, frameworks, and assessment guidelines for each subject and level. For each subject below, create a curriculum map (P1–P6), learning outcomes, skills mapping, assessment items (practice + section tests), and oral/dictation components where applicable.


1. Primary School Maths (Primary 1 to Primary 6)

	- Full scope P1–P6 aligned with MOE Primary Mathematics Syllabus.
	- Topic breakdown: Numbers & Operations, Fractions, Decimals, Ratio, Geometry (shapes, area, volume), Measurement, Data Handling, Algebraic Thinking.
	- Assessments: formative practice, section tests, end-of-topic mastery checks, and mock exam papers aligned to PSLE-style questioning where appropriate.

2. Primary School English (Primary 1 to Primary 6)

	- Include Listening, Reading, Writing, Oral, and Dictation training.
	- Design oral practice (prompts, scoring rubrics) and dictation exercises with answer_steps for language conventions.

3. Chinese as Second Language (Primary 1 to Primary 6)

	- Include Listening, Speaking (oral), Reading, Writing, and Dictation.
	- Provide pinyin/phonics aids, oral role-play prompts, and dictation exercises with worked corrections.

4. Primary School Science (Primary 3 to Primary 6)

	- Topic mapping per MOE syllabus: Scientific Inquiry, Life Sciences, Physical Sciences, Earth & Space, Environmental Studies.
	- Include lab-style inquiry tasks, interactive simulations, and multiple-choice + short-answer assessments.

Compliance notes:

- All curriculum content must reference and adhere to the latest MOE syllabi, assessment frameworks, and school-based policies.
- Include teacher/SME review workflow for content approval and periodic syllabus updates.


