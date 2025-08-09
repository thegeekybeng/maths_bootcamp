

import { LessonClient } from './LessonClient'
import topics from '../../../data/topics/psle_topics.json'
import { loadSubtopicContent } from '../../../lib/contentLoader'

export default function SubtopicPage({ params }: { params: { subtopicId: string } }) {
  const { subtopicId } = params
  // ...existing code...
  // Find meta info from topics.json
  const strands = (topics as any).strands as Array<{ id: string; name: string; subtopics: any[] }>
  const meta = strands.flatMap((s) => s.subtopics.map((t) => ({ ...t, strandId: s.id, strandName: s.name }))).find((t) => t.id === subtopicId)
  const content = loadSubtopicContent(subtopicId)
  if (!meta || !content) {
    return (
      <main style={{ padding: '1.5rem' }}>
        <h1>Topic not found</h1>
        <p>Please pick another topic from the home page.</p>
      </main>
    )
  }
  return <LessonClient content={{ ...content, name: meta.name }} />
}
