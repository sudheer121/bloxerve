import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { BlockStatus } from '../types.ts'

export default class Block extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare block_number: number

  @column()
  declare status: BlockStatus

  @column()
  declare block_hash: string

  @column()
  declare parent_hash: string

  @column()
  declare timestamp: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
