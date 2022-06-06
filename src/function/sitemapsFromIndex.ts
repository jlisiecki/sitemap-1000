export default function sitemapsFromIndex(document: Document): string[] {
    return Array.from(document.querySelectorAll('sitemap loc'))
        .map((loc) => loc.textContent?.trim() || '')
        .filter((map) => map.trim() !== '');
}
