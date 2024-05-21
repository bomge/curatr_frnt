import type { IContactPerson } from "@/pages/Student.page";
import { Group, Text } from "@mantine/core";
import { useState, useEffect } from "react";
import { EditableTextField } from "./OtherFields";

interface EditableContactPersonFieldProps {
    value: IContactPerson | undefined;
    setValue: (value: IContactPerson) => void;
    isEditing: boolean;
    isMobile: boolean;
}

export const EditableContactPersonField: React.FC<EditableContactPersonFieldProps> = ({
    value,
    setValue,
    isEditing,
    isMobile,
}) => {
    const [firstName, setFirstName] = useState(value?.firstName || '');
    const [lastName, setLastName] = useState(value?.lastName || '');
    const [surName, setSurName] = useState(value?.surName || '');
    const [phone, setPhone] = useState(value?.phone || '');
    const [phoneWork, setPhoneWork] = useState(value?.phoneWork || '');
    const [work, setWork] = useState(value?.work || '');
    const [jobPosition, setJobPosition] = useState(value?.jobPosition || '');

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (isEditing) {
            setValue({
                firstName,
                lastName,
                surName,
                phone,
                phoneWork,
                work,
                jobPosition,
            });
        }
    }, [
        isEditing,
        firstName,
        lastName,
        surName,
        phone,
        phoneWork,
        work,
        jobPosition,
        // setValue,
    ]);

    // useEffect(()=>{
    //     setValue({
    //                     firstName,
    //                     lastName,
    //                     surName,
    //                     phone,
    //                     phoneWork,
    //                     work,
    //                     jobPosition,
    //                 });
    // },[isEditing])

    return (
        <>

            {isEditing ? (
                <>
                    <Group>

                        <EditableTextField
                            value={firstName}
                            setValue={setFirstName}
                            isEditing={isEditing}
                            isMobile={isMobile}
                            description="Имя"
                        />
                        <EditableTextField
                            value={lastName}
                            setValue={setLastName}
                            isEditing={isEditing}
                            isMobile={isMobile}
                            description="Фамилия"
                        />
                        <EditableTextField
                            value={surName}
                            setValue={setSurName}
                            isEditing={isEditing}
                            isMobile={isMobile}
                            description="Отчество"
                        />
                        <EditableTextField
                            value={phone}
                            setValue={setPhone}
                            isEditing={isEditing}
                            isMobile={isMobile}
                            description="Номер телефона"
                        />
                        <EditableTextField
                            value={phoneWork}
                            setValue={setPhoneWork}
                            isEditing={isEditing}
                            isMobile={isMobile}
                            description="Номер телефона (раб)"
                        />
                        <EditableTextField
                            value={work}
                            setValue={setWork}
                            isEditing={isEditing}
                            isMobile={isMobile}
                            description="Место работы"
                        />
                        <EditableTextField
                            value={jobPosition}
                            setValue={setJobPosition}
                            isEditing={isEditing}
                            isMobile={isMobile}
                            description="Должность"
                        />
                    </Group>
                </>
            ) : (
                <Text>
                    {`${value?.firstName || ''} ${value?.surName || ''} ${value?.lastName || ''
                        }`}
                    {value?.phone && ` ${value.phone}`}
                    {value?.phoneWork &&
                        `, Рабочий телефон: ${value.phoneWork}`}
                    {value?.work && `, Работа: ${value.work}`}
                    {value?.jobPosition && `, Должность: ${value.jobPosition}`}
                </Text>
            )}
        </>
    );
};