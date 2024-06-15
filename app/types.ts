export const TransactionTypeMap = {
  INVOKE: 1,
  DECLARE: 2,
  DEPLOY: 0,
  DEPLOY_ACCOUNT: 4,
  L1_HANDLER: 3,
}
export type TransactionType = keyof typeof TransactionTypeMap

export enum BlockStatus {
  ACCEPTED_ON_L1 = 'ACCEPTED_ON_L1',
  ACCEPTED_ON_L2 = 'ACCEPTED_ON_L2',
  REVERTED = 'REVERTED',
}

export enum TransactionFinalityStatus {
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
}

export type ScrapedResponse<T> = {
  jsonrpc: number
  result: T
  id: number
}

export type ExecutionResources = {
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
