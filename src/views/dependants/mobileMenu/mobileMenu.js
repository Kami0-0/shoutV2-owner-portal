import React from 'react';
import { List, Icon, ListItem, ListItemText, ListSubheader, Divider, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { LayoutConfig } from 'configurations';
import { API } from 'helpers';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100vh',
    backgroundColor: theme.palette.grey,
  },
  menu: {
    width: '100%',
    height: '100%'
  },
  menuItemText: {
    marginLeft: '5vw'
  },
  menuTitle: {
    paddingTop: "5vh",
    paddingBottom: "5vh",
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    boxShadow: '0 1px rgba(76,45,45,0.80)'
  },
  logoutButton: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    paddingLeft: "5vw",
    paddingRight: "5vw"
  },
  listItem: {
    backgroundColor: theme.palette.background.paper,
    paddingLeft: "5vw",
    paddingRight: "5vw"
  },
  logoutPlacement: {
    bottom: 0
  }
}));

export const MobileMenu = () => {
  const classes = useStyles();
  const items = LayoutConfig.menuItems;

  let logoutButton = (data) => {
    return (<div className={classes.logoutPlacement}>
      <Divider />
      <ListItem onClick={() => { API.logoutUser() }} button className={classes.logoutButton} >
        <Icon>
          {data.icon !== undefined ? data.icon : 'logout'}
        </Icon>
        <ListItemText className={classes.menuItemText} primary={data.name !== undefined ? data.name : 'Logout'} />
      </ListItem>
    </div >)
  }
  let isItDesktop = useMediaQuery('(min-width:600px)');
  if (isItDesktop)
    return <Redirect to='/' />
  let content = (
    <div className={classes.root}>
      <List
        className={classes.menu}
        component="nav"
        subheader={
          <ListSubheader className={classes.menuTitle} component="div" id="menuTitle">
            <Typography variant="h5">
              Menu
              </Typography>
          </ListSubheader>
        }>
        <Divider className={classes.menuTitleDivider} />
        {
          items.map(value => {
            if (!value.isFavourite) {
              if (value.type === "logout")
                return logoutButton(value)
              return (
                <div>
                  <ListItem button component={Link} className={classes.listItem} to={value.controller}>
                    <Icon>
                      {value.icon}
                    </Icon>
                    <ListItemText className={classes.menuItemText} primary={value.name} />
                  </ListItem>
                  <Divider />

                </div>
              )
            }
            return null;
          })
        }
      </List>
    </div>
  )
  return content;
}