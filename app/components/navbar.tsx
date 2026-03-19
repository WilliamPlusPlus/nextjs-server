import Link from "next/link"


export default function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      padding: "20px",
      borderBottom: "1px solid #333",
      color: "white"
    }}>
      <Link href="/">Home</Link>
      <Link href="/time">Server Time</Link>
      <Link href="/system">System Status</Link>
    </nav>
  )
}
