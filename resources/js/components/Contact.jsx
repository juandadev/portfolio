import React from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';

import '../../sass/Contact.scss';

const Contact = () => (
  <section id="contact" className="contact">
    <Container>
      <Row className="contact__card">
        <Col
          lg={6}
          xs={12}
          className="contact__card__info d-flex flex-column align-items-center justify-content-center"
        >
          <p className="contact__card__info--title h2">¿Te gustó?</p>

          <p className="contact__card__info--text text">
            Tan solo estamos al alcance de un clic, contáctate conmigo si quieres que colaboremos en
            algún proyecto <span className="emoji">🤩</span>
          </p>
        </Col>

        <Col
          lg={6}
          xs={12}
          className="contact__card__btn d-flex flex-column align-items-center justify-content-center"
        >
          <Button className="contact__card__btn--btn" href="http://bit.ly/wp-juanda">
            Contáctame
          </Button>
        </Col>
      </Row>

      <Row className="contact__card__prof">
        <Col className="d-flex justify-content-center">
          <a
            href="http://bit.ly/juanda-github"
            className="contact__card__prof--github d-flex justify-content-center align-items-center"
          >
            <svg
              width={29}
              height={29}
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="contact--github"
            >
              <path
                d="M17.9666 4.11821C15.6201 3.57305 13.1797 3.57305 10.8332 4.11824C9.47793 3.28633 8.44232 2.90459 7.68964 2.74374C7.28044 2.65629 6.95609 2.63445 6.71212 2.64097C6.59037 2.64422 6.48962 2.65451 6.40936 2.66686C6.36927 2.67303 6.33444 2.67969 6.30479 2.68619C6.28998 2.68944 6.27647 2.69264 6.26427 2.69572L6.24696 2.70024L6.23903 2.7024L6.23526 2.70346L6.23161 2.70449C6.23159 2.7045 6.23162 2.70449 6.23161 2.70449C6.23079 2.70487 6.23483 2.71577 6.49534 3.62668L6.23161 2.70449C5.95891 2.78248 5.73466 2.97706 5.61901 3.23603C5.29615 3.95898 5.11981 4.73876 5.10019 5.53029C5.0856 6.11849 5.15778 6.70451 5.31346 7.26965C4.90432 7.76524 4.57095 8.32019 4.32531 8.9165C4.00289 9.69921 3.83796 10.5378 3.83997 11.3843C3.84021 14.3652 4.71966 16.3695 6.21835 17.6573C7.26842 18.5596 8.54493 19.0397 9.82308 19.3146C9.61201 19.9011 9.55725 20.5215 9.59997 21.1536V22.3023C8.81786 22.4667 8.27779 22.4147 7.89278 22.2876C7.40897 22.128 7.03806 21.8068 6.68426 21.3456C6.50508 21.112 6.33999 20.8554 6.16665 20.5748L6.05659 20.3956C5.92083 20.174 5.77433 19.9348 5.62647 19.7167C5.26012 19.1765 4.71962 18.5013 3.84375 18.2714L2.91522 18.0276L2.42766 19.8846L3.35619 20.1284C3.50872 20.1685 3.70952 20.3108 4.03737 20.7943C4.15783 20.9719 4.27274 21.1595 4.40394 21.3736C4.44515 21.4408 4.48807 21.5108 4.53317 21.5839C4.71337 21.8756 4.92006 22.2003 5.16088 22.5142C5.64708 23.148 6.30907 23.7868 7.29106 24.1109C7.96575 24.3336 8.72838 24.3871 9.59997 24.2531V27.8399C9.59997 28.3701 10.0298 28.7999 10.56 28.7999H18.24C18.7702 28.7999 19.2 28.3701 19.2 27.8399V20.9999C19.2 20.3935 19.1736 19.8392 19.0029 19.3221C20.2746 19.0536 21.541 18.5731 22.5842 17.67C24.0824 16.3731 24.96 14.3508 24.96 11.3519L24.96 11.3488C24.9551 9.85356 24.4305 8.41327 23.4865 7.26968C23.6422 6.70453 23.7143 6.1185 23.6998 5.53029C23.6801 4.73876 23.5038 3.95898 23.1809 3.23603C23.0652 2.97698 22.8409 2.78237 22.5681 2.70443L22.3044 3.62749C22.5681 2.70443 22.5654 2.70365 22.5645 2.70339L22.5607 2.70234L22.5528 2.70018L22.5355 2.69567C22.5233 2.6926 22.5098 2.6894 22.495 2.68615C22.4653 2.67966 22.4305 2.67301 22.3904 2.66684C22.3102 2.6545 22.2094 2.64422 22.0876 2.64096C21.8436 2.63445 21.5192 2.65628 21.1099 2.74373C20.3571 2.90457 19.3214 3.28631 17.9666 4.11821Z"
                fill="#333333"
              />
            </svg>
          </a>

          <a
            href="http://bit.ly/juanda-linkedin"
            className="contact__card__prof--linkedin d-flex justify-content-center align-items-center"
          >
            <svg
              width={29}
              height={29}
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="contact--linkedin"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 2.88C0 1.28942 1.28942 0 2.88 0H25.92C27.5106 0 28.8 1.28942 28.8 2.88V25.92C28.8 27.5106 27.5106 28.8 25.92 28.8H2.88C1.28942 28.8 0 27.5106 0 25.92V2.88ZM9.6 9.6H7.68V7.68H9.6V9.6ZM7.68 21.12V11.52H9.6V21.12H7.68ZM16.32 13.44C14.7294 13.44 13.44 14.7294 13.44 16.32V21.12H11.52V11.52H13.44V12.4796C14.2422 11.8771 15.2394 11.52 16.32 11.52C18.971 11.52 21.12 13.669 21.12 16.32V21.12H19.2V16.32C19.2 14.7294 17.9106 13.44 16.32 13.44Z"
                fill="#0077B5"
              />
            </svg>
          </a>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Contact;
