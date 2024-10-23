import * as contentful from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { useEffect, useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

const renderOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p className="mb-4 leading-relaxed">{children}</p>,
    [BLOCKS.UL_LIST]: (node, children) => <ul className="list-disc list-inside mb-4">{children}</ul>,
    [BLOCKS.OL_LIST]: (node, children) => <ol className="list-decimal list-inside mb-4">{children}</ol>,
    [BLOCKS.LIST_ITEM]: (node, children) => {
      // Unwrap paragraphs inside list items
      const unTaggedChildren = documentToReactComponents(node, {
        renderNode: {
          [BLOCKS.PARAGRAPH]: (_node, children) => children, // Remove <p> tags inside <li>
        },
      });
      return unTaggedChildren;
    },
  },
};

// const content = article.fields.content;

// return documentToReactComponents(content, renderOptions);

const SingleTextSection = ({ textId }) => {
  const [block, setBlock] = useState(false);
  const [text, setText] = useState("");

  const handleParagraphText = (textId) => {
    const client = contentful.createClient({
      space: "b10z0f9dnsdt",
      accessToken: "bYqdQnmfDAq3pW7IRc34GawRTXvvxSUcRiB6pUSpCTg",
    });

    client
      .getEntry(textId)
      .then((entry) => {
        const rawRichTextField = entry.fields.pageText;
        console.log(rawRichTextField);
        return rawRichTextField;
      })
      .then((text) => {
        //Figure out if any are blockquote
        const blockQuoteFilter = text.content.filter((txt) => txt.nodeType === "blockquote");
        const paragraphFilter = text.content.filter((pg) => pg.nodeType === "paragraph");

        if (blockQuoteFilter.length > 0) {
          text.content = blockQuoteFilter;
          const bText = documentToReactComponents(text);
          setBlock(bText);
        }
        if (paragraphFilter.length > 0) {
          text.content = paragraphFilter;
          const pText = documentToReactComponents(text);
          setText(pText);
        }

        // const content = article.fields.content;

        // return documentToReactComponents(content, renderOptions);

        //Write to HTML
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (textId !== undefined) {
      handleParagraphText(textId);
    }
  }, [textId]);

  return (
    <div className="single-text max-w-screenMax pl-6 pr-6 lg:pr-0 lg:pl-0">
      {block}
      {text}
    </div>
  );
};

export default SingleTextSection;
