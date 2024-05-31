import styles from './styles.module.css';
import {
    showSuccessNotification,
    showErrorNotification,
} from '@/util/notification';
import {
    TextInput,
    Select,
    Group,
    Stack,
    Flex,
    Loader,
    Button,
    Text,
    Input,
    Image,
    Checkbox,
    type ButtonProps,
    MultiSelect,
} from '@mantine/core';
import {
    type DateValue,
    DatePickerInput,
    DateTimePicker,
} from '@mantine/dates';
import { IconCalendarEvent } from '@tabler/icons-react';
import {
    addDays,
    addMinutes,
    format,
    formatDistance,
    startOfHour,
} from 'date-fns';
import { useState, useRef, useCallback } from 'react';
import { ru } from 'date-fns/locale';
import { addHours, startOfDay, endOfDay } from 'date-fns';
import ReactQuill from 'react-quill';
import FormattedDateTime from '../EventCard/FormattedDateTime';
interface EditableTextFieldProps {
    value: string;
    setValue: (value: string) => void;
    isEditing: boolean;
    isMobile: boolean;
    error?: string;
    description?: string;
}

export const EditableTextField: React.FC<EditableTextFieldProps> = ({
    value,
    setValue,
    isEditing,
    isMobile,
    error,
    description,
    ...props
}) => (
    <>
        {isEditing ? (
            <TextInput
                // maw="25rem"
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                error={error}
                description={description}
                {...props}
            />
        ) : (
            <Text {...props}>{value}</Text>
        )}
    </>
);

interface EditableSelectFieldProps {
    value: string | null;
    setValue: (value: string | null) => void;
    isEditing: boolean;
    isMobile: boolean;
    options: { value: string; label: string }[];
    icon?: React.ReactNode;
    placeholder?: string;
    error?: string;
    searchable?: boolean;
    allowDeselect?: boolean;
}

export const EditableSelectField: React.FC<EditableSelectFieldProps> = ({
    value,
    setValue,
    isEditing,
    isMobile,
    options,
    icon,
    placeholder,
    error,
    ...props
}) => (
    <>
        {isEditing ? (
            <Select
                value={value}
                onChange={(value) => setValue(value)}
                data={options}
                w="fit-content"
                searchable
                allowDeselect={false}
                error={error}
                nothingFoundMessage="Ничего не найдено..."
                {...props}
            />
        ) : (
            <Text>{value}</Text>
        )}
    </>
);

interface EditableDateFieldProps {
    value: Date;
    setValue: (date: DateValue) => void;
    isEditing: boolean;
    isMobile: boolean;
    error?: string;
}

export const EditableDateField: React.FC<EditableDateFieldProps> = ({
    value,
    setValue,
    isEditing,
    isMobile,
    error,
}) => (
    <>
        {isEditing ? (
            <DatePickerInput
                w="fit-content"
                value={value}
                onChange={setValue}
                locale="ru"
                leftSection={<IconCalendarEvent size={16} />}
                error={error}
            />
        ) : (
            <Text>{format(value, 'dd.MM.yyyy', { locale: ru })}</Text>
        )}
    </>
);

interface EstTimeTextProps {
    value: Date;
}

const EstTimeText = ({ value }:EstTimeTextProps) => (
    <Text size="xs" color="cyan">
      {formatDistance(value, Date.now(), { addSuffix: true, locale: ru })}
    </Text>
  );

interface EditableDateTimeFieldProps {
    value: Date;
    setValue: (date: DateValue) => void;
    isEditing: boolean;
    isMobile?: boolean;
    error?: string;
    showEstTime?: boolean;
}

