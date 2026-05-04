import { readFile } from 'fs/promises'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { remark } from 'remark'
import html from 'remark-html'
import styles from '../../blog/page.module.css'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function JournalEntryPage({ params }: Props) {
  const { slug } = await params
  const filePath = path.join(process.cwd(), 'journals', `${slug}.md`)

  let markdown: string

  try {
    markdown = await readFile(filePath, 'utf8')
  } catch {
    notFound()
  }

  const processed = await remark().use(html).process(markdown)
  const contentHtml = processed.toString()

  return (
    <main className={styles.page}>
      <div className={styles.postLayout}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <Link href="/journal" className={styles.backLink} style={{ margin: 0 }}>
            <span className={styles.backChevron} aria-hidden="true">
              &lsaquo;
            </span>
            Back to Journal
          </Link>
          <Link href={`/editor?type=journals&file=${slug}`} className={styles.backLink} style={{ margin: 0 }}>
            Edit
          </Link>
        </div>
        <article
          className={styles.article}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </main>
  )
}
