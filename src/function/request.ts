import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';

export default async function request(url: string): Promise<{
    isIndex: boolean;
    document: Document;
}> {
    const text = await fetch(url)
        .then(async (res) => {
            if (!res.ok) throw new Error('Something is wrong!');
            return await res.text();
        })
        .catch(() => undefined);

    if (!text) throw new Error("Can't read sitemap!");

    const { document } = new JSDOM(text, { contentType: 'application/xml' })
        .window;

    const isIndex = !!document.querySelector('sitemapindex');
    const isSitemap = !!document.querySelector('urlset');

    if (!isIndex && !isSitemap)
        throw new Error("That's not valid sitemap or sitemap index!");

    return { isIndex, document };
}
