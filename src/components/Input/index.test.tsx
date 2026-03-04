import { render, screen } from '@testing-library/react';
import { Input } from '.';

// getByRole: 없으면 에러 발생
// queryByRole: 없어도 에러 발생 → 삭제 아이콘은 없는 상황이므로 queryByRole을 사용해야 함

// Input 컴포넌트 미입력 시 X 버튼이 보이지 않아야 한다.
test('Input 컴포넌트 미입력 시 X 버튼이 보이지 않아야 한다.', () => {
  render(<Input />);

  const input = screen.getByRole('textbox');
  // 없을 때 에러 발생하는 문제를 방지하기 위해 queryByRole을 사용합니다.
  const deleteButton = screen.queryByRole('button', { name: '입력값 지우기' });

  // 입력값이 없고,
  expect(input).toHaveValue('');
  // X 버튼이 보이지 않아야 한다.
  expect(deleteButton).not.toBeInTheDocument();
});

// Input 컴포넌트 입력값이 있을 때 X 버튼이 보여야 한다.
test('Input 컴포넌트에 입력값이 있을 때 X 버튼이 보이는지 확인한다.', () => {
  // defaultValue props를 통해 값을 넣어줍니다.
  render(<Input defaultValue='입력값이지롱' />);

  const input = screen.getByRole('textbox');
  const deleteButton = screen.getByRole('button', { name: '입력값 지우기' });

  // 입력값이 있는지 확인하고,
  expect(input).toHaveValue('입력값이지롱');
  // X 버튼이 보이는지 확인
  expect(deleteButton).toBeInTheDocument();
});
