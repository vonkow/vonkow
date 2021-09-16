import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Link from 'next/link'

export default function Home() {
  return <>
    <Head>
      <title>vonkow</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={styles.main}>
      <h1>vonkow</h1>
      <p>My name is Caz. I am fascinated by sociotechnical systems. I am not sure why.</p>
      <p>
        Sometimes I write things or take pictures and put them <Link href="/blog"><a>here</a></Link>.
      </p>
    </main>
  </>
}
