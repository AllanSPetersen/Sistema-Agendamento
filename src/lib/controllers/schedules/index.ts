import prisma from "../../prisma";
import { ScheduleFormProps } from "@/components/Forms/AgendamentoForm/types";
import moment from "moment";

export async function createSchedule(data: ScheduleFormProps, userId: string | undefined) {
    try {
        const ageIsNegative = (Number(data.age) <= 0);


        const t = new Date(data.date);
        const momentDate = moment(t);

        const alreadyExists = await prisma.schedules.findFirst({
            where: {
                date: {
                    gte: momentDate.startOf("hour").toDate().toISOString(),
                    lte: momentDate.endOf("hour").toDate().toISOString(),
                },
                status: true
            },
        });

        if (ageIsNegative) throw new Error("A idade precisa ser um valor válido!");
        if (alreadyExists) throw new Error("Já existe um agendamento para esse dia e horário.");

        const schedule = await prisma.schedules.create({
            data: {
                paciente: data.paciente,
                especialidade: data.especialidade,
                doctor: data.doctor,
                sintomas: data.sintomas,
                age: data.age,
                date: data.date,
                status: true,
                canceled_date: new Date(data.date).toISOString(),
                is_client: data.is_client,
                user: {
                    connect: { id: userId },
                }
            },
        });
        return { schedule };
    } catch (error) {
        return { error }
    }
}

export async function getAllSchedules(userId: string | undefined) {
    try {
        const schedules = await prisma.schedules.findMany({
            where: {
                userId: userId
            }
        })
        return { schedules }
    } catch (error) {
        return { error }
    }
}

export async function updateSchedule(id: string, data: ScheduleFormProps) {
    try {

        const t = new Date(data.date);
        const momentDate = moment(t);

        const ageIsNegative = (Number(data.age) <= 0);

        let schedule = await prisma.schedules.findUnique({
            where: { id: id },
        });

        if (!schedule) throw new Error("Agendamento não encontrado.");
        if (ageIsNegative) throw new Error("A idade precisa ser um valor válido!");

        if (momentDate.isSame(moment(schedule.date))) {
            schedule = await prisma.schedules.update({
                where: { id: id },
                data: {
                    paciente: data.paciente,
                    especialidade: data.especialidade,
                    doctor: data.doctor,
                    sintomas: data.sintomas,
                    age: data.age,
                    date: data.date,
                    status: data.status,
                    canceled_date: new Date(data.date).toISOString(),
                    is_client: data.is_client,
                },
            });
        } else {
            const alreadyExists = await prisma.schedules.findFirst({
                where: {
                    date: {
                        gte: momentDate.startOf("hour").toISOString(),
                        lte: momentDate.endOf("hour").toISOString(),
                    },
                    status: true
                },
            });

            if (alreadyExists) throw new Error("Já existe um agendamento para esse dia e horário.");

            schedule = await prisma.schedules.update({
                where: { id: id },
                data: {
                    paciente: data.paciente,
                    especialidade: data.especialidade,
                    doctor: data.doctor,
                    sintomas: data.sintomas,
                    age: data.age,
                    status: data.status,
                    date: data.date,
                    canceled_date: new Date(data.date).toISOString(),
                    is_client: data.is_client,  
                },
            });
        }

        return { schedule }
    } catch (error) {
        return { error }
    }
}

export async function deleteSchedule(id: string) {
    try {
        const schedule = await prisma.schedules.delete({
            where: { id: id }
        })
        return { schedule }
    } catch (error) {
        return { error }
    }
}

export async function findSchedule(id: string) {
    try {
        const schedule = await prisma.schedules.findUnique({
            where: { id: id }
        })
        return { schedule }
    } catch (error) {
        return { error }
    }
}

export async function getAllCanceledSchedules(userId: string | undefined) {
    try {
        const schedules = await prisma.schedules.findMany({
            where: {
                userId: userId,
                status: false
            },
        })
        return { schedules }
    } catch (error) {
        return { error }
    }
}

export async function deleteAllCanceledSchedules(userId: string | undefined,) {
    try {
        const schedules = await prisma.schedules.deleteMany({
            where: {
                userId: userId,
                status: false
            },
        })
        return { schedules }
    } catch (error) {
        return { error }
    }
}