import LoginForm from '@/components/Forms/LoginForm'
import React from 'react'
import * as S from './style'
import Home from '@/assets/Home.png'

const Login = () => {
    return (
        <S.Container className='animation-container'>
            <S.LogoContainer>
                <S.LogoContent>
                    <S.Logo alt='Home' src={Home} priority={true} />
                </S.LogoContent>
                <S.Title>Sistema de Agendamento</S.Title>
                <S.Span>Seu sistema de agendamentos</S.Span>
            </S.LogoContainer>

            <S.Content>
                <LoginForm />
                {/* <S.ForgotPassword href={'/reset'}>Esqueceu sua senha?</S.ForgotPassword> */}
                <S.Info>
                    <S.Text>Não tem uma conta?</S.Text>
                    <S.Register href={'/register-account'}>Registre-se</S.Register>
                </S.Info>
            </S.Content>
        </S.Container>
    )
}

export default Login;