const { BaseController } = require('./base.controller');
const { sendSuccess } = require('../utils/response');
const { logger } = require('../utils/logger');
const { BadRequestError } = require('../utils/errors');

class ScraperController extends BaseController {
  async scrape(req, res, next) {
    await this.execute(req, res, next, async () => {
      const { url } = req.query;

      if (!url || typeof url !== 'string') {
        throw new BadRequestError('URL is required');
      }

      // Validate URL format
      try {
        new URL(url);
      } catch {
        throw new BadRequestError('Invalid URL format');
      }

      logger.info(`Scrape request received for: ${url}`);

      // TODO: Implement extractor selection logic based on URL or extractor parameter
      // For now, this is a placeholder
      sendSuccess(res, { message: 'Scraper endpoint ready', url }, 'Scrape request received');
    });
  }

  async health(_req, res, next) {
    await this.execute(_req, res, next, async () => {
      sendSuccess(
        res,
        {
          status: 'healthy',
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
        },
        'Service is healthy'
      );
    });
  }
}

module.exports = { ScraperController };
