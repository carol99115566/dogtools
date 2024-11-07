import { useChainContext } from '@/layouts/chainContext'
import { getBalanceByPrivateKey } from '@/utils/chain'
import { batchtransfer } from '@/utils/SOL_Util'
import { Button, Input, Form, notification, InputNumber, message, Modal } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

const NOTIFICATION_KEY = 'bundle_submission_key'

export default function BulkTransferModal({
  addresses,
  open,
  complete,
}: {
  addresses: string[]
  open: boolean
  complete: () => void
}) {
  const { t } = useTranslation()
  const chainItem = useChainContext()
  const [form] = Form.useForm()
  const [submitting, setSubmitting] = React.useState(false)

  const onSubmit = async () => {
    try {
      setSubmitting(true)
      const formValues = form.getFieldsValue()
      const balance = await getBalanceByPrivateKey(chainItem.value, formValues.privateKey)
      if (!balance) {
        setSubmitting(false)
        message.error('private key error!')
        return
      }
      if (balance < formValues.amount * addresses.length) {
        setSubmitting(false)
        message.error('insufficient balance!')
        return
      }
      const transferErrResults = await batchtransfer(formValues.privateKey, addresses, formValues.amount)
      if (transferErrResults.length === 0) {
        message.success('success!')
      } else {
        message.error('failed')
      }
      setSubmitting(false)
      complete()
    } catch (error) {
      setSubmitting(false)
      message.error(error)
    }
  }

  return (
    <Modal
      width={900}
      open={open}
      title={t('manager.bulkTransfer.name')}
      onOk={onSubmit}
      onCancel={complete}
      okText={t('manager.bulkTransfer.name')}
      okButtonProps={{ loading: submitting }}
    >
      <Form labelCol={{ span: 3 }} form={form} initialValues={{}} style={{ maxWidth: 1000, margin: '20px' }}>
        <Form.Item label={t('manager.bulkTransfer.privateKey')} name="privateKey">
          <Input placeholder={t('manager.bulkTransfer.privateKeyPlaceholder')}></Input>
        </Form.Item>
        <Form.Item label={t('manager.bulkTransfer.amount')} name="amount">
          <InputNumber
            style={{ width: '60%' }}
            placeholder={t('manager.bulkTransfer.amountPlaceholder')}
            addonAfter="SOL"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
