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
            return <p className="text-lg mb-2 ml-2 text-stone-900">{children}</p>;
          },
          h1({ children }) {
            return <h1 className="text-2xl font-medium mb-2 ml-2">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-xl font-medium mb-2 ml-2">{children}</h2>;
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
