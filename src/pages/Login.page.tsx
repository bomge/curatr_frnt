import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button, Group, Stack, TextInput, PasswordInput, Text } from '@mantine/core';

const Login: React.FC = () => {
  const { signIn, isLoading } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const result = await signIn(username, password);
    if (!result) {
      setFormError('Неверный логин или пароль.');
    }
  };

  return (
    <Stack align="center">
      <h1>Авторизация</h1>
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Логин"
            name="username"
            placeholder="Введите логин"
            required
          />
          <PasswordInput
            label="Пароль"
            name="password"
            placeholder="Введите пароль"
            required
          />
          {(formError) && (
            <Text color="red" size="sm">
              {formError }
            </Text>
          )}
          <Button type="submit" disabled={isLoading} w="100%" mt="0.5rem">
            {isLoading ? 'Загрузка...' : 'Войти'}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default Login;