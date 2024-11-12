import { Button, Input, Form, Modal, Result, Tooltip, Popover, Row, Col, Flex } from 'antd'
import React, { useEffect } from 'react'
import { getCurrentTime, getSwapBuyers } from '@/utils/utils'
import './index.less'
import { LoadingOutlined } from '@ant-design/icons'
import { ResultStatusType } from 'antd/es/result'
import { addTask, addToken, createCoin } from '@/services/api'
import { TASK_STATUS, TaskMeta } from '@/type/task'
import { useTokenBundle } from './useBundle'
import { useTranslation } from 'react-i18next'
import { createAndBuy } from '../utils'
import BulkPrivatekeySelect from '@/component/bulkPrivatekeySelect'
import IntroductView from '@/component/introductView'
import SelectLogo from '@/component/selectLogo'
import TitleSwitch from '@/component/titleSwitch'
import ChoiceInputView from '@/component/ChoiceInputView'

const BundleStatus = {
  NONE: 'none',
  LOADING: 'loading',
  SUCCESS: 'success',
  FAIL: 'fail',
} as const
type BundleStatusKey = keyof typeof BundleStatus
type BundleStatusValue = (typeof BundleStatus)[BundleStatusKey]

const BundleConfigMap = {
  [BundleStatus.NONE]: {
    title: '',
    icon: undefined,
    resultStatus: 'info' as ResultStatusType,
  },
  [BundleStatus.LOADING]: {
    title: 'Processing',
    icon: <LoadingOutlined />,
    resultStatus: 'info' as ResultStatusType,
  },
  [BundleStatus.SUCCESS]: {
    title: 'Bundle Success!',
    icon: undefined,
    resultStatus: 'success' as ResultStatusType,
  },
  [BundleStatus.FAIL]: {
    title: 'Bundle failed!',
    icon: undefined,
    resultStatus: 'error' as ResultStatusType,
  },
}

const BUNDLE_BASE_URL = 'https://devtools-node.onrender.com/api/bundle'
// const BUNDLE_BASE_URL = 'http://localhost:6123/api/bundle'
let sse: EventSource

