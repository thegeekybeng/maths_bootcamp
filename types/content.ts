export type Difficulty = 'F' | 'S' | 'T'

export interface ExampleItem {
  title: string
  steps: string[]
}

export interface PracticeQuestion {
  id: string
  stem: string
  answer: string
  answer_steps?: string[]
  skills: string[]
  difficulty: Difficulty
  hints?: string[]
}

export interface SubtopicContent {
  id: string
  strandId: string
  name: string
  overview: string
  objectives: string[]
  refresher: string
  examples: Partial<Record<Difficulty, ExampleItem[]>>
  practice: PracticeQuestion[]
  hints: string[]
  common_mistakes: string[]
  reflection: string[]
}
