import Link from 'next/link';
import styles from '@/styles/BlogCard.module.css';

export default function BlogPost({
  title,
  author,
  coverPhoto,
  datePublished,
  slug,
}) {
  return (
    <div class={styles.container}>
      <div class={styles.square}>
        <img src={coverPhoto.url} className={styles.mask} />
        <div class={styles.title}>Is Apple a Design Company?</div>
        <p className={styles.text}>
          Apple is more than a tech company; it became a culture unto itself, a
          passion of most of people and the birthplace of the world’s most
          revolutionized products.
        </p>
        <Link href={'/posts/' + slug} className={styles.button}>
          Read More
        </Link>
      </div>
    </div>
  );
}
