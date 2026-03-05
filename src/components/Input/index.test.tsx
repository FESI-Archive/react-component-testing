import { fireEvent, render, screen } from '@testing-library/react';
import { Input } from '.';
import { useState } from 'react';

// getByRole: 요소를 찾지 못하면 즉시 에러 발생 (존재해야 하는 요소에 사용)
// queryByRole: 요소를 찾지 못하면 null 반환 (존재하지 않아야 하는 요소에 사용)

test('Input 컴포넌트 미입력 시 X 버튼이 보이지 않아야 한다.', () => {
  render(<Input onChange={jest.fn()} onDelete={jest.fn()} />);

  const input = screen.getByRole('textbox');
  const deleteButton = screen.queryByRole('button', { name: '입력값 지우기' });

  expect(input).toHaveValue('');
  expect(deleteButton).not.toBeInTheDocument();
});

test('Input 컴포넌트에 입력값이 있을 때 X 버튼이 보이는지 확인한다.', () => {
  render(<Input value='입력값' onChange={jest.fn()} onDelete={jest.fn()} />);

  const input = screen.getByRole('textbox');
  const deleteButton = screen.getByRole('button', { name: '입력값 지우기' });

  expect(input).toHaveValue('입력값');
  expect(deleteButton).toBeInTheDocument();
});

test('X 버튼 클릭 시 입력값이 지워지는지 확인한다', () => {
  // 테스트용 상태를 가진 Wrapper 컴포넌트
  const Wrapper = () => {
    const [value, setValue] = useState('입력값');
    return (
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onDelete={() => setValue('')}
      />
    );
  };

  // Wrapper 하나만 렌더링하여 중복 요소를 방지한다.
  render(<Wrapper />);

  const input = screen.getByRole('textbox');
  const deleteButton = screen.getByRole('button', { name: '입력값 지우기' });

  // X 버튼 클릭
  fireEvent.click(deleteButton);

  // 입력값이 지워졌는지 확인
  expect(input).toHaveValue('');

  // 삭제 후 버튼이 사라졌는지 확인할 때는 queryByRole을 사용해야 에러가 나지 않음
  expect(
    screen.queryByRole('button', { name: '입력값 지우기' }),
  ).not.toBeInTheDocument();
});

test('X 버튼 클릭 시 onDelete props에 전달된 함수가 호출되는지 확인한다.', () => {
  const onDelete = jest.fn();
  render(<Input value='입력값' onChange={jest.fn()} onDelete={onDelete} />);

  const deleteButton = screen.getByRole('button', { name: '입력값 지우기' });
  fireEvent.click(deleteButton);

  expect(onDelete).toHaveBeenCalled();
});

test('Input 컴포넌트 에러 발생 시 에러 메세지가 보이는지 확인한다', () => {
  render(
    <Input
      isError={true}
      errorMessage='입력값에 문제가 있습니다'
      onChange={jest.fn()}
      onDelete={jest.fn()}
    />,
  );

  const errorMessage = screen.getByText('입력값에 문제가 있습니다');
  expect(errorMessage).toBeInTheDocument();
});
