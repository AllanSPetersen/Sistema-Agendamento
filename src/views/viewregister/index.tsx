import React from 'react'
import * as S from './style'
import Head from 'next/head'
import Header from '@/components/Header'
import ClientForm from '@/components/Forms/ClientForm'

const ViewRegister = () => {
  return (
    <>
      <Head>
        <title>Cadastro | Sistema de Agendamento</title>
      </Head>
      <S.Container>
        <Header title='Cadastro' />
        <S.Main className='animation-container'>
          <S.Content>
            <S.Section>
              <ClientForm />
            </S.Section>
          </S.Content>
        </S.Main>
      </S.Container>
    </>
  )
}

export default ViewRegister;