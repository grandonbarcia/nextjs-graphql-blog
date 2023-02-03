import Link from 'next/link';

export default function BlogPost({
  title,
  author,
  coverPhoto,
  datePublished,
  slug,
}) {
  return (
    <div>

        <div>
          <img src={coverPhoto.url} />
        </div>

    </div>
  );
}
