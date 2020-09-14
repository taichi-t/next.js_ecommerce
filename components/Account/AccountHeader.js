import React from 'react';
import { Header, Icon, Segment, Label, Image } from 'semantic-ui-react';
import formatDate from '../../utils/formatDate';

function AccountHeader({ role, email, name, createdAt, profilePictureUrl }) {
  function handleUploadIconImage() {}
  return (
    <Segment secondary inverted color="violet">
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
              src={profilePictureUrl}
              circular
              wrapped
              size="small"
              className="profile-image"
            />

            <Icon
              name="camera"
              className="profile-icon"
              color="grey"
              inverted
              circular
              onClick={() => handleUploadIconImage}
            />
          </div>
        </Header.Content>
        <Header.Content>{name}</Header.Content>
        <Header.Subheader>{email}</Header.Subheader>
        <Header.Subheader>Joined {formatDate(createdAt)}</Header.Subheader>
      </Header>
    </Segment>
  );
}

export default AccountHeader;
