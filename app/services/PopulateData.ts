import Block from '#models/Block'
import Transaction from '#models/Transaction'
import BlockTransactions from '../external/resources/BlockTransactions.ts'

export default class PopulateData {
  async fromBlockTransactionResource(blkt: BlockTransactions) {
    const blockExists = await Block.findBy('block_number', blkt.block_number)
    if (blockExists) return

    const block = await Block.create({
      block_number: blkt.block_number,
      status: blkt.status,
      block_hash: blkt.block_hash,
      parent_hash: blkt.parent_hash,
      timestamp: blkt.timestamp,
    })

    await Promise.all(
      blkt.transactions.map(async (transaction, index) => {
        await Transaction.create({
          block_id: block.id,
          type: transaction.type,
          transaction_hash: transaction.transaction_hash,
          // actual_fee_amount: transaction.actual_fee_amount,
          // actual_fee_unit: transaction.actual_fee_unit,
          // execution_status: transaction.execution_status,
          // finality_status: transaction.finality_status,
          meta: {
            calldata: transaction.calldata,
          },
          position: index,
          sender_address: transaction.sender_address,
          max_fee: transaction.max_fee,
          nonce: transaction.nonce,
          version: transaction.version,
        })
      })
    )

    return block
  }
}
