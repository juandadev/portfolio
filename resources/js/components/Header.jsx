import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { logOut } from '../actions';
import CookieService from '../services/CookieService';

import '../../sass/Header.scss';

const Header = (props) => {
  const { isLoggedIn, logOut } = props;

  const handleLogout = () => {
    logOut({
      isLoggedIn: false,
      userData: {
        created_at: '',
        email: '',
        email_verified_at: null,
        id: 0,
        level: '',
        name: '',
        updated_at: '',
      },
    });

    localStorage.setItem('isLoggedIn', false);
    CookieService.remove('access_token');

    window.location.href = '/';
  };

  return (
    // TODO: Need to fix the nav links matching the URL
    <header className="header">
      <Navbar expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/">
            <svg
              width={46}
              height={48}
              viewBox="0 0 46 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="header--logo"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M4.18368 39.3616C4.18368 40.1109 4.00388 40.6508 3.64428 40.9811C3.28468 41.3115 2.68505 41.4763 1.84539 41.4754H0V47.9987H3.01453C5.80365 47.9987 7.97808 47.3162 9.53783 45.9513C11.0976 44.5864 11.877 42.3598 11.8761 39.2713V10.9315H4.18368V39.3616Z"
                  fill="black"
                  fillOpacity="0.87"
                />
                <path
                  d="M43.7486 7.53434C42.3974 5.16432 40.39 3.23533 37.968 1.97957C35.4783 0.658972 32.5691 -0.000884825 29.2406 8.90465e-07H17.4097V31.5788H29.2406C32.539 31.5788 35.4406 30.9194 37.9454 29.6006C40.382 28.3455 42.399 26.4061 43.7486 24.0206C45.1135 21.6212 45.796 18.8755 45.796 15.7834C45.796 12.6684 45.1135 9.91868 43.7486 7.53434ZM35.538 22.5379C33.919 24.1269 31.6546 24.9214 28.745 24.9214H25.1021V6.56713H28.7464C31.6542 6.56713 33.9185 7.37712 35.5394 8.9971C37.1602 10.6171 37.9698 12.8814 37.968 15.7901C37.968 18.6988 37.158 20.948 35.538 22.5379Z"
                  fill="black"
                  fillOpacity="0.87"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="45.7959" height={48} fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto mr-auto">
              <NavLink to="/" activeClassName="active" className="nav-link">
                Inicio
              </NavLink>

              <NavLink to="/blog" activeClassName="active" className="nav-link">
                Blog
              </NavLink>

              {isLoggedIn ? (
                <NavDropdown title="Administrador" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/admin">Panel</NavDropdown.Item>

                  <NavDropdown.Item href="/change-pwd">Cambiar contraseña</NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
                </NavDropdown>
              ) : (
                ''
              )}
            </Nav>

            <Nav className="header-social">
              <Nav.Link href="http://bit.ly/face-juandadev">
                <svg
                  width={23}
                  height={24}
                  viewBox="0 0 23 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="header--facebook"
                >
                  <path
                    d="M11.3959 22.4533C5.62268 22.4533 0.942566 17.7732 0.942566 12C0.942566 6.22678 5.62268 1.54666 11.3959 1.54666C17.1691 1.54666 21.8492 6.22678 21.8492 12C21.8492 17.7732 17.1691 22.4533 11.3959 22.4533ZM11.3959 22.4533V10.5067C11.3959 8.85717 12.7331 7.51999 14.3826 7.51999H15.1292M7.66257 13.4933H15.1292"
                    stroke="black"
                  />
                </svg>
              </Nav.Link>

              <Nav.Link href="http://bit.ly/twitter-juandadev">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="header--twitter"
                >
                  <path
                    d="M22.4169 3.03998L22.9158 3.0069C22.9025 2.80633 22.7704 2.63322 22.5805 2.56748C22.3905 2.50173 22.1797 2.55614 22.0452 2.70557L22.4169 3.03998ZM21.4259 7.45861C21.4259 7.18247 21.2021 6.95861 20.9259 6.95861C20.6498 6.95861 20.4259 7.18247 20.4259 7.45861H21.4259ZM11.9797 7.58135H11.4797H11.9797ZM11.9797 9.01331L12.4797 9.01331V9.01331L11.9797 9.01331ZM1.54254 19.4666V18.9666C1.32227 18.9666 1.12795 19.1108 1.06405 19.3216C1.00014 19.5324 1.08171 19.7602 1.26489 19.8825L1.54254 19.4666ZM3.03357 3.03998L3.50182 2.86465C3.43206 2.67832 3.25845 2.55108 3.05975 2.54066C2.86105 2.53025 2.67509 2.63863 2.58622 2.81665L3.03357 3.03998ZM8.99768 16.48L9.35151 16.8333C9.47387 16.7107 9.52411 16.5336 9.48429 16.365C9.44448 16.1965 9.32028 16.0605 9.15602 16.0057L8.99768 16.48ZM19.7852 4.49356L19.4143 4.8289L19.5945 5.02815L19.8601 4.98792L19.7852 4.49356ZM21.918 3.07306C21.9959 4.24697 21.9268 4.9917 21.7219 5.56935C21.5206 6.13656 21.1708 6.59285 20.58 7.15897L21.2718 7.88099C21.9132 7.26646 22.3883 6.68179 22.6643 5.90368C22.9366 5.13602 22.997 4.23107 22.9158 3.0069L21.918 3.07306ZM21.4259 8.54663V7.45861H20.4259V8.54663H21.4259ZM11.4797 7.58135L11.4797 9.01331L12.4797 9.01331L12.4797 7.58135L11.4797 7.58135ZM11.4797 9.01331L11.4797 9.75998L12.4797 9.75998L12.4797 9.01331L11.4797 9.01331ZM16.5141 2.53998C13.733 2.53998 11.4797 4.7978 11.4797 7.58135H12.4797C12.4797 5.34863 14.2867 3.53998 16.5141 3.53998V2.53998ZM20.4259 8.54663C20.4259 15.1269 15.1 20.46 8.53173 20.46V21.46C15.6537 21.46 21.4259 15.6777 21.4259 8.54663H20.4259ZM2.56532 3.2153C3.35498 5.32432 6.33155 9.51331 11.9797 9.51331V8.51331C6.89253 8.51331 4.20319 4.73786 3.50182 2.86465L2.56532 3.2153ZM2.58622 2.81665C1.04692 5.9 0.824074 8.85859 1.92347 11.3611C3.02114 13.8596 5.39309 15.8037 8.83935 16.9542L9.15602 16.0057C5.89265 14.9162 3.79152 13.127 2.83902 10.9589C1.88825 8.7947 2.03816 6.15329 3.48092 3.26331L2.58622 2.81665ZM8.64386 16.1267C7.71337 17.0586 4.95081 18.9666 1.54254 18.9666V19.9666C5.29121 19.9666 8.29399 17.8924 9.35151 16.8333L8.64386 16.1267ZM20.1561 4.15822C19.2581 3.16514 17.9587 2.53998 16.5141 2.53998V3.53998C17.6641 3.53998 18.6978 4.03644 19.4143 4.8289L20.1561 4.15822ZM19.8601 4.98792C20.9371 4.8248 21.9941 4.25761 22.7887 3.37438L22.0452 2.70557C21.3994 3.42341 20.5495 3.87209 19.7103 3.9992L19.8601 4.98792ZM1.26489 19.8825C3.64444 21.4713 6.13889 21.46 8.53173 21.46V20.46C6.10585 20.46 3.91373 20.4487 1.82019 19.0508L1.26489 19.8825Z"
                    fill="black"
                  />
                </svg>
              </Nav.Link>

              <Nav.Link href="http://bit.ly/insta-juandadev">
                <svg
                  width={23}
                  height={24}
                  viewBox="0 0 23 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="header--instagram"
                >
                  <defs>
                    <linearGradient id="insta-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#fcaf45" />
                      <stop offset="100%" stopColor="#e1306c" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M17.0225 6.02666H18.5159M7.31586 1.54666H16.2759C19.5748 1.54666 22.2492 4.22101 22.2492 7.51999V16.48C22.2492 19.779 19.5748 22.4533 16.2759 22.4533H7.31586C4.01688 22.4533 1.34253 19.779 1.34253 16.48V7.51999C1.34253 4.22101 4.01688 1.54666 7.31586 1.54666ZM11.7959 16.48C9.32163 16.48 7.31586 14.4742 7.31586 12C7.31586 9.52576 9.32163 7.51999 11.7959 7.51999C14.2701 7.51999 16.2759 9.52576 16.2759 12C16.2759 14.4742 14.2701 16.48 11.7959 16.48Z"
                    stroke="black"
                  />
                </svg>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});

const mapDispatchToProps = { logOut };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
