'use client'
import Link from 'next/link';
import Image from 'next/image';
import Tag from './Tag';

interface BlogPostCardProps {
  slug: string;
  title: string;
  date: string;
  image: string;
  tags: string[];
  description: string;
}

export default function BlogPostCard({ slug, title, date, image, tags, description }: BlogPostCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const fallbackImage = "/gouda.png";

  return (
    <Link href={`/${slug}`} className="block">
      <div className="
    group
    overflow-hidden
    rounded-lg
    border
    border-[#64401e]/10
    bg-white
    shadow-md
    transition-all
    duration-300
    hover:-translate-y-1
    hover:border-[#879574]/40
    hover:shadow-[0_12px_35px_rgba(70,45,20,0.10)]">
        {/* Blog Post Image */}
        <div className="relative w-full h-48">
          <Image
            src={image || fallbackImage} // Use fallback if image is not provided
            alt={title}
            fill // Fills the parent container
            style={{ objectFit: 'cover' }} // Ensures the image covers the area without distortion
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive image sizing
            className="rounded-t-lg"
            onError={(e) => {
              // Fallback for image loading errors
              e.currentTarget.src = fallbackImage;
              e.currentTarget.srcset = fallbackImage;
            }}
          />
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="
    font-bold
    text-[#64401e]
    transition-colors
    group-hover:text-[#667454]">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {formattedDate}
          </p>
          <p className="text-[#4b5563] text-base mb-4 flex-grow">
            {description}
          </p>

          {/* Tags Section */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags && tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
