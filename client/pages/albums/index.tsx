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

const Index = () => {
  const router = useRouter()
  const { albums, error } = useTypedSelector(
    (state) => state.album
  )

  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    )
  }
}
