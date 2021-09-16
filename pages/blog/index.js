import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_PATH = path.join(process.cwd(), 'content/blog');

const postsFilePaths = fs
  .readdirSync(POSTS_PATH)
  .filter(path => /\.mdx?$/.test(path));

export default function Home({ posts }) {
  return <>
    <Head>
      <title>Blahg</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={styles.main}>
      <h1>Blahg</h1>
      <ul>
      {posts.map(post => (
        <li>
          <Link href={post.href}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
      </ul>
      <p>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </p>
    </main>
  </>
}

export async function getStaticProps({ params }) {
  const posts = postsFilePaths.map(filePath => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { data } = matter(source);
    return {
      href: `/blog/${filePath.replace(/\.mdx?$/, '')}`,
      ...data
    };
  });

  // todo order by published

  return { props: { posts } };
}