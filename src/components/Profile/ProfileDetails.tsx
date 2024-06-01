import type React from 'react';
import { useState } from 'react';
import {
    Text,
    Group,
    Button,
    Stack,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import ruLocaleDate from 'date-fns/locale/ru';
import {
    IconSelector,
} from '@tabler/icons-react';
import 'dayjs/locale/ru';
import imgPlaceHolder from '../../assets/Без названия (2).png';
import type { IGroup, IProfile } from '@/pages/Profile.page';
import * as Yup from 'yup';
import {
    showErrorNotification,
    showSuccessNotification,
} from '@/util/notification';
import { isYupValidationError } from '../EventDetails/EventDetails';
import { EditableField } from '../Fields/EditableField';
import { EditableTextField, EditableSelectField, EditableDateField, ImageUpload } from '../Fields/OtherFields';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required').trim(),
    lastName: Yup.string().required('Last name is required').trim(),
    surName: Yup.string().nullable().trim(),
    birthdayDate: Yup.date()
        .max(new Date(), 'Birthday date must be in the past')
        .nullable(),
    phone: Yup.string().nullable().trim(),
    email: Yup.string().nullable().trim(),
    role: Yup.string().required('Role is required'),
    group: Yup.string().when('role', {
        is: 'Куратор',
        // biome-ignore lint/suspicious/noThenProperty: <explanation>
        then: (schema) =>
            schema.required('Group is required for Куратор role').trim(),
        otherwise: (schema) => schema.nullable().trim(),
    }),
    faculty: Yup.string().when(['role', 'group'], {
        is: (role: string, group: string) =>
            role === 'Куратор' || role === 'Декан',
        // biome-ignore lint/suspicious/noThenProperty: <explanation>
        then: (schema) =>
            schema
                .required('Faculty is required for Куратор and Декан roles')
                .trim(),
        otherwise: (schema) => schema.nullable().trim(),
    }),
    department: Yup.string().when('role', {
        is: 'Куратор',
        // biome-ignore lint/suspicious/noThenProperty: <explanation>
        then: (schema) =>
            schema.required('Department is required for Куратор role').trim(),
        otherwise: (schema) => schema.nullable().trim(),
    }),
});

type FormErrors = {
    [K in keyof typeof validationSchema.fields]?: string;
};

interface IKafedra {
    name: string;
    id: number;
    facultyId: number;
}

interface NameId {
    name: string;
    id: number;
}

interface ProfileDetailsProps {
    profileData: IProfile;
    allGroups: IGroup[];
    userRole: 'admin' | 'user' | 'manager' | null;
    allFaculty: NameId[];
    allDepartments: IKafedra[];
    allRoles: NameId[];
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
    profileData,
    allGroups,
    userRole,
    allFaculty,
    allDepartments,
    allRoles,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState(profileData.firstName);
    const [lastName, setLastName] = useState(profileData.lastName);
    const [surName, setSurName] = useState(profileData.surName);
    const [role, setRole] = useState(profileData.role);
    const [group, setGroup] = useState(profileData.group || null);
    const [faculty, setFaculty] = useState<NameId | null | undefined>(
        profileData.faculty || null,
    );
    const [department, setDepartment] = useState<IKafedra | null | undefined>(
        profileData.department || null,
    );
    const [birthdayDate, setBirthdayDate] = useState(
        new Date(profileData.birthdayDate),
    );
    const [phone, setPhone] = useState(profileData.phone);
    const [email, setEmail] = useState(profileData.email);
    const [image, setImage] = useState(profileData.img);
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
                },
                { abortEarly: false },
            );
            // Here you can implement the logic to save the edited data
            console.log('Saving data');
            profileData.firstName = firstName;
            profileData.lastName = lastName;
            profileData.surName = surName;
            profileData.birthdayDate = birthdayDate.toISOString();
            profileData.phone = phone;
            profileData.role = role;
            //@ts-ignorew
            profileData.group = group;
            profileData.faculty = faculty;
            profileData.department = department;
            profileData.img = image;
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
        let role_, group_, faculty_;
        // if(isEditing){
        // role_ = role
        // group_ = group
        // faculty_ = faculty
        // } else {
        role_ = profileData.role;
        group_ = profileData.group;
        faculty_ = profileData.faculty;
        // }

        switch (role_) {
            case 'Куратор':
                return `${role_} ${group_?.name || ''}`; // ${department?.name || ''}`;
            case 'Декан':
                return `${role_} ${faculty_?.name || ''}`;
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
        <Stack gap="0" maw="150rem">
            <Text fw={600} size="md" mb="1.5rem">
                Профиль
            </Text>
            <Group>
                <Stack gap="0">
                    <Text fw={700} size="xl">
                        {`${profileData.firstName} ${profileData.surName} ${profileData.lastName}`}
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
                isMobile &&
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
                                isEditing ? firstName : profileData.firstName
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
                        />
                        <EditableField
                            label="Фамилия"
                            value={isEditing ? lastName : profileData.lastName}
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
                            value={isEditing ? surName : profileData.surName}
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
                            label="Роль"
                            value={isEditing ? role : profileData.role}
                            setValue={(value) => {
                                setRole(value);
                                handleInputChange('role', value);
                            }}
                            isEditing={isEditing}
                            isHidden={
                                !isEditing &&
                                (role == 'Куратор' ||
                                    role == 'Декан' ||
                                    role == 'Проректор')
                            }
                            isMobile={isMobile}
                            component={EditableSelectField}
                            options={allRoles.map((r) => ({
                                value: r.name,
                                label: r.name,
                            }))}
                            error={errors.role}
                            compProps={{
                                searchable:false
                            }
                            }
                        />
                        <EditableField
                            label="Группа"
                            value={
                                (isEditing
                                    ? group?.name
                                    : profileData.group?.name) || null
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
                                    : profileData.faculty?.name
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
                                    : profileData.department?.name ||
                                      profileData.department
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
                            label="Дата рождения"
                            value={
                                isEditing
                                    ? birthdayDate
                                    : profileData.birthdayDate
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
                            value={isEditing ? phone : profileData.phone}
                            setValue={(value) => {
                                setPhone(value);
                                handleInputChange('phone', value);
                            }}
                            isEditing={isEditing}
                            isMobile={isMobile}
                            component={EditableTextField}
                            error={errors.phone}
                        />
                        <EditableField
                            label="Email"
                            value={isEditing ? email : profileData.email}
                            setValue={(value) => {
                                setEmail(value);
                                handleInputChange('email', value);
                            }}
                            isEditing={isEditing}
                            isMobile={isMobile}
                            component={EditableTextField}
                            error={errors.email}
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
                    initialImage={profileData.img || imgPlaceHolder}
                    isUploading={isUploading}
                    setIsUploading={setIsUploading}
                    image={image!}
                    setImage={setImage}
                    isEditing={isEditing}
                    isMobile={isMobile}
                />
            </Group>
            {isEditing &&
                !isMobile &&
                Object.entries(errors).map(([key, value]) => (
                    <Text key={key} color="red">
                        {value}
                    </Text>
                ))}
        </Stack>
    );
};

export default ProfileDetails;
