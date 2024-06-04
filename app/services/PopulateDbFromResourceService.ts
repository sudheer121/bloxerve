import Block from '#models/Block'
import Transaction from '#models/Transaction'
import BlockTransactions from '../external/resources/BlockTransactions.ts'
import TransactionReceipt from '../external/resources/TransactionReceipt.ts'

export default class PopulateDbFromResourceService {
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

  async fromTransactionReceiptResource(tr: TransactionReceipt) {
    const transaction = await Transaction.findByOrFail('transaction_hash', tr.transaction_hash)
    transaction.finality_status = tr.finality_status
    transaction.execution_status = tr.execution_status
    transaction.actual_fee_amount = tr.actual_fee?.amount
    transaction.actual_fee_unit = tr.actual_fee?.unit
    transaction.meta = transaction.meta ?? {}
    transaction.meta.executionResources = tr.execution_resources
    return await transaction.save()
  }
}
