import React from 'react'
import * as S from './style'
import moment from 'moment'
import { toast } from 'react-toastify'
import { DoctorModalProps } from './types'
import { CgCloseR } from 'react-icons/cg'
import { useTranslation } from "react-i18next";
import { ListContext } from '@/contexts/listContext'
import { AuthContext } from '@/contexts/authContext'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { DoctorFetchProps, ScheduleFormProps } from '@/components/Forms/AgendamentoForm/types'
import { deletingScheduleFormToDatabase, updatingScheduleFormToDatabase } from '@/services/schedules'

const DoctorModalDetails = ({ setDoctorModalOpen, doctorProps }: DoctorModalProps) => {
    const { t } = useTranslation()
    const { isToken } = React.useContext(AuthContext)
    const { loadSchedules } = React.useContext(ListContext)
    const [docRef, setdocRef] = React.useState<DoctorFetchProps[]>([])

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue } = useForm<ScheduleFormProps>({ defaultValues: doctorProps });

    const onSubmit: SubmitHandler<ScheduleFormProps> = async data => {
        const parsedData = data;

        parsedData.date = new Date(data.date).toISOString();

        console.log(doctorProps);

        const { response, error } = await updatingScheduleFormToDatabase(doctorProps.id, parsedData, isToken)
        if (response) {
            toast.success('Dados atualizado com sucesso!')
        } else if (error) {
            toast.error(error.toString())
        }
        loadSchedules()
        setDoctorModalOpen(false)
    }

    const cancelSchedule = async () => {
        const currentDate = new Date()
        const canceledDateFormated = new Date(currentDate).toISOString();
        setValue("status", false);
        setValue("canceled_date", canceledDateFormated);
        toast.success('Agendamento cancelado com sucesso!')
    }

    const deleteSchedule = async () => {
        const { response, error } = await deletingScheduleFormToDatabase(doctorProps.id, isToken)
        if (response) {
            toast.success('Agendamento finalizado com sucesso!')
        } else if (error) {
            toast.error(error.toString())
        }
        loadSchedules()
    }

    return (
        <S.Container className='animation-container'>
            <S.Content>
                <S.Form onSubmit={handleSubmit(onSubmit)}>
                    <S.Details>
                        <S.Header>
                            <S.ConfirmButton onClick={cancelSchedule}>Cancelar</S.ConfirmButton>
                            <S.Icon>
                                <CgCloseR onClick={() => setDoctorModalOpen(false)} />
                            </S.Icon>
                        </S.Header>
                        <S.Description>
                            <S.Info>
                                <Controller
                                    name="paciente"
                                    control={control}
                                    defaultValue={doctorProps.paciente}
                                    rules={{
                                        required: "*Campo obrigatório.",
                                        maxLength: {
                                            value: 40,
                                            message: "*Capacidade máxima de 40 caracteres."
                                        }
                                    }}
                                    render={({ field }) => (
                                        <S.Label>
                                            <S.Span>Paciente:</S.Span>
                                            <S.Input {...field} type="text" maxLength={41} value={String(field.value || '')} /> 
                                            <S.InputAlert>{errors?.paciente?.message}</S.InputAlert>
                                        </S.Label>
                                    )} />

                                <Controller
                                    name="especialidade"
                                    control={control}
                                    defaultValue={doctorProps.especialidade}
                                    rules={{
                                        required: "*Campo obrigatório.",
                                        maxLength: {
                                            value: 20,
                                            message: "*Capacidade máxima de 20 caracteres."
                                        }
                                    }}
                                    render={({ field }) => (
                                        <S.Label>
                                            <S.Span>Especialidade:</S.Span>
                                            <S.Select {...field}>
                                                <S.Option value="" defaultChecked>Escolha</S.Option>
                                                <S.Option value="C">Cardiologia</S.Option>
                                                <S.Option value="D">Dermatologia</S.Option>
                                                <S.Option value="N">Neurologia</S.Option>
                                            </S.Select>
                                            <S.InputAlert>{errors.especialidade?.message}</S.InputAlert>
                                        </S.Label>
                                    )} />

                                <Controller
                                    name="age"
                                    control={control}
                                    defaultValue={doctorProps.age}
                                    rules={{
                                        required: "*Campo obrigatório.",
                                        maxLength: {
                                            value: 2,
                                            message: "*Capacidade máxima de 2 caracteres."
                                        }
                                    }}
                                    render={({ field }) => (
                                        <S.Label>
                                            <S.Span>Idade:</S.Span>
                                            <S.Input {...field} type="number" />
                                            <S.InputAlert>{errors.age?.message}</S.InputAlert>
                                        </S.Label>
                                    )} />


                                <Controller
                                    name="doctor"
                                    control={control}
                                    defaultValue={doctorProps.doctor}
                                    rules={{ required: "*Campo obrigatório." }}
                                    render={({ field }) => (
                                        <S.Label>
                                            <S.Span>Médico:</S.Span>
                                            <S.Select {...field}>
                                                <S.Option value="" defaultChecked>Escolha</S.Option>
                                                <S.Option value="H">Dr. João Silva</S.Option>
                                                <S.Option value="M">Dra. Ana Souza</S.Option>
                                            </S.Select>
                                            <S.InputAlert>{errors.doctor?.message}</S.InputAlert>
                                        </S.Label>
                                    )} />

                                <Controller
                                    name="date"
                                    control={control}
                                    defaultValue={doctorProps.date}
                                    rules={{ required: "*Campo obrigatório." }}
                                    render={({ field }) => (
                                        <S.Label>
                                            <S.Span>Data:</S.Span>
                                            <S.Input {...field}
                                                type="datetime-local"
                                                value={moment(field.value).format('YYYY-MM-DDTHH:mm')} />
                                            <S.InputAlert>{errors.date?.message}</S.InputAlert>
                                        </S.Label>
                                    )} />

                                <S.ScheduleDate>Agendamento realizado em: {new Date(doctorProps.created_at)
                                    .toLocaleDateString('pt-br', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </S.ScheduleDate>

                                <S.Text>Agendado para: {new Date(doctorProps.date)
                                    .toLocaleDateString('pt-br', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })} às {new Date(doctorProps.date)
                                        .toLocaleString("pt-br", {
                                            hour: 'numeric',
                                            minute: 'numeric'
                                        })}
                                </S.Text>
                            </S.Info>
                        </S.Description>
                    </S.Details>
                    <S.SaveButton type="submit">Salvar</S.SaveButton>
                    <S.DeleteButton onClick={deleteSchedule}>Finalizar</S.DeleteButton>
                </S.Form>
            </S.Content>
        </S.Container>
    )
}

export default DoctorModalDetails