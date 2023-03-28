import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../utils/posts';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.tile}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    );
}

// ! getStaticPaths is a special function that Next.js will call at build time to generate the paths for the dynamic pages
export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths, // this contains the array of known paths return by getAllPostIds()
        fallback: false, // shows a 404 page if the path is not in the array of known paths
    };
}
// if fallback is true, then the paths that are not in the array of known paths will be generated at runtime
// if fallback is blocking, then new paths will be server-side rendered with getStaticProps and cached for future requests so it only happens once per path.

// ! getStaticProps is a special function that Next.js will call at build time to generate the props for the page
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}
