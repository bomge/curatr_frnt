import type React from 'react';
import { Select, type SelectProps } from '@mantine/core';

interface EditableSelectFieldProps {
  isEditing: boolean;
  value: string | null;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  compoProps?: SelectProps
  text?: string; // Optional text prop
}

const EditableSelectField: React.FC<EditableSelectFieldProps> = ({ isEditing, value, onChange, options, compoProps, text }) => {
  return (
    isEditing ? (
      <Select value={value} onChange={(val) => onChange(val || '')} data={options} nothingFoundMessage='Ничего не найдено...' allowDeselect={false} {...compoProps}/>
    ) : (
      <span>{text || value}</span>
    )
  );
};

export default EditableSelectField;
