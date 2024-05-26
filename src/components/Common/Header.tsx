import React, { lazy, Suspense } from 'react';
import { Tabs, ActionIcon, Box, UnstyledButton, Text, Group, Button } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { useAuthStore } from '@/store/useAuthStore';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMantineColorScheme } from '@mantine/core';

const links = [
  { link: '/main', label: 'Главная',},
  { link: '/cafedras', label: 'Кафедры',},
  { link: '/groups', label: 'Группы'},
  { link: '/search', label: 'Поиск'},
  { link: '/student/1', label: 'Студенты' },
  { link: '/reports', label: 'Отчеты', role: ['admin', 'manager'], disabled:true },
  { link: '/management', label: 'Управление', role: ['admin'], disabled:true },
  { link: '/admin', label: 'Админ', role: ['admin'], disabled:true },
  { link: '/profile/1', label: 'Аккаунт'},
];

export default function Header() {
  const { userRole,userName } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const filteredLinks = links.filter((link) => !link.role || link.role.includes(userRole!));
  const getActiveTab = () => {
    const matchedLink = filteredLinks.find((link) => location.pathname.startsWith(link.link));
    return matchedLink ? matchedLink.link : null;
  };

  const items = filteredLinks.map((link) => (
    <Link to={link.link} style={{color:'inherit', textDecoration:'none'}}>
    <Tabs.Tab key={link.label} value={link.link} onClick={() => navigate(link.link)}>
      {link.label}
    </Tabs.Tab>
      </Link>
  ));

  const handleLogout = () => {
    useAuthStore.getState().logout();
    navigate('/login');
  };

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";


  return (
    <Tabs defaultValue='' pl='0.6rem' mb='md' value={getActiveTab()} bg={isDark?'':'white'}>
      <Tabs.List>{items}
      
      <Group gap="xs" pr="md"
        style={{
            marginLeft: "auto",
            paddingLeft: "2rem", // Added more spacing to the right to divide header and user
          }}>
        <Text>{userName}</Text>
        <Button variant="filled" size='compact-sm' color={isDark ? "gray" : "blue"} onClick={handleLogout}>
          <Box>Выход</Box>
        </Button>
        <ActionIcon
          variant="default"
          size={30}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {colorScheme === 'dark' ? <IconSun size={16} /> : <IconMoonStars size={16} />}
        </ActionIcon>
      </Group>
      </Tabs.List>

    </Tabs>
  );
}