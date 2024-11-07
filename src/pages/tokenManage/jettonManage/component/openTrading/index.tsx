import React, { createContext, useContext, useState, ReactNode } from 'react'
import styles from './index.less'
import { Input, Button, message, Form, notification } from 'antd'
import { requestBundle } from '@/services/api'
import { getSwapBuyers } from '@/utils/utils'
import { useGlobalContext } from '@/layouts/chainContext'
import { TransactionAccountNonce } from '../../../../../../component/result'
import BuyerWalletsSelect from '@/component/buyerWalletsSelect'
// import { useTokenBundle } from '../pumpForm/useBundle'
import WalletsSelect from '@/component/walletsSelect'
import { useTranslation } from 'react-i18next'
import { useTokenBundle } from '../../../pumpForm/useBundle'
import ProgressModel, { ProgressModelStatus } from '@/component/progressModel'
import { useBundleContext } from '@/pages/bundle/bundleContext'
import { getCurrentTime } from '@/pages/snipe/snipeForm/utils'

const NOTIFICATION_KEY = 'bundle_submission_key'
type ProgressModelStatusKey = keyof typeof ProgressModelStatus
type ProgressModelStatusValue = (typeof ProgressModelStatus)[ProgressModelStatusKey]

const OpenTrading: React.FC<{
  address: string
  complete: (bundleSubmission: TransactionAccountNonce[]) => void
  // privateKey: string
}> = ({ address, complete }) => {
  const { t } = useTranslation()

  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const [open, setOpen] = React.useState(false)
  const totalLogRef = React.useRef('')
  const [totalLog, setTotalLog] = React.useState('')
  const [progressModelStatus, setProgressModelStatus] = React.useState<ProgressModelStatusValue>(
    ProgressModelStatus.NONE,
  )
  const bundle = useTokenBundle('ETH')
  const bundleItem = useBundleContext()

  const customLog = (...args: any) => {
    const time = getCurrentTime()
    console.log(time, ...args)
    const newLog = args.join(' ') + '<br />'
    const newTotalLog = `${totalLogRef.current}<div>${timeHtml(time)} ${newLog}</div>`
    setTotalLog(newTotalLog)
    totalLogRef.current = newTotalLog
  }

  const timeHtml = (time: string) => {
    return `<span style='opacity: 0.6; width: 200px'>${time}</span>`
  }

  const onSubmit = async () => {
    setProgressModelStatus(ProgressModelStatus.LOADING)
    const formValues = await form.validateFields() // 等待表单验证完成
    // 初始化信息
    setOpen(true)
    setTotalLog('')
    totalLogRef.current = ''
    console.log('formValues 到底是什么呢？', formValues)
    requestOpenTradingBundle(formValues)
  }

  // 打开交易、捆绑
  const requestOpenTradingBundle = async (formValues: any, newGas?: string) => {
    try {
      let buyers = getSwapBuyers(formValues.buyers)
      console.log('开始了吗', {
        contractAddress: address,
        privateKey: formValues.privateKey,
        buyers,
        isSepolia: bundleItem?.value === 'sepolia' ? true : false,
        gas: newGas || '1',
      })
      const response = await requestBundle({
        contractAddress: address,
        privateKey: formValues.privateKey,
        buyers,
        isSepolia: bundleItem?.value === 'sepolia' ? true : false,
        gas: newGas || '1',
      })
      // setSubmitting(false)
      console.log(response)
      // 说明 gas 费不足
      if (response.code === 1010) {
        const newGas = Number(response.errorMsg) * 1.5
        customLog(
          `<span>${t('bundle.loading.bundleRetry', {
            newGas: newGas.toFixed(2),
          })}</span>`,
        )
        return await requestOpenTradingBundle(formValues, address, String(newGas))
      } else {
        if (response.code !== 200) {
          customLog(`<span>${t('bundle.loading.bundleFailed')}: ${response.errorMsg}</span>`)
          setProgressModelStatus(ProgressModelStatus.FAIL)
          return false
        } else {
          customLog(`<span>${t('bundle.loading.bundleSuccess')}</span>`)
          setProgressModelStatus(ProgressModelStatus.SUCCESS)
          return true
        }
      }
    } catch (error) {
      const errorMessage = `${t('bundle.loading.bundleFailed')}: ${error.message ?? JSON.stringify(error ?? {})}`
      customLog(`<span>${errorMessage}</span>`)
      return false
    }
  }

  return (
    <div className="selectionWrapper">
      {contextHolder}
      <div className="selectionContent">
        <Form form={form} labelCol={{ span: 3 }}>
          <Form.Item rules={[{ required: true }]} label={t('common.issuerWallet')} name="privateKey">
            {/* <Input placeholder="" /> */}
            <WalletsSelect chain={bundleItem?.chain} />
          </Form.Item>
          <Form.Item
            rules={bundle.getBuyersRules(form)}
            label={t('common.buyerWallets')}
            validateFirst
            validateTrigger="onSubmit"
            name={'buyers'}
          >
            <BuyerWalletsSelect chain={bundleItem?.chain} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 3 }}>
            <Button
              className={styles.openTradingBtn}
              // loading={submitting}
              type="primary"
              shape="round"
              size="large"
              onClick={onSubmit}
            >
              {' '}
              Open trading & Bundle{' '}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <ProgressModel open={open} status={progressModelStatus} setOpen={setOpen} totalLog={totalLog} />
    </div>
  )
}

export default OpenTrading
