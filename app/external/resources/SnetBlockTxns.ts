import { BlockStatus, TransactionType } from '../../types.ts'

export default interface SnetBlockTxns {
  status: BlockStatus
  block_hash: string
  parent_hash: string
  block_number: number
  new_root: string
  timestamp: number
  sequencer_address: string
  l1_gas_price: {
    price_in_fri: string
    price_in_wei: string
  }
  l1_data_gas_price: {
    price_in_fri: string
    price_in_wei: string
  }
  l1_da_mode: string
  starknet_version: string
  transactions: Partial<SnetBlockTxnsPartTransaction>[]
}

export interface SnetBlockTxnsPartTransaction {
  transaction_hash: string
  type: TransactionType
  version: string
  nonce: string
  max_fee: string
  sender_address: string
  signature: string[]
  calldata: string[]
}
