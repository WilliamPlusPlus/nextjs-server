import os from 'node:os'

function cpuAverage() {
  const cpus = os.cpus()

  let idle = 0
  let total = 0

  for (const cpu of cpus) {
    idle += cpu.times.idle
    total += cpu.times.user
      + cpu.times.nice
      + cpu.times.sys
      + cpu.times.idle
      + cpu.times.irq
  }

  return {
    idle: idle / cpus.length,
    total: total / cpus.length,
  }
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function GET() {
  const start = cpuAverage()
  await wait(250)
  const end = cpuAverage()

  const idleDiff = end.idle - start.idle
  const totalDiff = end.total - start.total

  const usage = totalDiff > 0 ? (1 - idleDiff / totalDiff) * 100 : 0

  return Response.json({
    cpuUsagePercent: Number(usage.toFixed(2)),
    cpuCount: os.cpus().length,
    loadAverage: os.loadavg(),
    hostname: os.hostname(),
  })
}
