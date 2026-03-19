import "./global.css"
import styles from "./components/page-styles.module.css"

export default function Page() {
  return (
    <main className={styles.centeredContent}>
      <section className={styles.glassPanel}>
        <h1>Hello!</h1>
        <p>This HTML is no longer in a separate file</p>
      </section>
    </main>
  )
}
