'use client'

import { useEffect, useState } from 'react'

export default function Page() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const fetchTime = async () => {
      const res = await fetch('/api/time')
      const data = await res.json()
      setTime(data.time)
    }

    fetchTime()
    const interval = setInterval(fetchTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <h1>Server Time</h1>
      <p>{time}</p>
    </div>
  )
}
