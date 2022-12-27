import React, { useState } from "react";
import logo from "../../assets/images/logo-svg.png";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(() => ({
  link: { textDecoration: "none", color: "blue", fontSize: "20px" },
  icon: { color: "white" },
  logo: { flexGrow: "1", cursor: "pointer" },
  draw: { background: "red" },
}));

function DrawerComponent() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer
        anchor="top"
        sx={{ width: 250, color: "#fff" }}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Toolbar sx={{ backgroundColor: "primary.main" }}>
          <Typography variant="h4" className={classes.logo}>
            <Link to="/home" className="pointer-default">
              <img alt="one" src={logo} style={{width:'100px'}}/>
            </Link>
          </Typography>
          {/* <CloseIcon /> */}
        </Toolbar>
        <box sx={{ backgroundColor: "primary.main" }} height="100vh">
          <List height="100vh">
            <Divider />
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/all-specialty" className={classes.link}>
                  <FormattedMessage id="home-header.specialist" />
                </Link>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                <Link to="/all-clinic" className={classes.link}>
                  <FormattedMessage id="home-header.health-facilities" />
                </Link>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                <Link to="/all-doctor" className={classes.link}>
                  <FormattedMessage id="home-header.doctor" />
                </Link>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                <Link to="/all-posts" className={classes.link}>
                  <FormattedMessage id="home-header.posts" />
                </Link>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                <Link to="/high-chart/covid" className={classes.link}>
                  <FormattedMessage id="home-header.checkup" />
                </Link>
              </ListItemText>
            </ListItem>
            <Divider />
          </List>
        </box>
      </Drawer>
      <IconButton
        className={classes.icon}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <i className="fa fa-bars"></i>
      </IconButton>
    </>
  );
}

export default DrawerComponent;
