// 1. 현재 상품의 `title`과 `description`에 입력한 내용이 제대로 렌더링이 되는지 확인하기
// 2. 증가 버튼과 감소 버튼, 초기 숫자인 1이 존재하는지 확인하기
// 3. 구매하기 버튼이 존재하는지 확인하기
// 4. 상품이 품절 상태(`isSoldOut={true}`)일 때 “품절” 텍스트가 렌더링되는지 확인하기
// 5. 상품이 품절 상태(`isSoldOut={true}`)일 때 버튼이 비활성화(`disabled`)되고, CSS 클래스명에 `opacity-50`과 `cursor-not-allowed`가 포함되는지 확인하기

import ProductItem from '@/src/components/ProductItem';
import { render, screen } from '@testing-library/react';

// 1. 현재 상품의 `title`과 `description`에 입력한 내용이 제대로 렌더링이 되는지 확인하기
test('현재 상품의 `title`과 `description`에 입력한 내용이 제대로 렌더링이 되는지 확인', () => {
  const testTitle = '상품명이지롱';
  const testDescription = '상품설명이지롱';

  render(<ProductItem title={testTitle} description={testDescription} />);

  // title 렌더링
  const titleElement = screen.getByText(testTitle);
  expect(titleElement).toBeInTheDocument();

  // description 렌더링
  const descriptionElement = screen.getByText(testDescription);
  expect(descriptionElement).toBeInTheDocument();
});

// 2. 증가 버튼과 감소 버튼, 초기 숫자인 1이 존재하는지 확인하기
test('증가, 감소, 초기 숫자 1의 존재 확인', () => {
  render(<ProductItem title='상품명이지롱' description='상품설명이지롱' />);

  // 감소 버튼 확인 (텍스트가 '-'인 버튼)
  const decreaseBtn = screen.getByRole('button', { name: '-' });
  expect(decreaseBtn).toBeInTheDocument();

  // 증가 버튼 확인 (텍스트가 '+'인 버튼)
  const increaseBtn = screen.getByRole('button', { name: '+' });
  expect(increaseBtn).toBeInTheDocument();

  // 초기 숫자 1이 존재하는지 확인
  const quantityText = screen.getByText('1');
  expect(quantityText).toBeInTheDocument();
});

// 3. 구매하기 버튼이 존재하는지 확인하기
test('구매하기 버튼이 존재하는지 확인', () => {
  render(<ProductItem title='상품명이지롱' description='상품설명이지롱' />);

  // 구매하기 버튼 확인
  const purchaseButton = screen.getByRole('button', { name: '구매하기' });
  expect(purchaseButton).toBeInTheDocument();
});

// 4. 상품이 품절 상태(`isSoldOut={true}`)일 때 “품절” 텍스트가 렌더링되는지 확인하기
test('상품이 품절 상태일 때, 품절 텍스트 렌더링 확인', () => {
  render(
    <ProductItem
      title='상품명이지롱'
      description='상품설명이지롱'
      isSoldOut={true}
    />,
  );

  const soldoutText = screen.getByText('품절');
  expect(soldoutText).toBeInTheDocument();
});

// 5. 상품이 품절 상태(`isSoldOut={true}`)일 때 버튼이 비활성화(`disabled`)되고, CSS 클래스명에 `opacity-50`과 `cursor-not-allowed`가 포함되는지 확인하기
test('상품이 품절 상태일 때, 버튼 비활성화 및 클래스 포함여부 확인', () => {
  render(
    <ProductItem
      title='상품명이지롱'
      description='상품설명이지롱'
      isSoldOut={true}
    />,
  );

  // 버튼 찾기
  const purchaseButton = screen.getByRole('button', { name: '구매하기' });

  // 버튼 비활성화 여부
  expect(purchaseButton).toBeDisabled();

  // opacity-50 포함 확인
  expect(purchaseButton).toHaveClass('opacity-50');

  // cursor-not-allowed 포함 확인
  expect(purchaseButton).toHaveClass('cursor-not-allowed');
});
