import AccountHeader from '../components/Account/AccountHeader';
import AccountPermissions from '../components/Account/AccountPermissions';
import AccountInvitationCode from '../components/Account/AccountInvitationCode';
import { useContext } from 'react';
import { UserContext } from '../utils/UserProvider';

function Account() {
  const { user, loading } = useContext(UserContext);

  return (
    <>
      <AccountHeader {...user} loading={loading} />
      {user.role === 'root' && <AccountPermissions currentUserId={user._id} />}
      {(user.role === 'root' || user.role === 'admin') && (
        <AccountInvitationCode currentUserId={user._id} />
      )}
    </>
  );
}

export default Account;
