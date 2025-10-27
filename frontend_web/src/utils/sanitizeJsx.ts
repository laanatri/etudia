import DOMPurify from "dompurify";
import React, { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

export function sanitizeJsx(jsx: React.ReactNode | null): string {
  if (!jsx) return "";
  const html = renderToStaticMarkup(jsx);
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "span", "ul", "li"
    ],
    ALLOWED_ATTR: [
      "class"
    ]
  });
}