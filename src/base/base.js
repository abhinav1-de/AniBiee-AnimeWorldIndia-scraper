/**
 * Base Scraper for WatchAnimeWorld.in
 * Copyright (c) 2025 Basirul Akhlak Borno - https://basirulakhlak.tech/
 * ⚠️ Educational use only. Respect copyright laws.
 */

class WatchAnimeWorldBase {
  constructor() {
    this.baseUrl = 'https://watchanimeworld.in';
  }

  buildUrl(path) {
    if (path.startsWith('http')) return path;
    return `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  }
}

module.exports = { WatchAnimeWorldBase };
