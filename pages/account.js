import AccountHeader from '../components/Account/AccountHeader';
import AccountOrders from '../components/Account/AccountOrders';
import AccountPermissions from '../components/Account/AccountPermissions';
import AccountInvitationCode from '../components/Account/AccountInvitationCode';
import useOrders from '../hooks/useOrders';
import { useContext } from 'react';
import { UserContext } from '../utils/UserProvider';

function Account() {
  const { orders } = useOrders();
  const { user, loading } = useContext(UserContext);

  return (
    <>
      <AccountHeader {...user} loading={loading} />
      <AccountOrders orders={orders} />
      {user.role === 'root' && <AccountPermissions currentUserId={user._id} />}
      {(user.role === 'root' || user.role === 'admin') && (
        <AccountInvitationCode currentUserId={user._id} />
      )}
    </>
  );
}

export default Account;
