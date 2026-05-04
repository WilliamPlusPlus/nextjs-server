import { Suspense } from 'react'
import Editor from '../components/editor'
import styles from '../blog/page.module.css'

export default function EditorPage() {
  return (
    <main className={styles.page}>
      <Suspense fallback={<div style={{ color: 'white' }}>Loading editor...</div>}>
        <Editor />
      </Suspense>
    </main>
  )
}
