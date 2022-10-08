import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Box, Button, Card, Grid } from '@material-ui/core'
import { useRouter } from 'next/router'
import { ITrack } from '../../types/track'
import TrackList from '../../components/TrackList'
import Player from '../../components/Player'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'
import { NextThunkDispatch, wrapper } from '../../store'
import { fetchTracks } from '../../store/actions-creators/track'
import { auth } from '../index'
import { useAuthState } from 'react-firebase-hooks/auth'

const Index = () => {
  const router = useRouter()
  const { tracks, error } = useTypedSelector(
    (state) => state.track
  )

  const [user] = useAuthState<any>(auth)

  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    )
  }

  return (
    <MainLayout title={'Список треков - все треки'}>
      <Grid
        container
        justifyContent='center'
        style={{ width: '97vw' }}>
        <Card
          style={{
            width: '88vw',
            boxShadow:
              '0px 0px 3px 4px rgba(34, 60, 80, 0.2)',
          }}>
          <Box p={6}>
            <Grid
              container
              justifyContent='space-between'
              alignItems='center'>
              <h1>Список треков</h1>
              {
                user 
                  ? (<Button
                    onClick={() =>
                      router.push('/tracks/create')
                    }>
                    Загрузить
                  </Button>)
                  : (<p>Авторизируйтесь для загрузки треков</p>)
              }
              
            </Grid>
          </Box>
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  )
}

export default Index

export const getServerSideProps =
  wrapper.getServerSideProps(async ({ store }) => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchTracks())
  })
