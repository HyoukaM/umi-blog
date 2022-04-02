import React, { useEffect, useRef } from 'react';
import { HLJSOptions } from 'highlight.js';
import { marked } from 'marked';
import high from 'highlight.js';
import markedRenderStyle from '@/style/marker/marked-render.less';
import { renderMarker } from '@/utils/reg';
import { Dispatch } from 'umi';

interface MarkedRenderProps {
  dispatch?: Dispatch;
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
    dispatch,
  } = props;
  const articleContainer = useRef<HTMLDivElement | null>(null);

  if (!context) {
    return null;
  }
  renderMarker.heading = (text, level, raw, slugger) => {
    if (renderMarker.options.headerIds) {
      const id = renderMarker.options.headerPrefix + slugger.slug(raw);
      return (
        '<h' +
        level +
        ' id="' +
        id +
        '"' +
        ' data-id="' +
        id +
        '"' +
        ' data-title="' +
        raw +
        '"' +
        ' data-level="' +
        level +
        '"' +
        '>' +
        text +
        '</h' +
        level +
        '>\n'
      );
    }
    // ignore IDs
    return '<h' + level + '>' + text + '</h' + level + '>\n';
  };

  useEffect(() => {
    high.configure(configure);
    marked.setOptions(markedOptions);
  }, []);

  useEffect(() => {
    const cache = {};
    if (articleContainer.current) {
      const childNodes = articleContainer.current.childNodes;
      for (let i = 0; i < childNodes.length; i++) {
        if (
          // @ts-ignore
          childNodes[i].dataset &&
          // @ts-ignore
          Object.keys(childNodes[i].dataset).length
        ) {
          // @ts-ignore
          const { level, id, title } = childNodes[i].dataset;
          // @ts-ignore
          cache[id] = {
            level,
            title,
            id,
          };
        }
      }
    }
    dispatch &&
      dispatch({
        type: 'toc/effectToc',
        store: cache,
      });
  }, [articleContainer.current, context]);

  return (
    <div
      className={markedRenderStyle.articleContainer}
      id="articleContainer"
      ref={(ref) => (articleContainer.current = ref)}
      dangerouslySetInnerHTML={{
        __html: marked(context).replace(/<pre>/g, "<pre id='hljs'>"),
      }}
    />
  );
};

export default MarkedRender;
