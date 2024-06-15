// import type { HttpContext } from '@adonisjs/core/http'

import { TransactionsIndex } from '../requests/types.ts'
import Transaction from '../models/Transaction.ts'
import { HttpContext } from '@adonisjs/core/http'

export default class TransactionsController {
  async index(ctx: HttpContext) {
    const params = ctx.request.qs() as TransactionsIndex
    const query = Transaction.query().preload('block')
    await this.sleep(500)
    if (params.type) {
      query.where('type', params.type)
    }
    let result = await query.orderBy('block_id', 'desc').paginate(params.page, params.limit)
    return result
  }

  private async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async show(ctx: HttpContext) {
    const { hashId } = ctx.params
    const transaction = await Transaction.query()
      .preload('block')
      .where('transaction_hash', hashId)
      .first()
    return transaction
  }
}
