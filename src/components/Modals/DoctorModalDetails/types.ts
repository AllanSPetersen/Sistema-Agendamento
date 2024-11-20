import { ScheduleFormProps } from "@/components/Forms/AgendamentoForm/types";

export type DoctorModalProps = {
    doctorProps: ScheduleFormProps; 
    setDoctorModalOpen: React.Dispatch<React.SetStateAction<boolean>>; 
};
