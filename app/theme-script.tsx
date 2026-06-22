"use client";

import { useServerInsertedHTML } from "next/navigation";

const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('wuko-theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = stored || (prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  })();
`;

export function ThemeScript() {
  useServerInsertedHTML(() => (
    <script dangerouslySetInnerHTML={{ __html: themeScript }} />
  ));
  return null;
}
