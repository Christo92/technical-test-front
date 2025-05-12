import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Importer le hook useTheme

const Footer: React.FC = () => {
  const theme = useTheme(); // Récupérer le thème avec useTheme

  return (
    <footer
      style={{
        backgroundColor: theme.palette.background.paper, // Utilisation du thème
        padding: theme.spacing(6), // Utilisation de theme.spacing pour la marge
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}SuperSite {new Date().getFullYear()}
        {'.'}
      </Typography>
    </footer>
  );
};

export default Footer;
