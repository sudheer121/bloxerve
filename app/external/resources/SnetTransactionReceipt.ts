import {
  BlockStatus,
  ExecutionResources,
  TransactionFinalityStatus,
  TransactionType,
} from '../../types.ts'

export default interface SnetTransactionReceipt {
  type: TransactionType
  transaction_hash: string
  actual_fee: {
    amount: string
    unit: string
  }
  execution_status: BlockStatus
  finality_status: TransactionFinalityStatus
  block_hash: string
  block_number: number
  messages_sent: []
  events: TransactionEvent[]
  execution_resources: ExecutionResources
}

export interface TransactionEvent {
  from_address: string
  keys: string[]
  data: string[]
}
