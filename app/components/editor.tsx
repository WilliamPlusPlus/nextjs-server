'use client'

import { useState, useEffect, useTransition } from 'react'
import { saveMarkdown, getMarkdownContent } from '../actions'
import styles from '../blog/page.module.css'
import editorStyles from './editor.module.css'
import { useSearchParams, useRouter } from 'next/navigation'

export default function Editor() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  
  const [type, setType] = useState<'posts' | 'journals'>('journals')
  const [filename, setFilename] = useState('')
  const [content, setContent] = useState('')
  const [preview, setPreview] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fileParam = searchParams.get('file')
    const typeParam = searchParams.get('type') as 'posts' | 'journals'
    
    if (fileParam) {
      setFilename(fileParam)
      if (typeParam) setType(typeParam)
      
      startTransition(async () => {
        const existingContent = await getMarkdownContent(typeParam || 'journals', fileParam)
        if (existingContent !== null) {
          setContent(existingContent)
        }
      })
    }
  }, [searchParams])

  const handleSave = async () => {
    if (!filename) {
      setMessage('Please enter a filename')
      return
    }
    
    setMessage('Saving...')
    const result = await saveMarkdown(type, filename, content)
    if (result.success) {
      setMessage('Saved successfully!')
      router.push(type === 'posts' ? `/blog/${filename}` : `/journal/${filename}`)
    } else {
      setMessage('Failed to save')
    }
  }

  return (
    <div className={editorStyles.container}>
      <div className={editorStyles.header}>
        <div className={editorStyles.controls}>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value as 'posts' | 'journals')}
            className={editorStyles.select}
          >
            <option value="journals">Journal Entry</option>
            <option value="posts">Blog Post</option>
          </select>
          <input 
            type="text" 
            placeholder="filename (no .md)" 
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            className={editorStyles.input}
          />
        </div>
        <div className={editorStyles.actions}>
          <button 
            onClick={() => setPreview(!preview)}
            className={editorStyles.button}
          >
            {preview ? 'Edit' : 'Preview'}
          </button>
          <button 
            onClick={handleSave}
            className={`${editorStyles.button} ${editorStyles.saveButton}`}
            disabled={isPending}
          >
            Save
          </button>
        </div>
      </div>
      
      {message && <p className={editorStyles.message}>{message}</p>}
      
      <div className={editorStyles.editorArea}>
        {preview ? (
          <div className={`${styles.article} ${editorStyles.preview}`}>
             <p style={{ fontStyle: 'italic', opacity: 0.7 }}>Preview Mode (Basic)</p>
             <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />
          </div>
        ) : (
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={editorStyles.textarea}
            placeholder="# Title&#10;&#10;Write your content here..."
          />
        )}
      </div>
    </div>
  )
}
