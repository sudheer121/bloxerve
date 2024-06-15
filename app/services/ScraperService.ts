import Block from '#models/Block'
import { inject } from '@adonisjs/core'
import SnetBlockTxns from '../external/resources/SnetBlockTxns.ts'
import TransactionReceipt from '../external/resources/SnetTransactionReceipt.ts'
import { ScrapedResponse } from '../types.ts'
import redis from '@adonisjs/redis/services/main'
import { Exception } from '@adonisjs/core/exceptions'
import env from '#start/env'

@inject()
export default class ScraperService {
  API_ENDPOINT = env.get('SCRAPE_API')
  METHOD_SNET_GET_BLOCK_TRANSACTIONS = 'starknet_getBlockWithTxs'
  METHOD_SNET_GET_TRANSACTION_RECEIPT = 'starknet_getTransactionReceipt'
  METHOD_SNET_BLOCK_NUMBER = 'starknet_blockNumber'

  async getPendingBlocksRange() {
    const latestBlock = await this.getBlockNumber()
    const latestBlockNo = latestBlock.result
    let lastBlockInQueue = Number.parseInt((await redis.get('lastBlockInQueue')) ?? '0')

    if (lastBlockInQueue >= latestBlockNo) {
      return null
    }

    const latestBlockInDb = await Block.query()
      .select('block_number')
      .orderBy('block_number', 'desc')
      .first()
    const lastBlockNoInDb = latestBlockInDb?.block_number ?? latestBlockNo - 11
    if (lastBlockNoInDb >= latestBlockNo) return null

    if (!lastBlockNoInDb) {
      console.log('lastBlockNoInDb is null')
      return null
    }

    return {
      start: Math.max(lastBlockNoInDb + 1, lastBlockInQueue + 1),
      end: latestBlockNo,
    }
  }

  async getBlockWithTransactions(blockNumber: number): Promise<ScrapedResponse<SnetBlockTxns>> {
    const response = await fetch(this.API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: this.METHOD_SNET_GET_BLOCK_TRANSACTIONS,
        params: [
          {
            block_number: blockNumber,
          },
        ],
      }),
    })
    return (await response.json()) as any
  }

  async getTransactionReceipt(
    transactionHash: string
  ): Promise<ScrapedResponse<TransactionReceipt>> {
    const response = await fetch(this.API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: this.METHOD_SNET_GET_TRANSACTION_RECEIPT,
        params: [transactionHash],
      }),
    })
    return (await response.json()) as any
  }

  async getBlockNumber(): Promise<ScrapedResponse<number>> {
    const response = await fetch(this.API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: this.METHOD_SNET_BLOCK_NUMBER,
        params: [],
      }),
    })
    if (!response.ok) {
      throw new Exception(
        `${this.API_ENDPOINT} Failed with code ${response.status}, most probably rate limited`
      )
    }
    return (await response.json()) as any
  }
}
