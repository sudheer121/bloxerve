import PopulateDbFromResourceService from './PopulateDbFromResourceService.ts'
import ScraperService from './ScraperService.ts'

export default class ScrapeAndPopulate {
  constructor(
    private scraperService: ScraperService,
    private populateService: PopulateDbFromResourceService
  ) {}

  async forBlockNumber(blockNumber: number) {
    const blockTxns = await this.scraperService.getBlockWithTransactions(blockNumber)
    await this.populateService.fromBlockTransactionResource(blockTxns.result)

    const txnHashes = blockTxns.result.transactions.map((t) => t.transaction_hash)

    // async await sequentially
    for (const txnHash of txnHashes) {  // eslint-disable-line
      console.log('Scraping for: ', txnHash)
      if (!txnHash) continue
      const txn = await this.scraperService.getTransactionReceipt(txnHash)
      await this.populateService.fromTransactionReceiptResource(txn.result)

      // avoiding timeouts
      await this.sleep(1000)
    }
  }

  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
