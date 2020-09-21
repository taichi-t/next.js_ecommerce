import AccountHeader from '../components/Account/AccountHeader';
import AccountOrders from '../components/Account/AccountOrders';
import AccountPermissions from '../components/Account/AccountPermissions';
import AccountInvitationCode from '../components/Account/AccountInvitationCode';
import { parseCookies } from 'nookies';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import { useAuth } from '../utils/AuthProvider';
import useUser from '../hooks/useUser';
import useOrders from '../hooks/useOrders';

function Account({ orders }) {
  const { user, setUser } = useAuth();
  const { user: foo } = useUser();
  const { orders: hoo } = useOrders();
  console.log({ hoo });

  // console.log(foo);

  return (
    <>
      <AccountHeader {...user} />
      <AccountOrders orders={orders} />
      {user.role === 'root' && <AccountPermissions currentUserId={user._id} />}
      {(user.role === 'root' || user.role === 'admin') && (
        <AccountInvitationCode currentUserId={user._id} />
      )}
    </>
  );
}

// Account.getInitialProps = async (ctx) => {
//   const { token } = parseCookies(ctx);
//   if (!token) {
//     return { order: [] };
//   }
//   const payload = { headers: { Authorization: token } };
//   const url = `${baseUrl}/api/orders`;
//   const response = await axios.get(url, payload);
//   return response.data;
// };

export default Account;
