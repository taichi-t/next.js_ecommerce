import { useContext, useState } from 'react';
import { Menu, Container, Image, Icon } from 'semantic-ui-react';
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
  const [open, setOpen] = useState(false);

  const isRoot = user && user.role === 'root';
  const isAdmin = user && user.role === 'admin';
  const isRoorOrAdmin = isRoot || isAdmin;

  function isActive(route) {
    return route == pathname;
  }

  return (
    <>
      <Menu id="desktop-menu" borderless>
        <Container text>
          <Link href="/">
            <Menu.Item>
              <img src="/static/logo.png" />
            </Menu.Item>
          </Link>

          {Object.keys(user).length ? (
            <>
              <Link href="/saved" passHref>
                <Menu.Item active={isActive('/saved')} as="a">
                  <Icon name="heart" size="large" color="pink" />
                  Saved
                </Menu.Item>
              </Link>
              {isRoorOrAdmin && (
                <Link href="/create" passHref>
                  <Menu.Item active={isActive('/create')} as="a">
                    <Icon name="add square" size="large" color="teal" />
                    Create
                  </Menu.Item>
                </Link>
              )}

              <Menu.Menu position="right">
                <Link href="/account" passHref>
                  <Menu.Item active={isActive('/account')} as="a">
                    <Image
                      src={
                        user.profilePicture.url ||
                        'static/images/anonymous-user.pmg'
                      }
                      avatar
                    />
                  </Menu.Item>
                </Link>
                <Menu.Item onClick={handleLogout}>
                  <Icon name="sign out" size="large" />
                  Logout
                </Menu.Item>
              </Menu.Menu>
            </>
          ) : (
            <Menu.Menu position="right">
              <Link href="/login" passHref>
                <Menu.Item active={isActive('/login')} as="a">
                  <Icon name="sign in" size="large" />
                  Login
                </Menu.Item>
              </Link>
              <Link href="/signup" passHref>
                <Menu.Item active={isActive('/signup')} as="a">
                  <Icon name="signup" size="large" />
                  sign up
                </Menu.Item>
              </Link>
            </Menu.Menu>
          )}
        </Container>
      </Menu>

      <Menu id="mobile-menu" borderless fluid>
        <Container text>
          <Link href="/" passHref>
            <Menu.Item active={isActive('/')} as="a">
              <Image
                src="/static/logo.png"
                size="mini"
                style={{ margin: '0 1em' }}
              />
            </Menu.Item>
          </Link>

          <Menu.Menu position="right">
            <Menu.Item>
              <Icon name="bars" size="large" onClick={() => setOpen(!open)} />
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>

      {open && (
        <Menu id="mobile-menu-items" size="large">
          {Object.keys(user).length ? (
            <>
              <Link href="/saved" passHref>
                <Menu.Item active={isActive('/saved')} as="a">
                  <Icon name="heart" size="large" color="pink" />
                  Saved Item
                </Menu.Item>
              </Link>

              {isRoorOrAdmin && (
                <Link href="/create" passHref>
                  <Menu.Item active={isActive('/create')} as="a">
                    <Icon name="add square" size="large" color="teal" />
                    Create
                  </Menu.Item>
                </Link>
              )}

              <Link href="/account" passHref>
                <Menu.Item active={isActive('/account')} as="a">
                  <Image
                    src={
                      user.profilePicture.url ||
                      'static/images/anonymous-user.pmg'
                    }
                    avatar
                    style={{ marginRight: '0.5em' }}
                  />
                  Account
                </Menu.Item>
              </Link>

              <Menu.Item onClick={handleLogout}>
                <Icon name="sign out" size="large" />
                Logout
              </Menu.Item>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <Menu.Item active={isActive('/login')} as="a">
                  <Icon name="sign in" size="large" />
                  Login
                </Menu.Item>
              </Link>

              <Link href="/signup" passHref>
                <Menu.Item active={isActive('/signup')} as="a">
                  <Icon name="signup" size="large" />
                  sign up
                </Menu.Item>
              </Link>
            </>
          )}
        </Menu>
      )}
    </>
  );
}

export default Header;
