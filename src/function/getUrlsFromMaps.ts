import step from './step';

export interface SitemapURL {
    loc: string;
    lastmod?: string;
}

export default async function getUrlsFromMap(
    ...startUrls: string[]
): Promise<SitemapURL[]> {
    const urls = [];
    for (let url of startUrls) urls.push(...(await step(url)));
    return urls;
}
