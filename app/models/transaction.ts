import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { TransactionExecutionStatus, TransactionFinalityStatus, TransactionType } from '../types.ts'
import { ExecutionResources } from '../external/resources/SnetTransactionReceipt.ts'
import Block from './Block.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare block_id: number

  @column()
  declare type: number | null

  @column()
  declare transaction_hash: string

  @column()
  declare actual_fee_amount: string

  @column()
  declare actual_fee_unit: string

  @column()
  declare execution_status: TransactionExecutionStatus

  @column()
  declare finality_status: TransactionFinalityStatus

  @column()
  declare meta: {
    executionResources?: ExecutionResources
    calldata?: string[]
  }

  @column()
  declare position: number

  @column()
  declare sender_address: string

  @column()
  declare max_fee: string

  @column()
  declare nonce: string

  @column()
  declare version: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Block, { foreignKey: 'block_id' })
  declare block: BelongsTo<typeof Block>
}
