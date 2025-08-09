import fs from 'node:fs'
import path from 'node:path'
import { SubtopicContent } from '../types/content'
import topics from '../data/topics/psle_topics.json'

export type TopicIndex = typeof topics

const contentDir = path.join(process.cwd(), 'data', 'content')

export function getSubtopics() {
  const strands = (topics as any).strands as Array<{ id: string; name: string; subtopics: any[] }>
  return strands.flatMap((s) => s.subtopics.map((t) => ({ ...t, strandId: s.id, strandName: s.name })))
}

export function getSubtopicById(id: string) {
  return getSubtopics().find((t) => t.id === id)
}

export function loadSubtopicContent(id: string): SubtopicContent | null {
  const sub = getSubtopicById(id)
  if (!sub) return null
  const file = path.join(contentDir, `${id}.json`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, 'utf-8')
  const data = JSON.parse(raw)
  return {
    id,
    strandId: sub.strandId,
    name: sub.name,
    ...data,
  }
}
