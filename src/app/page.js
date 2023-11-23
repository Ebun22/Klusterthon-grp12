import Image from 'next/image';
import { FormWrapper, Header, AuthPage } from './components';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <AuthPage />
      {/* <Header />
      <FormWrapper /> */}
    </main>
  )
}
