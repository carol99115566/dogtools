import React, { useEffect, useState } from 'react'
import { Select, Avatar } from 'antd'
import type { SelectProps } from 'antd'
import { getAllTokens } from '@/services/api'
import { useWallet } from '@solana/wallet-adapter-react'
import { ITokenMeta } from '@/type/token'
import { isValidAddress } from '@/utils/SOL_Util'
const { Option } = Select

const TokenSelect: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState<string | null>(null)
  const [searchText, setSearchText] = useState<string | null>(null)
  const [tokenList, setTokenList] = useState<ITokenMeta[] | null>(null)

  const { publicKey } = useWallet()

  const handleChange: SelectProps<string>['onChange'] = (value) => {
    const address = isValidAddress(value) ? value : null
    setSelectedToken(address)
  }

  const handleBlur = () => {
    console.log('handleBlur', selectedToken, searchText)
    if (!selectedToken && searchText) {
      if (isValidAddress(searchText)) {
        setSelectedToken(searchText)
      }
    }
  }

  useEffect(() => {
    if (publicKey) {
      getAllTokens(publicKey.toString())
        .then((data) => {
          setTokenList(data.result)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [publicKey])

  // 自定义过滤逻辑，允许根据代币名称、地址、logo 搜索
  const filterOption = (input: string, option: any) => {
    if (!tokenList) {
      return false
    }
    const inputLower = input.toLowerCase()
    const token = tokenList.find((element) => element.address === option.value)
    if (token) {
      return token.address.toLowerCase().includes(inputLower) || token.info.name.toLowerCase().includes(inputLower)
    }
    return false
  }

  const handleSearch = (value) => {
    console.log('search', searchText)
    if (value.length) {
      setSearchText(value)
    }
  }

  return (
    <Select
      showSearch
      style={{ width: '100%', height: '50px' }}
      placeholder="请选择或输入代币"
      optionFilterProp="children"
      onChange={handleChange}
      onBlur={handleBlur}
      onSearch={handleSearch}
      allowClear
      filterOption={filterOption}
      value={selectedToken}
    >
      {tokenList?.map((token) => (
        <Option key={token.address} value={token.address}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '40px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={token.info.image} size="large" />
              <span style={{ marginLeft: 8, fontWeight: 600 }}>{token.info.name}</span>
            </div>
            <span>{token.address}</span>
          </div>
        </Option>
      ))}
    </Select>
  )
}

export default TokenSelect
