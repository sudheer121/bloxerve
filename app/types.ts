export enum BlockStatus {
  ACCEPTED_ON_L1,
  ACCEPTED_ON_L2,
}

export enum TransactionType {
  INVOKE,
  DECLARE,
  DEPLOY,
  DEPLOY_ACCOUNT,
  L1_HANDLER,
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
