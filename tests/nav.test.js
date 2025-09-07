/** @vitest-environment jsdom */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';

const langs = ['da', 'en', 'de'];

describe('page navigation', () => {
  langs.forEach((lang) => {
    it(`includes about-house link on docs/${lang} page`, () => {
      const html = readFileSync(`docs/${lang}/index.html`, 'utf-8');
      const dom = new JSDOM(html);
      const link = dom.window.document.querySelector('nav.page-nav a[href="#about-house"]');
      expect(link).not.toBeNull();
    });
    it(`includes about-house link on ${lang} page`, () => {
      const html = readFileSync(`${lang}/index.html`, 'utf-8');
      const dom = new JSDOM(html);
      const link = dom.window.document.querySelector('nav.page-nav a[href="#about-house"]');
      expect(link).not.toBeNull();
    });
  });
});
