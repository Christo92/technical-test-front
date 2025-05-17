import React, { ReactNode } from 'react';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import Box from '@mui/material/Box';

// Props typing
interface DefaultLayoutProps {
  children: ReactNode;
}

/**
 * DefaultLayout component
 *
 * Provides a basic page layout structure with a Header at the top,
 * a Footer at the bottom, and a main content area in between.
 *
 * The main content area expands to fill the available vertical space.
 *
 * Props:
 * - children: ReactNode(s) to be rendered inside the main content area.
 */
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
