import { Input, message, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface IAmountInputModalProps {
  title?: string
  open: boolean
  onOK: (val: string) => void
  onCancel: () => void
}

const AmountInputModal: React.FC<IAmountInputModalProps> = ({ open, onOK, title = '请输入金额', onCancel }) => {
  const { t } = useTranslation()
  const [amount, setAmount] = useState<string>()

  const handleOK = () => {
    if (!amount || !amount?.length) {
      message.error('please input amount')
      return
    }
    onOK(amount)
  }

  return (
    <Modal
      open={open}
      title={title}
      onOk={() => {
        handleOK()
      }}
      onCancel={onCancel}
      style={{ padding: 20 }}
    >
      <Input
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value)
        }}
      ></Input>
    </Modal>
  )
}

export default AmountInputModal
