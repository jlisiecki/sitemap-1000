import { Url } from './getUrlsFromMaps';
import request from './request';
import sitemapsFromIndex from './sitemapsFromIndex';
import urlsFromMap from './urlsFromSitemap';

export default async function step(url: string): Promise<Url[]> {
    const map = await request(url);
    if (map.isIndex) {
        const urls = [];
        for (const url of sitemapsFromIndex(map.document)) {
            urls.push(...(await step(url)));
        }
        return urls;
    } else return urlsFromMap(map.document);
}
