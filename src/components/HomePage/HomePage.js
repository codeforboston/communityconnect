import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Logo from "../../images/cc-logo-home.png";
import CIcon from "../../images/cc-logo-icon.png";
// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em",
      }}
    >
      Community Connect
      <Image src={CIcon} circular />
    </Header>
    <Header
      as="h2"
      content="Reimagining the Health Resource Delivery System"
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em",
      }}
    />
    <Button primary size="huge" href="/">
      Get Started
      <Icon name="right arrow" />
    </Button>
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

/* TODO: Responsive Navbar
 */
class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });

  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 700, padding: "1em 0em" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item as="a" active>
                  Home
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as="a" active>
            Home
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 350, padding: "1em 0em" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  <Button as="a" inverted>
                    Log in
                  </Button>
                  <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: "4em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              A tool to help social workers
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Finding relevant health resources for your clients is tough.
              Community Connect solves this problem by having a real-time,
              collaborative database of vetted local health resources.
            </p>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Collaborative?
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Yes! Any resource that our partners can access can be updated in
              real time if any changes aoccur.
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image bordered rounded src={Logo} centered size="large" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: "2em" }}>
          About Us
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          The original architectural design for this app was designed proven out
          by Bob Breznak for an organization assisting with the refugee crisis
          in Greece in 2016, Prosper. They needed help consolidating, vetting
          and displaying resources on the web. In May 2018 he re-wrote the
          frontend in react.js to create an app that assists homeless people
          Seeking Shelter and resources.
        </p>
        <p style={{ fontSize: "1.33em" }}>
          In August 2018 Code for Boston’s Community Connect project had similar
          aims and the repo was moved into their org. The data used for this
          project was initially collected from Nevil Desai during his internship
          with Revere CARES, a coalition group under the umbrella of MGH Center
          for Community Health Improvement.
        </p>
        <p style={{ fontSize: "1.33em" }}>
          In September 2019, Community Connect officially received their
          non-profit status, and is aiming at expanding out of the Greater
          Boston Area to clinics and health centers nation wide.
        </p>
        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: "3em 0em", textTransform: "uppercase" }}
        />
      </Container>
    </Segment>
    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Social Media" />
              <List link inverted>
                <List.Item
                  as="a"
                  href="https://github.com/codeforboston/communityconnect/"
                >
                  Github
                </List.Item>
                <List.Item
                  as="a"
                  href="https://www.linkedin.com/company/community-connect-us/"
                >
                  LinkedIn
                </List.Item>
                <List.Item
                  as="a"
                  href="https://www.instagram.com/community.connect/"
                >
                  Instagram
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Clinics" />
              <List link inverted>
                <List.Item as="a" href="/revere">
                  MGH Revere Health Center
                </List.Item>
                <List.Item as="a" href="/uvm">
                  University of Vermont Medical Center
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
);
export default HomepageLayout;
