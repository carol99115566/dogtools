export default {
  'component.viewTutorial': 'View Tutorial',

  // Common fields
  'component.common.formName.name': 'Name',
  'component.common.formName.address': 'Wallet Address',
  'component.common.formName.balance': 'SOL Balance',
  'component.common.formName.tokenBalance': 'Token Balance',
  'component.common.formName.privateKey': 'Private Key',

  'component.adView.item1': '🔥🔥🔥 Beta phase, all products at half price!',
  'component.adView.item2':
    '🔐🔐🔐 Any private key you provide is only used for local signing and will not be stored by us.',
  'component.adView.item3':
    '📢📢📢 We recommend using the wallet management feature to easily view wallet balances and efficiently select wallets for private key operations.',

  'component.amountInputModal.title': 'Enter Amount',
  'component.address-modal.title': 'Please enter the token address to be cloned',

  'component.authoritySwitch.metaItemTitle': 'Revoke Update (Immutable)',
  'component.authoritySwitch.metaItemMessage':
    'Revoke ownership means you will no longer be able to modify token metadata. This helps reassure investors.',
  'component.authoritySwitch.freezeItemTitle': 'Revoke Freeze',
  'component.authoritySwitch.freezeItemMessage':
    'Revoke Freeze Authority means you cannot restrict specific accounts from sending transactions. DogTools supports tokens with unrevoked freeze authority to create markets.',
  'component.authoritySwitch.mintItemTitle': 'Revoke Mint',
  'component.authoritySwitch.mintItemMessage':
    'Revoke Mint Authority is necessary for investor confidence and token success. Without minting authority, you will not be able to increase token supply.',

  'component.bulkPrivatekeySelect.formName.address': 'Wallet Address',
  'component.bulkPrivatekeySelect.formName.balance': 'SOL Balance',
  'component.bulkPrivatekeySelect.formName.tokenBalance': 'Token Balance',
  'component.bulkPrivatekeySelect.formName.action': 'Action',
  'component.bulkPrivatekeySelect.formName.amountInput.buy': 'Buy Amount (SOL)',
  'component.bulkPrivatekeySelect.formName.amountInput.muti-sender': 'Transfer Quantity',
  'component.bulkPrivatekeySelect.formName.amountInput.muti-swap': 'Expenditure Amount',
  'component.bulkPrivatekeySelect.formName.amountInput.actionName': 'Batch Input',
  'component.bulkPrivatekeySelect.formName.amountInput.tooltip':
    'If an amount is entered, the transaction will use the specified amount. \nIf not, the transaction will use the amount set in transaction details.',
  'component.bulkPrivatekeySelect.formName.placeholder.buy': 'Enter buy amount',
  'component.bulkPrivatekeySelect.formName.placeholder.muti-sender': 'Enter transfer amount',
  'component.bulkPrivatekeySelect.formName.placeholder.muti-swap': 'Default to the amount set in transaction details',
  'component.bulkPrivatekeySelect.batch-collect-title.name': 'Collect Amount',
  'component.bulkPrivatekeySelect.batch-collect-title.extra-view.actionName': 'Set',
  'component.bulkPrivatekeySelect.batch-collect-title.extra-view.option0': 'All',
  'component.bulkPrivatekeySelect.batch-collect-title.extra-view.option1': 'Collect Amount',
  'component.bulkPrivatekeySelect.batch-collect-title.extra-view.option2': 'Retain Amount',
  'component.bulkPrivatekeySelect.batch-collect-title.extra-view.title': 'Set Amount',
  'component.bulkPrivatekeySelect.batch-collect-title.extra-view.placeholder-send': 'Enter collect amount',
  'component.bulkPrivatekeySelect.batch-collect-title.extra-view.placeholder-retain': 'Enter wallet retain balance',
  'component.bulkPrivatekeySelect.trans-result.non-execution': 'non-execution',
  'component.bulkPrivatekeySelect.formAction.manualInput': 'Manual Input',
  'component.bulkPrivatekeySelect.formAction.privateSelect': 'Local Wallet',
  'component.bulkPrivatekeySelect.formAction.upload': 'Upload File',
  'component.bulkPrivatekeySelect.tooltip.refresh': 'Refresh Balance',
  'component.bulkPrivatekeySelect.formName.trans-result': 'Transaction Result',

  'component.jitoMEVFeeView.tooltip':
    "Jito MEV Anti-Sandwich Mode assigns your transaction a dedicated 'lane', ensuring one-third of each block space is reserved for Jito operations on Solana. \nBundled with fixed positions, this feature enables liquidity creation and purchasing transactions to go on-chain simultaneously. \nUsers can pay miner 'tips' to prioritize transactions, where higher fees mean faster processing.",
  'component.jitoMEVFeeView.title': 'Jito MEV Tip',
  'component.jitoMEVFeeView.title.tip': 'One-time Payment',
  'component.jitoMEVFeeView.speed.item1': 'Default',
  'component.jitoMEVFeeView.speed.item2': 'High',
  'component.jitoMEVFeeView.speed.item3': 'Ultra-High',

  'component.choiceInputView.brushNumber.title': 'Volume Brushing Times (one buy and sell counts as one)',
  'component.choiceInputView.markerBuyers.title': 'Number of Buy Addresses',
  'component.choiceInputView.slipPoint.title': 'Slippage Setting',
  'component.choiceInputView.slipPoint.item1Label': 'Automatic',

  'component.encryptDecryptView.password.placeHolder': 'Enter password',
  'component.encryptDecryptView.password.error': 'Incorrect password',
  'component.encryptDecryptView.tip.enable':
    'You have not enabled local private key management. Please set an encryption password and enable management.',
  'component.encryptDecryptView.actionName.enable': 'Enable Management',
  'component.encryptDecryptView.actionName.unlock': 'Unlock',
  'component.encryptDecryptView.actionName.goManage': 'Go to Management',
  'component.encryptConformContent.tip.enable':
    'You have not enabled local private key management. Please enable management.',
  'component.encryptDecryptView.actionName.forgetPassword': 'Forgot Password?',
  'component.encryptDecryptView.actionName.forgetPassword.tip':
    'We cannot recover private key data. This operation will clear your locally saved private key data. After clearing, you will need to re-enable management.',
  'component.encryptDecryptView.actionName.forgetPassword.oktext': 'Confirm Clear',

  'component.mainWalletChooseView.anti-mev.wallet': 'Wallet Transactions',
  'component.mainWalletChooseView.anti-mev.private': 'Private Key Transactions',

  'component.privateKeyInput.formName.privatekey': 'Private Key',
  'component.privateKeyInput.formName.privatekey.placeholder': 'Enter or import private key',
  'component.privateKeyInput.action.privatekey-select': 'Import from Main Wallet Management',

  'component.randomOrFixedInput.switch.name': 'Random',

  'component.selectTokenLogo.tip.format': 'Supported formats: WEBP / PNG / GIF / JPG / JPEG',
  'component.selectTokenLogo.tip.size': 'Recommended size: 1000×1000 pixels',

  'component.showEncryptDecConfirm.normalPrivate': 'Do not show your private key to anyone.',
  'component.showEncryptDecConfirm.unlock': 'Enter your password to unlock the wallet.',

  'component.walletsConclusionView.formName.addressCount': 'Number of Addresses',
  'component.walletsConclusionView.formName.feeAmount': 'Total Service Fee',
  'component.walletsConclusionView.formName.multi-senfer.allAmount': 'Total Transfer Amount',
  'component.walletsConclusionView.formName.multi-senfer.allTxNumber': 'Total Transactions',
  'component.walletsConclusionView.formName.batch-collection.allAmount': 'Total Collect Amount',
  'component.walletsConclusionView.formName.multi-swap.allAmount': 'Total Transaction Volume',
  'component.walletsConclusionView.formName.bundled-sell.allAmount': 'Total Sell Amount',
  'component.walletsConclusionView.formName.maker-buyers.allAmount': 'Total Buy Amount',
  'component.walletsConclusionView.formName.txNumber': 'Transaction Volume',

  'component.serviceFee.multi-sender.name': 'Start Multi Sender',
  'component.serviceFee.multi-sender.firstText':
    'Lowest service fee across the network, each transaction only requires ',
  'component.serviceFee.batch-collection.name': 'Start Collection',
  'component.serviceFee.batch-collection.firstText': 'Lowest service fee across the network, each address only',
  'component.serviceFee.reclaim-rent.name': 'Reclaim all SOL',
  'component.serviceFee.reclaim-rent.firstText': 'Lowest service fee across the network, service fee is only ',
  'component.serviceFee.batch-reclaim-rent.name': 'Reclaim all SOL',
  'component.serviceFee.batch-reclaim-rent.firstText': 'Lowest service fee across the network, service fee is only ',
  'component.serviceFee.pump-launch-buy.name': 'Pump Launch and Buy',
  'component.serviceFee.pump-launch-buy.firstText':
    'Lowest service fee across the network with tiered pricing, Each address costs as low as ',
  'component.serviceFee.bundled-sell.name': 'Bundled Sell',
  'component.serviceFee.bundled-sell.firstText':
    'Lowest service fee across the network with tiered pricing, Each address costs as low as ',
  'component.serviceFee.maker-buyers.name': 'Start',
  'component.serviceFee.maker-buyers.firstText':
    'Lowest service fee across the network, with each new address buy costing only ',
  'component.serviceFee.multi-swap.name': 'Start Batch Transactions',
  'component.serviceFee.multi-swap.firstText': 'Lowest service fee across the network, each transaction only requires ',
  'component.serviceFee.micro-trading.name': 'Start Micro-Trading',
  'component.serviceFee.micro-trading.firstText':
    'Lowest service fee across the network, each transaction only requires ',
  'component.serviceFee.anti-mev.name': 'Start Volume Brushing',
  'component.serviceFee.anti-mev.firstText': 'Lowest service fee across the network, each volume brushing only ',
  'component.serviceFee.bundled-buy.name': 'Bundled Buy',
  'component.serviceFee.bundled-buy.firstText': 'Lowest service fee on the network, Each address costs as low as ',
  'component.serviceFee.sell-bundled-buy.name': 'Sell and Buy',
  'component.serviceFee.sell-bundled-buy.firstText': 'Lowest service fee on the network, Each address costs as low as ',
  'component.serviceFee.new-address-buy-holders.name': '2 Start Trading',
  'component.serviceFee.new-address-buy-holders.firstText':
    'Lowest service fee on the network, with each new address buy costing only ',
  'component.serviceFee.market-making.name': 'Activate',
  'component.serviceFee.market-making.firstText': 'Lowest service fee on the network, each transaction only requires ',

  'component.serviceFee.normal-token-create.name': 'Create Token',
  'component.serviceFee.tax-token-create.name': 'Create Tax Token',
  'component.serviceFee.token-bundle-buy.name': 'Create Liquidity and Buy',
  'component.serviceFee.token-bundle-buy.firstText':
    'Lowest service fee for creating liquidity across the network.\nPer address for buy transactions.',
  'component.serviceFee.token-mint.name': 'Mint Token',
  'component.serviceFee.freeze-account.name': 'Start Freezing',
  'component.serviceFee.auto-freeze-account.name': 'Auto Freezing',
  'component.serviceFee.thaw-account.name': 'Unfreeze Account',
  'component.serviceFee.token-burn.name': 'Burn Token',
  'component.serviceFee.token-update.name': 'Update Token',
  'component.serviceFee.create-openbood-id.name': 'Create Market',
  'component.serviceFee.create-liquidity.name': 'Create Liquidity',
  'component.serviceFee.remove-liquidity.name': 'Remove Liquidity',
  'component.serviceFee.burn-liquidity.name': 'Burn Liquidity',

  'component.serveButton.tiptool.address': 'Bundled addresses',
  'component.serveButton.tiptool.every': 'each costing',
  'component.serveButton.firstText.normal': 'Lowest service fee on the network',
  'component.serveButton.name.connectWallet': 'Please click the top right to select a wallet',
  'component.serveButton.name.stop': 'Stop',
  'component.serviceFee.token-revoke-authority.name': 'Revoke Permission',

  'component.tokenSelect.placeholder.justSelect': 'Please select a token',
  'component.tokenSelect.placeholder.selectAndInput': 'Please select or input a token address',
  'component.tokenSelect.tip.balance': 'Balance',

  'component.walletInputModal.address.name': 'Address list, one wallet address per line',
  'component.walletInputModal.privateKey.name': 'Private key list, one private key per line',
  'component.walletInputModal.buy.name': 'Recipient address list',
  'component.walletInputModal.buy.placeholder': 'Each line should include an address and amount, separated by a comma',
  'component.walletInputModal.name.name': 'Name',
  'component.walletInputModal.name.placeholder': 'Please enter a name',
  'component.walletInputModal.error': 'Error on line {lines}',
  'component.walletSelectModal.title.choose': 'Please select a wallet',
  'component.walletSelectModal.tip.result': 'A total of {count} wallets selected',
  'component.walletSelectModal.tip.none':
    "You haven't imported batch wallets yet. Please go to batch wallet management to import them",
  'component.walletSelectModal.sureName.noneWallet': 'Go to Import',
  'component.walletSelectModal.sureName.sure': 'Confirm',

  'component.walletSelectModal.mainForm.count': 'Number of Wallets',

  'component.proformSelectJitoRPC.name': 'Block Processing Engine',
  'component.proformSelectJitoRPC.tooltip':
    "To improve the success rate of on-chain operations, please select the block processing engine closest to your geographical location to minimize network latency.\nJito's block processing engines are distributed across key regions worldwide, such as Amsterdam, Frankfurt, New York, and Tokyo. Selecting the appropriate engine not only optimizes processing speed but also enhances transaction stability.",

  'component.validator.pump-launch-buy.empty': 'Please select a purchase wallet',
  'component.validator.pump-launch-buy.limit': 'A maximum of {limit} purchase wallets is supported',
  'component.validator.pump-launch-buy.amount-empty': 'Error on line 【 {lines} 】: Purchase amount cannot be empty',
  'component.validator.pump-launch-buy.balance-insuff':
    'Error on line 【 {lines} 】: Insufficient SOL balance. Your wallet must have at least [Purchase Amount (SOL) + 0.00203928 SOL (ATA account rent) + {serveFee} SOL (Service Fee)]',
  'component.validator.multi-sender.empty': 'Please select or input recipient wallet addresses',
  'component.validator.multi-sender.amount-empty': 'Error on line {lines}: Transfer amount is empty, please input',
  'component.validator.multi-sender.limit-sol':
    'When sending SOL, the number of recipient addresses cannot exceed {maxWallets}',
  'component.validator.multi-sender.limit-token':
    'When sending tokens, the number of recipient addresses cannot exceed {maxWallets}',
  'component.validator.multi-sender.total-balance-insuff':
    'Insufficient balance, token balance must be greater than the total transfer amount',
  'component.validator.batch-collection.empty': 'Please select or input the addresses to be collected',
  'component.validator.batch-collection.amount-empty': 'Error on line {lines}: Collection amount cannot be 0',
  'component.validator.batch-collection.limit-sol':
    'When collecting SOL, the number of collection addresses cannot exceed {maxWallets}',
  'component.validator.batch-collection.limit-token':
    'When collecting tokens, the number of collection addresses cannot exceed {maxWallets}',
  'component.validator.bundled-sell.empty': 'Please input or select a selling wallet',
  'component.validator.bundled-sell.limit': 'A maximum of 29 wallets is supported',
  'component.validator.bundled-sell.amount-empty': 'Error on line {lines}: Token balance cannot be 0',
  'component.validator.token-wallet': 'Please input a correct wallet address',
  'component.validator.token-address': 'Please input a correct token address',
  'component.validator.private-key': 'Please input a correct wallet private key',
  'component.validator.wallet-empty': 'Please input or select a private key',
  'component.validator.batch-rent-recovery.empty': 'Please enter or select the wallet(s) to recover rent from',
  'component.validator.batch-rent-recovery.wallet-account-empty':
    'Error on line {lines}: The number of accounts cannot be 0. Please delete it and try again.',
  'component.validator.batch-rent-recovery.total-account-empty': 'The number of accounts to recover cannot be 0',
  'component.validator.market-making.transaction-amount': 'Please enter the single transaction volume',

  'component.log-transaction-view.formName.time': 'Time',
  'component.log-transaction-view.formName.amount': 'Transaction Amount',
  'component.log-transaction-view.formName.swapType': 'Transaction Type',
  'component.log-transaction-view.formName.result': 'Execution Result',

  'component.walletFileUploadModal.title': 'Please upload a file',
  'component.walletFileUploadModal.content.title': 'Click or drag file to this area to upload',
  'component.walletFileUploadModal.content.tip': 'Supported file types: Excel / CSV / TXT / JSON',
  'component.walletFileUploadModal.template': 'Template File',

  'component.check-authority.title': 'Check Permissions',
  'component.check-authority.mine': 'Not Revoked',
  'component.check-authority.off': 'Revoked',
  'component.check-authority.other': 'Not Owned',

  'component.tagSelect.expand': 'Expand',
  'component.tagSelect.collapse': 'Collapse',
  'component.tagSelect.all': 'All',
};
