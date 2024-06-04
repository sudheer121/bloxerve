import {
  TransactionExecutionStatus,
  TransactionFinalityStatus,
  TransactionType,
} from '../../types.ts'

export default interface TransactionReceipt {
  type: TransactionType
  transaction_hash: string
  actual_fee: {
    amount: string
    unit: string
  }
  execution_status: TransactionExecutionStatus
  finality_status: TransactionFinalityStatus
  block_hash: string
  block_number: number
  messages_sent: []
  events: TransactionEvent[]
  execution_resources: ExecutionResources
}

export interface ExecutionResources {
  steps: number
  pedersen_builtin_applications: number
  range_check_builtin_applications: number
  bitwise_builtin_applications: number
  ec_op_builtin_applications: number
  data_availability: {
    l1_gas: number
    l1_data_gas: number
  }
}

export interface TransactionEvent {
  from_address: string
  keys: string[]
  data: string[]
}
