import React, { useEffect, useState } from 'react';
import { HLJSOptions } from 'highlight.js';
import { marked } from 'marked';
import high from 'highlight.js';
import markedRenderStyle from '@/style/marker/marked-render.less';
import { renderMarker } from '@/utils/reg';

interface MarkedRenderProps {
  configure?: Partial<HLJSOptions>;
  markedOptions?: marked.MarkedOptions;
  context?: string;
}

const defaultConfigure = {
  classPrefix: 'hljs-',
  languages: ['CSS', 'HTML', 'JavaScript', 'Python', 'TypeScript', 'Markdown'],
};
const defaultOptions: marked.MarkedOptions = {
  renderer: renderMarker,
  highlight: (code) => {
    return high.highlightAuto(code).value;
  },
  gfm: true,
  breaks: true,
};

const MarkedRender: React.FC<MarkedRenderProps> = (props) => {
  const {
    markedOptions = defaultOptions,
    context,
    configure = defaultConfigure,
  } = props;

  if (!context) {
    return null;
  }
  useEffect(() => {
    high.configure(configure);
    marked.setOptions(markedOptions);
  }, []);
  return (
    <div
      className={markedRenderStyle.articleContainer}
      id="articleContainer"
      dangerouslySetInnerHTML={{
        __html: marked(context).replace(/<pre>/g, "<pre id='hljs'>"),
      }}
    />
  );
};

export default MarkedRender;
