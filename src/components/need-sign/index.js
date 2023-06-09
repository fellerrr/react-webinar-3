import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css'

const NeedSign = ({sign}) => {
  const cn = bem('NeedSign');
  return (
    <div className={cn()}>
      <span className={cn('link')} onClick={sign}>Войдите</span>, чтобы иметь возможность комментировать.
    </div>
  );
};

export default NeedSign;