export const EditableDateTimeField: React.FC<EditableDateTimeFieldProps> = ({
    value,
    setValue,
    isEditing,
    isMobile,
    error,
    showEstTime,
    ...props
}) => (
    <>
        {isEditing ? (
            <Group gap='0.3rem'>
            <DateTimePicker
                w="fit-content"
                value={value}
                onChange={setValue}
                locale="ru"
                leftSection={<IconCalendarEvent size={16} />}
                error={error}
            />
             {showEstTime && <EstTimeText value={value} />}
            </Group>
        ) : (
            <Group gap="xs">
                {/* <Text>{format(value, 'dd.MM.yyyy HH:mm', { locale: ru })}</Text> */}
                <FormattedDateTime date={value?.toString()} yearFull/>
                {showEstTime && <EstTimeText value={value} />}
            </Group>
        )}
    </>
);
interface TimeButtonProps extends ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}
const TimeButton = ({ children, ...props }: TimeButtonProps) => (
    <Button variant="light" size="xs" {...props}>
        {children}
    </Button>
);
interface DateTimeButtonProps extends TimeButtonProps {
    operator: (value: Date) => Date;
    value: Date;
    setValue: (date: Date) => void;
}
const DateTimeButton = ({
    children,
    operator,
    ...props
}: DateTimeButtonProps) => {
    const handleClick = () => {
        props.setValue(operator(props.value));
    };

    return (
        <TimeButton color={props.color || 'green'} onClick={handleClick} {...props}>
            {children}
        </TimeButton>
    );
};

interface DateTimeFieldWithButtonsProps {
    value: Date;
    startDate: Date;
    setValue: (date: DateValue) => void;
    isEditing: boolean;
    error?:string
}

export const DateTimeFieldWithButtons: React.FC<DateTimeFieldWithButtonsProps> =
    ({ value, startDate, setValue, isEditing,error }) => {
        return (
            <>
                <EditableDateTimeField
                    value={value}
                    setValue={setValue}
                    isEditing={isEditing}
                    error={error}
                    showEstTime
                />
                {isEditing && (
                    <>
                        <Group mt="sm" gap="0.3rem" mb="sm">
                            <DateTimeButton
                                value={value}
                                setValue={setValue}
                                operator={() => startDate}
                                color='gray'
                                className={styles.buttonGroup}
                            >
                                Start
                            </DateTimeButton>
                            <DateTimeButton
                                value={value}
                                setValue={setValue}
                                operator={startOfHour}
                                // bg='rgb(23 116 209 / 10%)'
                                className={styles.buttonGroup}
                                color='gray'
                            >
                                Начало часа
                            </DateTimeButton>
                            <DateTimeButton
                                value={value}
                                setValue={setValue}
                                operator={endOfDay}
                                color='gray'
                                className={styles.buttonGroup}
                            >
                                End Day
                            </DateTimeButton>
                        </Group>
                        <Group gap="0.3rem" mb="sm">
                            
                            <DateTimeButton
                                value={value}
                                setValue={setValue}
                                operator={() => addHours(value, 1)}
                                color="green"
                            >
                                +1ч
                            </DateTimeButton>
                            <DateTimeButton
                                value={value}
                                setValue={setValue}
                                operator={() => addHours(value, -1)}
                                color="red"
                            >
                                -1ч
                            </DateTimeButton>

                            <DateTimeButton
                                value={value}
                                setValue={setValue}
                                operator={() => addMinutes(value, 85)}
                            >
                                +1академ час
                            </DateTimeButton>
                            <DateTimeButton
                                value={value}
                                setValue={setValue}
                                operator={() => addMinutes(value, -85)}
                                color="red"
                            >
                                -1академ час
                            </DateTimeButton>
                            
                            <DateTimeButton
                                value={value}
                                setValue={setValue}
                                operator={() => addMinutes(value, 15)}
                            >
                                +15 мин
                            </DateTimeButton>
                            <DateTimeButton
                                value={value}
                                setValue={setValue}
                                operator={() => addMinutes(value, -15)}
                                color="red"
                            >
                                -15мин
                            </DateTimeButton>
                            
                            <DateTimeButton
                                value={value}
                                setValue={setValue}
                                operator={() => addDays(value, 1)}
                            >
                                +1 д
                            </DateTimeButton>
                            <DateTimeButton
                                value={value}
                                setValue={setValue}
                                operator={() => addDays(value, -1)}
                                color="red"
                            >
                                -1д
                            </DateTimeButton>
                        </Group>
                    </>
                )}
            </>
        );
    };

