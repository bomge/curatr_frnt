// notifications.ts
import { showNotification, type NotificationData } from '@mantine/notifications';

interface NotificationOptions extends Partial<NotificationData> {
    message?: string;
}
export const showSuccessNotification = (message: string, options: NotificationOptions = {}) => {
    showNotification({
        title: 'Успешно',
        message,
        color: 'green',
        ...options,
    });
};

export const showErrorNotification = (message: string, options: NotificationOptions = {}) => {
    showNotification({
        title: 'Ошибка',
        message,
        color: 'red',
        ...options,
    });
};

export const showWarningNotification = (message: string, options: NotificationOptions = {}) => {
    showNotification({
        title: 'Предупреждение',
        message,
        color: 'orange',
        ...options,
    });
};