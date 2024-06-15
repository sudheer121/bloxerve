import { Job } from '@rlanz/bull-queue'
import app from '@adonisjs/core/services/app'
import ScrapeAndPopulate from '#services/ScrapeAndPopulate'

interface ScrapeBlockJobPayload {
  blockNumber: number
}

export default class ScrapeBlockJob extends Job {
  // This is the path to the file that is used to create the job
  static get $$filepath() {
    return import.meta.url
  }

  /**
   * Base Entry point
   */
  async handle(payload: ScrapeBlockJobPayload) {
    console.log('ScrapeBlockJob payload', payload)
    const scrapeAndPopulate = await app.container.make(ScrapeAndPopulate)
    console.log('Scraping for block number', payload.blockNumber)
    await scrapeAndPopulate.forBlockNumber(payload.blockNumber)
  }

  /**
   * This is an optional method that gets called when the retries has exceeded and is marked failed.
   */
  async rescue(payload: ScrapeBlockJobPayload) {
    console.log('ScrapeBlockJob failed payload', payload)
  }
}
