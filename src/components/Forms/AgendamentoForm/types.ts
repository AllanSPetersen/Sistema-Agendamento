export type DataListSchedulesProps = ScheduleFormProps[]

export type ScheduleFormProps = {
    paciente: string;
    id: string,
    especialidade: string,
    doctor: string,
    age: string,
    date: string,
    canceled_date: string,
    status: boolean,
    created_at: Date,
    sintomas: string | boolean | Date | undefined,
    is_client: boolean;
};

export type DoctorFetchProps = {
    id: string
    name: string
    reference_image_id: string
}