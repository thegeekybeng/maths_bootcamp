import Link from 'next/link'
import topics from '../data/topics/psle_topics.json'

export default function Home() {
  const strands = (topics as any).strands || []
  return (
    <main
      style={{
        padding: '1.5rem',
        WebkitUserSelect: 'text',
        userSelect: 'text',
      }}
    >
      <h1>PSLE Maths Bootcamp</h1>
      <p>Friendly, mistake-friendly learning. Tap a topic to begin.</p>
      <section>
        {strands.map((s: any) => (
          <div key={s.id} style={{ marginTop: '1rem' }}>
            <h2 style={{ marginBottom: '0.5rem' }}>{s.name}</h2>
            <ul>
              {s.subtopics.map((t: any) => (
                <li key={t.id}>
                  <Link href={`/learn/${t.id}`}>{t.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  )
}
