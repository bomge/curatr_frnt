// src/components/Loading.tsx
import { LoadingOverlay, Box } from '@mantine/core';
import type React from 'react';

const Loading: React.FC = () => {
  return <Box mih='93dvh'>
    <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: "sm", 
			blur: 2
			 }} />
    Loading...
    </Box>;
};

export default Loading;