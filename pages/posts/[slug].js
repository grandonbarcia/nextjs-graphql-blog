import styles from '../../styles/Slug.module.css';

import { GraphQLClient, gql } from 'graphql-request';

const graphcms = new GraphQLClient(
  'https://us-west-2.cdn.hygraph.com/content/cldmeipsv15gy01rq0daid6jt/master'
);

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      datePublished
      author {
        id
        name
        avatar {
          url
        }
      }

      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}

export default function BlogPost({ post }) {
  return (
    <section>
      <main className={styles.blog}>
        <div className={styles.title}>
          <h1>{post.title}</h1>
          <div className={styles.authdetails}>
            <img src={post.author.avatar.url} alt={post.author.name} />
            <div className={styles.authtext}>
              <h6>By {post.author.name} </h6>
              <h6 className={styles.date}>{post.datePublished}</h6>
            </div>
          </div>
        </div>
        <img
          className={styles.cover}
          src={post.coverPhoto.url}
          alt={post.title}
        />
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content.html }}
        ></div>
      </main>
    </section>
  );
}
