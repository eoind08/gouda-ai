import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div
      className="
        prose prose-lg max-w-none
        prose-headings:text-[#64401e]
        prose-p:text-[#3f3429]
        prose-p:leading-relaxed
        prose-a:text-[#64401e]
        hover:prose-a:text-[#3f3429]
        prose-strong:text-[#64401e]
        prose-blockquote:border-[#d7c3aa]
        prose-blockquote:text-[#6b5b4a]
        prose-img:rounded-lg
        prose-img:shadow-md
        prose-pre:bg-[#f5f0e8]
        prose-pre:text-[#3f3429]
        prose-table:my-8
        prose-th:bg-[#f5f0e8]
        prose-th:px-4
        prose-th:py-3
        prose-td:px-4
        prose-td:py-3
        prose-th:border-[#d7c3aa]/40
        prose-td:border-[#d7c3aa]/40
      "
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
