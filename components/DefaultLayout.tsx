'use client';

import React, { ReactNode } from 'react';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import Box from '@mui/material/Box';

// Typage des props
interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      <Footer />
    </Box>
  );
};

export default DefaultLayout;
