import Block from '#models/Block'
import Transaction from '#models/Transaction'
import SnetBlockTxns, { SnetBlockTxnsPartTransaction } from '../external/resources/SnetBlockTxns.ts'
import SnetTransactionReceipt from '../external/resources/SnetTransactionReceipt.ts'

export default class PopulateDbFromResourceService {
  async fromBlockTransactionResource(blkt: SnetBlockTxns) {
    const blockExists = await Block.findBy('block_number', blkt.block_number)
    if (blockExists) return

    const block = await Block.create({
      block_number: blkt.block_number,
      status: blkt.status,
      block_hash: blkt.block_hash,
      parent_hash: blkt.parent_hash,
      timestamp: blkt.timestamp,
    })

    return block
  }

  async fromTransactionReceiptResource(
    blockId: number,
    index: number,
    pt: Partial<SnetBlockTxnsPartTransaction>,
    tr: SnetTransactionReceipt
  ) {
    const transaction = await Transaction.create({
      block_id: blockId,
      type: pt.type,
      transaction_hash: pt.transaction_hash,
      position: index,
      sender_address: pt.sender_address,
      max_fee: pt.max_fee,
      nonce: pt.nonce,
      version: pt.version,
      finality_status: tr.finality_status,
      execution_status: tr.execution_status,
      actual_fee_amount: tr.actual_fee?.amount,
      actual_fee_unit: tr.actual_fee?.unit,
      meta: {
        events: tr.events,
        executionResources: tr.execution_resources,
        calldata: pt.calldata,
      },
    })

    return await transaction.save()
  }
}
