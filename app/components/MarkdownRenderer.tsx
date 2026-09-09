import React from 'react';

/**
 * Defines the props interface for the MarkdownRenderer component.
 */
interface MarkdownRendererProps {
  contentHtml: string;
}

/**
 * Renders HTML content generated from Markdown.
 * Uses `dangerouslySetInnerHTML` which is safe here because the HTML
 * is generated from trusted Markdown files using `remark-html`.
 * @param {MarkdownRendererProps} props - Component props.
 * @param {string} props.contentHtml - The HTML string to render.
 */
export default function MarkdownRenderer({ contentHtml }: MarkdownRendererProps) {
  return (
    // Apply Tailwind CSS for basic prose styling to make Markdown look good
    <div
      className="prose dark:prose-invert max-w-none prose-lg
                 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                 prose-a:text-blue-600 hover:prose-a:text-blue-800
                 prose-img:rounded-lg prose-img:shadow-md
                 prose-p:leading-relaxed"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}
