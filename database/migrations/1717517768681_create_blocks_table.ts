import { BaseSchema } from '@adonisjs/lucid/schema'

/*
Add this schema 

blocks
- block_number integer
- status
- block_hash
- parent_hash
- timestamp integer 


 */
export default class extends BaseSchema {
  protected tableName = 'blocks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('block_number')
      table.enum('status', ['ACCEPTED_ON_L1', 'coACCEPTED_ON_L2'])
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
