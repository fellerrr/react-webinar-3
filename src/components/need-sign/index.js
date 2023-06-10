import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css'

const NeedSign = ({sign, action}) => {
  const cn = bem('NeedSign');
  return (
    <div className={cn()}>
      <span className={cn('link')} onClick={sign}>Войдите</span>, чтобы иметь возможность {action}.
    </div>
  );
};

export default NeedSign;