import { Job } from '@rlanz/bull-queue'
import ScrapeBlockJob from './ScrapeBlockJob.ts'
import queue from '@rlanz/bull-queue/services/main'
import app from '@adonisjs/core/services/app'
import ScraperService from '#services/ScraperService'
import redis from '@adonisjs/redis/services/main'

interface CheckNewBlocksJobPayload {}

export default class CheckNewBlocksJob extends Job {
  // This is the path to the file that is used to create the job
  static get $$filepath() {
    return import.meta.url
  }

  /**
   * Base Entry point
   */
  async handle(payload: CheckNewBlocksJobPayload) {
    const scraperService = await app.container.make(ScraperService)
    const pendingBlocks = await scraperService.getPendingBlocksRange()

    if (!pendingBlocks) {
      console.log('no pending blocks')
      return
    }

    const { start, end } = pendingBlocks
    console.log('about to scrape', [start, end])

    for (let i = start; i <= end; i++) {
      queue.dispatch(ScrapeBlockJob, { blockNumber: i }, {})
    }
    await redis.set('lastBlockInQueue', end)
  }

  /**
   * This is an optional method that gets called when the retries has exceeded and is marked failed.
   */
  async rescue(payload: CheckNewBlocksJobPayload) {}
}
