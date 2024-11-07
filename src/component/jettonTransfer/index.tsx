import * as React from 'react'
import { Link } from 'umi'
import styles from './index.less'
import { Form, Input, Button, message, Space } from 'antd'
import SelectionTitle from '../selectionTitle'
import { ehtTransferIn } from '@/utils/eht'

const JettonTransfer: React.FC<{
  to: string | undefined
  privateKey: string
  complete: () => void
}> = ({ to, privateKey, complete }) => {
  const [form] = Form.useForm()
  const [submitting, setSubmitting] = React.useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  React.useEffect(() => {
    console.log('to to to to to ', to)
    form.setFieldValue('to', to)
  }, [to])

  const onSubmit = async () => {
    form.validateFields().then((formValues) => {
      const { to, privateKey, value, amount } = formValues
      if (!value && !amount) return
      setSubmitting(true)
      try {
        ehtTransferIn(privateKey, to, amount, value).then((res) => {
          if (res) {
            complete()
            messageApi.success('Transfer successful')
          } else {
            messageApi.error('Transfer failed, please check if the funds are sufficient')
          }
          setSubmitting(false)
        })
      } catch (error) {
        console.log(error)
        setSubmitting(false)
        messageApi.error(error.message ?? JSON.stringify(error ?? {}))
      }
    })
  }

  const onNextStep = () => {
    complete()
  }

  return (
    <div className="selectionWrapper">
      {contextHolder}
      {/* <h2>Transfer</h2> */}
      <SelectionTitle title="Transfer" />
      <div className="selectionContent">
        <Form
          form={form}
          labelCol={{ span: 2 }}
          initialValues={{
            // to: toAddress,
            privateKey,
          }}
        >
          {/* <Form.Item label="from" name="from">
            <Input placeholder="contract address" />
          </Form.Item> */}
          <Form.Item label="to" name="to">
            <Input disabled placeholder="contract address" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} label="private key" name="privateKey">
            <Input placeholder="token owner's private key" />
          </Form.Item>
          <Form.Item label="value" name="value">
            <Input />
          </Form.Item>
          <Form.Item label="amount" name="amount">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 2 }}>
            <Space size={16}>
              <Button loading={submitting} type="primary" shape="round" size="large" onClick={onSubmit}>
                transfer in
              </Button>
              <Button loading={submitting} shape="round" size="large" onClick={onNextStep}>
                next step
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default JettonTransfer
