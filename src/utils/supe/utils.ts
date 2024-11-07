import {
  Commitment,
  ComputeBudgetProgram,
  Connection,
  Finality,
  Keypair,
  PublicKey,
  SendTransactionError,
  Transaction,
  TransactionMessage,
  VersionedTransaction,
  VersionedTransactionResponse,
} from '@solana/web3.js'
import { PriorityFee, TransactionResult } from './types'

export const DEFAULT_COMMITMENT: Commitment = 'finalized'
export const DEFAULT_FINALITY: Finality = 'finalized'

export const calculateWithSlippageBuy = (amount: bigint, basisPoints: bigint) => {
  return amount + (amount * basisPoints) / 10000n
}

export const calculateWithSlippageSell = (amount: bigint, basisPoints: bigint) => {
  return amount - (amount * basisPoints) / 10000n
}

export async function sendTx(
  connection: Connection,
  tx: Transaction,
  payer: PublicKey,
  signers: Keypair[],
  customLog: any = null,
  priorityFees?: PriorityFee,
  commitment: Commitment = DEFAULT_COMMITMENT,
  finality: Finality = DEFAULT_FINALITY,
): Promise<TransactionResult> {
  let newTx = new Transaction()
  newTx.recentBlockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  console.log('newTx.recentBlockhash', newTx.recentBlockhash)

  if (priorityFees) {
    if (priorityFees.unitLimit) {
      const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
        units: priorityFees.unitLimit,
      })
      newTx.add(modifyComputeUnits)
    }
    if (priorityFees.unitPrice) {
      const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: priorityFees.unitPrice,
      })
      newTx.add(addPriorityFee)
    }
  }
  newTx.add(tx)

  try {
    let versionedTx = await buildVersionedTx(connection, payer, newTx, commitment)
    // 计算 VersionedTransaction 的字节大小
    // const size = versionedTx.serialize().length;
    // console.log(`VersionedTransaction 大小：${size} 字节`);
    versionedTx.sign(signers)

    // 模拟执行，使得提前发现错误，在前端也会有提示
    await connection.simulateTransaction(versionedTx)
    const sig = await connection.sendTransaction(versionedTx, {
      skipPreflight: false,
    })
    console.log('sig:', `https://solscan.io/tx/${sig}`)
    const aEle = `<a target='_blank' href='https://solscan.io/tx/${sig}'>Solscan</a>`
    customLog?.(`Transaction sent! View on ${aEle}`)
    let txResult = await getTxDetails(connection, sig, commitment, finality)
    if (!txResult) {
      customLog?.('❌ Transaction failed')
      return {
        success: false,
        error: 'Transaction failed',
      }
    }
    customLog(`✅ Transaction confirmed! View on ${aEle}`)
    return {
      success: true,
      signature: sig,
      results: txResult,
    }
  } catch (e) {
    if (e instanceof SendTransactionError) {
      let ste = e as SendTransactionError
      console.error('sendTx error: ', e)
      console.log(await ste.getLogs(connection))
    } else {
      console.error(e)
    }
    return {
      error: e,
      success: false,
    }
  }
}

export const buildVersionedTx = async (
  connection: Connection,
  payer: PublicKey,
  tx: Transaction,
  commitment: Commitment = DEFAULT_COMMITMENT,
): Promise<VersionedTransaction> => {
  const blockHash = (await connection.getLatestBlockhash(commitment)).blockhash

  let messageV0 = new TransactionMessage({
    payerKey: payer,
    recentBlockhash: blockHash,
    instructions: tx.instructions,
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}

export const getTxDetails = async (
  connection: Connection,
  sig: string,
  commitment: Commitment = DEFAULT_COMMITMENT,
  finality: Finality = DEFAULT_FINALITY,
): Promise<VersionedTransactionResponse | null> => {
  const latestBlockHash = await connection.getLatestBlockhash()
  await connection.confirmTransaction(
    {
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: sig,
    },
    commitment,
  )

  return connection.getTransaction(sig, {
    maxSupportedTransactionVersion: 0,
    commitment: finality,
  })
}