const PumpBundleForm: React.FC = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [open, setOpen] = React.useState(false)
  const [showMore, setShowMore] = React.useState(false)
  const [showSocialLink, setShowSocialLink] = React.useState(false)
  const [showAdvancedOptions, setShowAdvancedOptions] = React.useState(false)
  const totalLogRef = React.useRef('')
  const [totalLog, setTotalLog] = React.useState('')
  const [bundleStatus, setBundleStatus] = React.useState<BundleStatusValue>(BundleStatus.NONE)
  const bundle = useTokenBundle('pump')

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

  const onBundleFinished = (res, task: TaskMeta) => {
    const status = res.success ? BundleStatus.SUCCESS : BundleStatus.FAIL
    setBundleStatus(status)
  }

  const onShowMore = () => {
    setShowMore(!showMore)
  }

  // const addNewToken = (tokenInfo: any) => {
  //   addToken({
  //     platform: 'pump.fun',
  //     token_info: JSON.stringify(tokenInfo),
  //     trading_open: true,
  //     address: tokenInfo.contractAddress,
  //     listname: `${tokenInfo.name}(${tokenInfo.symbol})`,
  //   })
  // }

  // const getContractAddress = (log: string) => {
  //   const splitFirst = log.split('https://pump.fun/')[1]
  //   const address = splitFirst.split("'>")[0]
  //   return address
  // }

  const onSubmit = async () => {
    setTotalLog('')
    totalLogRef.current = ''
    setBundleStatus(BundleStatus.LOADING)
    form
      .validateFields()
      .then(async (formValues) => {
        const buyerObjs = getSwapBuyers(formValues.buyers)
        // 在 pumpfun 创建代币数据
        let { data } = await createCoin(formValues)
        const result = await createAndBuy(formValues.privateKey, buyerObjs, data.metadata, data.metadataUri, customLog)

        // setOpen(true)
        // let contractAddress
        // sse = new EventSource(`${BUNDLE_BASE_URL}/${task.id}/start`)
        // 当接收到消息时执行此回调
        // sse.addEventListener('log', (e) => {
        //   let newlog = e.data
        //   if (newlog.includes('[start]')) {
        //     newlog = newlog.replace('[start]', t('bundle.pumpFunForm.loading.begin'))
        //   }
        //   if (newlog.includes('[existError]')) {
        //     newlog = newlog.replace('[existError]', t('bundle.pumpFunForm.loading.error'))
        //   }
        //   if (newlog.includes('[confirmed]')) {
        //     newlog = newlog.replace('[confirmed]', t('bundle.pumpFunForm.loading.confirmed'))
        //   }
        //   if (newlog.includes('[url]')) {
        //     newlog = newlog.replace('[url]', t('bundle.pumpFunForm.loading.urlDes'))
        //     contractAddress = getContractAddress(newlog)
        //   }
        //   if (newlog.includes('[transactionSent]')) {
        //     newlog = newlog.replace('[transactionSent]', t('bundle.pumpFunForm.loading.transactionSent'))
        //   }
        //   if (newlog.includes('[transactionFailed]')) {
        //     newlog = newlog.replace('[transactionFailed]', t('bundle.pumpFunForm.loading.transactionFailed'))
        //   }
        //   setOpen(true)
        //   const newTotalLog = `${totalLogRef.current}${newlog}`
        //   setTotalLog(newTotalLog)
        //   totalLogRef.current = newTotalLog
        // })
        // sse.addEventListener('status', (e) => {
        //   setOpen(true)
        //   const status = e.data as TASK_STATUS
        //   if (status === 'success') {
        //     onBundleFinished({ success: true }, task)
        //     // 增加一个代币记录
        //     addNewToken({
        //       ...data.metadata,
        //       metadataUri: data.metadataUri,
        //       contractAddress: contractAddress,
        //     })
        //   } else if (status === 'fail') {
        //     onBundleFinished({ success: false }, task)
        //   }
        // })
        // sse.addEventListener('ping', (e) => {
        //   setOpen(true)
        // })
        // 错误处理
        // sse.onerror = (error) => {
        //   setOpen(true)
        //   // 上面的status event会先触发的，这里再调，会把状态覆盖为fail
        //   // onBundleFinished({ success: false }, task)
        //   sse.close()
        //   console.error('EventSource failed:', error)
        // }
      })
      .catch((err) => {
        console.log('表单出错出错出错了', err)
        setBundleStatus(BundleStatus.FAIL)
      })
  }

  const renderShowMore = () => {
    const title = showMore ? `${t('bundle.pumpFunForm.hideMore')} ↑` : `${t('bundle.pumpFunForm.showMore')} ↓`
    return (
      <div className="show-more-button" onClick={onShowMore}>
        {title}
      </div>
    )
  }

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    console.log('这个拿到的文件是什么', e?.target.files[0])
    return e?.target.files[0]
  }

  const bundleConfig = BundleConfigMap[bundleStatus]

  return (
    <>
      <IntroductView
        title="Pump 开盘并买入"
        subTitle="在 Pump.fun 开盘时，其他地址同时进行代币买入操作，有效简化交易流程并加速市场参与，快人一步，抢得先机，从而更早获得潜在的收益。"
      />
      <Form className="pump-bundle-form" form={form} layout="vertical">
        <Row gutter={36}>
          <Col span={12}>
            <Form.Item label={t('bundle.pumpFunForm.name')} name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label={t('bundle.pumpFunForm.ticker')} name="symbol" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('bundle.pumpFunForm.image')}
              name="file"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true }]}
            >
              <SelectLogo />
              {/* <input required type="file" name="image" accept="image/*" /> */}
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label={t('bundle.pumpFunForm.description')} name="description">
          <Input.TextArea rows={3} />
        </Form.Item>
        <TitleSwitch
          title="添加社交链接"
          onChange={(value) => {
            setShowSocialLink(value)
          }}
        />
        {showSocialLink && (
          <Row gutter={36}>
            <Col span={12}>
              <Form.Item label={t('bundle.pumpFunForm.twitterLink')} name="twitter">
                <Input />
              </Form.Item>
              <Form.Item label={t('bundle.pumpFunForm.website')} name="website">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t('bundle.pumpFunForm.telegramLink')} name="telegram">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        )}
        <div>
          <span className="title-group">其他钱包买入参数设置</span>
          <BulkPrivatekeySelect type="buy" onChange={() => {}} />
        </div>

        <TitleSwitch
          title="高级选项"
          onChange={(value) => {
            setShowAdvancedOptions(value)
          }}
        />
        {showAdvancedOptions && (
          <Flex>
            <ChoiceInputView type="jito" onChange={() => {}} />
          </Flex>
        )}
        <Form.Item wrapperCol={{ offset: 3 }}>
          <Button
            type="primary"
            loading={bundleStatus === BundleStatus.LOADING ? true : false}
            onClick={onSubmit}
            shape="round"
            size="large"
          >
            {t('bundle.pumpFunForm.buttonName')}
          </Button>
          <Popover
            content={
              <div
                dangerouslySetInnerHTML={{
                  __html: t('bundle.pumpFunForm.feeContent'),
                }}
              ></div>
            }
            title={t('bundle.pumpFunForm.feeTitle')}
          >
            <a style={{ marginLeft: 20 }}>{t('bundle.pumpFunForm.feeButtonName')}</a>
          </Popover>
        </Form.Item>
      </Form>
      <Modal
        className={`bundle-modal-${bundleStatus}`}
        footer={<></>}
        open={open}
        onCancel={() => setOpen(false)}
        width={900}
        maskClosable={false}
      >
        <Result status={bundleConfig.resultStatus} icon={bundleConfig.icon} title={bundleConfig.title}>
          <div
            className="desc"
            dangerouslySetInnerHTML={{
              __html: totalLog,
            }}
          ></div>
        </Result>
      </Modal>
    </>
  )
}

export default PumpBundleForm
