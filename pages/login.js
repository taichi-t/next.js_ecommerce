import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Form,
  Icon,
  Message,
  Segment,
  Container,
} from 'semantic-ui-react';
import Link from 'next/link';
import catchErrors from '../utils/catchErrors';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
// import handleLogin from '../utils/auth';
import { UserContext } from '../utils/UserProvider';

const INITIAL_USER = {
  email: '',
  password: '',
};

function Signup() {
  const { handleLogin } = useContext(UserContext);
  const [user, setUser] = useState(INITIAL_USER);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const isUser = Object.values(user).every((el) => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const url = `${baseUrl}/api/login`;
      const payload = { ...user };
      const { data: token } = await axios.post(url, payload);
      handleLogin(token);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Container text style={{ paddingTop: '1em' }}>
      <Message
        attached
        icon="privacy"
        header="Welcome back!"
        content="Log in with email and password"
        color="teal"
      />
      <Form onSubmit={handleSubmit} loading={loading} error={Boolean(error)}>
        <Message error header="Oops!" content={error} />
        <Segment>
          <Form.Input
            fluid
            icon="envelope"
            iconPosition="left"
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
          <Button
            icon="sign in"
            type="submit"
            color="orange"
            content="Login"
            disabled={disabled || loading}
          />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        New user?{' '}
        <Link href="/signup">
          <a>Sign up here</a>
        </Link>{' '}
        instead.
      </Message>
    </Container>
  );
}

export default Signup;
