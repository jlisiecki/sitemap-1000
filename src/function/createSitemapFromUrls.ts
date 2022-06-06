import { JSDOM } from 'jsdom';
import { Url } from './getUrlsFromMaps';

export default function createSitemapFromUrls(urls: Url[]) {
    const { document } = new JSDOM(
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" />',
        {
            contentType: 'application/xml',
        }
    ).window;

    const urlsetElement = document.querySelector('urlset');

    urls.forEach((url) => {
        const urlElement = document.createElement('url');
        const locElement = document.createElement('loc');
        locElement.textContent = url.loc.trim();
        urlElement.append(locElement);
        if (url.lastmod) {
            const lastmodElement = document.createElement('lastmod');
            lastmodElement.textContent = url.lastmod.trim();
            urlElement.append(lastmodElement);
        }
        urlsetElement?.appendChild(urlElement);
    });

    return (
        '<?xml version="1.0" encoding="UTF-8"?>' +
        document.documentElement.outerHTML.replaceAll(' xmlns=""', '')
    );
}
