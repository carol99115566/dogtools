import * as React from 'react';
import { Select } from 'antd';
import { useGlobalContext } from '../../chainContext';

const SelectPlatform: React.FC = () => {

  const {platform, setPlatform} = useGlobalContext();

  React.useEffect(()=>{
    localStorage.setItem('platform', platform);
  }, [platform])

  const handleChangePlatform = (value: string) => {
    setPlatform(value);
  }

  return (
    <Select
          defaultValue="ETH"
          style={{ width: 100, marginRight: 20 }}
          size="large"
          options={[
            { value: 'ETH', label: 'ETH' },
            { value: 'SOL', label: 'SOL' },
            { value: 'Tron', label: 'Tron'},
            { value: 'sepolia', label: 'sepolia'},
            { value: 'BASE', label: 'BASE', disabled: true },
          ]}
          value={platform}
          onChange={handleChangePlatform}
        />
  );
};

export default SelectPlatform;
