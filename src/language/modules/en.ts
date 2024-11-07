export default {
  login: {
    confirm: 'Login',
    reset: 'Reset',
    introduce: `DevTools is a platform focused on providing services for token issuer, allowing you to quickly{' '}
          <strong>create tokens</strong> with one click and <strong>get the bottom tokens</strong>.
          <br />
          <br />
          No technical background is required, and there's no need to rely on professional technical personnel—create
          tokens anytime, 24/7.
          <br />
          <br />
          TG Group(中文)：<a href="https://t.me/devtools_meme_zh">https://t.me/devtools_meme_zh</a>
          <br />
          TG Group(English)：<a href="https://t.me/devtools_meme">https://t.me/devtools_meme</a>
          <br />
          <br />
          <br />`,
  },
  profile: {
    myAcount: 'My Account',
    logout: 'Log out',
    myReferral: {
      name: 'My Referral',
      linkName: 'Invitation Link',
      rateName: 'My Commission Rate',
      rateLevel1: 'Level 1 Rate',
      rateLevel2: 'Level 2 Rate',
      dataOverview: 'Data overview',
      withdraw: 'withdraw',
      commissionAmt: 'Commission Amt（SOL）',
      referredUser: 'Referred User',
      chain: 'Chain',
      totalAmt: 'Total Amt',
      distributedAmt: 'Distributed Amt',
      avilableAmt: 'Available Amt',
      frozenAmt: 'Frozen Amt',
      action: 'Action',
      withdrawHistory: 'Withdraw History',
      appliedAmt: 'Applied Amt',
      appliedAddress: 'Applied address',
      appliedTime: 'Applied time',
      status: 'Status',
    },
  },
  header: {
    menu0: 'bundle',
    menu1: 'snipe',
  },
  home: {
    item0: {
      name: 'Bundle',
      title: '<strong>100%</strong> buy at the lowest price！',
      subTitle: 'No technical background required!\neasily issue tokens and acquire them at the lowest price！',
      mainButton: 'Bundle Now',
      subButton: 'View Docs',
    },
    item1: {
      name: 'Snipe',
      title: 'Immediately purchase upon detecting the token issuance！',
      support: 'support',
      mainButton: 'Bundle Now',
      subButton: 'View Docs',
    },
  },
  menuList: {
    createWallet: 'Batch Wallet Generation',
    walletManage: 'Wallet Manage',
    tokenGroup: 'Token',
    walletGroup: 'wallet',
    sol: {
      pump: 'Pump Launch and Buy',
      supe: 'Supe Bulk Purchase',
    },
  },
  snipe: {
    tip1: 'The sniping process may take a few seconds, during which other sniping bots might get ahead.',
    tip2: 'Limited-time free offer; the charging period is yet to be determined.',
    form: {
      sunpumpDes: 'The First Meme Fair Launch Platform on Tron',
      flapDes: 'The Meme Fair Launch Platform on BSC',
      launcherAddress: 'Launcher Address',
      launcherAddressPlaceHolder: 'The wallet address of token creator you want snipe',
      buttonName: 'Start Snipe',
    },
    loading: {
      beginSnipe: 'Sniper monitoring, please',
      flapBeginObserver: 'Detected!!! contractAddress is',
      sunpumpObserver: 'Detected!!! transaction_id is',
      sunpumpObserverAddress: 'Detected!!! contractAddress is',
      observerError: '❌ observerTokenCreated failed:',
      beginBuy: 'Initiating buy ',
      transferComplete: '✅ Transfer transaction confirmed! View on ',
      transferFailed: '❌ Transfer transaction failed: ',
      purchaseComplete: '✅ Purchase transaction confirmed! View on ',
      purchaseFailed: '❌ Purchase transaction failed: ',
    },
  },
  bundle: {
    tip: '🔥🔥🔥 Limited-time discount, as low as 10%!',
    issuerWalletPlacehoder: 'Please select wallet',
    buyerWalletsPlacehoder: 'Please select buyer wallets',
    emptyMessage: 'No data\n Please use a secondary account, and ensure the wallet does not hold too much balance.',
    createAndBuldName: 'Create & Bundle Purchase',
    loading: {
      beginCheck: '【Checking balance】',
      checkSuccess: '✅ Check successful.',
      checkFailed: '❌ Insufficient balance, At least {totalFee} ETH are required.',
      beginCreate: '【Begin deploying token】',
      createSuccess: '✅ Deploy successful, tokenAddress',
      createFailed: '❌ Deploy failed',
      beginPrepareLiquidity: '【Start preparing funds to add liquidity】',
      prepareSuccess: '✅ Preparation successful.',
      prepareFailed: '❌ Preparation failed',
      beginBundle: '【Start bundling transactions】',
      bundleSuccess: '✅ Bundling successful.',
      bundleFailed: '❌ Bundling failed',
      bundleRetry: 'Insufficient priority gas fee, automatically increase by 50% to {newGas} GWEI and retry.',
    },
    checkBuyerWallet: {
      privateKeyError: "Can't setup wallet from {privateKey}, please check.\nError message: {error}",
      insufficientError: 'Insufficient balance: {privateKey}\nPlease reserve another 0.01 {chain} for gas fee',
    },
    pumpFunForm: {
      loading: {
        begin: 'Start...',
        error: '❌ Cannot bundle, boundingCurve already exist!',
        transactionFailed: '❌ Transaction failed',
        transactionSent: 'CreateAndBuy transaction sent! View on ',
        confirmed: '✅ CreateAndBuy transaction confirmed! View on ',
        urlDes: 'Coin url',
      },
      name: 'name',
      ticker: 'ticker',
      description: 'description',
      image: 'image',
      showMore: 'show more options',
      hideMore: 'hide more options',
      issuerWallet: "issuer's wallet",
      buttonName: 'Start Bundle',
      feeButtonName: 'About Fees',
      feeTitle: 'Fee Description',
      twitterLink: 'twitter link',
      telegramLink: 'telegram link',
      website: 'website',
      feeContent: `1. For each buyer wallet, <strong class="text-decoration-line">5%</strong>（
					<strong class="text-sale-price">0.5%</strong>） of the purchase amount is charged,
					<br />
					up to a <strong>maximum</strong> of <strong class="text-decoration-line">0.05 SOL</strong>（
					<strong class="text-sale-price">0.005 SOL</strong>）
					<br />
					<strong class="text-sale-price">🔥🔥🔥 Limited-time discount, as low as 10%</strong>`,
    },
    ethForm: {
      createTitle: 'Mint your token',
      createDes: '(total supply: 420,690,000,000; decimals: 9)',
      openBulkTitle: 'openTrading & Bulk purchase',
      name: 'name',
      symbol: 'symbol',
      description: 'description',
      descPlacehoder: `The description displayed in the header of the contract code. that you can use to introduce The website, TG, X, etc.  example：\nTG: https://t.me/...\nX: https://x.com/...\nWeb: https://www...`,
      taxRate: 'tax rate',
      taxRateAnswer:
        "The collected tax will be stored in the smart contract address. Before each user sells tokens, the smart contract will automatically sell an equivalent amount of tokens from the collected taxes and transfer the resulting ETH to the token issuer's wallet",
      taxRatePlacehoder: 'Tax rate for buying and selling. default is 15',
      taxTimes: 'tax times',
      taxTimesAnswer:
        'Before the first ${taxTimes} buy transactions, all buy and sell transactions will be taxed according to the ${taxRate}',
      taxTimesPlaceholder: 'Times of tax collecttions for buying and selling. default is 10',
      receiveAddress: 'receive address',
      receiveAddressAnswer:
        'After the smart contract automatically sells the tokens, the received ETH will be transferred to the recipient wallet.',
      receiveAddressPlaceholder: 'Please enter the recipient wallet address. (default is the current issuer)',
      ethAmount: 'amount',
      ethAmountAnswer: 'All tokens(420,690,000,000) and ${amount} ETH will be used to add liquidity.',
      ethAmountPlaceholder: 'Amount of ETH used for adding liquidity. default is 1 ETH',
      buttonName: 'Start Bundle',
      feeContent: `<div>
                1. A total of <strong className="text-decoration-line">0.03 ETH</strong>（
                <strong className="text-sale-price">0.003 ETH</strong>） is charged for token issuance and adding
                liquidity.
                <br />
                2. For each buyer wallet, <strong className="text-decoration-line">5%</strong>（
                <strong className="text-sale-price">0.5%</strong>） of the purchase amount is charged, up to a{' '}
                <strong>maximum</strong> of <strong className="text-decoration-line">0.01 ETH</strong>（
                <strong className="text-sale-price">0.001 ETH</strong>）
                <br />
                <strong className="text-sale-price">🔥🔥🔥 Limited-time discount, as low as 10%</strong>
              </div>`,
    },
    supeForm: {
      NFTUrl: 'NFT url',
      mintNumber: 'mint number',
      mintWallets: 'mint wallets',
      mintWalletsPlaceholder: 'Please select mint wallets',
      authorityTip: `
            To use this feature, you need to activate a membership.
            <br />
            Membership Fee: <strong>1 SOL per month </strong>.
            <br />
            <br />
            <strong>Steps to activate:</strong>
            <br />
            <strong>1.</strong> Transfer <strong>1 SOL</strong> membership fee to 
            <strong>GWWa7UcBKFUQfFJcc2eU5ZpGyrN1xNrfrkxg285S1K4G</strong>.
            <br />
            <strong>2.</strong> Join any of the following Telegram group:
            <br />
            TG Group(中文)：<a href="https://t.me/devtools_meme_zh">https://t.me/devtools_meme_zh</a>
            <br />
            TG Group(English)：<a href="https://t.me/devtools_meme">https://t.me/devtools_meme</a>
            <br />
            Send the <strong>transfer transaction ID</strong> and your <strong>UserId</strong>(Hover over the profile
            icon at the top right to view) to the group, @ the admin.
            <br />
            <strong>3.</strong> Once the admin enables your membership, you’ll be able to use this feature.
          `,
      mintName: 'Batch mint',
      batchAggregation: 'Batch Aggregation',
    },
  },
  manager: {
    walletManage: 'Wallet Manage',
    createName: 'Add',
    formName: 'Name',
    formChain: 'Chain',
    formChainPlaceholder: 'Please select the chain',
    formWalletInfoName: '',
    formBuyWalletInfoName: '',
    formAction: 'action',
    actionEdit: 'Edit',
    actionDelete: 'Delete',
    actionDetail: 'Detail',
    deleteConfirm: 'Are you sure you want to delete?',
    balance: 'balance\n({chain})',
    purchaseAmount: 'Purchase({chain})',
    receivingAddress: 'Receive Address',
    privateKeyName: 'Private Key',
    count: 'count',
    tokenManage: {
      tabName: 'Token Manage',
      tablePlantform: 'platform',
      tableToken: 'token',
      tableIsOpenTrade: 'Enable trading?',
      actionDetail: 'Detail',
      openTrade: 'Enabled',
      disOpen: 'Disabled',
      viewOn: 'View on {platform}',
    },
    issuerWallet: {
      name: "issuer's wallet manage",
      creatName: 'Create Wallet',
      editName: 'Edit Wallet',
      privateKeyName: 'Private Key',
      namePlaceholder: "Please input the wallet's name, eg: Wallet 1",
      privateKeyInvalid: 'Private key is invalid, please check',
      privateKeyPlaceholder: "Please input the wallet's private key",
    },
    buyerWallet: {
      name: 'buyer wallets manage',
      namePlaceholder: 'Please input the name, eg: Buyer Wallets 1',
      buyerWalletName: 'Buyer Wallets',
      buyerWalletPlaceholder:
        "The buyer wallet's [private key] and [{ethName} amount]{receiverTip}, separate with commas. \nOne line per wallet\n\nExample:\n{buyerWalletEg}",
      buyerWalletPlaceholderExtra: " and [receiver's wallet address](optional)",
      limitErrorMessage: 'Support up to 8 buyer wallets at the same time.',
      formatErrorMessage: 'Line {index} format error, please separate with commas',
      privateKeyInvalidMessage: 'Line {index} private key is invalid, please check.',
      receiverAddresErrorMessage: "Line {index} receiver's wallet address format error, please check",
      creatName: 'Create Buyer Wallets',
      editName: 'Edit Buyer Wallets',
    },
    createWallets: {
      name: 'Batch Create Wallets',
      count: 'count',
      createButton: 'create',
      transferBtn: 'Bulk Transfer',
      saveBtn: 'Save to Wallet Management',
      wallet: {
        address: 'address',
        privateKey: 'private key',
      },
    },
    bulkTransfer: {
      name: 'Bulk Transfer',
      privateKey: 'private key',
      privateKeyPlaceholder: 'Please enter the transfer wallet private key',
      amount: 'amount',
      amountPlaceholder: 'Please enter the transfer amount',
    },
  },
  common: {
    buyerWallets: 'buyer wallets',
    issuerWallet: "issuer's wallet",
    issuerWalletPlacehoder: 'Please select wallet',
    buyerWalletsPlacehoder: 'Please select the buyer wallets',
    feeButtonName: 'About Fees',
    feeTitle: 'Fee Description',
    tokenDetail: {
      name: 'name',
      symbol: 'symbol',
      contractAddress: 'contract address',
    },
  },
}
