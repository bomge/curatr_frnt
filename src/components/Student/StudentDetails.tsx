import type { IGroup, NameId, IKafedra } from '@/pages/Profile.page';
import type { IContactPerson, IStudent } from '@/pages/Student.page';
import {
    showSuccessNotification,
    showErrorNotification,
} from '@/util/notification';
import { Stack, Group, Button, Text, Checkbox } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconSelector } from '@tabler/icons-react';
import type React from 'react';
import { Component, useEffect, useState } from 'react';

import * as Yup from 'yup';
import imgPlaceHolder from '../../assets/Без названия (2).png';
import { isYupValidationError } from '../EventDetails/EventDetails';
import { EditableContactPersonField } from '../Fields/EditableContactPerson';
import { EditableCheckboxField, EditableDateField, EditableSelectField, EditableTextField, ImageUpload } from '../Fields/OtherFields';
import { EditableField } from '../Fields/EditableField';
const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required').trim(),
    lastName: Yup.string().required('Last name is required').trim(),
    surName: Yup.string().nullable().trim(),
    birthdayDate: Yup.date()
        .max(new Date(), 'Birthday date must be in the past')
        .nullable(),
    phone: Yup.string().nullable().trim(),
    role: Yup.string().required('Role is required'),
    group: Yup.string().when('role', {
        is: (role: string) => role === 'Куратор' || role === 'Студент',
        // biome-ignore lint/suspicious/noThenProperty: <explanation>
        then: (schema) =>
            schema
                .required('Group is required for Куратор and Студент roles')
                .trim(),
        otherwise: (schema) => schema.nullable().trim(),
    }),
    faculty: Yup.string().when(['role', 'group'], {
        is: (role: string, group: string) =>
            role === 'Куратор' || role === 'Студент' || role === 'Декан',
        // biome-ignore lint/suspicious/noThenProperty: <explanation>
        then: (schema) =>
            schema
                .required(
                    'Faculty is required for Куратор, Студент and Декан roles',
                )
                .trim(),
        otherwise: (schema) => schema.nullable().trim(),
    }),
    department: Yup.string().when('role', {
        is: (role: string) => role === 'Куратор' || role === 'Студент',
        // biome-ignore lint/suspicious/noThenProperty: <explanation>
        then: (schema) =>
            schema
                .required(
                    'Department is required for Куратор and Студент roles',
                )
                .trim(),
        otherwise: (schema) => schema.nullable().trim(),
    }),
    isLeader: Yup.boolean().required('Specify if the student is a leader'),
});

type FormErrors = {
    [K in keyof typeof validationSchema.fields]?: string;
};
interface StudentDetailsProps {
    studentData: IStudent;
    allGroups: IGroup[];
    userRole: 'admin' | 'user' | 'manager' | null;
    allFaculty: NameId[];
    allDepartments: IKafedra[];
    allRoles: NameId[];
}

