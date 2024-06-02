import type React from 'react';
import { TextInput, type TextInputProps } from '@mantine/core';

interface EditableFieldProps {
  isEditing: boolean;
  value: string;
  onChange: (value: string) => void;
  compProps: TextInputProps
}

const EditableField: React.FC<EditableFieldProps> = ({ isEditing, value, onChange, compProps }) => {
  return (
    isEditing ? <TextInput value={value} onChange={(e) => onChange(e.target.value)} {...compProps}/> : <span>{value}</span>
  );
};

export default EditableField;
