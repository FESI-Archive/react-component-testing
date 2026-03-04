import { Input } from '@/src/components/Input';

export default function Home() {
  return (
    <>
      <h1>컴포넌트 테스트 연습하기</h1>
      <input type='text' placeholder='이름을 입력하세요.' />
      <hr />
      <div className='flex flex-col items-center justify-center min-h-screen p-4'>
        <div className='w-96'>
          <Input type='text' placeholder='입력하기' />
        </div>
      </div>
    </>
  );
}
