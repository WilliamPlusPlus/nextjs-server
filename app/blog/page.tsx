import { readdir, readFile } from 'fs/promises'
import path from 'path'
import Link from 'next/link'
import styles from './page.module.css'

type Post = {
  slug: string
  title: string
}

export default async function BlogPage() {
  const postsDir = path.join(process.cwd(), 'posts')
  const files = await readdir(postsDir)

  const posts: Post[] = await Promise.all(
    files
      .filter((file) => file.endsWith('.md'))
      .map(async (file) => {
        const slug = file.replace(/\.md$/, '')
        const markdown = await readFile(path.join(postsDir, file), 'utf8')
        const titleMatch = markdown.match(/^#\s+(.+)$/m)

        return {
          slug,
          title: titleMatch?.[1] ?? slug,
        }
      })
  )

  return (
    <main className={styles.page}>
      <section className={styles.article}>
        <h1>Blog</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
