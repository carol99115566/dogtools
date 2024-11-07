export default {
  logout: '登出',
  login: {
    confirm: '登录',
    reset: '重置',
    introduce: `DevTools是一个<strong>专注服务发币dev的平台</strong>，帮您<strong>一键快速发币、并拿到底部筹码</strong>
<br />
<br />
无须您有技术背景，无须借助专业技术人员操作，24小时想发就发
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
    myAcount: '我的账户',
    logout: '退出登录',
    myReferral: {
      name: '我的推荐',
      linkName: '邀请链接',
      rateName: '我的佣金比例',
      rateLevel1: '一级比例',
      rateLevel2: '二级比例',
      dataOverview: '数据概览',
      withdraw: '提现',
      commissionAmt: '佣金金额（SOL）',
      referredUser: '推荐用户',
      chain: '链',
      totalAmt: '总金额',
      distributedAmt: '已分发金额',
      avilableAmt: '可用金额',
      frozenAmt: '冻结金额',
      action: '操作',
      withdrawHistory: '提现记录',
      appliedAmt: '申请金额',
      appliedAddress: '申请地址',
      appliedTime: '申请时间',
      status: '状态',
    },
  },
  header: {
    menu0: '捆绑',
    menu1: '狙击',
  },
  home: {
    item0: {
      name: '捆绑',
      title: '<strong>100%</strong> 买到最底部筹码！',
      subTitle: '无须您有技术背景，一键发币并拿到底部筹码！',
      mainButton: '去捆绑',
      subButton: '查看文档',
    },
    item1: {
      name: '狙击',
      title: '实时监听目标钱包的发币行为，一旦侦测到立刻为您批量买入！',
      support: '支持',
      mainButton: '去狙击',
      subButton: '查看文档',
    },
  },
  menuList: {
    createWallet: '批量生成钱包',
    walletManage: '钱包管理',
    tokenGroup: '代币',
    walletGroup: '钱包',
    sol: {
      pump: 'Pump 开盘并买入',
      supe: 'Supe 批量买入',
    },
  },
  snipe: {
    tip1: '狙击过程可能需要几秒钟，在此期间其他狙击机器人可能会抢先。',
    tip2: '限时免费，收费时间尚未确定。',
    form: {
      sunpumpDes: 'Tron 上首个 Meme 公平发射平台',
      flapDes: 'BSC 上的 Meme 公平发射平台',
      launcherAddress: '发币钱包地址',
      launcherAddressPlaceHolder: '您想要狙击的发币者的钱包地址',
      buttonName: '开始狙击',
    },
    loading: {
      beginSnipe: '开始狙击监控, please',
      flapBeginObserver: '已检测到！！！ 合约地址为',
      sunpumpObserver: '已检测到！！！ 交易 ID 为',
      sunpumpObserverAddress: '已检测到！！！ 合约地址为',
      observerError: '❌ 监听代币创建失败：',
      beginBuy: '开始购买 ',
      transferComplete: '✅ 转账交易已确认！查看链接：',
      transferFailed: '❌ 转账交易失败：',
      purchaseComplete: '✅ 购买交易已确认！查看链接：',
      purchaseFailed: '❌ 购买交易失败：',
    },
  },
  bundle: {
    tip: '🔥🔥🔥 内测阶段，限时一折！',
    issuerWalletPlacehoder: '请选择钱包',
    buyerWalletsPlacehoder: '请选择批量买入的钱包',
    emptyMessage: '暂无数据\n 请使用小号，钱包中不要放太多余额。',
    createAndBuldName: '发币并捆绑',
    loading: {
      beginCheck: '检查余额是否充足',
      checkSuccess: '✅ 检查成功',
      checkFailed: '❌ 余额不足, 您的钱包至少应有 {totalFee} ETH',
      beginCreate: '开始创建代币',
      createSuccess: '✅ 创建成功，代币地址',
      createFailed: '❌ 创建失败',
      beginPrepareLiquidity: '开始向合约转入添加流动性的资金',
      prepareSuccess: '✅ 转入成功',
      prepareFailed: '❌ 转入失败',
      beginBundle: '开始添加流动性并捆绑买入',
      bundleSuccess: '✅ 捆绑成功',
      bundleFailed: '❌ 捆绑失败',
      bundleRetry: 'gas 小费不足，自动为你增加 50% 到 {newGas} GWEI，并重新捆绑',
    },
    checkBuyerWallet: {
      privateKeyError: '您的私钥可能有误：{privateKey}, 请检查\n错误信息: {error}',
      insufficientError: '余额不足: {privateKey}\n还需要 0.01 {chain} 用于付手续费',
    },
    pumpFunForm: {
      loading: {
        begin: '开始...',
        error: '❌ 无法捆绑，boundingCurve 已存在！',
        confirmed: '✅ CreateAndBuy 交易已确认！查看链接：',
        urlDes: '代币链接',
        transactionFailed: '❌ 交易失败',
        transactionSent: 'CreateAndBuy 交易已发送！在此查看 ',
      },
      name: '名称',
      ticker: '符号',
      description: '描述',
      image: '头像',
      showMore: '显示更多选项',
      hideMore: '隐藏更多选项',
      issuerWallet: '发币钱包',
      buttonName: '发币并买入',
      feeButtonName: '关于服务费',
      feeTitle: '服务费细则',
      twitterLink: 'twitter链接',
      telegramLink: 'telegram链接',
      website: '网址',
      feeContent: `<div>1. 每个钱包会收取 <strong class="text-decoration-line">5%</strong>（
				  <strong class="text-sale-price">0.5%</strong>） 的服务费,
				  <br />
				  最高收 <strong class="text-decoration-line">0.05 SOL</strong>（
				  <strong class="text-sale-price">0.005 SOL</strong>）
				  <br />
				  <strong class="text-sale-price">🔥🔥🔥 限时一折折扣！</strong><div/>`,
    },
    ethForm: {
      createTitle: '创建代币',
      createDes: '(总供应量: 420,690,000,000; 精度: 9)',
      openBulkTitle: '添加流动性 & 捆绑买入',
      name: '名称',
      symbol: '符号',
      description: '描述',
      descPlacehoder: `描述会显示在智能合约代码的顶部, 一般用来描述网站、推特地址、telegram 地址等信息.  举例：\nTG: https://t.me/...\nX: https://x.com/...\nWeb: https://www...`,
      taxRate: '税率',
      taxRateAnswer:
        '收取的税会存在智能合约地址里. 每次用户卖出前, 智能合约会自动卖出等量的代币, 并将得到的 ETH 转到发币的钱包',
      taxRatePlacehoder: '买入和卖出的税率. 默认为 15%',
      taxTimes: '收税次数',
      taxTimesAnswer: '前 ${taxTimes} 次买入交易前, 会对所有的买入和卖出交易按照税率收税',
      taxTimesPlaceholder: '买入和卖出的收税次数. 默认为 10 次',
      receiveAddress: '收税钱包',
      receiveAddressAnswer: '智能合约自动卖出代币后, 获得的 ETH 将转到接收者钱包',
      receiveAddressPlaceholder: '请输入税费接收钱包地址。（默认为当前发币者的钱包地址）',
      ethAmount: 'ETH 数量',
      ethAmountAnswer: '所有的代币(420,690,000,000) 和 ${amount} ETH 数量的以太币将被用于添加流动性.',
      ethAmountPlaceholder: '用于添加流动性的以太币数量. 默认为 1 ETH',
      buttonName: '创建并批量购买',
      feeContent: `<div>
                1. 代币的创建和添加流动性总共收 <strong className="text-decoration-line">0.03 ETH</strong>（
                <strong className="text-sale-price">0.003 ETH</strong>).
                <br />
                2. 每个购买钱包收购买数量的 <strong className="text-decoration-line">5%</strong>（
                <strong className="text-sale-price">0.5%</strong>）, 最高收{' '}
                <strong>maximum</strong> of <strong className="text-decoration-line">0.01 ETH</strong>（
                <strong className="text-sale-price">0.001 ETH</strong>）
                <br />
                <strong className="text-sale-price">🔥🔥🔥 内侧阶段，限时一折！</strong>
              </div>`,
    },
    supeForm: {
      authorityTip: `
            要使用此功能，您需要激活会员资格。
            <br />
            会员费：<strong>每月 1 SOL</strong>。
            <br />
            <br />
            <strong>激活步骤：</strong>
            <br />
            <strong>1.</strong> 转账<strong>1 SOL</strong>会员费到 
            <strong>GWWa7UcBKFUQfFJcc2eU5ZpGyrN1xNrfrkxg285S1K4G</strong>。
            <br />
            <strong>2.</strong> 加入以下任一 Telegram 群组：
            <br />
            TG 群组(中文)：<a href="https://t.me/devtools_meme_zh">https://t.me/devtools_meme_zh</a>
            <br />
            TG 群组(英文)：<a href="https://t.me/devtools_meme">https://t.me/devtools_meme</a>
            <br />
            将<strong>转账交易 ID</strong>和您的<strong>用户 ID</strong>（将鼠标悬停在右上角的个人资料图标查看）发送到群组并@管理员。
            <br />
            <strong>3.</strong> 管理员激活您的会员资格后，您即可使用此功能。`,
      batchAggregation: '批量归集',
      mintName: '批量 mint',
    },
  },
  manager: {
    walletManage: '钱包管理',
    createName: '新增',
    formName: '名称',
    formChain: '链',
    formChainPlaceholder: '请选择所属链',
    formAction: '操作',
    actionEdit: '编辑',
    actionDelete: '删除',
    actionDetail: '详情',
    deleteConfirm: '确定要删除吗?',
    balance: '余额\n({chain})',
    purchaseAmount: '购买金额\n({chain})',
    receivingAddress: '接收地址',
    privateKeyName: '私钥',
    count: '钱包个数',
    tokenManage: {
      tabName: '代币管理',
      tablePlantform: '平台',
      tableToken: '代币',
      tableIsOpenTrade: '是否开启交易',
      actionDetail: '详情',
      openTrade: '已开启',
      disOpen: '未开启',
      viewOn: '前往 {platform} 查看',
    },
    issuerWallet: {
      name: '发币钱包管理',
      creatName: '创建钱包',
      editName: '编辑钱包',
      privateKeyName: '私钥',
      namePlaceholder: '请输入钱包名称，eg: Wallet 1',
      privateKeyInvalid: '私钥不合法，请检查',
      privateKeyPlaceholder: '请输入钱包私钥',
    },
    buyerWallet: {
      name: '购买钱包管理',
      namePlaceholder: '请输入名称, eg: Buyer Wallets 1',
      buyerWalletName: '购买钱包',
      buyerWalletPlaceholder:
        '购买钱包的 [private key] 和 [{ethName} 数量]{receiverTip}, 请用英文逗号分隔开. \n一行一个钱包\n\n例如:\n{buyerWalletEg}',
      buyerWalletPlaceholderExtra: ' 和 [接收者钱包地址](可选)',
      limitErrorMessage: '最多支持 8 个钱包.',
      formatErrorMessage: '第 {index} 行格式错误, 请用英文逗号分隔',
      privateKeyInvalidMessage: '第 {index} 行私钥不合法, 请检查.',
      receiverAddresErrorMessage: '第 {index} 行接收者钱包格式错误, 请检查',
      creatName: '创建购买钱包组',
      editName: '编辑购买钱包组',
    },
    createWallets: {
      name: '批量创建钱包',
      count: '数量',
      createButton: '创建',
      transferBtn: '一键批量转账',
      saveBtn: '保存到钱包管理',
      wallet: {
        address: '地址',
        privateKey: '私钥',
      },
    },
    bulkTransfer: {
      name: '批量转账',
      privateKey: '私钥',
      privateKeyPlaceholder: '请输入转账钱包私钥',
      amount: '金额',
      amountPlaceholder: '请输入转账金额',
    },
  },
  common: {
    buyerWallets: '购买钱包',
    issuerWallet: '发币钱包',
    issuerWalletPlacehoder: '请选择钱包',
    buyerWalletsPlacehoder: '请选择购买钱包',
    feeButtonName: '关于服务费',
    feeTitle: '服务费介绍',
  },
}
