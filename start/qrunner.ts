import queue from '@rlanz/bull-queue/services/main'
import CheckNewBlocksJob from '../app/jobs/CheckNewBlocksJob.ts'
;(async () => {
  queue.dispatch(
    CheckNewBlocksJob,
    {},
    {
      repeat: {
        every: 1000000,
      },
    }
  )
})()
