import { useContext } from 'react';
import { Menu, Container, Image, Icon, Grid } from 'semantic-ui-react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { UserContext } from '../../utils/UserProvider';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteError = () => NProgress.done();

function Header() {
  const { user, handleLogout } = useContext(UserContext);
  const { pathname } = useRouter();

  const isRoot = user && user.role === 'root';
  const isAdmin = user && user.role === 'admin';
  const isRoorOrAdmin = isRoot || isAdmin;

  function isActive(route) {
    return route == pathname;
  }

  return (
    <Grid>
      <Grid.Row only="computer">
        <Menu id="menu" borderless fluid>
          <Container text>
            <Link href="/">
              <Menu.Item>
                <img src="/static/logo.png" />
              </Menu.Item>
            </Link>

            {Object.keys(user).length ? (
              <>
                <Link href="/saved">
                  <Menu.Item header active={isActive('/saved')}>
                    <Icon name="heart" size="large" color="pink" />
                    Saved
                  </Menu.Item>
                </Link>
                {isRoorOrAdmin && (
                  <Link href="/create">
                    <Menu.Item header active={isActive('/create')}>
                      <Icon name="add square" size="large" color="teal" />
                      Create
                    </Menu.Item>
                  </Link>
                )}

                <Menu.Menu position="right">
                  <Link href="/account">
                    <Menu.Item header active={isActive('/account')}>
                      <Image
                        src={
                          user.profilePicture.url ||
                          'static/images/anonymous-user.pmg'
                        }
                        avatar
                      />
                      {/* Account */}
                    </Menu.Item>
                  </Link>
                  <Menu.Item onClick={handleLogout} header>
                    <Icon name="sign out" size="large" />
                    Logout
                  </Menu.Item>
                </Menu.Menu>
              </>
            ) : (
              <Menu.Menu position="right">
                <Link href="/login">
                  <Menu.Item header active={isActive('/login')}>
                    <Icon name="sign in" size="large" />
                    Login
                  </Menu.Item>
                </Link>
                <Link href="/signup">
                  <Menu.Item header active={isActive('/signup')}>
                    <Icon name="signup" size="large" />
                    sign up
                  </Menu.Item>
                </Link>
              </Menu.Menu>
            )}
          </Container>
        </Menu>
      </Grid.Row>
      <Grid.Row only="mobile" centered>
        <Menu compact id="menu">
          <Container text>
            <Link href="/">
              <Menu.Item header active={isActive('/')}>
                <Image
                  size="mini"
                  src="/static/logo.png"
                  style={{ marginRight: '1em' }}
                />
                Moving Sale
              </Menu.Item>
            </Link>

            {Object.keys(user).length ? (
              <>
                <Link href="/saved">
                  <Menu.Item header active={isActive('/saved')}>
                    <Icon name="heart" size="large" />
                    Saved
                  </Menu.Item>
                </Link>
                {isRoorOrAdmin && (
                  <Link href="/create">
                    <Menu.Item header active={isActive('/create')}>
                      <Icon name="add square" size="large" />
                      Create
                    </Menu.Item>
                  </Link>
                )}

                <Link href="/account">
                  <Menu.Item header active={isActive('/account')}>
                    <Icon name="user" size="large" />
                    Account
                  </Menu.Item>
                </Link>
                <Menu.Menu position="right">
                  <Menu.Item onClick={handleLogout} header>
                    <Icon name="sign out" size="large" />
                    Logout
                  </Menu.Item>
                </Menu.Menu>
              </>
            ) : (
              <Menu.Menu position="right">
                <Link href="/login">
                  <Menu.Item header active={isActive('/login')}>
                    <Icon name="sign in" size="large" />
                    Login
                  </Menu.Item>
                </Link>
                <Link href="/signup">
                  <Menu.Item header active={isActive('/signup')}>
                    <Icon name="signup" size="large" />
                    sign up
                  </Menu.Item>
                </Link>
              </Menu.Menu>
            )}
          </Container>
        </Menu>
      </Grid.Row>
    </Grid>
  );
}

export default Header;
