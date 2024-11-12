import { createWallets, CHAIN_ITEMS, CHAIN_OPTIONS } from '@/utils/chain'
import { Button, Input, Form, notification, Select, InputNumber, List, Descriptions, Flex, Switch, message } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IWalletMeta } from '@/type/wallet'
import './index.less'
import BulkTransferModal from '@/component/transferInModal'
import { useChainContext } from '@/layouts/chainContext'
import { BUYER_WALLET_MANAGE, WALLET_MANAGE } from '@/utils/constant'
import { addBuyerWallet } from '../utils'
import CreateBuyerWalletsModal from '../privateKey/createBuyerWallets'
import { ICreateBuyerWalletsForm } from '@/pages/walletManage/privateKey/createBuyerWallets'

const NOTIFICATION_KEY = 'bundle_submission_key'
const CHAIN_KEY = 'chain'

export default function CreateWallets() {
  const chainItem = useChainContext()
  // const bundleItem = useBundleContext()
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [openBulkTransModal, setOpenBulkTransModal] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const [wallets, setWallets] = React.useState<IWalletMeta[]>()
  const [initialFormValue, setInitialFormValue] = React.useState<ICreateBuyerWalletsForm>()
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const onSubmit = async () => {
    const formValues = form.getFieldsValue()
    const result = await createWallets(formValues.chain, formValues.count)
    setWallets(result)
    setInitialFormValue({
      validate: false,
      chain: chainItem.value,
      name: '',
      buyer_wallets: result.map((item) => item.privateKey).join('\n'),
    })
  }

  const handleBulkTransferIn = () => {
    setOpenBulkTransModal(true)
  }

  const handleImportBuyerWallet = async () => {
    // addBuyerWallet({
    //   name: `${wallets?.length} - ()`,
    //   chain: chainItem.value,
    //   buyers: wallets?.map((item) => {
    //     return {
    //       privateKey: item.privateKey,
    //       balance: 0,
    //     }
    //   }),
    // })
    setIsModalOpen(true)
  }

  return (
    <>
      <Form labelCol={{ span: 2 }} form={form} initialValues={{}} style={{ maxWidth: 1000, margin: 'auto' }}>
        {chainItem && <h3>{t('')}</h3>}
        <Form.Item
          initialValue={chainItem ? chainItem.value : 'ETH'}
          label={t('manager.formChain')}
          name={CHAIN_KEY}
          rules={[{ required: true }]}
        >
          <Select
            placeholder={t('manager.formChainPlaceholder')}
            disabled={chainItem ? true : false}
            options={CHAIN_OPTIONS}
          ></Select>
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
                <Button type="primary" onClick={handleBulkTransferIn} shape="round" size="middle">
                  {t('manager.createWallets.transferBtn')}
                </Button>
                <Button type="primary" onClick={handleImportBuyerWallet} shape="round" size="middle">
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
      <BulkTransferModal
        open={openBulkTransModal}
        addresses={wallets?.map((item) => item.address)}
        complete={() => {
          setOpenBulkTransModal(false)
        }}
      ></BulkTransferModal>
      <CreateBuyerWalletsModal
        validate={false}
        initialFormValues={initialFormValue}
        isModalOpen={isModalOpen}
        handleCancel={() => {
          setIsModalOpen(false)
        }}
        handleSuccess={() => {
          setIsModalOpen(false)
          message.success('导入成功')
        }}
      />
    </>
  )
}
