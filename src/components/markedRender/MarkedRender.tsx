import React, { useEffect } from 'react';
import { HLJSOptions } from 'highlight.js';
import { marked } from 'marked';
import high from 'highlight.js';
import markedRenderStyle from '@/style/components/marked-render.less';

interface MarkedRenderProps {
  configure?: Partial<HLJSOptions>;
  markedOptions?: marked.MarkedOptions;
  context?: string;
}

const MarkedRender: React.FC<MarkedRenderProps> = (props) => {
  const { children, markedOptions, context } = props;
  if (!context) return null;
  console.log(context);
  useEffect(() => {
    high.configure({
      classPrefix: 'hljs-',
      languages: [
        'CSS',
        'HTML',
        'JavaScript',
        'Python',
        'TypeScript',
        'Markdown',
      ],
    });
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: (code) => {
        console.log(code);
        return high.highlightAuto(code).value;
      },
      gfm: true,
      breaks: true,
    });
  }, []);
  return (
    <div
      className={markedRenderStyle.markedRender}
      dangerouslySetInnerHTML={{
        __html: marked(context).replace(/<pre>/g, "<pre id='hljs'>"),
      }}
    />
  );
};

export default MarkedRender;
