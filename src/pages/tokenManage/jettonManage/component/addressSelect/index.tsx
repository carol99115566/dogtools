import { queryUserTokens } from '@/services/api'
import { CHAIN_ITEMS } from '@/utils/chain'
import { message, Select, Spin, AutoComplete } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TokenMeta } from '@/type/token'
import { useBundleContext } from '@/pages/bundle/bundleContext'
import { useLocation } from 'umi'

interface ContractAddressSelectProps {
  onChange?: (val: string) => void
}

const ContractAddressSelect: React.FC<ContractAddressSelectProps> = ({ onChange }) => {
  const bundleItem = useBundleContext()
  const { t } = useTranslation()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const address = searchParams.get('address')

  const [tokens, setTokens] = useState<TokenMeta[]>()
  const [value, setValue] = useState(address)

  useEffect(() => {
    requestData()
  }, [])

  const requestData = async () => {
    try {
      const { data: tokens } = await queryUserTokens({
        platform: bundleItem?.label,
      })
      setTokens(
        tokens.map((element: TokenMeta) => {
          return { value: element.address }
        }),
      )
    } catch (err: any) {
      message.error(err?.message)
    } finally {
    }
  }

  const handleChange = (value: string) => {
    setValue(value)
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <>
      <span>代币地址：</span>
      <AutoComplete
        style={{ width: '60%' }}
        options={tokens}
        value={value}
        placeholder="please select or input"
        onChange={handleChange}
      />
    </>
  )
}

export default ContractAddressSelect
