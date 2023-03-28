import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'Oliver Anthony';
export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children, home }) {
    return (
    <div className={styles.container}>
        <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
        />
        <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <header className={styles.header}>
        
        {/* If homepage - bigger image and h1 tag - else smaller image and h2 tag */}
        {home ? (
            <>
            <Image
                priority
                src="/images/profile.jpeg"
                className={utilStyles.borderCircle}
                height={144}
                width={144}
                alt=""
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
            </>
        ) : (
            <>
            <Link href="/">
                <Image
                priority
                src="/images/profile.jpeg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt=""
                />
            </Link>
            <h2 className={utilStyles.headingLg}>
                <Link href="/" className={utilStyles.colorInherit}>
                {name}
                </Link>
            </h2>
            </>
        )}
        </header>

        {/* This is where the content of the page will be rendered */}
        <main>{children}</main>

        {/* The footer is only rendered if the page is not the home page */}
        {!home && (
        <div className={styles.backToHome}>
            <Link href="/">← Back to home</Link>
        </div>
        )}
    </div>
    );
}
