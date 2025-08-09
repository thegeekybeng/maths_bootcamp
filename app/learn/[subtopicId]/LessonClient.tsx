"use client";
import { useState, useEffect } from 'react';
import type { SubtopicContent } from '../../../types/content';


export function LessonClient({ content }: { content: SubtopicContent }) {
  const [practiceState, setPracticeState] = useState<{ [id: string]: { value: string; attempts: number; status: 'pending' | 'correct' | 'failed' } }>({})
  const [testState, setTestState] = useState<{ [id: string]: { value: string; attempts: number; status: 'pending' | 'correct' | 'failed' } }>({})
  const [testAttempt, setTestAttempt] = useState(0)
  const [testComplete, setTestComplete] = useState(false)
  const [testPerfect, setTestPerfect] = useState(false)

  function extractCorrectAnswer(correct: string | undefined, answerSteps?: string[]) {
    let correctAnswer = ''
    if (typeof correct === 'string' && correct.length > 0) {
      correctAnswer = correct
    } else if (Array.isArray(answerSteps) && answerSteps.length > 0) {
      const lastStep = answerSteps[answerSteps.length - 1]
      const match = lastStep.match(/([0-9]+\s+[0-9]+\/[0-9]+|[0-9]+\/[0-9]+|[0-9]+)\.?$/)
      correctAnswer = match ? match[1].trim() : lastStep.trim()
    }
    return correctAnswer
  }

  function handlePracticeInput(qid: string, answer: string, correct: string | undefined, answerSteps?: string[]) {
    setPracticeState((prev) => {
      const prevEntry = prev[qid] || { value: '', attempts: 0, status: 'pending' }
      if (prevEntry.status !== 'pending') return prev
      const correctAnswer = extractCorrectAnswer(correct, answerSteps)
      const isCorrect = answer.trim().replace(/\s+/g, '').toLowerCase() === correctAnswer.trim().replace(/\s+/g, '').toLowerCase()
      const attempts = prevEntry.attempts + 1
      let status: 'pending' | 'correct' | 'failed' = 'pending'
      if (isCorrect) status = 'correct'
      else if (attempts >= 3) status = 'failed'
      return {
        ...prev,
        [qid]: { value: answer, attempts, status }
      }
    })
  }

  function handleTestInput(qid: string, answer: string, correct: string | undefined, answerSteps?: string[]) {
    setTestState((prev) => {
      const prevEntry = prev[qid] || { value: '', attempts: 0, status: 'pending' }
      if (prevEntry.status !== 'pending') return prev
      const correctAnswer = extractCorrectAnswer(correct, answerSteps)
      const isCorrect = answer.trim().replace(/\s+/g, '').toLowerCase() === correctAnswer.trim().replace(/\s+/g, '').toLowerCase()
      const attempts = prevEntry.attempts + 1
      let status: 'pending' | 'correct' | 'failed' = 'pending'
      if (isCorrect) status = 'correct'
      else if (attempts >= 3) status = 'failed'
      return {
        ...prev,
        [qid]: { value: answer, attempts, status }
      }
    })
  }

  // Section test logic (all inside component body)
  const allPracticeCorrect = Array.isArray(content.practice) && content.practice.length > 0 && content.practice.every((q: any) => (practiceState[q.id]?.status === 'correct'));
  const sectionTest = (content as any).section_test as any[] | undefined;
  const testQuestions = sectionTest || [];
  const testInProgress = allPracticeCorrect && !testPerfect && testAttempt < 3;
  const testFailed = testAttempt >= 3 && !testPerfect;

  // Effect: Section Test completion logic
  useEffect(() => {
    if (testInProgress && testQuestions.length > 0) {
      if (testQuestions.every((q: any) => testState[q.id]?.status === 'correct') && !testPerfect) {
        setTestPerfect(true);
        setTestComplete(true);
      } else if (testQuestions.every((q: any) => testState[q.id]?.status) && !testQuestions.every((q: any) => testState[q.id]?.status === 'correct') && !testComplete) {
        setTestComplete(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testInProgress, testQuestions, testState, testPerfect, testComplete]);

  function handleTestRetry() {
    setTestState({})
    setTestComplete(false)
    setTestAttempt(a => a + 1)
  }

  return (
    <main style={{ padding: '1.5rem', WebkitUserSelect: 'text', userSelect: 'text' }}>
      <h1>{content.name}</h1>
      <p style={{ opacity: 0.85 }}>{content.overview}</p>

      <section>
        <h2>Objectives</h2>
        <ul>
          {content.objectives.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Quick Refresher</h2>
        <p>{content.refresher}</p>
      </section>

      {(['F','S','T'] as const).map((lvl) => {
        const ex = content.examples?.[lvl]
        if (!ex || ex.length === 0) return null
        return (
          <section key={lvl}>
            <h2>Examples ({lvl})</h2>
            {ex.map((e, idx) => (
              <div key={idx} style={{ marginBottom: '1rem' }}>
                <strong>{e.title}</strong>
                <ol>
                  {e.steps?.map((s, j) => (
                    <li key={j}>{s}</li>
                  ))}
                </ol>
              </div>
            ))}
          </section>
        )
      })}

      <section>
        <h2>Practice</h2>
        <ol>
          {content.practice.map((q) => {
            const state = practiceState[q.id] || { value: '', attempts: 0, status: 'pending' }
            const showHints = state.attempts >= 2 && state.status === 'pending' && q.hints && q.hints.length > 0
            const showAnswer = state.status === 'correct' || state.status === 'failed'
            return (
              <li key={q.id} style={{ marginBottom: '1.25rem' }}>
                <div>{q.stem}</div>
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    const form = e.target as HTMLFormElement
                    const input = form.elements.namedItem('answer') as HTMLInputElement
                    handlePracticeInput(q.id, input.value, q.answer, q.answer_steps)
                  }}
                  style={{ marginTop: 6 }}
                >
                  <input
                    type="text"
                    name="answer"
                    autoComplete="off"
                    disabled={showAnswer}
                    value={state.value}
                    onChange={e => setPracticeState(prev => ({ ...prev, [q.id]: { ...state, value: e.target.value } }))}
                    style={{ marginRight: 8, minWidth: 80 }}
                  />
                  <button type="submit" disabled={showAnswer || !state.value.trim()}>
                    {showAnswer ? 'Done' : state.attempts === 0 ? 'Check' : 'Try again'}
                  </button>
                  {state.status === 'correct' && <span style={{ color: 'green', marginLeft: 10 }}>Correct!</span>}
                  {state.status === 'failed' && <span style={{ color: 'red', marginLeft: 10 }}>No more attempts</span>}
                </form>
                {showHints && (
                  <div style={{ marginTop: 4 }}>
                    <p style={{ margin: 0 }}>Hints:</p>
                    <ul style={{ margin: 0 }}>
                      {(q.hints || []).map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {showAnswer && (
                  <div style={{ marginTop: 4 }}>
                    <p style={{ margin: 0 }}>Answer:</p>
                    {Array.isArray(q.answer_steps) ? (
                      <ol style={{ margin: 0, paddingLeft: 20 }}>
                        {q.answer_steps.map((step: string, i: number) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    ) : (
                      <span>{q.answer}</span>
                    )}
                  </div>
                )}
              </li>
            )
          })}
        </ol>
      </section>

      {/* Section Test UI */}
      {allPracticeCorrect && (
        <section style={{ marginTop: 32, borderTop: '2px solid #eee', paddingTop: 24 }}>
          <h2>Section Test</h2>
          {testPerfect ? (
            <div style={{ color: 'green', fontWeight: 600 }}>Congratulations! You passed the section test perfectly.</div>
          ) : testFailed ? (
            <div style={{ color: 'red', fontWeight: 600 }}>
              You have used all 3 attempts. Please review the practice questions and try again later.
            </div>
          ) : testInProgress ? (
            <>
              <div style={{ marginBottom: 12 }}>Attempt {testAttempt + 1} of 3</div>
              <ol>
                {testQuestions.map((q) => {
                  const state = testState[q.id] || { value: '', attempts: 0, status: 'pending' }
                  const showAnswer = state.status === 'correct' || state.status === 'failed'
                  return (
                    <li key={q.id} style={{ marginBottom: '1.25rem' }}>
                      <div>{q.stem}</div>
                      <form
                        onSubmit={e => {
                          e.preventDefault()
                          const form = e.target as HTMLFormElement
                          const input = form.elements.namedItem('answer') as HTMLInputElement
                          handleTestInput(q.id, input.value, q.answer, q.answer_steps)
                        }}
                        style={{ marginTop: 6 }}
                      >
                        <input
                          type="text"
                          name="answer"
                          autoComplete="off"
                          disabled={showAnswer}
                          value={state.value}
                          onChange={e => setTestState(prev => ({ ...prev, [q.id]: { ...state, value: e.target.value } }))}
                          style={{ marginRight: 8, minWidth: 80 }}
                        />
                        <button type="submit" disabled={showAnswer || !state.value.trim()}>
                          {showAnswer ? 'Done' : state.attempts === 0 ? 'Check' : 'Try again'}
                        </button>
                        {state.status === 'correct' && <span style={{ color: 'green', marginLeft: 10 }}>Correct!</span>}
                        {state.status === 'failed' && <span style={{ color: 'red', marginLeft: 10 }}>No more attempts</span>}
                      </form>
                      {showAnswer && (
                        <div style={{ marginTop: 4 }}>
                          <p style={{ margin: 0 }}>Answer:</p>
                          {Array.isArray(q.answer_steps) ? (
                            <ol style={{ margin: 0, paddingLeft: 20 }}>
                              {q.answer_steps.map((step, i) => (
                                <li key={i}>{step}</li>
                              ))}
                            </ol>
                          ) : (
                            <span>{q.answer}</span>
                          )}
                        </div>
                      )}
                    </li>
                  )
                })}
              </ol>
              {testComplete && !testPerfect && (
                <div style={{ marginTop: 16 }}>
                  <button onClick={handleTestRetry} disabled={testAttempt >= 2}>
                    Retry Test ({3 - testAttempt - 1} attempts left)
                  </button>
                </div>
              )}
            </>
          ) : null}
        </section>
      )}

      <section>
        <h2>Common Mistakes</h2>
        <ul>
          {content.common_mistakes.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Reflect</h2>
        <ul>
          {content.reflection.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </section>
    </main>

  )
}
