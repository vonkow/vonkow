import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return <>
    <Head>
      <title>vonkow</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={styles.main}>
      <h1>vonkow</h1>
    </main>
  </>
}
