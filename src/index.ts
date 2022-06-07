import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import createSitemapFromUrls from './function/createSitemapFromUrls';
import getUrlsFromMap from './function/getUrlsFromMaps';
import path from 'path';

(async () => {
    // you can pass your sitemaps and indexes here
    const urls = await getUrlsFromMap(
        'https://example.com/sitemap-index.xml',
        'https://example.com/additional-sitemap.xml'
    );

    // here you can set max length of single sitemap
    const chunkSize = 1000;
    const dirname = path.resolve(__dirname, '../output/sitemap-1000');
    console.log(dirname);
    if (!existsSync(dirname)) await mkdir(dirname, { recursive: true });
    for (let i = 0; i < urls.length; i += chunkSize) {
        const chunk = urls.slice(i, i + chunkSize);
        await writeFile(
            path.join(dirname, `sitemap-${i / chunkSize}.xml`),
            createSitemapFromUrls(chunk)
        );
    }
})();
