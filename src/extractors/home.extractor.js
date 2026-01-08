/**
 * Home Page Extractor
 * Copyright (c) 2025 Basirul Akhlak Borno - https://basirulakhlak.tech/
 * ⚠️ Educational use only. Respect copyright laws.
 */

const { BaseExtractor } = require('./base.extractor');
const { WatchAnimeWorldBase } = require('../base/base');

class HomeExtractor extends BaseExtractor {
  constructor() {
    super();
    this.base = new WatchAnimeWorldBase();
  }

  getSourceName() {
    return 'watchanimeworld.in';
  }

  extractAnimeItem($, item, includeSeasonEpisodes = false) {
    const title = this.extractText($(item).find('.entry-title').first());
    const image = this.extractAttribute($(item).find('img').first(), 'src');
    const link = this.extractAttribute($(item).find('a.lnk-blk').first(), 'href');
    const season = this.extractText($(item).find('.post-ql').first());
    const episodes = this.extractText($(item).find('.year').first());

    // Extract ID and type from URL
    let id = '';
    let type = '';
    if (link) {
      const fullUrl = this.base.buildUrl(link);
      const urlParts = fullUrl.split('/').filter(part => part);
      id = urlParts[urlParts.length - 1] || '';
      
      // Determine type from URL
      if (fullUrl.includes('/series/')) {
        type = 'series';
      } else if (fullUrl.includes('/movies/') || fullUrl.includes('/movie/')) {
        type = 'movie';
      } else {
        type = 'unknown';
      }
    }

    const result = {
      id: id || '',
      type: type || '',
      title: title || '',
      image: this.normalizeImageUrl(image),
    };

    // Only include season and episodes if they exist and includeSeasonEpisodes is true
    if (includeSeasonEpisodes) {
      if (season) result.season = season;
      if (episodes) result.episodes = episodes;
    }

    return result;
  }


  async extract(html, url) {
    const $ = this.loadCheerio(html);

    const data = {
      newestDrops: [],
      newAnimeArrivals: [],
      cartoonSeries: [],
      animeMovies: [],
      cartoonFilms: [],
    };

    // Extract Newest Drops first (includes season/episodes)
    $('#widget_list_episodes-5 .swiper-slide, .widget_list_episodes .swiper-slide').each((_, el) => {
      const item = this.extractAnimeItem($, $(el), true);
      if (item.title) {
        data.newestDrops.push(item);
      }
    });

    // Extract New Anime Arrivals
    $('#widget_list_movies_series-2 .post').each((_, el) => {
      const item = this.extractAnimeItem($, $(el), false);
      if (item.title) {
        data.newAnimeArrivals.push(item);
      }
    });

    // Extract Cartoon Series
    $('#widget_list_movies_series-8 .post').each((_, el) => {
      const item = this.extractAnimeItem($, $(el), false);
      if (item.title) {
        data.cartoonSeries.push(item);
      }
    });

    // Extract Anime Movies
    $('#widget_list_movies_series-4 .post').each((_, el) => {
      const item = this.extractAnimeItem($, $(el), false);
      if (item.title) {
        data.animeMovies.push(item);
      }
    });

    // Extract Cartoon Films
    $('#widget_list_movies_series-11 .post').each((_, el) => {
      const item = this.extractAnimeItem($, $(el), false);
      if (item.title) {
        data.cartoonFilms.push(item);
      }
    });

    return data;
  }

  async extractFromFile(filePath) {
    // Scrape the live website
    const { httpClient } = require('../utils/http');
    const { getRandomUserAgent } = require('../config/user-agents');
    const url = `${this.base.baseUrl}/`;
    
    const html = await httpClient.get(url, {
      headers: {
        'User-Agent': getRandomUserAgent(),
      },
    });
    
    return this.extract(html, url);
  }
}

module.exports = { HomeExtractor };
