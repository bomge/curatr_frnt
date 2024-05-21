import type React from 'react';
import { Text, type TextProps } from '@mantine/core';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import styles from './eventCard.module.css'
interface FormattedDateTimeProps extends TextProps  {
  date: string;
  yearFull?: boolean;
}

const FormattedDateTime: React.FC<FormattedDateTimeProps> = ({ date,yearFull, ...props }) => {
  const parsedDate = new Date(date);
  const parseDateFormat = yearFull? 'dd.MM.yyyy' : 'dd.MM.yy'
  const formattedDate = format(parsedDate, parseDateFormat, { locale: ru });
  const formattedTime = format(parsedDate, 'HH:mm', { locale: ru });

  return (
    <Text  component="span" {...props}>
      {formattedDate}{' '}
      {/* <Text component="span" color="#a29e9e"> */}
      {/* <Text component="span" color="blue"> */}
      <Text component="span" className={styles.timeSpan}>
        {formattedTime}
      </Text>
    </Text>
  );
};

export default FormattedDateTime;
