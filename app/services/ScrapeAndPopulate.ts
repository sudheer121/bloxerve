import { inject } from '@adonisjs/core'
import PopulateDbFromResourceService from './PopulateDbFromResourceService.ts'
import ScraperService from './ScraperService.ts'

@inject()
export default class ScrapeAndPopulate {
  constructor(
    private scraperService: ScraperService,
    private populateService: PopulateDbFromResourceService
  ) {}

  async forBlockNumber(blockNumber: number) {
    const blockTxns = await this.scraperService.getBlockWithTransactions(blockNumber)
    const block = await this.populateService.fromBlockTransactionResource(blockTxns.result)

    if (!block) return
    const blockTxnsTranscationParts = blockTxns.result.transactions

    // async await sequentially
    let idx = 0
    for (const txnPart of blockTxnsTranscationParts) {
      if (!txnPart.transaction_hash) continue
      const txnReceipt = await this.scraperService.getTransactionReceipt(txnPart.transaction_hash)
      await this.populateService.fromTransactionReceiptResource(
        block?.id,
        idx,
        txnPart,
        txnReceipt.result
      )

      // avoiding timeouts
      idx += 1
      await this.sleep(500)
    }
  }

  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
