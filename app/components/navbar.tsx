import Link from "next/link"


export default function Navbar() {
  return (
    <nav style={{
      display: "flex",
      gap: "20px",
      padding: "20px",
      borderBottom: "1px solid #333",
      color: "white",
      min-height: "100vh"
    }}>
      <Link href="/">Home</Link>
      <Link href="/time">Server Time</Link>
      <Link href="/system">System Status</Link>
    </nav>
  )
}
