export default class ScraperService {
  API_ENDPOINT = 'https://free-rpc.nethermind.io/mainnet-juno'
  METHOD_SNET_GET_BLOCK_TRANSACTIONS = 'starknet_getBlockWithTxs'
  METHOD_SNET_GET_TRANSACTION_RECEIPT = 'starknet_getTransactionReceipt'
  METHOD_SNET_BLOCK_NUMBER = 'starknet_blockNumber'

  async getBlockWithTransactions(blockNumber: number) {
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
    return await response.json()
  }

  async getTransactionReceipt(transactionHash: string) {
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
    return await response.json()
  }

  async getBlockNumber() {
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
    return await response.json()
  }
}
