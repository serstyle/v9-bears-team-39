import React from 'react';
import { Helmet } from 'react-helmet';

// style
import Container from '@material-ui/core/Container';

// component
import Navbar from '../../components/Navbar';

export default function HomePage() {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Navbar />
      <Container
        style={{ paddingTop: '20px', background: '#F5F5F5', height: '100vh' }}
      >
        <p style={{ textAlign: 'center' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          maximus, nisi eget rutrum dapibus, tellus orci efficitur urna, tempor
          tempus elit diam at lorem. Quisque imperdiet ut tortor vitae blandit.
          Nulla sed lacus nec tortor gravida aliquet ut a odio. Mauris et massa
          vitae dolor condimentum bibendum. Maecenas accumsan enim lacinia arcu
          ornare, sed tempus leo vestibulum. Donec at nunc at nunc convallis
          finibus non sed eros. Pellentesque vehicula mattis mauris, vitae
          aliquet urna vestibulum auctor. Duis leo libero, ultrices vel interdum
          ut, commodo et ligula. Sed a aliquam mi. Sed auctor eget ipsum sit
          amet mollis.
        </p>
      </Container>
    </div>
  );
}
