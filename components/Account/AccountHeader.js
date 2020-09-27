import React, { useState, useContext } from 'react';
import {
  Header,
  Icon,
  Segment,
  Loader,
  Label,
  Image,
  Form,
  Button,
  Input,
  Modal,
} from 'semantic-ui-react';
import ModalForm from '../Modal/ModalForm';
import formatDate from '../../utils/formatDate';
import uploadImage from '../../utils/uploadImage';
import baseUrl from '../../utils/baseUrl';
import cookie from 'js-cookie';
import axios from 'axios';
import catchErrors from '../../utils/catchErrors';
import { UserContext } from '../../utils/UserProvider';

export default function AccountHeader() {
  const { user, setUser } = useContext(UserContext);
  const { role, email, name, createdAt, profilePictureUrl } = user;
  const [open, setOpen] = React.useState(false);
  // const [profilePicture, setProfilePicture] = useState();
  const [media, setMedia] = useState();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');

  function handleChange(e) {
    const { files } = e.target;
    setMedia(files);
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);
      setError('');
      setOpen(false);
      const token = cookie.get('token');
      const headers = { headers: { Authorization: token } };
      const newProfilePictureUrl = await uploadImage(media);
      console.log({ newProfilePictureUrl });
      const payload = { profilePictureUrl, newProfilePictureUrl };
      const url = `${baseUrl}/api/account`;
      await axios.post(url, payload, headers);
      setLoading(false);
      setUser({ ...user, profilePictureUrl: newProfilePictureUrl[0] });
      setSuccess(true);
    } catch (error) {
      catchErrors(error, setError);
      console.error('ERROR!', error);
    } finally {
      setLoading(false);
    }
  }

  const modalFormComponent = (
    <>
      <Header>Please choose a image</Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              name="media"
              label="Media"
              type="file"
              content="Select Image"
              accept="image/*"
              onChange={handleChange}
            />
          </Form.Group>
          <Modal.Actions>
            <Button color="black" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Form.Field
              control={Button}
              color="blue"
              icon="cloud upload"
              content="Upload"
              type="submit"
              as="span"
            />
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </>
  );
  return (
    <>
      <Segment secondary inverted color="violet" loading={loading}>
        <Label
          color="teal"
          size="large"
          ribbon
          icon="privacy"
          style={{ textTramsform: 'capitalize' }}
          content={role}
        />
        <Header inverted textAlign="center" as="h1" icon>
          <Header.Content>
            <div className="profile-container">
              <Image
                src={profilePictureUrl || 'images/anonymous-user.png'}
                circular
                wrapped
                size="small"
                className="profile-image"
              />

              <ModalForm
                trigger={
                  <Icon
                    name="camera"
                    className="profile-icon"
                    color="grey"
                    inverted
                    circular
                  />
                }
                component={modalFormComponent}
                setOpen={setOpen}
                open={open}
              />
            </div>
          </Header.Content>
          <Header.Content>{name}</Header.Content>
          <Header.Subheader>{email}</Header.Subheader>
          <Header.Subheader>Joined {formatDate(createdAt)}</Header.Subheader>
        </Header>
      </Segment>
    </>
  );
}
