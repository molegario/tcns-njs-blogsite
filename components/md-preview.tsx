"use client";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface PreviewProps {
  value: string;
}

const Preview = ({ value }: PreviewProps) => {
  return (
    <>
      <ReactMarkdown
        components={{
          p({ children }) {
            return <p className="mb-4 ml-2 text-stone-900">{children}</p>;
          },
          code(props) {
            const { children, className, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter language={match[1]} style={atomDark}>
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {value}
      </ReactMarkdown>
    </>
  );
};

export default Preview;
