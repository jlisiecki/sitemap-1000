import { JSDOM } from 'jsdom';
import { Url } from './getUrlsFromMaps';

export default function createSitemapFromUrls(urls: Url[]) {
    const nameSpace = 'http://www.sitemaps.org/schemas/sitemap/0.9';

    const { document } = new JSDOM(`<urlset xmlns="${nameSpace}" />`, {
        contentType: 'application/xml',
    }).window;

    const urlsetElement = document.querySelector('urlset');

    urls.forEach((url) => {
        const urlElement = document.createElementNS(nameSpace, 'url');
        const locElement = document.createElementNS(nameSpace, 'loc');
        locElement.textContent = url.loc.trim();
        urlElement.append(locElement);
        if (url.lastmod) {
            const lastmodElement = document.createElementNS(
                nameSpace,
                'lastmod'
            );
            lastmodElement.textContent = url.lastmod.trim();
            urlElement.append(lastmodElement);
        }
        urlsetElement?.appendChild(urlElement);
    });

    return (
        '<?xml version="1.0" encoding="UTF-8"?>' +
        document.documentElement.outerHTML
    );
}
