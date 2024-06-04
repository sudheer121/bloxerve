import { BaseSchema } from '@adonisjs/lucid/schema'

/*
Add this schema

transactions
- block_id (foreign key)
- type enum
- transaction_hash
- actual_fee_amount
- actual_fee_unit
- execution_status enum
- finality_status enum
- jsonb
  - execution_resources {}
  - calldata []
- position int // index in block #gbt
- sender_address #gbt
- max_fee #gbt
- nonce #gbt
- version #gbt


 */
export default class extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.foreign('block_id').references('blocks.id').onDelete('CASCADE')
      table.enum('type', ['INVOKE'])
      table.string('transaction_hash')
      table.string('actual_fee_amount')
      table.string('actual_fee_unit')
      table.enum('execution_status', ['ACCEPTED_ON_L1', 'ACCEPTED_ON_L2'])
      table.enum('finality_status', ['SUCCEEDED', 'FAILED'])
      table.jsonb('meta')
      table.integer('position')
      table.string('sender_address')
      table.string('max_fee')
      table.string('nonce')
      table.string('version')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('block_id')
    })
    this.schema.dropTable(this.tableName)
  }
}