interface ImageUploadProps {
    initialImage: string;
    isUploading: boolean;
    setIsUploading: (value: boolean) => void;
    setImage: (value: string) => void;
    isEditing: boolean;
    isMobile: boolean;
    image: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    initialImage,
    isUploading,
    setIsUploading,
    setImage,
    isEditing,
    isMobile,
    image,
}) => {
    const [uploadError, setUploadError] = useState('');
    const inputImgRef = useRef<HTMLInputElement>(null);
    const handleImageUpload = () => {
        const file = inputImgRef.current?.files?.[0];
        if (!file) return;

        const validFileTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validFileTypes.includes(file.type)) {
            setUploadError(
                'Invalid file type. Please upload a JPEG, PNG, or WebP image.',
            );
            return;
        }

        setIsUploading(true);
        setUploadError('');
        // setIsImageUploading(true); // Set the parent component's isImageUploading state

        // Simulate file upload with a delay and random chance of error
        setTimeout(() => {
            const success = Math.random() > 0.2; // 20% chance of error

            if (success) {
                const url = URL.createObjectURL(file);
                setImage(url);
                showSuccessNotification('Image uploaded successfully!');
            } else {
                setUploadError('Error uploading image. Please try again.');
                showErrorNotification(
                    'Error uploading image. Please try again.',
                );
            }

            setIsUploading(false);
            // setIsImageUploading(false); // Reset the parent component's isImageUploading state
        }, 1000);
    };

    return (
        // <Group align="center">
        //     <Group>
        //         <Image
        //             src={initialImage}
        //             alt="Profile"
        //             width={150}
        //             height={150}
        //             radius="md"
        //             // withPlaceholder
        //             // placeholder={<Text color={theme.colorScheme === 'dark' ? 'dimmed' : 'gray'}>No image uploaded</Text>}
        //         />
        //         <Button
        //             variant="outline"
        //             component="label"
        //             disabled={isUploading}
        //         >
        //             {isUploading ? <Loader size="sm" /> : 'Upload Image'}
        //             <input
        //                 type="file"
        //                 accept="image/jpeg,image/png,image/webp"
        //                 onChange={handleImageUpload}
        //                 hidden
        //             />
        //         </Button>
        //     </Group>
        //     {uploadError && <Text color="red">{uploadError}</Text>}
        // </Group>
        <Stack
            maw="360"
            style={{ alignSelf: isMobile ? 'center' : 'baseline' }}
        >
            <div style={{ alignSelf: isMobile ? 'center' : 'baseline' }}>
                {/* <div style={{alignSelf:"center", flex:'auto'}}> */}
                {/* <div style={{ width: '360', height: '240' }}> */}
                <Image
                    // radius="sm"
                    src={isEditing ? image || initialImage : initialImage}
                    // m="auto"
                    // w="360"
                    // h="240"
                    // fit="contain"
                    // maw="100%"
                    alt="Profile"
                    width={isMobile ? '100%' : '100%'}
                    height={isMobile ? 'auto' : '100%'}
                    radius="md"
                    // miw={isMobile ? '30rem' : '360'}
                    // mih={isMobile ? '30rem' : '240'}
                    maw={isMobile ? '10rem' : '15rem'}
                    mah={isMobile ? '10rem' : '15rem'}
                    // style={{ alignSelf: isMobile?'center':'baseline' }}
                />
            </div>
            {isEditing && (
                <>
                    <Flex>
                        <Input
                            ref={inputImgRef}
                            id="imageInput"
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleImageUpload}
                            h="1.5em"
                            w="50%"
                        />
                        {/* <FileInput
                            placeholder="Upload image"
                            leftSection={<IconPhoto size={20} />}
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={isUploading}
                            h="1.5em"
                  w="50%"
                  ref={inputImgRef}
                        /> */}
                        {isUploading && <Loader size={30} />}
                        <Button
                            w="50%"
                            disabled={isUploading}
                            onClick={handleImageUpload}
                        >
                            Upload Image
                        </Button>
                    </Flex>
                    {uploadError && (
                        <Text ta="center" color="red">
                            {uploadError}
                        </Text>
                    )}
                </>
            )}
        </Stack>
    );
};

