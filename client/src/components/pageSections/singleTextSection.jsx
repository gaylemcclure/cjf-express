import axios from "axios";
import * as contentful from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { useEffect } from "react";

const SingleTextSection = ({ textId }) => {
  const handleParagraphText = (textId) => {
    const client = contentful.createClient({
      space: "b10z0f9dnsdt",
      accessToken: "bYqdQnmfDAq3pW7IRc34GawRTXvvxSUcRiB6pUSpCTg",
    });

    client
      .getEntry(textId)
      .then((entry) => {
        const rawRichTextField = entry.fields.pageText;
        return documentToHtmlString(rawRichTextField);
      })
      .then((renderedHtml) => {
        //Write to HTML
        document.getElementById(textId).innerHTML = renderedHtml;
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (textId !== undefined) {
      handleParagraphText(textId);
    }
  }, [textId]);

  return (
    <div className="single-text max-w-screenMax">
      <div id={textId} className="pt-8 pb-8 something"></div>
    </div>
  );
};

export default SingleTextSection;
