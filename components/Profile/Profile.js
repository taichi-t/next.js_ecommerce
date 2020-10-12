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
import useProfile from '../../hooks/useProfile';

const Profile = ({ seller, product, setOpen }) => {
  const { data, error, loading } = useProfile(product.user._id);

  return (
    <Segment>
      <Modal.Content>
        <Card fluid>
          <Card.Content>
            <Image
              floated="left"
              src={seller.profilePicture.url}
              circular
              size="small"
            />
            <Card.Header>{seller.name}</Card.Header>
            <Card.Meta>
              Joined at {formatDateFromNow(seller.createdAt)}
            </Card.Meta>

            {loading ? (
              <Icon name="spinner" loading />
            ) : (
              data &&
              data.twitter !== '' && (
                <a
                  href={data.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon link name="twitter" size="big" />
                </a>
              )
            )}

            {loading ? (
              <Icon name="spinner" loading />
            ) : (
              data &&
              data.instagram !== '' && (
                <a
                  href={data.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon link name="instagram" size="big" />
                </a>
              )
            )}

            {loading ? (
              <Icon name="spinner" loading />
            ) : (
              data &&
              data.contactEmail !== '' && (
                <a
                  href={`mailto:${data.contactEmail}?subject=About ${
                    product.name
                  } you posted at ${formatDateFromNow(
                    product.createdAt
                  )}&amp;&body=The link is here ${baseUrl}/${product._id}`}
                >
                  <Icon link name="envelope outline" size="big" />
                </a>
              )
            )}
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
