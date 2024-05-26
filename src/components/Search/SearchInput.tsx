import { Input, CloseButton } from "@mantine/core";
import { useState, useEffect } from "react";

interface SearchInputProps {
  initialSearch: string;
  onSearchChange: (str: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ initialSearch, onSearchChange }) => {
  const [value, setValue] = useState(initialSearch);

  useEffect(() => {
    onSearchChange(value);
  }, [value, onSearchChange]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  return (
    <Input
      placeholder="Введите фамиилию"
      value={value}
      onChange={handleChange}
      rightSectionPointerEvents="all"
      mt="md"
      rightSection={
        <CloseButton
          aria-label="Clear input"
          onClick={() => {
            setValue('');
          }}
          style={{ display: value ? undefined : 'none' }}
        />
      }
    />
  );
};

export default SearchInput;
