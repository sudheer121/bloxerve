import type { ApplicationService } from '@adonisjs/core/types'
import queue from '@rlanz/bull-queue/services/main'
import CheckNewBlocksJob from '../app/jobs/CheckNewBlocksJob.ts'
import env from '#start/env'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {}

  /**
   * The container bindings have booted
   */
  async boot() {}

  /**
   * The application has been booted
   */
  async start() {
    queue.dispatch(
      CheckNewBlocksJob,
      {},
      {
        repeat: {
          every: env.get('SCRAPE_INTERVAL'),
        },
      }
    )
  }

  /**
   * The process has been started
   */
  async ready() {}

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {}
}
