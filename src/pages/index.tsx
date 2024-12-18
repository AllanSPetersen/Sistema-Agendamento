import Head from 'next/head'
import { Poppins } from '@next/font/google'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import Login from '@/views/login'

const poppins = Poppins({
  subsets: ['latin'],
  weight: '100'
})

export default function Home() {
  return (
    <>
      <Head>
        <title>Login | Sistema de Agendamento</title>
      </Head>
      <main>
        <Login />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['@nextauth-token']: token } = parseCookies(ctx)
  if (token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      }
    }
  }
  return {
    props: {}
  }
}