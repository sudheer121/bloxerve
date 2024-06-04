import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('block_id').unsigned().references('blocks.id').onDelete('CASCADE')
      table.enum('type', ['INVOKE'])
      table.string('transaction_hash')
      table.string('actual_fee_amount').nullable()
      table.string('actual_fee_unit').nullable()
      table.enum('execution_status', ['ACCEPTED_ON_L1', 'ACCEPTED_ON_L2']).nullable()
      table.enum('finality_status', ['SUCCEEDED', 'FAILED']).nullable()
      table.jsonb('meta').nullable()
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
