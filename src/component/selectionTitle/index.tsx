
import * as React from 'react';
import { Link } from 'umi';
import styles from './Logo.less'
import { Image } from 'antd';
import './index.less';

interface SelectionTitleProps  {
    title: string;
    tipTitle?: string;
    subTitle?: string;
}

const SelectionTitle: React.FC<SelectionTitleProps> = ({
   title,
   tipTitle,
   subTitle
}) => {

  return (
    <div className="selection-view">
      <div className="left-view">
        <div className="tip-view"></div>
        <text className="title">{title}</text>
        {tipTitle && <text  className="tipTitle">{tipTitle}</text>}
        {subTitle && <text  className="sub-title">{subTitle}</text>} 

      </div>
  </div> 
  );
};

export default SelectionTitle;
