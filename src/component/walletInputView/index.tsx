import React, { useEffect, useRef, useState } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { Form, Modal, Input, theme, Flex } from 'antd'
// import './index.module.less'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import { useTranslation } from 'react-i18next'
import './index.less'
import { isValidAddress, isValidPrivateKey } from '@/utils/SOL_Util'
const { useToken } = theme

const messageInfo = {
  address: {
    label: '地址列表，每一行输入一个钱包地址',
    example: `example:\nC1djQFr7dtYS6EXc171L4BcQhSSNUq7cboXD7xKteaUc\n717EpGYgg7fq1btUPKPZKa2cY9XPbjPKDfVbfWNHVbQy`,
  },
  privateKey: {
    label: '私钥列表，每一行输入一个私钥',
    example: `example:\n66q5NPxMopuG2sb3JdNh1h3fePZnLJ7YdAq1XXKyJBUBNZ5hiSQF8mtydro2pVRBiQF1hfHvvud9aYM3jw5qsyd6\n3Z7Wg9cd3HZxZqusffHMqJHtsuyCCXyp19b9p15GzTTNpXnmmBhwJqxusneem9svV1k9v6bL65Y1352YPktQPG6y`,
  },
  receivers: {
    label: '收款地址列表',
    example: `example:（每一行应包括地址和数量，地址和数量之间用英文逗号隔开）\n66q5NPxMopuG2sb3JdNh1h3fePZnLJ7YdAq1XXKyJBUBNZ5hiSQF8mtydro2pVRBiQF1hfHvvud9aYM3jw5qsyd6,0.001\n3Z7Wg9cd3HZxZqusffHMqJHtsuyCCXyp19b9p15GzTTNpXnmmBhwJqxusneem9svV1k9v6bL65Y1352YPktQPG6y,0.001`,
  },
}

export interface IInputWalletData {
  name?: string
  value: string
  onChange: (value: string) => void
}

function WalletInputModal({
  walletData,
  type,
  onChange,
}: {
  walletData?: IInputWalletData
  type: 'address' | 'privateKey' | 'receivers'
}) {
  const { token } = useToken()
  const { t } = useTranslation()
  const [codeValue, setCodeValue] = useState(walletData?.value || '')
  const [errorLines, setErrorLines] = useState<number[]>()
  const editorRef = useRef(null) // Ref to store CodeMirror instance
  const showInfo = messageInfo[type]

  // 检测地址、私钥、买入的格式是否合法
  const checkValue = (value: string) => {
    const items = value.split('\n')
    const currentErrorLines: number[] = []
    console.log('item item 是什么呀', items)
    if (type === 'address') {
      items.forEach((element, index) => {
        if (element.length && !isValidAddress(element)) {
          currentErrorLines.push(index + 1)
        }
      })
    }
    if (type === 'privateKey') {
      items.forEach((element, index) => {
        if (element.length && !isValidPrivateKey(element)) {
          currentErrorLines.push(index + 1)
        }
      })
    }
    if (type === 'receivers') {
      items.forEach((element, index) => {
        const datas = element.split(',') || []
        if (datas.length !== 2 || !isValidAddress(datas[0]) || Number(datas[1]) <= 0) {
          currentErrorLines.push(index + 1)
        }
      })
    }
    setErrorLines(currentErrorLines)
  }

  useEffect(() => {
    // 刷新 CodeMirror
    if (editorRef.current) {
      setTimeout(() => {
        editorRef.current.refresh()
      }, 0) // Slight delay to allow modal to render
    }
  }, [])

  const addPlaceholder = (editor, value) => {
    const wrapper = editor.display.wrapper
    if (value === '' || value === undefined) {
      wrapper.classList.add('CodeMirror-empty')
      wrapper.setAttribute('data-placeholder', showInfo.example)
    } else {
      wrapper.classList.remove('CodeMirror-empty')
    }
  }

  return (
    <div>
      <div className="text-name">{showInfo.label}</div>
      <div className="code-input">
        <CodeMirror
          value={codeValue}
          options={{
            // mode: 'xml',
            // theme: 'material',
            lineNumbers: true,
          }}
          onBeforeChange={(editor, data, value) => {
            setCodeValue(value)
            checkValue(value)
            // 清除先前的行样式
            if (errorLines && errorLines.length) {
              errorLines.forEach((element) => {
                editor.removeLineClass(element - 1, 'background', 'error-line')
              })
            }
            addPlaceholder(editor, value)
          }}
          editorDidMount={(editor) => {
            editorRef.current = editor // Store the editor instance in ref
            addPlaceholder(editor, walletData?.value)
          }}
          onChange={(editor, data, value) => {
            if (errorLines && errorLines.length) {
              errorLines.forEach((element) => {
                editor.addLineClass(element - 1, 'background', 'error-line')
              })
            }
          }}
        />
      </div>
      {errorLines && errorLines.length !== 0 && (
        <div className="text-error">{`第 ${errorLines.join('、')} 行格式错误`}</div>
      )}
    </div>
  )
}

export default WalletInputModal
