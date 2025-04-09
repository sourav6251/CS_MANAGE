import React, { useState } from 'react';
import ChangeEmail from './ChangeEmail';
import ChangePhone from './ChangePhone';
import ChangePassword from './ChangePassword';
import ChangePhoto from './ChangePhoto';
import SettingSlied from './SettingSlied';

const SettingSection = () => {
  const [activeSetting, setActiveSetting] = useState(null);

  const renderComponent = () => {
    switch (activeSetting) {
      case 'email':
        return <ChangeEmail />;
      case 'phone':
        return <ChangePhone />;
      case 'password':
        return <ChangePassword />;
      case 'photo':
        return <ChangePhoto />;
      default:
        return <ChangePassword />;
    }
  };

  return (
    <div className="flex gap-1  justify-around">
      
      <div className="flex-1 pl-16">
        {renderComponent()}
      </div>
      <SettingSlied  setActiveSetting={setActiveSetting} />
    </div>
  );
};

export default SettingSection;
