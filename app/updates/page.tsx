// app/updates/page.tsx

import { getSortedPostsData } from '../../lib/posts';
import BlogPostCard from '../components/BlogPostCard';
import Link from 'next/link';

interface UpdatesPageProps {
  searchParams: {
    category?: string;
  };
}

export default function UpdatesPage({ searchParams }: UpdatesPageProps) {
  const allUpdatesData = getSortedPostsData();

  // Normalise the URL parameter
  const category = searchParams.category?.toLowerCase() || 'all';

  // Filter posts based on their tags
  const filteredUpdates =
    category === 'all'
      ? allUpdatesData
      : allUpdatesData.filter((post) =>
          post.tags?.some(
            (tag) => tag.toLowerCase() === category
          )
        );

  // First post in the filtered set becomes the featured post
  const featuredPost = filteredUpdates[0];

  // Everything else goes into the archive
  const remainingPosts = filteredUpdates.slice(1);

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Releases', value: 'release' },
    { label: 'Updates', value: 'update' },
    { label: 'Research', value: 'research' },
  ];

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#3d2918]">

      {/* =========================================================
          GOOGLE ADSENSE
      ========================================================= */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2629682720782125"
        crossOrigin="anonymous"
      />


      {/* =========================================================
          HERO
      ========================================================= */}
      <header className="relative overflow-hidden bg-[#d7c3aa]">

        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-[#879574]/30" />

        <div className="pointer-events-none absolute -right-4 -top-8 h-40 w-40 rounded-full border border-[#879574]/20" />

        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">

          <div className="max-w-3xl">

            {/* Section label */}
            <div className="mb-5 flex items-center gap-3">

              <span className="h-2 w-2 rounded-full bg-[#879574]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#64401e]/65">
                Gouda AI · Journal
              </span>

            </div>

            {/* Title */}
            <h1
              className="
                text-5xl
                font-extrabold
                leading-[0.95]
                tracking-tight
                text-[#3d2918]
                md:text-7xl
              "
            >
              Updates
            </h1>

            <p
              className="
                mt-6
                max-w-2xl
                text-lg
                leading-relaxed
                text-[#64401e]/75
                md:text-xl
              "
            >
              Research, releases, experiments, and the work behind
              Gouda AI.
            </p>

          </div>

          {/* Publication count */}
          <div
            className="
              mt-10
              flex
              items-center
              gap-3
              text-xs
              font-medium
              uppercase
              tracking-[0.15em]
              text-[#64401e]/50
            "
          >
            <span>{filteredUpdates.length} publications</span>

            <span>•</span>

            <span>Gouda AI</span>
          </div>

        </div>
      </header>


      {/* =========================================================
          MAIN
      ========================================================= */}
      <main className="mx-auto max-w-6xl px-6 py-14 md:py-20">


        {/* =======================================================
            FILTER BAR
        ======================================================= */}
        <div
          className="
            mb-12
            flex
            flex-col
            gap-5
            border-b
            border-[#64401e]/10
            pb-6
            md:flex-row
            md:items-center
            md:justify-between
          "
        >

          <div className="flex items-center gap-3">

            <span className="text-sm font-semibold text-[#3d2918]">
              Browse
            </span>

            <span className="h-1 w-1 rounded-full bg-[#879574]" />

            <span className="text-sm text-[#64401e]/55">
              {category === 'all'
                ? 'All updates'
                : `${category.charAt(0).toUpperCase()}${category.slice(1)}`}
            </span>

          </div>


          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2">

            {filters.map((filter) => {
              const isActive = category === filter.value;

              return (
                <Link
                  key={filter.value}
                  href={
                    filter.value === 'all'
                      ? '/updates'
                      : `/updates?category=${filter.value}`
                  }
                  className={`
                    rounded-full
                    px-4
                    py-1.5
                    text-xs
                    font-semibold
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? 'bg-[#879574] text-[#fffdf9] shadow-sm'
                        : `
                          border
                          border-[#64401e]/15
                          bg-[#fffdf9]/60
                          text-[#64401e]/70
                          hover:border-[#879574]/50
                          hover:bg-[#879574]
                          hover:text-[#fffdf9]
                          hover:shadow-sm
                        `
                    }
                  `}
                >
                  {filter.label}
                </Link>
              );
            })}

          </div>

        </div>


        {/* =======================================================
            NO RESULTS
        ======================================================= */}
        {!featuredPost && (
          <div className="rounded-2xl border border-[#64401e]/10 bg-[#fffdf9] px-6 py-16 text-center">

            <div className="mb-3 text-3xl">
              ◌
            </div>

            <h2 className="text-xl font-bold text-[#3d2918]">
              No publications found
            </h2>

            <p className="mt-2 text-sm text-[#64401e]/60">
              There are currently no posts in this category.
            </p>

            <Link
              href="/updates"
              className="
                mt-6
                inline-block
                rounded-full
                bg-[#879574]
                px-5
                py-2
                text-sm
                font-semibold
                text-[#fffdf9]
                transition-opacity
                hover:opacity-80
              "
            >
              View all updates
            </Link>

          </div>
        )}


        {/* =======================================================
            LATEST UPDATE
        ======================================================= */}
        {featuredPost && (
          <section className="mb-20">

            <div className="mb-7 flex items-end justify-between">

              <div>

                <div
                  className="
                    mb-2
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#879574]
                  "
                >
                  Latest
                </div>

                <h2
                  className="
                    text-3xl
                    font-bold
                    tracking-tight
                    text-[#3d2918]
                    md:text-4xl
                  "
                >
                  Recent work
                </h2>

              </div>

              <div className="hidden text-sm text-[#64401e]/45 md:block">
                01 / {filteredUpdates.length}
              </div>

            </div>


            {/* Featured card */}
            <Link
              href={`/updates/${featuredPost.slug}`}
              className="
                group
                block
                overflow-hidden
                rounded-2xl
                border
                border-[#64401e]/10
                bg-[#fffdf9]
                shadow-[0_10px_40px_rgba(70,45,20,0.05)]
                transition
                duration-300
                hover:-translate-y-1
                hover:border-[#879574]/40
                hover:shadow-[0_16px_50px_rgba(70,45,20,0.10)]
              "
            >

              <div className="grid md:grid-cols-[1.35fr_1fr]">

                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[#eee5d6] md:aspect-auto md:min-h-[360px]">

                  {featuredPost.image ? (
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition
                        duration-500
                        group-hover:scale-[1.025]
                      "
                    />
                  ) : (
                    <div className="h-full w-full bg-[#eee5d6]" />
                  )}

                </div>


                {/* Content */}
                <div
                  className="
                    flex
                    flex-col
                    justify-between
                    p-7
                    md:p-10
                  "
                >

                  <div>

                    {/* Tags */}
                    <div className="mb-5 flex flex-wrap gap-2">

                      {featuredPost.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="
                            rounded-full
                            bg-[#879574]/12
                            px-3
                            py-1
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-wide
                            text-[#667454]
                          "
                        >
                          {tag}
                        </span>
                      ))}

                    </div>


                    {/* Title */}
                    <h3
                      className="
                        text-3xl
                        font-bold
                        leading-tight
                        tracking-tight
                        text-[#3d2918]
                        transition-colors
                        group-hover:text-[#667454]
                        md:text-4xl
                      "
                    >
                      {featuredPost.title}
                    </h3>


                    {/* Description */}
                    <p
                      className="
                        mt-5
                        leading-relaxed
                        text-[#64401e]/65
                      "
                    >
                      {featuredPost.description}
                    </p>

                  </div>


                  {/* Metadata */}
                  <div className="mt-8">

                    <div
                      className="
                        mb-4
                        h-px
                        w-full
                        bg-[#64401e]/10
                      "
                    />

                    <div className="flex items-center justify-between">

                      <span className="text-xs text-[#64401e]/50">
                        {new Date(
                          featuredPost.date
                        ).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>

                      <span
                        className="
                          text-sm
                          font-semibold
                          text-[#667454]
                          transition-transform
                          group-hover:translate-x-1
                        "
                      >
                        Read update →
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </Link>

          </section>
        )}


        {/* =======================================================
            ARCHIVE
        ======================================================= */}
        {remainingPosts.length > 0 && (
          <section>

            <div className="mb-8 flex items-end justify-between">

              <div>

                <div
                  className="
                    mb-2
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#879574]
                  "
                >
                  Archive
                </div>

                <h2
                  className="
                    text-3xl
                    font-bold
                    tracking-tight
                    text-[#3d2918]
                    md:text-4xl
                  "
                >
                  More from Gouda
                </h2>

              </div>

              <div className="hidden text-sm text-[#64401e]/45 md:block">
                {remainingPosts.length} updates
              </div>

            </div>


            {/* Archive grid */}
            <div
              className="
                grid
                grid-cols-1
                gap-6
                md:grid-cols-2
                lg:grid-cols-3
              "
            >

              {remainingPosts.map((post) => (
                <div
                  key={post.slug}
                  className="
                    group
                    rounded-2xl
                    transition
                    duration-300
                    hover:-translate-y-1
                  "
                >
                  <BlogPostCard
                    slug={`updates/${post.slug}`}
                    title={post.title}
                    date={post.date}
                    image={post.image}
                    tags={post.tags}
                    description={post.description}
                  />
                </div>
              ))}

            </div>

          </section>
        )}


        {/* =======================================================
            FOOTER
        ======================================================= */}
        <div
          className="
            mt-20
            flex
            items-center
            justify-between
            border-t
            border-[#64401e]/10
            pt-8
          "
        >

          <span
            className="
              text-xs
              uppercase
              tracking-[0.15em]
              text-[#64401e]/40
            "
          >
            Gouda AI
          </span>

          <Link
            href="/"
            className="
              text-sm
              font-semibold
              text-[#64401e]
              transition-colors
              hover:text-[#667454]
            "
          >
            Back to Gouda →
          </Link>

        </div>

      </main>
    </div>
  );
}