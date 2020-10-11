import { Button, Card, Image } from 'semantic-ui-react';

export default function ImagePreviews({ handleRemove, previews }) {
  return (
    <Card.Group itemsPerRow="3">
      {(previews || []).map((url, index) => (
        <Card key={url} index={index}>
          <Card.Content textAlign="center">
            <Image src={url} width="200px" />
          </Card.Content>
          <Card.Content extra>
            <Button
              basic
              color="red"
              form="image-form"
              onClick={() => handleRemove(index)}
            >
              remove
            </Button>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
}
