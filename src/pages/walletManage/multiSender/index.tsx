import IntroductView from '@/component/introductView'
import TokenSelect from '@/component/tokenSelect'
import { Button, Input, Form, notification, InputNumber, message, Modal } from 'antd'
import { useTranslation } from 'react-i18next'

const BulkSelling: React.FC = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  return (
    <>
      <IntroductView title="批量发送" subTitle="本功能将您的钱包地址保存在本地，方便你的批量操作" />
      <Form labelCol={{ span: 3 }} form={form} initialValues={{}} style={{ maxWidth: 1000, margin: '20px' }}>
        <Form.Item label={t('manager.bulkTransfer.privateKey')} name="privateKey">
          <TokenSelect canOther={false} />
        </Form.Item>
        <Form.Item label={t('manager.bulkTransfer.amount')} name="amount"></Form.Item>
      </Form>
    </>
  )
}

export default BulkSelling
