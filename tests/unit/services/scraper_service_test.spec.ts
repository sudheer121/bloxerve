import ScraperService from '#services/ScraperService'
import { test, configure } from '@japa/runner'

configure({
  files: ['tests/**/*.spec.js'],
  timeout: 20000,
})

test.group('Services scraper service test', async () => {
  test('get block with transactions API', async ({ assert }) => {
    const service = new ScraperService()
    const data = await service.getBlockWithTransactions(646086)
    assert.equal(
      data.result.block_hash,
      '0x21a3764d05339748b3945a6bddc69f2f8bf9e12be59c73d05872e86691b869a'
    )
  })
})
