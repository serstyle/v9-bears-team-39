import React from 'react';
import { Helmet } from 'react-helmet';

// style

import Container from '@material-ui/core/Container';

export default function HomePage() {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Container>Hello</Container>
    </div>
  );
}
