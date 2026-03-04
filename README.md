# 🧪 Component testing with Jest & React Testing Library

- [Nextjs - Jest setup](https://nextjs.org/docs/app/guides/testing/jest#manual-setup)

<br>

## 설치

```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest

```

<br>

## Jest 설정 (Next.js)

### jest.config.ts 생성

```bash
npm init jest@latest

```

<br>

### jest.config.ts 파일 수정

```ts
import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Next.js 설정(next.config.js, .env 등)을 테스트 환경에서 로드
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // 테스트 전에 실행할 설정 파일을 지정
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
```

<br>

### jest.setup.ts 생성

```ts
import '@testing-library/jest-dom';
```

#### jest-dom을 사용하는 이유

- `@testing-library/jest-dom`은 DOM 테스트에 유용한 추가 matcher를 제공한다.
- ex. `toBeInTheDocument()`, `toHaveTextContent()`, `toBeVisible()`, `toHaveAttribute()`

<br>

## 테스트 실행

package.json에 스크립트를 추가한다.

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

<br>

```bash
npm run test
```

<br>

## React Testing Library Query

React Testing Library의 Query는 DOM 요소를 선택하는 메소드이며, 사용자 관점(접근성 기반)의 쿼리 사용을 권장한다.

- 쿼리 우선순위: [About Queries | Testing Library](https://testing-library.com/docs/queries/about/#priority)

<br>

### getBy / queryBy / findBy 차이

- `getBy*` : 반드시 있어야 하는 요소 (없으면 즉시 에러)
- `queryBy*` : 없음을 검증할 때 유용 (없으면 null 반환)
- `findBy*` : 비동기 렌더링(API 응답/상태 업데이트 등)에서 사용 (Promise 반환)

<br>

### 주요 Query 함수

| 쿼리                   | 설명                                                                                                                                    |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `getByRole`            | 접근성 role 기준으로 요소를 찾음 ([역할 목록](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Techniques#roles)) |
| `getByLabelText`       | label과 연결된 input 요소를 찾음                                                                                                        |
| `getByPlaceholderText` | placeholder 기준으로 요소 선택                                                                                                          |
| `getByText`            | 화면에 보이는 텍스트로 요소 선택                                                                                                        |
| `getByTestId`          | data-testid 속성으로 요소 선택                                                                                                          |

<br>

## 매쳐(matcher)

- [다양한 매처](https://github.com/testing-library/jest-dom?tab=readme-ov-file#table-of-contents)

| 매처                          | 설명                        |
| ----------------------------- | --------------------------- |
| `toBeInTheDocument()`         | 요소가 문서에 있는지        |
| `toHaveTextContent('텍스트')` | 요소에 특정 텍스트가 있는지 |
| `toHaveClass('클래스명')`     | 요소에 특정 클래스가 있는지 |
| `toBeDisabled()`              | 요소가 비활성화되어 있는지  |
| `toBeChecked()`               | 체크박스가 체크되어 있는지  |
