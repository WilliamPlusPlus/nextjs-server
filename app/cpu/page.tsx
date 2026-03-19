'use client'

import { useEffect, useState } from 'react'

import '../global.css'

import styles from '../components/page-styles.module.css'

type CpuData = {
  cpuUsagePercent: number
  cpuCount: number
  loadAverage: number[]
  hostname: string
}

export default function CpuPage() {
  const [data, setData] = useState<CpuData | null>(null)

  useEffect(() => {
    const fetchCpu = async () => {
      try {
        const res = await fetch('/api/cpu', { cache: 'no-store' })
        const json = await res.json()
        setData(json)
      } catch (error) {
        console.error('Failed to fetch CPU data:', error)
      }
    }

    fetchCpu()
    const interval = setInterval(fetchCpu, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className={styles.centeredContent}>
      <h1>Server CPU Usage</h1>

      {data ? (
        <>
          <p><strong>Usage:</strong> {data.cpuUsagePercent}%</p>
          <p><strong>CPU Cores:</strong> {data.cpuCount}</p>
          <p><strong>Hostname:</strong> {data.hostname}</p>
          <p>
            <strong>Load Average:</strong>{' '}
            {data.loadAverage.map((n) => n.toFixed(2)).join(', ')}
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  )
}
