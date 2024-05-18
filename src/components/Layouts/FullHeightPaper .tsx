import { Paper, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useLayoutEffect, useRef, useState } from 'react';
import { useElementSize,  } from '@mantine/hooks';

const FullHeightPaper = ({ children }) => {
  const theme = useMantineTheme();
  const paperRef = useRef(null);
  const [paperHeight, setPaperHeight] = useState('98dvh');
  const { ref: sizeRef, height: childrenHeight } = useElementSize();
  const { colorScheme } = useMantineColorScheme();
  useLayoutEffect(() => {
    const handleResize = () => {
      if (paperRef.current && sizeRef.current) {
        const viewportHeight = window.innerHeight;
        setPaperHeight(`${Math.max(childrenHeight, viewportHeight)}px`);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [childrenHeight]);

  useLayoutEffect(() => {
    if (paperRef.current) {
      paperRef.current.style.height = paperHeight;
    }
  }, [paperHeight]);

  return (
    <Paper
      shadow="sm"
    //   p={rem(16)}
      bg={colorScheme === 'dark' ? '#272727' : '#f4f4f4'}
      ref={paperRef}
      style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}
    >
      <div ref={sizeRef} style={{ width: '100%' }}>
        {children}
      </div>
    </Paper>
  );
};

export default FullHeightPaper;