import Head from 'next/head';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';
import { extractImgSrc } from '@plaiceholder/tailwindcss/utils';
import { cx } from '../styles';
import styles from '../styles/Home.module.css';

export default function Home({ images, tailwindImages }) {
  const { plaiceholder, img } = tailwindImages;
  return (
    <div className={styles.container}>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
        <title>Next Plaiceholder Demo</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <span>Next</span> Plaiceholder Demo
        </h1>

        <div className={styles.grid}>
          {images &&
            images.map((imageProps) => (
              <div key={imageProps.src} className={styles.card}>
                <Image {...imageProps} layout="responsive" placeholder="blur" />
                <h2>{imageProps.title}</h2>
              </div>
            ))}

          <div className={styles.card}>
            <div className={cx(plaiceholder)}>
              <Image {...img} alt="A Cat" layout="responsive" />
            </div>

            <h2>Tailwind Style Image</h2>
          </div>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const imagePaths = [
    {
      path: '/images/dog.jpg',
      title: 'Static Base 64 Image',
      alt: 'A Dog on the couch',
    },
    {
      path: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1974&q=80',
      title: 'Extarnal Path Image',
      alt: 'A Dog',
    },
  ];
  const plaiceholder = 'plaiceholder-[/images/cat.jpg]';
  const { img } = await getPlaiceholder(extractImgSrc(plaiceholder));

  const images = await Promise.all(
    imagePaths.map(async (src) => {
      const { alt, path, title } = src;
      const { base64, img } = await getPlaiceholder(path);

      return { ...img, blurDataURL: base64, title, alt };
    })
  );

  return {
    props: {
      images,
      tailwindImages: {
        plaiceholder,
        img,
      },
    },
  };
};
