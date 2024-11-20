import React from 'react'
import Head from 'next/head'
import * as S from './style'
import RegisterIMG from '@/assets/Register.png'
import RegisterForm from '@/components/Forms/RegisterForm'

const Register = () => {
    return (
        <>
            <Head>
                <title>Registrar</title>
            </Head>
            <S.Container className='animation-container'>
                <S.LogoContainer>
                    <S.LogoContent>
                        <S.Logo alt='RegisterIMG' src={RegisterIMG} priority={true} />
                    </S.LogoContent>
                    <S.Title>Sistema de Agendamentos</S.Title>
                    <S.Span>Seu sistema de agendamentos</S.Span>
                </S.LogoContainer>

                <S.Content>
                    <RegisterForm />
                    <S.Info>
                        <S.Text>Já tem uma conta?</S.Text>
                        <S.Login href={'/'}>Fazer Login</S.Login>
                    </S.Info>
                </S.Content>
            </S.Container>
        </>
    )
}

export default Register;