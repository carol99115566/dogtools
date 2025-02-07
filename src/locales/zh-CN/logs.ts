export default {
  'logs.common.sign': '准备签名交易',
  'logs.common.check-tx': '验证交易',
  'logs.common.error-network-tip':
    '<br /><strong>可能网络繁忙</strong>。建议增加 Jito 的小费，并考虑在链上活跃度较低的时段再次尝试',
  'logs.common.error-timeout-tip':
    '交易在{second}秒内未被确认。<br /><strong>可能网络繁忙</strong>。建议在链上活跃度较低的时段再次尝试',
  'logs.common.jito-failed-tip': `<br /><strong>可能是您余额不足</strong>，请检查您的余额<br /><strong>可能网络繁忙</strong>，请稍后再次尝试`,
  'logs.common.transaction-timeout': '交易提交超时，正在为您自动重试',
  'logs.common.tx-send-timeout': '交易提交超时',
  'logs.common.simulate-transaction': '模拟交易',
  'logs.common.simulate-transaction.error': '❌ 第 {number} 个交易模拟失败: <strong>{errorReason}</strong>',
  'logs.common.send-bundle': '发送捆绑交易',
  'logs.common.send-tx': '发送交易',
  'logs.common.waiting-conformation': '等待交易确认',
  'logs.common.send-jito.error.not-found': '❌ 未在捆绑状态中找到交易',
  'logs.common.send-jito.error.get-result': '获取最终捆绑状态时出错：',
  'logs.common.send-jito.error.bundle-handle-error': '捆绑处理失败：',
  'logs.common.send-jito.error.send-or-confirm': '发送或确认捆绑时出错：',
  'logs.common.send-jito.error.normal': '交易失败',
  'logs.common.send-jito.error.timeout':
    '抱歉，获取交易处理状态<strong>超时</strong>，请前往<a target="_blank" href="https://solscan.io/">solscan</a>检查',
  'logs.common.error.normal-simulate': '交易模拟失败',
  'logs.common.error.request-timeout':
    '请求超时，请检查您的网络。请注意，我们不向中国大陆提供服务。如您在中国大陆旅行，请连接VPN',
  'logs.common.stop-execution': '停止执行',
  'logs.common.stop-execution-ing': '任务停止中...',
  'logs.common.user-stop-task': '用户停止了任务',

  'logs.anti-mev.checkCoin': '检查代币信息',
  'logs.anti-mev.checkCoin.error.not-pump':
    '这个不是pump.fun的代币。<strong>请选择 pump.fun 平台的代币。</strong>或切换到其他DEX平台',
  'logs.anti-mev.checkCoin.error.pump-complete': '绑定曲线已完成。<strong>请切换到Raydium进行交易。</strong>',
  'logs.anti-mev.checkCoin.error.not-buy': '该代币尚未被购买。<strong>请前往 pump.fun 进行首次购买。</strong>',
  'logs.anti-mev.checkCoin.error.or-not-buy': '或者该代币尚未被购买。<strong>请前往 pump.fun 进行首次购买。</strong>',
  'logs.anti-mev.time-interval': '{waitSecond} 秒后将执行下一笔刷量',
  'logs.anti-mev.indexSpan': '第 {theTime} 笔刷量',

  'logs.multi-sender.check-tx': '无法向第 {line} 行 {address} 转账，因为转账金额不足以支付账户初始化租金',
  'logs.multi-sender.build-transaction': '构造交易',
  'logs.multi-sender.prepare-build-transaction': '准备构造交易',

  'logs.multi-swap.time-interval': '{waitSecond} 秒后将执行下一笔交易',
  'logs.multi-swap.normal-swap': '第 {theTime} 笔交易。交易钱包：{address}',

  'logs.maker-buyers.error.timeout': '提交超时，未找到 Blockhash',

  'logs.micro-trading.time-interval': '{waitSecond} 秒后将执行下一笔刷单',

  'logs.launch-and-buy.create-coin': '构造创建交易',
  'logs.launch-and-buy.create-other': '构造其他买入钱包的交易',

  'logs.create-token.upload-image': '上传图片',
  'logs.create-token.config-meta': '构造元数据',
  'logs.create-token.token-address': '代币地址',
};
