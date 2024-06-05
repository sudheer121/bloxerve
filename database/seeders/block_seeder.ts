import { BaseSeeder } from '@adonisjs/lucid/seeders'
import SampleJson from './get_block_with_transactions.json' assert { type: 'json' }
import PopulateData from '#services/PopulateData'
import BlockTransactions from '../../app/external/resources/SnetBlockTxns.ts'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    try {
      const populateService = new PopulateData()
      await populateService.fromBlockTransactionResource(
        SampleJson.result as unknown as BlockTransactions
      )
    } catch (e) {
      console.log(e)
    }
  }
}
