import type React from 'react';
import { TextInput } from '@mantine/core';

interface EditableFieldProps {
  isEditing: boolean;
  value: string;
  onChange: (value: string) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({ isEditing, value, onChange }) => {
  return (
    isEditing ? <TextInput value={value} onChange={(e) => onChange(e.target.value)} /> : <span>{value}</span>
  );
};

export default EditableField;