const StudentDetails: React.FC<StudentDetailsProps> = ({
    studentData,
    allGroups,
    userRole,
    allFaculty,
    allDepartments,
    allRoles,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState(studentData.firstName);
    const [lastName, setLastName] = useState(studentData.lastName);
    const [surName, setSurName] = useState(studentData.surName);
    const [role, setRole] = useState(studentData.role);
    const [group, setGroup] = useState(studentData.group || null);
    const [faculty, setFaculty] = useState(studentData.faculty);
    const [department, setDepartment] = useState<IKafedra | null | undefined>(
        studentData.department || null,
    );
    const [birthdayDate, setBirthdayDate] = useState(
        new Date(studentData.birthdayDate),
    );
    const [phone, setPhone] = useState(studentData.phone);
    const [phoneHome, setPhoneHome] = useState(studentData.phoneHome);
    const [socialAccs, setSocialAccs] = useState(studentData.socialAccs);
    const [address, setAddress] = useState(studentData.address);
    const [isLeader, setIsLeader] = useState(studentData.isLeader);
    const [mother, setMother] = useState(studentData.mother);
    const [father, setFather] = useState(studentData.father);
    const [image, setImage] = useState(studentData.img);

    const [isUploading, setIsUploading] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [hasSaved, setHasSaved] = useState(false);
    const isMobile = !!useMediaQuery('(max-width: 600px)');

    const toggleEditing = () => setIsEditing(!isEditing);

    const handleSave = async () => {
        try {
            await validationSchema.validate(
                {
                    firstName,
                    lastName,
                    surName,
                    birthdayDate,
                    phone,
                    role,
                    group: group?.name,
                    faculty: faculty?.name,
                    department: department?.name,
                    phoneHome,
                    socialAccs,
                    address,
                    isLeader,
                },
                { abortEarly: false },
            );
            // Here you can implement the logic to save the edited data
            console.log('Saving data');
            studentData.firstName = firstName;
            studentData.lastName = lastName;
            studentData.surName = surName;
            studentData.birthdayDate = birthdayDate.toISOString();
            studentData.phone = phone;
            studentData.role = role;
            //@ts-ignorew
            studentData.group = group;
            studentData.faculty = faculty;
            studentData.department = department;
            studentData.img = image;
            studentData.phone = phone;
            studentData.phoneHome = phoneHome;
            studentData.socialAccs = socialAccs;
            studentData.address = address;
            studentData.isLeader = isLeader;
            studentData.mother = mother;
            studentData.father = father;

            toggleEditing();
            setErrors({});
            //setHasSaved(false);
            showSuccessNotification('Данные были успешно обновлены');
        } catch (validationErrors) {
            console.log(validationErrors);
            //setHasSaved(true);
            if (validationErrors instanceof Yup.ValidationError) {
                const formattedErrors: FormErrors = {};
                validationErrors.inner.forEach((error) => {
                    //@ts-ignore
                    formattedErrors[error.path!] = error.message;
                });
                setErrors(formattedErrors);
            }
            showErrorNotification('Произошла ошибка при обновлении данных');
        }
    };

    const facultyOptions = allFaculty.map((f) => ({
        value: String(f.name),
        label: f.name,
    }));
    const filteredDepartments = faculty
        ? allDepartments
              .filter((d) => d.facultyId === faculty.id)
              .map((d) => ({ value: String(d.name), label: d.name }))
        : [];
    const filteredGroups = allGroups
        .filter((a) => a.departmentId == department?.id)
        .map((d) => ({ value: String(d.name), label: d.name }));

    const getRoleInfo = () => {
        // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
        let role_, group_, faculty_, isLeader_;
        // if(isEditing){
        // role_ = role
        // group_ = group
        // faculty_ = faculty
        // } else {
        role_ = studentData.role;
        group_ = studentData.group;
        faculty_ = studentData.faculty;
        isLeader_ = studentData.isLeader;
        // }

        switch (role_) {
            case 'Куратор':
                return `${role_} ${group_?.name || ''}`; // ${department?.name || ''}`;
            case 'Декан':
                return `${role_} ${faculty_?.name || ''}`;
            case 'Студент':
                return `${isLeader_ ? 'Cтароста' : role_} ${
                    group_?.name || ''
                }`;
            default:
                return role_;
        }
    };

    const handleInputChange = async (field: keyof FormErrors, value: any) => {
        try {
            await validationSchema.validateAt(field, { [field]: value });
            setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
        } catch (validationError) {
            if (isYupValidationError(validationError)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: (validationError as Yup.ValidationError).message,
                }));
            } else {
                console.error(validationError);
            }
        }
    };

    return (
        <Stack gap="0" pl={'0' || (isMobile ? '1rem' : '2rem')} maw="150rem">
            <Text fw={600} size="md" mb="1.5rem">
                Профиль
            </Text>
            <Group>
                <Stack gap='0'>
                <Text fw={700} size="xl">
                    {`${studentData.firstName} ${studentData.surName} ${studentData.lastName}`}
                </Text>
                <Text size="sm" color="dimmed">
                    {getRoleInfo()}
                </Text>

                </Stack>
                {userRole === 'admin' && (
                    <Button
                        onClick={isEditing ? handleSave : toggleEditing}
                        color={isEditing ? '#00ff83a6' : 'blue'}
                        disabled={isUploading}
                    >
                        {isEditing ? 'Сохранить' : 'Редактировать'}
                    </Button>
                )}
            </Group>

            {isEditing &&
                // isMobile &&
                Object.entries(errors).map(([key, value]) => (
                    <Text key={key} color="red">
                        {value}
                    </Text>
                ))}
            <Group maw="150rem">
                <table>
                    <tbody>
                        <EditableField
                            label="Имя"
                            value={
                                isEditing ? firstName : studentData.firstName
                            }
                            setValue={(value) => {
                                setFirstName(value);
                                handleInputChange('firstName', value);
                            }}
                            isEditing={isEditing}
                            isHidden={!isEditing}
                            isMobile={isMobile}
                            component={EditableTextField}
                            // error={hasSaved && errors.firstName}
                            error={errors.firstName}
                            // compProps={{value:'123',error:'123',label:123}}
                        />
                        <EditableField
                            label="Фамилия"
                            value={isEditing ? lastName : studentData.lastName}
                            setValue={(value) => {
                                setLastName(value);
                                handleInputChange('lastName', value);
                            }}
                            isEditing={isEditing}
                            isHidden={!isEditing}
                            isMobile={isMobile}
                            component={EditableTextField}
                            error={errors.lastName}
                        />
                        <EditableField
                            label="Отчество"
                            value={isEditing ? surName : studentData.surName}
                            setValue={(value) => {
                                setSurName(value);
                                handleInputChange('surName', value);
                            }}
                            isEditing={isEditing}
                            isHidden={!isEditing}
                            isMobile={isMobile}
                            component={EditableTextField}
                            error={errors.surName}
                        />
                        <EditableField
                            label="Группа"
                            value={
                                (isEditing
                                    ? group?.name
                                    : studentData.group?.name) || null
                            }
                            setValue={(value) => {
                                const newGroup = allGroups.find(
                                    (x) => x.name === value,
                                );
                                setGroup(newGroup ?? null);
                                handleInputChange('group', newGroup?.name);
                            }}
                            isEditing={isEditing}
                            isHidden={role == 'Декан' || role == 'Проректор'}
                            isMobile={isMobile}
                            component={EditableSelectField}
                            options={filteredGroups}
                            icon={<IconSelector size={15} />}
                            placeholder="Search or select a group..."
                            error={errors.group}
                        />
                        <EditableField
                            label="Факультет"
                            value={
                                isEditing
                                    ? faculty?.name
                                    : studentData.faculty?.name
                            }
                            setValue={(value) => {
                                const newFaculty = allFaculty.find(
                                    (x) => x.name == value,
                                );
                                setFaculty(newFaculty);
                                setDepartment(null);
                                setGroup(null);
                                handleInputChange('faculty', newFaculty?.name);
                            }}
                            isEditing={isEditing}
                            isMobile={isMobile}
                            component={EditableSelectField}
                            options={facultyOptions}
                            error={errors.faculty}
                        />
                        <EditableField
                            label="Кафедра"
                            value={
                                isEditing
                                    ? department?.name || department
                                    : studentData.department?.name ||
                                      studentData.department
                            }
                            // setValue={setDepartment}
                            setValue={(value) => {
                                const newCafedra = allDepartments.find(
                                    (x) => x.name == value,
                                );
                                setDepartment(newCafedra);
                                setGroup(null);
                                handleInputChange(
                                    'department',
                                    newCafedra?.name,
                                );
                            }}
                            isEditing={isEditing}
                            isHidden={role == 'Декан' || role == 'Проректор'}
                            isMobile={isMobile}
                            component={EditableSelectField}
                            options={filteredDepartments}
                            error={errors.department}
                        />
                        <EditableField
                            label="Староста"
                            value={isEditing ? isLeader : studentData.isLeader}
                            isHidden={!isEditing && !studentData.isLeader}
                            setValue={setIsLeader}
                            isEditing={isEditing}
                            isMobile={isMobile}
                            component={EditableCheckboxField}
                            error={errors.isLeader}
                        />
                        <EditableField
                            label="Дата рождения"
                            value={
                                isEditing
                                    ? birthdayDate
                                    : studentData.birthdayDate
                            }
                            setValue={(value) => {
                                setBirthdayDate(value);
                                handleInputChange('birthdayDate', value);
                            }}
                            isEditing={isEditing}
                            isMobile={isMobile}
                            component={EditableDateField}
                            error={errors.birthdayDate}
                        />
                        <EditableField
                            label="Телефон"
                            value={isEditing ? phone : studentData.phone}
                            setValue={(value) => {
                                setPhone(value);
                                handleInputChange('phone', value);
                            }}
                            isEditing={isEditing}
                            isMobile={isMobile}
                            component={EditableTextField}
                            error={errors.phone}
                            isHidden={userRole !== 'admin'}
                        />
                        <EditableField
                            label="Домашний телефон"
                            value={
                                isEditing ? phoneHome : studentData.phoneHome
                            }
                            setValue={(value) => setPhoneHome(value)}
                            isEditing={isEditing}
                            isMobile={isMobile}
                            component={EditableTextField}
                            isHidden={userRole !== 'admin'}
                        />
                        <EditableField
                            label="Социальные сети"
                            value={
                                isEditing ? socialAccs : studentData.socialAccs
                            }
                            setValue={(value) => setSocialAccs(value)}
                            isEditing={isEditing}
                            isMobile={isMobile}
                            component={EditableTextField}
                            isHidden={userRole !== 'admin'}
                        />
                        <EditableField
                            label="Адрес"
                            value={isEditing ? address : studentData.address}
                            setValue={(value) => setAddress(value)}
                            isEditing={isEditing}
                            isMobile={isMobile}
                            component={EditableTextField}
                            isHidden={userRole !== 'admin'}
                        />
                        <EditableField
                            label="Мать"
                            value={isEditing ? mother : studentData.mother}
                            setValue={setMother}
                            isEditing={isEditing}
                            isMobile={isMobile}
                            component={EditableContactPersonField}
                            isHidden={userRole !== 'admin'}
                            spoiler
                        />
                        <EditableField
                            label="Отец"
                            value={isEditing ? father : studentData.father}
                            setValue={setFather}
                            isEditing={isEditing}
                            isMobile={isMobile}
                            component={EditableContactPersonField}
                            isHidden={userRole !== 'admin'}
                            spoiler
                        />
                    </tbody>
                </table>
                {/* <Image
						src={profileData.img || imgPlaceHolder}
						alt="Profile"
						width={isMobile ? '100%' : 150}
						height={isMobile ? 'auto' : 150}
						radius="md"
						maw={isMobile ? '30rem' : 'auto'}
						mah={isMobile ? '30rem' : 'auto'}
						style={{ alignSelf: 'baseline' }}
					/> */}
                <ImageUpload
                    initialImage={studentData.img || imgPlaceHolder}
                    isUploading={isUploading}
                    setIsUploading={setIsUploading}
                    image={image!}
                    setImage={setImage}
                    isEditing={isEditing}
                    isMobile={isMobile}
                />
            </Group>
            {/* {isEditing &&
                !isMobile &&
                Object.entries(errors).map(([key, value]) => (
                    <Text key={key} color="red">
                        {value}
                    </Text>
                ))} */}
        </Stack>
    );
};



export default StudentDetails;
