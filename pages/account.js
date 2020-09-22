import AccountHeader from '../components/Account/AccountHeader';
import AccountOrders from '../components/Account/AccountOrders';
import AccountPermissions from '../components/Account/AccountPermissions';
import AccountInvitationCode from '../components/Account/AccountInvitationCode';
import useOrders from '../hooks/useOrders';
import { useEffect } from 'react';

function Account({ user, loading }) {
  const { orders } = useOrders();

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
