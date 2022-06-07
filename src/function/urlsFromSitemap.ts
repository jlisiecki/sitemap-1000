import { SitemapURL } from './getUrlsFromMaps';

export default function urlsFromMap(document: Document): SitemapURL[] {
    const urls = Array.from(document.querySelectorAll('url'));
    const output: SitemapURL[] = [];
    urls.forEach((url) => {
        const loc = url.querySelector('loc')?.textContent?.trim();
        if (!loc) return;
        const lastmod =
            url.querySelector('lastmod')?.textContent?.trim() || undefined;
        output.push({ lastmod, loc });
    });
    return output;
}
