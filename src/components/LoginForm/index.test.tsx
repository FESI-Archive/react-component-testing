import { LoginForm } from '@/src/components/LoginForm';
import { fireEvent, render, screen } from '@testing-library/react';

test('로그인 폼이 올바르게 렌더링 되는지 확인', () => {
  render(<LoginForm />);

  // 라벨을 이용해서 input 요소 찾기
  const emailByLabel = screen.getByLabelText(/이메일/);

  // 플레이스홀더로 입력 요소 찾기
  const emailByPlaceholder = screen.getByPlaceholderText('이메일을 입력하세요');

  // 역할로 버튼 찾기
  const loginButton = screen.getByRole('button', { name: '로그인' });

  // 테스트 ID로 요소 찾기
  // const emailByTestId = screen.getByTestId('email-input');

  // 모든 요소가 화면에 있는지 확인
  expect(emailByLabel).toBeInTheDocument();
  expect(emailByPlaceholder).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();

  // emailByLabel, emailByPlaceholder, emailByTestId가 동일한 요소인지 확인
  expect(emailByLabel).toBe(emailByPlaceholder);
});

test('로그인 폼의 이메일과 비밀번호 미입력 시 로그인 버튼 비활성화되는지 확인', () => {
  render(<LoginForm />);

  // 로그인 버튼과 입력 필드 가져오기
  const loginButton = screen.getByRole('button', { name: '로그인' });
  const emailInput = screen.getByLabelText('이메일');
  const passwordInput = screen.getByLabelText('비밀번호');

  // 입력 필드 값이 비어있는지 확인
  expect(emailInput).toHaveValue('');
  expect(passwordInput).toHaveValue('');

  // 로그인 버튼이 비활성화되어 있는지 확인
  expect(loginButton).toBeDisabled();
});

test('이메일, 비밀번호 입력 시 로그인 버튼 활성화되는지 확인', () => {
  render(<LoginForm />);
  const loginButton = screen.getByRole('button', { name: '로그인' });
  const emailInput = screen.getByLabelText('이메일');
  const passwordInput = screen.getByLabelText('비밀번호');

  // 이메일과 비밀번호 입력
  fireEvent.change(emailInput, { target: { value: 'test' } });
  fireEvent.change(passwordInput, { target: { value: 'test' } });

  // 로그인 버튼이 활성화되었는지 확인
  expect(loginButton).toBeEnabled();
});

test("이메일 잘못 입력 시 '올바른 이메일 형식이 아닙니다.'라는 에러 메시지가 표시되는지 확인", () => {
  render(<LoginForm />);

  const emailInput = screen.getByLabelText('이메일');

  // 잘못된 이메일 입력
  fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

  // 에러 메시지 확인
  const errorMessage = screen.getByText('올바른 이메일 형식이 아닙니다.');
  expect(errorMessage).toBeInTheDocument();
});

test("비밀번호 6자 미만 입력 시 '비밀번호는 6자 이상이어야 합니다.'라는 에러 메시지가 표시되는지 확인", () => {
  render(<LoginForm />);

  const passwordInput = screen.getByLabelText('비밀번호');

  // 잘못된 비밀번호 입력
  fireEvent.change(passwordInput, { target: { value: '12345' } });

  // 에러 메시지 확인
  const errorMessage = screen.getByText('비밀번호는 6자 이상이어야 합니다.');
  expect(errorMessage).toBeInTheDocument();
});
