'use client'
import CardPokemon from './components/cardpokemon/CardPokemon'
import styles from './page.module.css'




export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container_card}>
        < CardPokemon />
      </div>
    </main>
  )
}
