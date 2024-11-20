import React from 'react'
import * as S from './style'
import { toast } from 'react-toastify';
import { FaStethoscope, FaUserMd } from 'react-icons/fa';  // Ícones de saúde
import { useTranslation } from "react-i18next";
import { ListContext } from '@/contexts/listContext';
import { AuthContext } from '@/contexts/authContext';
import { useForm, SubmitHandler } from "react-hook-form";
import { ScheduleFormProps } from './types';
import { sendingScheduleFormToDatabase } from '@/services/schedules';

const AgendamentoForm = () => {
    const { t } = useTranslation()
    const { isToken } = React.useContext(AuthContext)
    const { loadSchedules } = React.useContext(ListContext)
    const [isClient, setClientCheckBox] = React.useState(false)
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<ScheduleFormProps>();

    const onSubmit: SubmitHandler<ScheduleFormProps> = async data => {
        const parsedData = data;

        parsedData.date = new Date(parsedData.date).toISOString()

        const { response, error } = await sendingScheduleFormToDatabase(parsedData, isToken)
        if (response) {
            toast.success('Consulta agendada com sucesso!')
        } else if (error) {
            toast.error(error.toString())
        }
        reset();
        setClientCheckBox(!isClient);
        loadSchedules()
    }

    return (
        <>
            <S.SvgContent>
                <FaStethoscope onClick={() => setClientCheckBox(!isClient)} />
            </S.SvgContent>

            <S.Form onSubmit={handleSubmit(onSubmit)}>
                <S.Label>
                    <S.Span>Paciente:</S.Span>
                    <S.Input
                        maxLength={41}
                        type="text"
                        {...register("paciente", {
                            required: "*Campo obrigatório.",
                            maxLength: {
                                value: 40,
                                message: "*Capacidade máxima de 40 caracteres."
                            }
                        })}
                        placeholder='Nome do paciente' />
                    <S.InputAlert>{errors.paciente?.message}</S.InputAlert>
                </S.Label>

                <S.Label>
                    <S.Span>Especialidade:</S.Span>
                    <S.Select {...register("especialidade", {
                        required: "*Campo obrigatório."
                    })}>
                        <S.Option value="" defaultChecked>Escolha a Especialidade</S.Option>
                        <S.Option value="C">Cardiologia</S.Option>
                        <S.Option value="D">Dermatologia</S.Option>
                        <S.Option value="N">Neurologia</S.Option>
                    </S.Select>
                    <S.InputAlert>{errors.doctor?.message}</S.InputAlert>
                </S.Label>

                <S.Label>
                    <S.Span>Médico:</S.Span>
                    <S.Select {...register("doctor", {
                        required: "*Campo obrigatório."
                    })}>
                        <S.Option value="" defaultChecked>Escolha o médico</S.Option>
                        <S.Option value="H">Dr. João Silva</S.Option>
                        <S.Option value="M">Dra. Ana Souza</S.Option>
                    </S.Select>
                    <S.InputAlert>{errors.doctor?.message}</S.InputAlert>
                </S.Label>

                <S.Label>
                    <S.Span>Idade:</S.Span>
                    <S.Input
                        type="number"
                        {...register("age", {
                            required: "*Campo obrigatório.",
                            maxLength: {
                                value: 3,
                                message: "*Capacidade máxima de 3 caracteres."
                            }
                        })}
                        placeholder='Idade do paciente' />
                    <S.InputAlert>{errors.age?.message}</S.InputAlert>
                </S.Label>

                <S.Label>
                    <S.Span>Sintomas:</S.Span>
                    <S.Textarea
                        {...register("sintomas", {
                            required: "*Campo obrigatório."
                        })}
                        placeholder='Descreva os sintomas' />
                    <S.InputAlert>{errors.sintomas?.message}</S.InputAlert>
                </S.Label>

                <S.Label>
                    <S.Span>Data e Hora:</S.Span>
                    <S.Input
                        type="datetime-local"
                        {...register("date", {
                            required: "*Campo obrigatório."
                        })} />
                    <S.InputAlert>{errors.date?.message}</S.InputAlert>
                </S.Label>

                <S.CheckLabel>
                    <S.CheckInput
                        type="checkbox"
                        checked={isClient}
                        {...register("is_client", { onChange: () => setClientCheckBox(!isClient) })}
                    />
                    <S.Span>Já é paciente?</S.Span>
                    <S.InputAlert>{errors.is_client?.message}</S.InputAlert>
                </S.CheckLabel>

                <S.ButtonContent>
                    {!isClient ? <S.Button disabled>Confirmar Agendamento</S.Button> :
                        <S.Button>Confirmar Agendamento</S.Button>}
                </S.ButtonContent>
            </S.Form>
        </>
    )
}

export default AgendamentoForm;
