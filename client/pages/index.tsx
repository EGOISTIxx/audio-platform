import React from 'react'
import { Button } from '@material-ui/core'
import Navbar from '../components/Navbar'
import MainLayout from '../layouts/MainLayout'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyC6w-892bULwURO7VeD5PkF_NRvZTI_4vI',
  authDomain: 'audio-player-platform.firebaseapp.com',
  projectId: 'audio-player-platform',
  storageBucket: 'audio-player-platform.appspot.com',
  messagingSenderId: '350260969445',
  appId: '1:350260969445:web:6a1ae14f94a7c2a37e790c',
  measurementId: 'G-7XHC5SP9YV',
})

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const Index = () => {
  return (
    <>
      <MainLayout>
        <div className='center' style={{ width: '96vw' }}>
          <h1>Добро пожаловать!</h1>
          <h3>Здесь собраны лучшие треки!</h3>
        </div>
      </MainLayout>

      <style jsx>
        {`
            .center {
                margin-top: 150px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
        `}
      </style>
    </>
  )
}

export default Index
