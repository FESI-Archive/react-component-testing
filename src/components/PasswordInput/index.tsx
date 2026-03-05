'use client';

import { useState } from 'react';

export const PasswordInput = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div>
      <input
        type={isShowPassword ? 'text' : 'password'}
        placeholder='비밀번호를 입력하세요.'
      />
      <button onClick={handleShowPassword}>
        {isShowPassword ? '숨기기' : '보기'}
      </button>
    </div>
  );
};
