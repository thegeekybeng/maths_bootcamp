# Data Model (MVP)

A minimal relational schema to support auth, content, attempts, mastery, and recommendations.

## Entities

- User: id, email (unique), passwordHash, role (student|trainer|admin), createdAt
- StudentProfile: id, userId (FK), displayName, schoolLevel, cohort, preferredLogin (email|oauth), guardianContact?
- TrainerProfile: id, userId (FK), displayName
- Topic: id, name, strand, order, isActive
- Skill: id, topicId (FK), code, name, difficulty (F|S|T)
- Question: id, stem, choices[], answer, explanation, skillIds[], difficulty, tags[], version
- Attempt: id, studentId (FK), questionId (FK), skillIds[], outcome, errorType?, timeTakenSec, attemptsCount, hintsUsed, createdAt
- Mastery: id, studentId (FK), skillId (FK), score (0..1), lastUpdated, exposures, lastPracticedAt
- Recommendation: id, studentId (FK), skillId (FK), reason, createdAt, status (new|shown|actioned|dismissed)
- Assignment: id, trainerId (FK), title, dueAt?, createdAt
- AssignmentItem: id, assignmentId (FK), questionId (FK), order
- AssignmentProgress: id, assignmentId (FK), studentId (FK), status, score?, startedAt?, completedAt?

## Notes

- Store skillIds as a relation table (AttemptSkill) for normalization.
- Keep Question->Skill as many-to-many (QuestionSkill).
- Use soft-deletes or versioning for content to allow edits without data loss.
- PII: limit to email and optional guardian contact; secure hashing for passwords.

## Example Prisma-style sketch (illustrative)

// model User { id String @id @default(cuid()) email String @unique passwordHash String role String createdAt DateTime @default(now()) }
// model StudentProfile { id String @id @default(cuid()) userId String @unique user User @relation(fields: [userId], references: [id]) displayName String? cohort String? preferredLogin String? }
// model Skill { id String @id @default(cuid()) code String @unique name String difficulty String topicId String }
// model Question { id String @id @default(cuid()) stem String difficulty String tags String[] }
// model QuestionSkill { questionId String skillId String @@id([questionId, skillId]) }
// model Attempt { id String @id @default(cuid()) studentId String questionId String outcome String errorType String? timeTakenSec Int attemptsCount Int hintsUsed Int createdAt DateTime @default(now()) }
// model AttemptSkill { attemptId String skillId String @@id([attemptId, skillId]) }
// model Mastery { id String @id @default(cuid()) studentId String skillId String score Float lastUpdated DateTime @default(now()) exposures Int @default(0) }
