import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';
import request from './request';
import sitemapsFromIndex from './sitemapsFromIndex';
import step from './step';
import urlsFromMap from './urlsFromSitemap';

export interface Url {
    loc: string;
    lastmod?: string;
}

export default async function getUrlsFromMap(
    ...startUrls: string[]
): Promise<Url[]> {
    const urls = [];
    for (let url of startUrls) urls.push(...(await step(url)));
    return urls;
}
