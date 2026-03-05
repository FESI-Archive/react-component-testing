// 1. 이메일, 비밀번호, 비밀번호 확인 입력 필드가 제대로 렌더링되는지 확인하는 테스트 코드를 작성해보세요. 이때 `getByLabelText`를 사용하여 각 입력 필드를 찾아보고, `toBeInTheDocument`를 활용하여 존재 여부를 확인해보세요.
// 2. 비밀번호, 비밀번호 확인 입력 필드의 `type`이 `"password"`인지 확인하는 테스트 코드를 작성해보세요. 이때 매쳐는 `toHaveAttribute`를 활용해보세요. 이때 `getByPlaceholderText`를 활용하여 입력 필드를 가져와보세요.
// 3. 회원가입 버튼이 렌더링되는지 확인하세요. 이때 회원가입 버튼은 `getByRole`을 활용하여 가져와보세요.

import { SignupForm } from '@/src/components/SignupForm';
import { fireEvent, render, screen } from '@testing-library/react';

// 1. 이메일, 비밀번호, 비밀번호 확인 입력 필드가 제대로 렌더링되는지 확인
test('이메일, 비밀번호, 비밀번호 확인 입력 필드 렌더링 확인', () => {
  render(<SignupForm />);

  // getByPlaceholderText를 활용하여 입력 필드를 가져와보세요.
  const emailInput = screen.getByPlaceholderText('이메일을 입력하세요');
  const passwordInput = screen.getByPlaceholderText('비밀번호를 입력하세요');
  const passwordConfirmInput =
    screen.getByPlaceholderText('비밀번호를 다시 입력하세요');

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(passwordConfirmInput).toBeInTheDocument();
});

// 2. 비밀번호, 비밀번호 확인 입력 필드의 `type`이 `"password"`인지 확인
test('비밀번호 입력 필드 type이 password인지 확인', () => {
  render(<SignupForm />);

  const passwordInput = screen.getByPlaceholderText('비밀번호를 입력하세요');
  const passwordConfirmInput =
    screen.getByPlaceholderText('비밀번호를 다시 입력하세요');

  // toHaveAttribute 매처를 사용하여 type 속성 확인
  expect(passwordInput).toHaveAttribute('type', 'password');
  expect(passwordConfirmInput).toHaveAttribute('type', 'password');
});

// 3. 회원가입 버튼이 렌더링되는지 확인 with getByRole
test('회원가입 버튼 렌더링 확인', () => {
  render(<SignupForm />);

  const submitButton = screen.getByRole('button', { name: '회원가입' });

  expect(submitButton).toBeInTheDocument();
});

test('회원가입 버튼을 클릭하면 콘솔로그가 출력되는지 확인', () => {
  render(<SignupForm />);

  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  // 회원가입 버튼 가져오기 및 클릭
  const signupForm = screen.getByRole('form');
  fireEvent.submit(signupForm);

  // 회원가입 버튼 클릭 시 콘솔에 "회원가입!" 메시지가 출력되는지 확인
  expect(consoleSpy).toHaveBeenCalledWith('회원가입!');

  // jest.spyOn()으로 생성된 스파이(spy)를 원래 구현(original implementation)으로 완전히 복원하는 역할
  consoleSpy.mockRestore();
});
