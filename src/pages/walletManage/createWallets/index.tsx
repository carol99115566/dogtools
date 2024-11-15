import { createWallets, CHAIN_ITEMS, CHAIN_OPTIONS } from '@/utils/chain'
import { Button, Input, Form, notification, Select, InputNumber, List, Descriptions, Flex, Switch, message } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IWalletMeta } from '@/type/wallet'
import './index.less'
import { useChainContext } from '@/layouts/chainContext'
import WalletInputModal from '@/component/walletInputModal'
import AmountInputModal from '@/component/amountInputModal'

const NOTIFICATION_KEY = 'bundle_submission_key'
const CHAIN_KEY = 'chain'

export default function CreateWallets() {
  const chainItem = useChainContext()
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [submitting, setSubmitting] = React.useState(false)
  const [wallets, setWallets] = React.useState<IWalletMeta[]>()
  const [isManualInputOpen, setIsManualInputOpen] = useState(false)
  const [isAmountInputOpen, setIsAmountInputOpen] = useState(false)

  const onSubmit = async () => {
    const formValues = form.getFieldsValue()
    const result = await createWallets(formValues.chain, formValues.count)
    setWallets(result)
  }

  return (
    <>
      <Form labelCol={{ span: 2 }} form={form} initialValues={{}} style={{ maxWidth: 1000, margin: 'auto' }}>
        {chainItem && <h3>{t('')}</h3>}
        <Form.Item initialValue={'SOL'} label={t('manager.formChain')} name={CHAIN_KEY} rules={[{ required: true }]}>
          <Select placeholder={t('manager.formChainPlaceholder')} disabled={true} options={CHAIN_OPTIONS}></Select>
        </Form.Item>
        <Form.Item label={t('manager.createWallets.count')} name="count">
          <InputNumber precision={0} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button type="primary" loading={submitting} onClick={onSubmit} shape="round" size="large">
            {t('manager.createWallets.createButton')}
          </Button>
        </Form.Item>
        {wallets && (
          <List
            itemLayout="horizontal"
            dataSource={wallets}
            className="walletsWrapper"
            header={
              <Flex gap={16} justify="right">
                <Button type="primary" onClick={() => setIsAmountInputOpen(true)} shape="round" size="middle">
                  {t('manager.createWallets.transferBtn')}
                </Button>
                <Button type="primary" onClick={() => setIsManualInputOpen(true)} shape="round" size="middle">
                  {t('manager.createWallets.saveBtn')}
                </Button>
              </Flex>
            }
            renderItem={(item, index) => (
              <List.Item>
                <Descriptions
                  column={1}
                  items={[
                    {
                      key: '1',
                      label: t('manager.createWallets.wallet.address'),
                      children: item.address,
                    },
                    {
                      key: '2',
                      label: t('manager.createWallets.wallet.privateKey'),
                      children: item.privateKey,
                    },
                  ]}
                />
              </List.Item>
            )}
          />
        )}
      </Form>
      <WalletInputModal
        type="privateKey"
        walletData={{
          value: wallets?.map((wallet) => wallet.privateKey).join('\n') || '',
        }}
        open={isManualInputOpen}
        onCancel={() => {
          setIsManualInputOpen(false)
        }}
        onOK={(data) => {
          setIsManualInputOpen(false)
        }}
      ></WalletInputModal>
      <AmountInputModal
        onOK={() => {}}
        open={isAmountInputOpen}
        onCancel={() => {
          setIsAmountInputOpen(false)
        }}
      />
    </>
  )
}
