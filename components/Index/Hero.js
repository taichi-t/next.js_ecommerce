import { Grid, Header, Button } from 'semantic-ui-react';
import Link from 'next/link';

function Hero() {
  return (
    <Grid container id="hero">
      <Grid.Row colums={2} id="hero-container">
        <Grid.Column computer={5} tablet={6} mobile={16} id="hero-text">
          <Header as="h1">
            Sell and buy <br />
            old stuff.
          </Header>
          <Header as="h2" color="grey">
            The best platform <br />
            for being simple living.
          </Header>
          <Link href="/create" passHref>
            <Button content="Sell Now" color="teal" size="medium" />
          </Link>
        </Grid.Column>
        <Grid.Column
          computer={11}
          tablet={10}
          mobile={16}
          verticalAlign="bottom"
          id="hero-image"
        >
          <img src="images/hero.png" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Hero;
