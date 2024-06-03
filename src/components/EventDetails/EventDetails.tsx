import React, { useState, useMemo, useCallback } from 'react';
import {
    Text,
    Badge,
    Group,
    Button,
    MultiSelect,
    Stack,
    Grid,
    Select,
    TextInput,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import { IconCalendarEvent } from '@tabler/icons-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { format, formatDistance } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import * as Yup from 'yup';
import {
    showSuccessNotification,
    showErrorNotification,
} from '@/util/notification';
import { EditableField } from '../Fields/EditableField';
import { EditableDateTimeField, EditableSelectField, EditableTextField, EditableCheckboxField, DateTimeFieldWithButtons, EditableMultiSelectField, EditableRichTextField } from '../Fields/OtherFields';


interface EventGroup {
    id: number;
    name: string;
}

interface EventCreator {
    id: number;
    name: string;
}

interface EventData {
    startDate: string;
    endDate: string;
    groups: EventGroup[];
    name: string;
    description: string;
    type: string;
    status: string;
    isImportant: boolean;
    creator: EventCreator;
    initiator:string
}

const eventTypeColor: Record<string, string> = {
    'Академическое': 'indigo',
    'Культурное': 'plum',
    'Спортивное': 'teal',
    'Социальное': 'coral',
    'Административное': 'slategray',
};

const eventStatusColor: Record<string, string> = {
    Предстоящее: '#61d62d',
    'В процессе': 'lightgreen',
    Завершено: 'lightgray',
    Отменено: 'red',
    Перенесено: 'lightblue',
};

// Validation schema using Yup
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Event name is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date()
        .min(Yup.ref('startDate'), 'End date must be after start date')
        .required('End date is required'),
    type: Yup.string().required('Event type is required'),
    status: Yup.string().required('Event status is required'),
    description: Yup.string(),
    groups: Yup.array()
        .of(Yup.string())
        .min(1, 'At least one group is required'),
});
type FormErrors = {
    [K in keyof typeof validationSchema.fields]?: string;
};
type errorKeyValue = { [key: string]: string };
export function isYupValidationError(error: unknown): error is Yup.ValidationError {
    return error instanceof Yup.ValidationError;
  }
interface EventNameProps {
    isEditing: boolean;
    name: string;
    setName: (name: string) => void;
    error?: string;
}

const EventName = React.memo<EventNameProps>(
    ({ isEditing, name, setName, error }) => {
        if (isEditing) {
            return (
                <TextInput
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                    fw={700}
                    error={error}
                />
            );
        }
        return (
            <Text fw={700} size="xl">
                {name}
            </Text>
        );
    },
);

interface EventBadgesProps {
    type: string;
    status: string;
    isImportant: boolean;
}

const EventBadges: React.FC<EventBadgesProps> =
    ({ type, status, isImportant }) => (
        <Group mb="0.5rem" gap="xs">
            <Badge variant="light" color={eventTypeColor[type] || 'teal'}>
                {type}
            </Badge>
            <Badge color={eventStatusColor[status] || 'teal'}>{status}</Badge>
            {isImportant && <Badge color="red">Важное❗️</Badge>}
        </Group>
    )



interface EventDetailsProps {
    eventData: EventData;
    allGroups: EventGroup[];
}

