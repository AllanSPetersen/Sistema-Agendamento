import React from 'react'
import * as S from './style'
import Head from 'next/head'
import Header from '@/components/Header'
import ScheduleForm from '@/components/Forms/AgendamentoForm'
import ScheduleTable from '@/components/Tables/ScheduleTable'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ViewSchedules = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)

  return (
    <>
      <Head>
        <title>Agendamentos | Sistema de Agendamento</title>
      </Head>
      <S.Container>
        <Header title='Agendamentos' />
        <S.Main className='animation-container'>
          <S.Content>
            <S.Section>
              <S.LastRegister>
                <S.Header>
                  <S.Title>Agendamentos</S.Title>
                  <S.Date>
                    <DatePicker
                      selected={selectedDate}
                      dateFormat="dd/MM/yyyy"
                      placeholderText='Pesquisar agendamentos'
                      onChange={(date) => setSelectedDate(date)} />
                  </S.Date>
                </S.Header>
                <ScheduleTable datePicker={selectedDate} />
              </S.LastRegister>
            </S.Section>
            <S.Section>
              <ScheduleForm />
            </S.Section>
          </S.Content>
        </S.Main>
      </S.Container>
    </>
  )
}

export default ViewSchedules;