import { readFile } from 'fs/promises'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { remark } from 'remark'
import html from 'remark-html'
import styles from '../page.module.css'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const filePath = path.join(process.cwd(), 'posts', `${slug}.md`)

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
        <Link href="/blog" className={styles.backLink}>
          <span className={styles.backChevron} aria-hidden="true">
            &lsaquo;
          </span>
          Back to Blog
        </Link>
        <article
          className={styles.article}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </main>
  )
}
