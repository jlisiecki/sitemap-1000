import { JSDOM } from 'jsdom';
import { SitemapURL } from './getUrlsFromMaps';

export default function createSitemapFromUrls(urls: SitemapURL[]) {
    const { document } = new JSDOM('<root />', {
        contentType: 'application/xml',
    }).window;

    const namespaceURI = 'http://www.sitemaps.org/schemas/sitemap/0.9';
    const urlsetElement = document.createElementNS(namespaceURI, 'urlset');
    document.documentElement.replaceWith(urlsetElement);

    urls.forEach((url) => {
        const urlElement = document.createElementNS(namespaceURI, 'url');
        const locElement = document.createElementNS(namespaceURI, 'loc');
        locElement.textContent = url.loc.trim();
        urlElement.append(locElement);
        if (url.lastmod) {
            const lastmodElement = document.createElementNS(
                namespaceURI,
                'lastmod'
            );
            lastmodElement.textContent = url.lastmod.trim();
            urlElement.append(lastmodElement);
        }
        urlsetElement.appendChild(urlElement);
    });

    return (
        '<?xml version="1.0" encoding="UTF-8"?>' +
        document.documentElement.outerHTML
    );
}
