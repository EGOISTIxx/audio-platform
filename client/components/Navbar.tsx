import * as React from 'react'
import clsx from 'clsx'
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import { ShowChart, Airplay, QueueMusic } from '@material-ui/icons'
import Button from '@material-ui/core/Button'
import { useRouter,  } from 'next/router'
import firebase from 'firebase/compat/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../pages/index'

const menuItems = [
  { text: 'Главная', href: '/', icon: <Airplay /> },
  { text: 'Список треков', href: '/tracks', icon: <QueueMusic /> },
  { text: 'Графики', href: '/charts', icon: <ShowChart /> },
]

export default function Navbar() {
  const [open, setOpen] = React.useState(false)
  const [user] = useAuthState<any>(auth)
  const router = useRouter()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    const { user } = await auth.signInWithPopup(provider)
    console.log(user)
  }

  // if (!user) {
  //   router.push('/')
  // }

  return (
    <div>
      <CssBaseline />
      <AppBar
        position='fixed'
        style={{ background: '#d1c300', color: '#000000' }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'>
            <MenuIcon />
          </IconButton>
        </Toolbar>
        {user ? (
          <Button
            style={{
              position: 'absolute',
              right: '20px',
              top: '15px',
              color: '#000000',
            }}
            onClick={() => auth.signOut()}>
            Выйти
          </Button>
        ) : (
          <Button
            style={{
              position: 'absolute',
              right: '20px',
              top: '15px',
              color: '#000000',
            }}
            onClick={login}>
            Войти
          </Button>
        )}
      </AppBar>
      <Drawer variant='temporary' open={open}>
        <div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          {menuItems.map(({ text, href, icon }, index) => (
            <ListItem
              button
              key={href}
              onClick={() => router.push(href)}>
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  )
}
