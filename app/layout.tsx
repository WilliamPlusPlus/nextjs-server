export const metadata = {
  title: "NextJS App",
  description: "Example application"
}


import "./global.css"
import Navbar from "./components/navbar"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-us">
    	<body className="gradient-bg app-body">
        <Navbar />
	<main className="app-main">{children}</main>
      </body>
  </html>
  )
}
