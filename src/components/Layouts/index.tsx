import type React from 'react';
import Header from '@/components/Common/Header';
import { useAuthStore } from '@/store/useAuthStore';
import { Box, Paper, useMantineColorScheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
// import FullHeightPaper from './FullHeightPaper ';

interface LayoutProps {
  children: React.ReactNode;
}

const Layouts: React.FC<LayoutProps> = ({ children }) => {
  const { userRole } = useAuthStore();
  const { colorScheme } = useMantineColorScheme();
	const isMobile = !!useMediaQuery('(max-width: 600px)');

	const pl = isMobile ? '0.6rem' : '4rem';
	const pr = isMobile ? '0.6rem' : '2rem';

  return (
    <div>
      <Paper  mih='100dvh' shadow="sm"
      //  p="md" 
      p='0'
      m='0'
       bg={colorScheme === 'dark' ? '#272727' : '#f4f4f4'}>
      <Header />
        <Box pos='relative' pl={pl} pr={pr} pb='1rem'>
      {children}
        </Box>
      </Paper>

      {/* <FullHeightPaper > */}
      {/* <Header /> */}
      {/* {children} */}
      {/* </FullHeightPaper> */}
    </div>
  );
};

export default Layouts;