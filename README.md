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

| Query      | 설명                                            |
| ---------- | ----------------------------------------------- |
| `getBy*`   | 반드시 존재해야 하는 요소 (없으면 에러 발생)    |
| `queryBy*` | 요소가 없는지 검증할 때 사용 (없으면 null 반환) |
| `findBy*`  | 비동기 렌더링에서 사용 (Promise 반환)           |

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

## Matcher

- [다양한 매처](https://github.com/testing-library/jest-dom?tab=readme-ov-file#table-of-contents)

| 매처                          | 설명                        |
| ----------------------------- | --------------------------- |
| `toBeInTheDocument()`         | 요소가 문서에 있는지        |
| `toHaveTextContent('텍스트')` | 요소에 특정 텍스트가 있는지 |
| `toHaveClass('클래스명')`     | 요소에 특정 클래스가 있는지 |
| `toBeDisabled()`              | 요소가 비활성화되어 있는지  |
| `toBeChecked()`               | 체크박스가 체크되어 있는지  |

<br>

## Jest Lifecycle

테스트 실행 시 특정 시점에 코드를 실행할 수 있습니다.

`beforeEach`

- 각 테스트 실행 전에 실행된다.
- ex. 테스트 5개 → 5번 실행

`afterEach`

- 각 테스트 실행 후 실행된다.
- 주로 mock 초기화, 상태 정리에 사용된다.
- ex. 테스트 5개 → 실행 5번

`beforeAll`

- 모든 테스트 실행 전에 한 번만 실행된다.
- 주로 테스트 환경 설정이나 공통 리소스 초기화에 사용된다.
- ex) 데이터베이스 연결, 테스트 환경 설정, 필요한 모든 테스트를 위한 더미 데이터 생성 등

`afterAll`

- 모든 테스트가 끝난 후 한 번만 실행됩니다.
- 주로 테스트 환경을 정리하거나 사용한 리소스를 해제하는 데 사용됩니다.
- ex) 데이터베이스 연결 종료, 테스트를 위해 생성된 임시 파일 삭제, 모든 목(mock) 함수 초기화 등

<br>

- [Event](https://github.com/testing-library/dom-testing-library/blob/main/src/event-map.js)

<br>

## fireEvent vs userEvent

- `fireEvent`: 단일 DOM 이벤트 하나만 발생시킨다.
- `userEvent`: 사용자 행동을 시뮬레이션(여러 이벤트의 조합)

### userEvent 설치 및 사용

```bash
npm install @testing-library/user-event
```

<br>

### 사용법

```tsx
// fireEvent 방식
fireEvent.click(button);

// userEvent 방식
const user = userEvent.setup();
await user.click(button);
```

- `setup()`으로 초기화 필요
- 대부분 비동기라 `await` 필요
- 실제 사용자 행동에 더 가까운 테스트 가능

<br>
