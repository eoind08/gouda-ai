// app/blog/[slug]/page.tsx
import { getAllPostSlugs, getPostData } from '../../../lib/posts';
import MarkdownRenderer from '../../components/MarkdownRenderer'; // Now MarkdownRenderer.tsx
import Tag from '../../components/Tag'; // Now Tag.tsx
import Link from 'next/link';
import ImageWithFallback from '../../components/ImageWithFallback';

// Define the interface for the component's parameters
interface PostPageParams {
  params: {
    slug: string;
  };
}

// Function to generate static params for all blog posts at build time
// This tells Next.js which slugs (paths) to pre-render.
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs; // Returns an array like [{ slug: 'post-1' }, { slug: 'post-2' }]
}

// Function to generate metadata for each static page
// This allows dynamic titles and descriptions for SEO.
export async function generateMetadata({ params }: PostPageParams) {
  const postData = await getPostData(params.slug);
  return {
    title: postData.title,
    description: postData.description || `Read "${postData.title}" on the Gouda AI blog.`,
  };
}

/**
 * Individual blog post page component.
 * Fetches the specific post data based on the slug from the URL.
 * @param {PostPageParams} props - Component props.
 * @param {Object} props.params - Contains route parameters, e.g., { slug: 'your-first-post' }.
 */
export default async function Post({ params }: PostPageParams) {
  // Fetch the data for the specific post using the slug
  const postData = await getPostData(params.slug);

  // Fallback image in case the provided image path is missing or broken
  const fallbackImage = "/gouda.png"; // Ensure this image exists in your public/images folder

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[f5f0e8]"
    style={{
      backgroundImage: `url(${postData.image || fallbackImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',}}> 
      {/* Header Section */}
      <header className="bg-[#d7c3aa] text-white py-12 shadow-md">
        <div className="container mx-auto px-4 text-center">
          <Link href="/updates" className="text-[#64401e] hover:underline mb-4 inline-block">
            &larr; Back to Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            {postData.title}
          </h1>
          <p className="text-lg opacity-90 mb-2">
            By {postData.author} on {new Date(postData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {postData.tags && postData.tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Featured Image
        {postData.image && (
          <div className="relative w-full h-64 md:h-80 lg:h-96 mb-8 rounded-lg shadow-lg overflow-hidden">
            <ImageWithFallback
              src={postData.image || fallbackImage}
              alt={postData.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="100vw"
              className="rounded-lg"
            />
          </div>
        )}  */}

        {/* Markdown Content */}
        <article className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-black">
          <MarkdownRenderer contentHtml={postData.contentHtml} />
        </article>
      </main>
    </div>
  );
}
