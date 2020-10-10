import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Header,
  Button,
  Form,
  Icon,
  Message,
  Segment,
  Loader,
} from 'semantic-ui-react';
import baseUrl from '../../utils/baseUrl';
import cookie from 'js-cookie';
import catchErrors from '../../utils/catchErrors';
import Skeleton from 'react-loading-skeleton';

const INITIAL_CONTACT = {
  twitter: '',
  instagram: '',
  contactEmail: '',
};

function AccountSettingContact({ user, setUser }) {
  const [contact, setContact] = useState(INITIAL_CONTACT);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const isContact = Object.values(contact).some((el) => Boolean(el));
    isContact ? setDisabled(false) : setDisabled(true);
  }, [contact]);

  useEffect(() => {
    let timeout;
    if (success) {
      timeout = setTimeout(() => setSuccess(false), 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [success]);

  async function handleSubmit() {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/setting-contact-info`;
      const token = cookie.get('token');
      const payload = { ...contact };
      const header = { headers: { Authorization: token } };
      const { data } = await axios.post(url, payload, header);

      setUser({
        ...user,
        twitter: data.twitter,
        instagram: data.instagram,
        contactEmail: data.contactEmail,
      });
      setSuccess(true);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setContact((prevState) => ({ ...prevState, [name]: value }));
  }

  console.log(user);

  return (
    <div style={{ margin: '2em 0' }}>
      <Header as="h2">
        <Icon name="address card outline" />
        Setting Contact Info
      </Header>
      <Message
        header="Notes"
        content="The below info can be accessible for people who has an account."
      />
      {Object.keys(user).length ? (
        <Form
          onSubmit={handleSubmit}
          success={success}
          loading={loading}
          error={Boolean(error)}
        >
          <Message
            success
            icon="check"
            header="Success!"
            content="Your contact info has been saved"
          />
          <Message error header="Oops!" content={error} />
          <Segment>
            <Icon name="twitter" size="large" />
            <Form.Input
              fluid
              placeholder={user.twitter || 'https://twitter.com/....'}
              name="twitter"
              onChange={handleChange}
              value={contact.twitter}
            />
            <Icon name="instagram" size="large" />
            <Form.Input
              fluid
              placeholder={user.instagram || 'https://www.instagram.com/...'}
              name="instagram"
              onChange={handleChange}
              value={contact.instagram}
            />
            <Icon name="envelope outline" size="large" />
            <Form.Input
              fluid
              placeholder={user.contactEmail || 'email'}
              name="contactEmail"
              onChange={handleChange}
              value={contact.contactEmail}
            />
            <Button
              type="submit"
              color="orange"
              content="Save"
              disabled={disabled || loading}
              loading={loading}
            />
          </Segment>
        </Form>
      ) : (
        <Skeleton count={10} />
      )}
    </div>
  );
}

export default AccountSettingContact;
