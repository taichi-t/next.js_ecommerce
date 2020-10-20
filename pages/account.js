import AccountHeader from '../components/Account/AccountHeader';
import AccountPermissions from '../components/Account/AccountPermissions';
import AccountInvitationCode from '../components/Account/AccountInvitationCode';
import AccountSettingContact from '../components/Account/AccountSettingContact';
import { useContext } from 'react';
import { UserContext } from '../utils/UserProvider';
import AccountListing from '../components/Account/AccountListing';
import { Container } from 'semantic-ui-react';

function Account() {
  const { user, loading, setUser } = useContext(UserContext);

  return (
    <Container text>
      <AccountHeader {...user} loading={loading} />
      <AccountSettingContact user={user} loading={loading} setUser={setUser} />
      <AccountListing userId={user._id} />
      {user.role === 'root' && <AccountPermissions currentUserId={user._id} />}
      {(user.role === 'root' || user.role === 'admin') && (
        <AccountInvitationCode currentUserId={user._id} />
      )}
    </Container>
  );
}

export default Account;
