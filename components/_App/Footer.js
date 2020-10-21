import { Image, Container } from 'semantic-ui-react';

function Footer() {
  return (
    <Container text textAlign="center" style={{ margin: '6em 0 3em 0' }}>
      <footer>
        <Image
          src="images/footer.png"
          style={{
            width: '90vw',
          }}
        />
        <small>© {new Date().getFullYear()} Moving Sale.</small>
      </footer>
    </Container>
  );
}

export default Footer;
