import * as React from 'react'
import { history, Link } from 'umi'
import styles from './Logo.less'
import logoSVG from '../../../assets/logo.svg'

const Logo: React.FC = () => {
  return (
    <h1
      className={styles.logo}
      onClick={() => {
        history.push('/')
      }}
    >
      <img className={styles.img} src={logoSVG} alt="logo" />
      <span className={styles.title}>DevTools</span>
    </h1>
  )
}

export default Logo
