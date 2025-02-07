export default {
  'logs.common.sign': 'Preparing to sign the transaction',
  'logs.common.check-tx': 'Verifying the transaction',
  'logs.common.error-network-tip':
    '<br /><strong>The network may be busy</strong>. It is recommended to increase the Jito tip and consider retrying during off-peak activity on the chain.',
  'logs.common.error-timeout-tip':
    'Transaction failed to confirm within {second}s. <br /><strong>The network may be busy</strong>. It is recommended to consider retrying during off-peak activity on the chain.',
  'logs.common.jito-failed-tip': `<br /><strong>Maybe your balance is insufficient</strong>, please check your balance<br /><strong>Maybe the network is busy</strong>, please try again later`,
  'logs.common.transaction-timeout': 'Transaction submission timeout, automatically retrying for you',
  'logs.common.tx-send-timeout': 'Transaction submission timeout',
  'logs.common.simulate-transaction': 'Simulating transaction',
  'logs.common.simulate-transaction.error':
    '❌ Simulation failed for transaction {number}: <strong>{errorReason}</strong>',
  'logs.common.send-bundle': 'Sending bundled transaction',
  'logs.common.send-tx': 'Sending transaction',
  'logs.common.waiting-conformation': 'Waiting for transaction confirmation',
  'logs.common.send-jito.error.not-found': '❌ Transaction not found in bundled status',
  'logs.common.send-jito.error.get-result': 'Error retrieving final bundled status:',
  'logs.common.send-jito.error.bundle-handle-error': 'Bundled processing failed:',
  'logs.common.send-jito.error.send-or-confirm': 'Error sending or confirming the bundle:',
  'logs.common.send-jito.error.normal': 'Transaction failed',
  'logs.common.send-jito.error.timeout':
    'Sorry, <strong>timeout occurred</strong> in getting the transaction status. Please check at <a target="_blank" href ="https://solscan.io/">solscan</a>',
  'logs.common.error.normal-simulate': 'Transaction simulation failed',
  'logs.common.error.request-timeout':
    'Request timed out, please check your network. Note that we do not provide services to mainland China. If you are traveling in mainland China, please connect to a VPN.',
  'logs.common.stop-execution': 'Stop execution',
  'logs.common.stop-execution-ing': 'Stopping task...',
  'logs.common.user-stop-task': 'The user stopped the task',

  'logs.anti-mev.checkCoin': 'Checking if the token is valid',
  'logs.anti-mev.checkCoin.error.not-pump':
    'This token is not launched from pump.fun. <strong>Please select a token from the pump.fun platform.</strong> Or choose other dex platform',
  'logs.anti-mev.checkCoin.error.pump-complete':
    'The bonding curve is complete. <strong>Please select Raydium dex to trade.</strong>',
  'logs.anti-mev.checkCoin.error.not-buy':
    'This token has not been purchased. <strong>Please go to pump.fun for the initial purchase.</strong>',
  'logs.anti-mev.checkCoin.error.or-not-buy':
    'Or this token has not been purchased. <strong>Please go to pump.fun for the initial purchase.</strong>',
  'logs.anti-mev.time-interval': 'The next transaction will be executed after {waitSecond} seconds',
  'logs.anti-mev.indexSpan': 'Transaction {theTime}',

  'logs.multi-sender.check-tx':
    'Cannot transfer to line {line}, address {address}, as the transfer amount is insufficient to cover account initialization rent.',
  'logs.multi-sender.build-transaction': 'Constructing transaction',
  'logs.multi-sender.prepare-build-transaction': 'Prepare construct transaction',

  'logs.multi-swap.time-interval': 'The next transaction will be executed after {waitSecond} seconds',
  'logs.multi-swap.normal-swap': 'Transaction {theTime}. Wallet: {address}',

  'logs.maker-buyers.error.timeout': 'Submission timed out, Blockhash not found',

  'logs.micro-trading.time-interval': 'The next transaction will be executed after {waitSecond} seconds',

  'logs.launch-and-buy.create-coin': 'Constructing create transaction',
  'logs.launch-and-buy.create-other': 'Constructing transactions for other buyer wallets',

  'logs.create-token.upload-image': 'Upload Image',
  'logs.create-token.config-meta': 'Configure Metadata',
  'logs.create-token.token-address': 'Token Address',
};