interface EditableCheckboxFieldProps {
    value: boolean;
    setValue: (value: boolean) => void;
    isEditing: boolean;
    isMobile: boolean;
    error?: string;
}

export const EditableCheckboxField: React.FC<EditableCheckboxFieldProps> = ({
    value,
    setValue,
    isEditing,
    isMobile,
    error,
}) => (
    <>
        {isEditing ? (
            <Checkbox
                checked={value}
                onChange={(event) => setValue(event.currentTarget.checked)}
                error={error}
            />
        ) : (
            <Text>{value ? 'Да' : 'Нет'}</Text>
        )}
    </>
);

interface SpoilerProps {
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export const Spoiler: React.FC<SpoilerProps> = ({
    children,
    defaultOpen = false,
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const toggleSpoiler = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <Stack gap="xs">
            {isOpen ? children : null}
            <Button
                variant="subtle"
                color="gray"
                onClick={toggleSpoiler}
                w="fit-content"
            >
                {isOpen ? 'Скрыть' : 'Показать'}
            </Button>
        </Stack>
    );
};

interface EditableRichTextFieldProps {
    value: string;
    setValue: (value: string) => void;
    isEditing: boolean;
    isMobile: boolean;
    error?: string;
}

export const EditableRichTextField: React.FC<EditableRichTextFieldProps> = ({
    value,
    setValue,
    isEditing,
    isMobile,
    error,
}) => (
    <>
        {isEditing ? (
            <>
            {error &&  <Text color="red">
                        {error}
                    </Text>}
            <ReactQuill
                value={!value ? '<br>' : `<p>${value}</p>`}
                onChange={(val) => {
                    setValue(
                        val.replaceAll(/<\/?p[^>]*>/g, '').replace('<br>', ''),
                    );
                }}
            />

            </>
        ) : (
            <div dangerouslySetInnerHTML={{ __html: value }} />
        )}
    </>
);


interface EditableMultiSelectFieldProps {
    value: string[];
    setValue: (value: string[]) => void;
    isEditing: boolean;
    isMobile: boolean;
    options: { value: string; label: string }[];
    error?: string;
}

export const EditableMultiSelectField: React.FC<EditableMultiSelectFieldProps> = ({
    value,
    setValue,
    isEditing,
    isMobile,
    options,
    error,
}) => {
    const [showAllSelected, setShowAllSelected] = useState(false);

    const toggleGroups = useCallback(
        () => setShowAllSelected(!showAllSelected),
        [showAllSelected],
    );

    const selectedOptions = options.filter((option) =>
        value.includes(option.value),
    );

    return (
        <>
            {isEditing ? (
                <MultiSelect
                    data={options}
                    value={value}
                    onChange={setValue}
                    searchable
                    nothingFoundMessage="Ничего не найдено..."
                    error={error}
                />
            ) : (
                <>
                    {/* Code to display selected groups in non-editing mode */}
                    {selectedOptions.length > 0 ? (
                        <>
                            <Text>
                                {showAllSelected
                                    ? selectedOptions
                                          .map((option) => option.label)
                                          .join(', ')
                                    : `${selectedOptions
                                          .slice(0, 3)
                                          .map((option) => option.label)
                                          .join(', ')}${
                                          selectedOptions.length > 3
                                              ? '...'
                                              : ''
                                      }`}
                            </Text>
                            {selectedOptions.length > 3 && (
                                <Button
                                    variant="subtle"
                                    color="gray"
                                    onClick={toggleGroups}
                                >
                                    {showAllSelected
                                        ? 'Скрыть'
                                        : 'Показать все'}
                                </Button>
                            )}
                        </>
                    ) : (
                        <Text>No groups selected</Text>
                    )}
                </>
            )}
        </>
    );
};