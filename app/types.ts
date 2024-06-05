export enum BlockStatus {
  ACCEPTED_ON_L1,
  ACCEPTED_ON_L2,
}

export enum TransactionType {
  INVOKE = 1,
  DECLARE = 2,
  DEPLOY = 0,
  DEPLOY_ACCOUNT = 4,
  L1_HANDLER = 3,
}

export enum TransactionExecutionStatus {
  ACCEPTED_ON_L1,
  ACCEPTED_ON_L2,
}

export enum TransactionFinalityStatus {
  SUCCEEDED,
  FAILED,
}

export type ScrapedResponse<T> = {
  jsonrpc: number
  result: T
  id: number
}
