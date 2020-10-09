import {
  Header,
  Modal,
  Button,
  Segment,
  Card,
  Image,
  Icon,
} from 'semantic-ui-react';
import formatDateFromNow from '../../utils/formatDateFromNow';
import baseUrl from '../../utils/baseUrl';

const Profile = ({
  setOpen,
  contactEmail,
  createdAt,
  instagram,
  name,
  profilePictureUrl,
  twitter,
  product,
}) => {
  return (
    <Segment>
      <Modal.Content>
        <Card fluid>
          <Card.Content>
            <Image floated="left" size="small" src={profilePictureUrl} />
            <Card.Header>{name}</Card.Header>
            <Card.Meta>Joined at {formatDateFromNow(createdAt)}</Card.Meta>
            <a href={twitter} target="_blank" rel="noopener noreferrer">
              <Icon link name="twitter" size="big" disabled={twitter === ''} />
            </a>
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              <Icon
                link
                name="instagram"
                size="big"
                disabled={instagram === ''}
              />
            </a>
            <a
              href={`mailto:${contactEmail}?subject=About ${
                product.name
              } you posted at ${formatDateFromNow(
                product.createdAt
              )}&amp;&body=The link is here ${baseUrl}/${product._id}`}
            >
              <Icon
                link
                name="envelope outline"
                size="big"
                disabled={contactEmail === ''}
              />
            </a>
          </Card.Content>
        </Card>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal.Content>
    </Segment>
  );
};

export default Profile;
