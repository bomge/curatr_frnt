import type React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button, Group, Stack, TextInput, PasswordInput } from '@mantine/core';

const Login: React.FC = () => {
  const { signIn, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    await signIn(username, password);
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
          <Button type="submit" disabled={isLoading} w="100%" mt="0.5rem">
            {isLoading ? 'Загрузка...' : 'Вйоти'}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default Login;