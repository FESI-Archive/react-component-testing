// 1. 초기 상태에서 비밀번호가 숨겨져 있고(`type="password"`) '보기' 버튼이 보이는지 확인한다.
// 2. '보기' 버튼을 클릭하면 비밀번호가 보이고(`type='text'`), 버튼 텍스트가 '숨기기'로 변경됩니다.
// 3. '숨기기' 버튼을 클릭하면 다시 비밀번호가 숨겨지고(`type='password'`), 버튼 텍스트가 '보기'로 변경됩니다. (이때, 처음에 클릭을 통해 '보기' 버튼에서 '숨기기' 버튼으로 먼저 변경한 다음 테스트하세요.)

import { PasswordInput } from '@/src/components/PasswordInput';
import { fireEvent, render, screen } from '@testing-library/react';

// 1. 초기 상태에서 비밀번호가 숨겨져 있고(`type="password"`) '보기' 버튼이 보이는지 확인한다.
test("초기 상태에서 비밀번호가 숨겨져 있고(type='password'), '보기' 버튼이 보이는지 확인한다.", () => {
  render(<PasswordInput />);

  const input = screen.getByPlaceholderText('비밀번호를 입력하세요.');
  expect(input).toHaveAttribute('type', 'password');

  const button = screen.getByRole('button', { name: '보기' });
  expect(button).toBeInTheDocument();
});

// 2. '보기' 버튼을 클릭하면 비밀번호가 보이고(`type='text'`), 버튼 텍스트가 '숨기기'로 변경됩니다.
test("'보기' 버튼을 클릭하면 비밀번호가 보이고(type='text'), 버튼 텍스트가 '숨기기'로 변경되는지 확인한다.", () => {
  render(<PasswordInput />);

  const showButton = screen.getByRole('button', { name: '보기' });
  fireEvent.click(showButton);

  const input = screen.getByPlaceholderText('비밀번호를 입력하세요.');
  expect(input).toHaveAttribute('type', 'text');

  const hideButton = screen.getByRole('button', { name: '숨기기' });
  expect(hideButton).toBeInTheDocument();
});

// 3. '숨기기' 버튼을 클릭하면 다시 비밀번호가 숨겨지고(`type='password'`), 버튼 텍스트가 '보기'로 변경됩니다. (이때, 처음에 클릭을 통해 '보기' 버튼에서 '숨기기' 버튼으로 먼저 변경한 다음 테스트하세요.)
test("'숨기기' 버튼을 클릭하면 다시 비밀번호가 숨겨지고(type='password'), 버튼 텍스트가 '보기'로 변경되는지 확인한다.", () => {
  render(<PasswordInput />);

  const showButton = screen.getByRole('button', { name: '보기' });
  const input = screen.getByPlaceholderText('비밀번호를 입력하세요.');
  fireEvent.click(showButton);

  const hideButton = screen.getByRole('button', { name: '숨기기' });
  expect(input).toHaveAttribute('type', 'text');

  fireEvent.click(hideButton);

  const showButton2 = screen.getByRole('button', { name: '보기' });
  expect(input).toHaveAttribute('type', 'password');
  expect(showButton2).toBeInTheDocument();
});
