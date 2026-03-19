"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from "./navbar.module.css"

export default function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home", active: pathname === "/" },
    { href: "/time", label: "Server Time", active: pathname === "/time" },
    { href: "/blog", label: "Blog", active: pathname === "/blog" || pathname.startsWith("/blog/") },
  ]

  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        {links.map((link) => (
          <Link
            key={link.href}
            className={`${styles.link} ${link.active ? styles.active : ""}`}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
