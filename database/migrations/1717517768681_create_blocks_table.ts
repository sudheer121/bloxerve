import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'blocks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('block_number')
      table.enum('status', ['ACCEPTED_ON_L1', 'ACCEPTED_ON_L2'])
      table.string('block_hash')
      table.string('parent_hash')
      table.bigInteger('timestamp')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
