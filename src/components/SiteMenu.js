import React from 'react';
import { Fade, Drawer, Button, List, Divider, ListItem, ListItemIcon, ListItemText, SvgIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Menu, MenuOpen, Inbox, Mail } from '@material-ui/icons';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
        <Button onClick={() => setOpen(true)}>
            <SvgIcon htmlColor="#fff">
                {!open ? (
                    <Menu />
                ) : (
                    <MenuOpen />
                )}
            </SvgIcon>
        </Button>
        <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
            <div
              role="presentation"
              onClick={() => setOpen(false)}
              onKeyDown={() => setOpen(false)}
            >
              <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </div>
        </Drawer>
    </>
  );
}
