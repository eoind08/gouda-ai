// app/blog/[slug]/page.tsx

import { getAllPostSlugs, getPostData } from '../../../lib/posts';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import Tag from '../../components/Tag';
import ImageWithFallback from '../../components/ImageWithFallback';
import Link from 'next/link';

interface PostPageParams {
  params: {
    slug: string;
  };
}

// Generate all blog routes at build time
export async function generateStaticParams() {
  return getAllPostSlugs();
}

// Generate metadata for each post
export async function generateMetadata({ params }: PostPageParams) {
  const postData = await getPostData(params.slug);

  return {
    title: postData.title,
    description:
      postData.description ||
      `Read "${postData.title}" on the Gouda AI blog.`,
  };
}

export default async function Post({ params }: PostPageParams) {
  const postData = await getPostData(params.slug);

  const fallbackImage = '/gouda.png';

  const formattedDate = new Date(postData.date).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#2f2418]">

      {/* =========================================================
          HEADER
      ========================================================= */}
      <header className="border-b border-[#64401e]/10 bg-[#d7c3aa]">
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">

          {/* Back link */}
          <Link
            href="/updates"
            className="
              mb-8
              inline-flex
              items-center
              text-sm
              font-medium
              text-[#64401e]
              transition-opacity
              hover:opacity-60
            "
          >
            ← Back to Blog
          </Link>

          <div className="max-w-4xl">

            {/* Tags */}
            {postData.tags && postData.tags.length > 0 && (
              <div className="mb-5 flex flex-wrap gap-2">
                {postData.tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
            )}

            {/* Title */}
            <h1
              className="
                text-4xl
                font-extrabold
                leading-[1.05]
                tracking-tight
                text-[#3d2918]
                md:text-6xl
              "
            >
              {postData.title}
            </h1>

            {/* Author + date */}
            <div
              className="
                mt-6
                flex
                flex-wrap
                items-center
                gap-x-3
                gap-y-1
                text-sm
                text-[#64401e]/75
              "
            >
              <span>By {postData.author}</span>

              <span className="opacity-40">•</span>

              <span>{formattedDate}</span>
            </div>

          </div>
        </div>
      </header>


      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}
      <main className="mx-auto max-w-5xl px-6 py-12 md:py-16">


        {/* =======================================================
            FEATURED ILLUSTRATION
        ======================================================= */}
        {postData.image && (
          <figure className="mx-auto mb-16 max-w-3xl md:mb-20">

            {/* Image */}
            <div className="relative mx-auto aspect-[16/8] w-full">
              <ImageWithFallback
                src={postData.image || fallbackImage}
                alt={postData.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-contain"
              />
            </div>

            {/* Caption */}
            <figcaption
              className="
                mt-4
                text-center
                text-[10px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-[#64401e]/45
              "
            >
              Illustration · Gouda AI
            </figcaption>

          </figure>
        )}


        {/* =======================================================
            ARTICLE
        ======================================================= */}
        <article
          className="
            mx-auto
            max-w-3xl
            rounded-2xl
            border
            border-[#64401e]/10
            bg-[#fffdf9]
            px-6
            py-8
            shadow-[0_10px_40px_rgba(70,45,20,0.05)]
            md:px-12
            md:py-14
          "
        >
          <MarkdownRenderer contentHtml={postData.contentHtml} />
        </article>


        {/* =======================================================
            FOOTER NAVIGATION
        ======================================================= */}
        <div
          className="
            mx-auto
            mt-10
            max-w-3xl
            border-t
            border-[#64401e]/10
            pt-8
          "
        >
          <Link
            href="/updates"
            className="
              text-sm
              font-semibold
              text-[#64401e]
              transition-opacity
              hover:opacity-60
            "
          >
            ← Back to all posts
          </Link>
        </div>

      </main>
    </div>
  );
}