import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Home.module.css'
//import CustomLink from '../../components/CustomLink';

const POSTS_PATH = path.join(process.cwd(), 'content/blog');

const postsFilePaths = fs
  .readdirSync(POSTS_PATH)
  .filter(path => /\.mdx?$/.test(path));

const components = {
  a: Link,
  Head,
};

export default function mdxPage({ source, data, posts }) {
  const formattedPages = posts.map(post => ({
    title: post.data.title,
    href: `/blog/${post.filePath.replace(/\.mdx?$/, '')}`,
  }));

  const content = hydrate(source, { components });

  return (
    <main className={styles.main}>
      <h1>{data.title}</h1>
      <article>{content}</article>
      <p>
        <em>{data.published.toDateString()}</em>
      </p>
      <p>
        <Link href="/blog">
          <a>Back to blog list</a>
        </Link>
      </p>
    </main>
  );
}

export async function getStaticProps({ params }) {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);
  const { content, data } = matter(source);

  const mdxSource = await renderToString(content, {
    components,
    scope: data,
  });

  const posts = postsFilePaths.map(filePath => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { data } = matter(source);
    return {
      data,
      filePath,
    };
  });

  return {
    props: {
      source: mdxSource,
      data: data,
      posts,
    },
  };
}

export const getStaticPaths = async () => {
  const paths = postsFilePaths
    .map(path => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map(slug => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};