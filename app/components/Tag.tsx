import React from 'react';

// Define the props interface for the Tag component
interface TagProps {
  text: string;
}

/**
 * A reusable component for displaying a blog post tag.
 * @param {TagProps} props - Component props.
 * @param {string} props.text - The text content of the tag.
 */
export default function Tag({ text }: TagProps) {
  return (
    <span className="inline-block bg-[#64401e] text-[f5f0e8] text-xs font-medium px-2.5 py-0.5 rounded-full">
      {text}
    </span>
  );
}
