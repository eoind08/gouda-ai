// app/updates/page.tsx
import { getSortedPostsData, PostMetadata } from '../../lib/posts';
import BlogPostCard from '../components/BlogPostCard';
import Link from 'next/link';

/**
 * The main Updates listing page component.
 * This component fetches all sorted blog post data (which will serve as updates) at build time.
 */
export default function UpdatesPage() {
  // Fetch blog post data. Assuming your 'updates' are also stored as blog posts
  // in the 'posts' directory, this function will retrieve them.
  const allUpdatesData = getSortedPostsData();

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#f5f0e8]">
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2629682720782125"
     crossOrigin="anonymous"></script>
      {/* Header Section - Styled similarly to the blog page for consistency */}
      <header className="bg-[#d7c3aa] text-[#64401e] py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-4 animate-fade-in-up">
            Gouda AI Updates
          </h1>
          <p className="text-xl opacity-90">
            Keep up with our latest features, announcements, and improvements.
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-4xl font-bold text-center mb-10 text-[#64401e]">
            Recent Announcements
          </h2>
          {/* Grid for update cards (using BlogPostCard) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allUpdatesData.map((post) => (
              <BlogPostCard
                key={post.slug}
                slug={`updates/${post.slug}`} // Important: Link to the updates dynamic route
                title={post.title}
                date={post.date}
                image={post.image}
                tags={post.tags}
                description={post.description}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
