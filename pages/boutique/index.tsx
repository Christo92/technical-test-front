import DefaultLayout from '@components/DefaultLayout';
import { Container, Grid, Typography, List, ListItem, ListItemText } from '@mui/material';
import ProductsList from '@components/boutique/ProductsList';

const Boutique = () => {
  return (
    <DefaultLayout>
      <Container maxWidth="lg" sx={{ mb: 3 }}>
        <Grid container justifyContent="center">
          <Grid> {/* ca marche sx={{ mb: 3 }} */}
            <Typography variant="h3" component="h1" sx={{ my: 5 }}>
              SuperShop
            </Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Grid> {/* ca marche sx={{ mb: 3 }} //  xs={12} md={3} */}
            <Typography variant="h6" sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', padding: 1 }}>
              Catégories
            </Typography>
            <div>
              <List>
                <ListItem sx={{ pl: 0 }}>
                  <ListItemText primary="Maquillage" />
                </ListItem>
                <ListItem sx={{ pl: 0 }}>
                  <ListItemText primary="Soins visage" />
                </ListItem>
                <ListItem sx={{ pl: 0 }}>
                  <ListItemText primary="Parfums" />
                </ListItem>
              </List>
            </div>
          </Grid>

          <Grid> {/* ca marche sx={{ mb: 3 }} //  xs: 12, md: 9 */}
            <ProductsList />
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  );
};

export default Boutique;
