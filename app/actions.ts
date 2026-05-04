'use server'

import { readdir, readFile, writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { revalidatePath } from 'next/cache'

const POSTS_DIR = path.join(process.cwd(), 'posts')
const JOURNALS_DIR = path.join(process.cwd(), 'journals')

async function ensureDir(dir: string) {
  try {
    await mkdir(dir, { recursive: true })
  } catch (err) {
    // Already exists or other error
  }
}

export async function saveMarkdown(type: 'posts' | 'journals', filename: string, content: string) {
  const dir = type === 'posts' ? POSTS_DIR : JOURNALS_DIR
  await ensureDir(dir)
  
  const filePath = path.join(dir, filename.endsWith('.md') ? filename : `${filename}.md`)
  await writeFile(filePath, content, 'utf8')
  
  revalidatePath('/blog')
  revalidatePath('/journal')
  return { success: true }
}

export async function getMarkdownFiles(type: 'posts' | 'journals') {
  const dir = type === 'posts' ? POSTS_DIR : JOURNALS_DIR
  await ensureDir(dir)
  
  const files = await readdir(dir)
  return files.filter(f => f.endsWith('.md'))
}

export async function getMarkdownContent(type: 'posts' | 'journals', filename: string) {
  const dir = type === 'posts' ? POSTS_DIR : JOURNALS_DIR
  const filePath = path.join(dir, filename.endsWith('.md') ? filename : `${filename}.md`)
  try {
    return await readFile(filePath, 'utf8')
  } catch {
    return null
  }
}
