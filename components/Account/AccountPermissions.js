import React, { useEffect } from 'react';
import axios from 'axios';
import { Header, Checkbox, Table, Icon, Divider } from 'semantic-ui-react';
import baseUrl from '../../utils/baseUrl';
import cookie from 'js-cookie';
import formatDate from '../../utils/formatDate';
import useUsers from '../../hooks/useUsers';
import Skeleton from 'react-loading-skeleton';

function AccountPermissions() {
  const { users, loading } = useUsers();

  return (
    <div style={{ margin: '2em 0' }}>
      <Header as="h2">
        <Icon name="settings" />
        User Permissions
      </Header>
      {loading ? (
        <Skeleton height={190} />
      ) : (
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Joined</Table.HeaderCell>
              <Table.HeaderCell>Updated</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map((user) => (
              <UserPermission key={user._id} user={user} />
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}

function UserPermission({ user }) {
  const [admin, setAdmin] = React.useState(user.role === 'admin');
  const isFirstRun = React.useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    async function updatePermission() {
      const url = `${baseUrl}/api/account`;
      const role = admin ? 'admin' : 'user';
      const formData = new FormData();
      formData.append('_id', user._id);
      formData.append('role', role);
      const token = cookie.get('token');
      const headers = {
        headers: {
          Authorization: token,
        },
      };
      await axios.put(url, formData, headers);
    }
    updatePermission();
  }, [admin]);

  function handleChangePermission() {
    setAdmin((prevState) => !prevState);
  }

  return (
    <Table.Row>
      <Table.Cell>
        <Checkbox toggle onChange={handleChangePermission} checked={admin} />
      </Table.Cell>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
      <Table.Cell>{formatDate(user.updatedAt)}</Table.Cell>
      <Table.Cell>{admin ? 'admin' : 'user'}</Table.Cell>
    </Table.Row>
  );
}

export default AccountPermissions;
