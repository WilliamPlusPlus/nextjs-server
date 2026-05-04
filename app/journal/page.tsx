import { readdir, readFile } from 'fs/promises'
import path from 'path'
import Link from 'next/link'
import styles from '../blog/page.module.css'

type JournalEntry = {
  slug: string
  title: string
  date?: string
}

export default async function JournalPage() {
  const journalsDir = path.join(process.cwd(), 'journals')
  
  // Ensure directory exists
  try {
    const files = await readdir(journalsDir)
    const entries: JournalEntry[] = await Promise.all(
      files
        .filter((file) => file.endsWith('.md'))
        .map(async (file) => {
          const slug = file.replace(/\.md$/, '')
          const markdown = await readFile(path.join(journalsDir, file), 'utf8')
          const titleMatch = markdown.match(/^#\s+(.+)$/m)
          const dateMatch = markdown.match(/^###\s+(.+)$/m)

          return {
            slug,
            title: titleMatch?.[1] ?? slug,
            date: dateMatch?.[1],
          }
        })
    )

    return (
      <main className={styles.page}>
        <section className={styles.article}>
          <h1>Journal</h1>
          {entries.length === 0 ? (
            <p>No journal entries yet. <Link href="/editor">Create one?</Link></p>
          ) : (
            <ul>
              {entries.map((entry) => (
                <li key={entry.slug}>
                  <Link href={`/journal/${entry.slug}`}>
                    {entry.title}
                    {entry.date ? ` - ${entry.date}` : ''}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div style={{ marginTop: '2rem' }}>
            <Link href="/editor" className={styles.backLink} style={{ margin: 0 }}>
               Write New Entry
            </Link>
          </div>
        </section>
      </main>
    )
  } catch (err) {
    return (
      <main className={styles.page}>
        <section className={styles.article}>
          <h1>Journal</h1>
          <p>No journal entries yet. <Link href="/editor">Create one?</Link></p>
        </section>
      </main>
    )
  }
}
