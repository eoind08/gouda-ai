// app/updates/page.tsx

import { getSortedPostsData } from '../../lib/posts'
import BlogPostCard from '../components/BlogPostCard'
import Link from 'next/link'

interface UpdatesPageProps {
  searchParams: {
    category?: string
  }
}

export default function UpdatesPage({ searchParams }: UpdatesPageProps) {
  const allUpdatesData = getSortedPostsData()

  const category = searchParams.category?.toLowerCase() || 'all'

  const filteredUpdates =
    category === 'all'
      ? allUpdatesData
      : allUpdatesData.filter((post) =>
          post.tags?.some((tag) => tag.toLowerCase() === category)
        )

  const featuredPost = filteredUpdates[0]
  const remainingPosts = filteredUpdates.slice(1)

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Releases', value: 'release' },
    { label: 'Updates', value: 'update' },
    { label: 'Research', value: 'research' },
  ]

  return (
    <div className="min-h-screen bg-paper text-chocolate transition-colors duration-300">
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2629682720782125"
        crossOrigin="anonymous"
      />

      {/* HERO */}
      <header className="relative overflow-hidden bg-beige transition-colors duration-300">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-sage/30" />
        <div className="pointer-events-none absolute -right-4 -top-8 h-40 w-40 rounded-full border border-sage/20" />

        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-sage" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-chocolate-soft opacity-70">
                Gouda AI · Journal
              </span>
            </div>

            <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight text-chocolate md:text-7xl">
              Updates
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-chocolate-soft md:text-xl">
              Research, releases, experiments, and the work behind Gouda AI.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.15em] text-chocolate-soft opacity-60">
            <span>{filteredUpdates.length} publications</span>
            <span>•</span>
            <span>Gouda AI</span>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-6xl px-6 py-14 md:py-20">

        {/* FILTER BAR */}
        <div className="mb-12 flex flex-col gap-5 border-b border-[var(--border)] pb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-chocolate">
              Browse
            </span>

            <span className="h-1 w-1 rounded-full bg-sage" />

            <span className="text-sm text-chocolate-soft opacity-70">
              {category === 'all'
                ? 'All updates'
                : `${category.charAt(0).toUpperCase()}${category.slice(1)}`}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = category === filter.value

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
                        ? 'bg-sage text-[#fffdf9] shadow-sm'
                        : `
                          border
                          border-[var(--border)]
                          bg-surface
                          text-chocolate-soft
                          hover:border-sage/50
                          hover:bg-sage
                          hover:text-[#fffdf9]
                          hover:shadow-sm
                        `
                    }
                  `}
                >
                  {filter.label}
                </Link>
              )
            })}
          </div>
        </div>

        {/* NO RESULTS */}
        {!featuredPost && (
          <div className="rounded-2xl border border-[var(--border)] bg-surface px-6 py-16 text-center transition-colors duration-300">
            <div className="mb-3 text-3xl">◌</div>

            <h2 className="text-xl font-bold text-chocolate">
              No publications found
            </h2>

            <p className="mt-2 text-sm text-chocolate-soft">
              There are currently no posts in this category.
            </p>

            <Link
              href="/updates"
              className="mt-6 inline-block rounded-full bg-sage px-5 py-2 text-sm font-semibold text-[#fffdf9] transition-opacity hover:opacity-80"
            >
              View all updates
            </Link>
          </div>
        )}

        {/* LATEST UPDATE */}
        {featuredPost && (
          <section className="mb-20">
            <div className="mb-7 flex items-end justify-between">
              <div>
                <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-sage">
                  Latest
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-chocolate md:text-4xl">
                  Recent work
                </h2>
              </div>

              <div className="hidden text-sm text-chocolate-soft opacity-50 md:block">
                01 / {filteredUpdates.length}
              </div>
            </div>

            {/* FEATURED CARD */}
            <Link
              href={`/updates/${featuredPost.slug}`}
              className="
                group
                block
                overflow-hidden
                rounded-2xl
                border
                border-[var(--border)]
                bg-surface
                shadow-[0_10px_40px_var(--shadow)]
                transition
                duration-300
                hover:-translate-y-1
                hover:border-sage/40
                hover:shadow-[0_16px_50px_var(--shadow)]
              "
            >
              <div className="grid md:grid-cols-[1.35fr_1fr]">

                {/* IMAGE */}
                <div className="relative aspect-[16/9] overflow-hidden bg-beige-light md:aspect-auto md:min-h-[360px]">
                  {featuredPost.image ? (
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                    />
                  ) : (
                    <div className="h-full w-full bg-beige-light" />
                  )}
                </div>

                {/* CONTENT */}
                <div className="flex flex-col justify-between p-7 md:p-10">
                  <div>
                    {/* TAGS */}
                    <div className="mb-5 flex flex-wrap gap-2">
                      {featuredPost.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-sage/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-sage"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* TITLE */}
                    <h3 className="text-3xl font-bold leading-tight tracking-tight text-chocolate transition-colors group-hover:text-sage md:text-4xl">
                      {featuredPost.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="mt-5 leading-relaxed text-chocolate-soft">
                      {featuredPost.description}
                    </p>
                  </div>

                  {/* METADATA */}
                  <div className="mt-8">
                    <div className="mb-4 h-px w-full bg-[var(--border)]" />

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-chocolate-soft opacity-60">
                        {new Date(featuredPost.date).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </span>

                      <span className="text-sm font-semibold text-sage transition-transform group-hover:translate-x-1">
                        Read update →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* ARCHIVE */}
        {remainingPosts.length > 0 && (
          <section>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-sage">
                  Archive
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-chocolate md:text-4xl">
                  More from Gouda
                </h2>
              </div>

              <div className="hidden text-sm text-chocolate-soft opacity-50 md:block">
                {remainingPosts.length} updates
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {remainingPosts.map((post) => (
                <div
                  key={post.slug}
                  className="group rounded-2xl transition duration-300 hover:-translate-y-1"
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

        {/* BOTTOM NAVIGATION */}
        <div className="mt-20 flex items-center justify-between border-t border-[var(--border)] pt-8">
          <span className="text-xs uppercase tracking-[0.15em] text-chocolate-soft opacity-50">
            Gouda AI
          </span>

          <Link
            href="/"
            className="text-sm font-semibold text-chocolate transition-colors hover:text-sage"
          >
            Back to Gouda →
          </Link>
        </div>
      </main>
    </div>
  )
}