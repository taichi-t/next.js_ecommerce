import React from 'react';
import axios from 'axios';
import {
  Header,
  Button,
  Form,
  Icon,
  Message,
  Segment,
} from 'semantic-ui-react';
import baseUrl from '../../utils/baseUrl';
import cookie from 'js-cookie';

function AccountInvitationCode() {
  const [loading, setLoading] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [hidden, setHidden] = React.useState(true);
  async function handleGenerate() {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/invitation`;
      const token = cookie.get('token');
      const payload = {
        headers: { Authorization: token },
      };
      const response = await axios.get(url, payload);
      setCode(response.data);
      setHidden(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div style={{ margin: '2em 0' }}>
      <Header as="h2">
        <Icon name="users" />
        Invitation Code
      </Header>

      <Form onSubmit={handleGenerate}>
        <Message
          positive
          hidden={hidden}
          header="Success!"
          content="The Invitation Code expire after a day."
        />
        <Segment>
          <Form.Input
            fluid
            label="invitationCode"
            placeholder="invitationCode"
            name="invitationCode"
            readOnly
            value={code}
          />
          <Button
            type="submit"
            color="orange"
            content="Create invitation code"
            disabled={loading}
            loading={loading}
          />
        </Segment>
      </Form>
    </div>
  );
}

export default AccountInvitationCode;
