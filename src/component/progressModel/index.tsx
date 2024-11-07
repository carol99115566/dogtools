// import styles from './index.less'
import { Modal, Result } from 'antd'
import React, { ReactNode, useEffect, useState } from 'react'
import './index.less'
import { LoadingOutlined } from '@ant-design/icons'
import { ResultStatusType } from 'antd/es/result'
import './index.less'

export const ProgressModelStatus = {
  NONE: 'none',
  LOADING: 'loading',
  SUCCESS: 'success',
  FAIL: 'fail',
} as const

const snipeConfigMap = {
  [ProgressModelStatus.NONE]: {
    title: '',
    icon: undefined,
    resultStatus: 'info' as ResultStatusType,
  },
  [ProgressModelStatus.LOADING]: {
    title: '',
    icon: <LoadingOutlined />,
    resultStatus: 'info' as ResultStatusType,
  },
  [ProgressModelStatus.SUCCESS]: {
    title: 'Success!',
    icon: undefined,
    resultStatus: 'success' as ResultStatusType,
  },
  [ProgressModelStatus.FAIL]: {
    title: 'Failed!',
    icon: undefined,
    resultStatus: 'error' as ResultStatusType,
  },
}

const ProgressModel: React.FC<{
  open: boolean
  status: string
  totalLog: string
  setOpen: (isOpen: boolean) => void
}> = ({
  open,
  status,
  totalLog,
  setOpen,
  ...modalProps // 捕获额外的 modal 属性
}) => {
  const snipeConfig = snipeConfigMap[status]

  return (
    <Modal
      className={`sniper-modal-${status}`}
      footer={<></>}
      open={open}
      onCancel={() => setOpen(false)}
      width={900}
      maskClosable={false}
      {...modalProps}
    >
      <Result status={snipeConfig.resultStatus} icon={snipeConfig.icon} title={snipeConfig.title}>
        <div
          className="desc"
          dangerouslySetInnerHTML={{
            __html: totalLog,
          }}
        ></div>
      </Result>
    </Modal>
  )
}

export default ProgressModel