const EventDetails: React.FC<EventDetailsProps> = ({
    eventData,
    allGroups,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [selectedGroups, setSelectedGroups] = useState(
        eventData.groups.map((group) => group.id.toString()),
    );
    const [startDate, setStartDate] = useState(new Date(eventData.startDate));
    const [endDate, setEndDate] = useState(new Date(eventData.endDate));
    const [name, setName] = useState(eventData.name);
    const [eventType, setEventType] = useState(eventData.type);
    const [description, setDescription] = useState(eventData.description);
    const [selectedStatus, setSelectedStatus] = useState(eventData.status);
    const [initiator, setInitiator] = useState(eventData.initiator);
    const [isImportant, setIsImportant] = useState(eventData.isImportant);

    const isMobile = !!useMediaQuery('(max-width: 600px)');

    const toggleEditing = useCallback(
        () => setIsEditing(!isEditing),
        [isEditing],
    );


    const handleSave = useCallback(async () => {
        try {
            await validationSchema.validate(
                {
                    name,
                    startDate,
                    endDate,
                    type: eventType,
                    status: selectedStatus,
                    description,
                    groups: selectedGroups,
                },
                { abortEarly: false },
            );
            // Здесь вы можете реализовать логику сохранения отредактированных данных
            console.log('Сохранение данных');
            eventData.startDate = startDate.toISOString();
            eventData.endDate = endDate.toISOString();
            eventData.groups = selectedGroups.map((id) =>
                allGroups.find((group) => group.id.toString() === id),
            ) as EventGroup[];;
            eventData.name = name;
            eventData.description = description;
            eventData.type = eventType;
            eventData.status = selectedStatus;
            eventData.initiator = initiator;
            
            eventData.isImportant = isImportant;
            toggleEditing();
            setErrors({});
            showSuccessNotification(
                'Данные мероприятия были успешно обновлены',
            );
        } catch (validationErrors) {
            if (isYupValidationError(validationErrors)) {
                const formattedErrors: errorKeyValue = {};
                validationErrors.inner.forEach((error) => {
                    formattedErrors[error.path!] = error.message;
                });
                setErrors(formattedErrors);
            }

            showErrorNotification(
                'Произошла ошибка при обновлении данных мероприятия',
            );
        }
    }, [
        name,
        startDate,
        endDate,
        eventType,
        selectedStatus,
        description,
        selectedGroups,
        allGroups,
        eventData,
        toggleEditing,
        isImportant,
        initiator
    ]);

    return (
        <Stack gap="0" maw="50rem">
            <Text fw={600} size="md" mb="1.5rem">
                Мероприятие
            </Text>
            <Group>
                <EventName
                    isEditing={isEditing}
                    name={name}
                    setName={setName}
                    error={errors.name}
                />
                <EventBadges
                    type={eventData.type}
                    status={eventData.status}
                    isImportant={eventData.isImportant}
                />
                <Button
                    onClick={isEditing ? handleSave : toggleEditing}
                    color={isEditing ? '#00ff83a6' : 'blue'}
                >
                    {isEditing ? 'Сохранить' : 'Редактировать'}
                </Button>
                {Object.entries(errors).map(([key, value]) => (
                    <Text key={key} color="red">
                        {value}
                    </Text>
                ))}
            </Group>
            <Group maw="150rem">
                <table>
                    <tbody>
                        <EditableField
                            label="Начало"
                            value={isEditing ? startDate : eventData.startDate}
                            setValue={setStartDate}
                            isEditing={isEditing}
                            // isHidden={!isEditing}
                            isMobile={isMobile}
                            component={EditableDateTimeField}
                            showEstTime
                            // error={hasSaved && errors.firstName}
                            error={errors.startDate}
                        />
                        <EditableField
                            label="Окончание"
                            value={isEditing ? endDate : eventData.endDate}
                            setValue={setEndDate}
                            isEditing={isEditing}
                            // isHidden={!isEditing}
                            isMobile={isMobile}
                            component={DateTimeFieldWithButtons}
                            showEstTime
                            // error={hasSaved && errors.firstName}
                            error={errors.endDate}
                            compProps={{startDate}}
                        />
                        <EditableField
                            label="Тип"
                            value={eventType}
                            setValue={setEventType}
                            isEditing={isEditing}
                            isMobile={isMobile}
                            component={EditableSelectField}
                            options={Object.keys(eventTypeColor).map(
                                (type) => ({
                                    value: type,
                                    label: type,
                                }),
                            )}
                            isHidden={!isEditing}
                            error={errors.type}
                            compProps={{
                                searchable:false
                            }}
                        />
                        <EditableField
                            label="Статус"
                            value={selectedStatus}
                            setValue={setSelectedStatus}
                            isEditing={isEditing}
                            isMobile={isMobile}
                            component={EditableSelectField}
                            options={Object.keys(eventStatusColor).map(
                                (status) => ({
                                    value: status,
                                    label: status,
                                }),
                            )}
                            isHidden={!isEditing}
                            error={errors.status}
                            compProps={{
                                searchable:false
                            }}
                        />
                        <EditableField
                            label="Создатель"
                            value={`${eventData.creator.name}`}
                            setValue={() => {}}
                            isEditing={false} // Set isEditing to false for non-editable field
                            isMobile={isMobile}
                            component={EditableTextField}
                        />
                        <EditableField
                            label="Инициатор"
                            value={`${eventData.initiator}`}
                            setValue={() => {}}
                            isEditing={isEditing} // Set isEditing to false for non-editable field
                            isMobile={isMobile}
                            component={EditableTextField}
                        />
                        <EditableField
                            label="Описание"
                            value={
                                isEditing ? description : eventData.description
                            }
                            setValue={setDescription}
                            isEditing={isEditing}
                            isMobile={isMobile}
                            component={EditableRichTextField}
                        />
                        <EditableField
                            label="Группы"
                            value={selectedGroups}
                            setValue={setSelectedGroups}
                            isEditing={isEditing}
                            isMobile={isMobile}
                            component={EditableMultiSelectField}
                            options={allGroups.map((group) => ({
                                value: group.id.toString(),
                                label: group.name,
                            }))}
                            error={errors.groups}
                        />
                        <EditableField
                            label="Важное событие"
                            value={isImportant}
                            setValue={setIsImportant}
                            isEditing={isEditing}
                            isMobile={isMobile}
                            // isHidden={!isEditing}
                            component={EditableCheckboxField}
                            // showAnyWay
                        />
                    </tbody>
                </table>
            </Group>
            {/* <Grid mt="sm" gutter={isMobile ? '0' : 'md'}>
                {memoizedTextField}
            </Grid> */}
            {isEditing && (
                <div>
                    <Button color="#00ff83a6" onClick={handleSave}>
                        Сохранить
                    </Button>
                </div>
            )}
        </Stack>
    );
};



export default EventDetails;
