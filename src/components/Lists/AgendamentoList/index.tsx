import React from 'react'
import * as S from './style'
import { ScheduleFormProps } from '@/components/Forms/AgendamentoForm/types'
import DoctorModalDetails from '../../Modals/DoctorModalDetails'

const AgendList = ({ ...props }: ScheduleFormProps) => {
  const [isDoctorModalOpen, setDoctorModalOpen] = React.useState(false)
  return (
    <>
      {isDoctorModalOpen && <DoctorModalDetails setDoctorModalOpen={setDoctorModalOpen} doctorProps={props} />}
      <S.Container onClick={() => setDoctorModalOpen(true)}>
        <S.ContentList>
          <S.List className='animation-container'>
            <S.ContentListLeft>
              <S.Name>{props.paciente}</S.Name>
              <S.Span>-</S.Span>
              <S.Esp>{props.especialidade}</S.Esp>
            </S.ContentListLeft>
            <S.ContentListRight>
              <S.Date>{new Date(props.date)
                .toLocaleString("pt-br", {
                  day: 'numeric',
                  month: 'numeric'
                })}</S.Date>
              <S.Time>{new Date(props.date)
                .toLocaleString("pt-br", {
                  hour: 'numeric',
                  minute: 'numeric'
                })}</S.Time>
            </S.ContentListRight>
          </S.List>
        </S.ContentList>
      </S.Container>
    </>
  )
}

export default AgendList