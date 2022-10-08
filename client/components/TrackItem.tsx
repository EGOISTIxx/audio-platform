import React from 'react'
import { ITrack } from '../types/track'
import { Card, Grid, IconButton } from '@material-ui/core'
import styles from '../styles/TrackItem.module.scss'
import {
  Delete,
  Pause,
  PlayArrow,
} from '@material-ui/icons'
import { useRouter } from 'next/router'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import formatTrackTime from '../utils/formatTime'
import axios from 'axios'
import { auth } from '../pages/index'
import { useAuthState } from 'react-firebase-hooks/auth'

interface TrackItemProps {
  track: ITrack
  active?: boolean
}

const TrackItem: React.FC<TrackItemProps> = ({
  track,
  active = false,
}) => {
  const router = useRouter()
  const { playTrack, pauseTrack, setActiveTrack } =
    useActions()
  const { currentTime, pause } = useTypedSelector(
    (state) => state.player
  )

  const [user] = useAuthState<any>(auth)

  const play = (e) => {
    e.stopPropagation()

    if (!active) {
      setActiveTrack(track)
      playTrack()
    } else {
      pause ? playTrack() : pauseTrack()
    }
  }

  const deleteItem = async (e) => {
    e.stopPropagation()

    try {
      await axios.delete(
        'http://localhost:5000/tracks/delete/' + track._id
      )
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Card
      className={styles.track}
      onClick={() => router.push('/tracks/' + track._id)}>
      <IconButton onClick={play}>
        {(active &&
          (pause ? <PlayArrow /> : <Pause />)) || (
          <PlayArrow />
        )}
      </IconButton>
      <img
        width={70}
        height={70}
        src={'http://localhost:5000/' + track.picture}
      />
      <Grid
        container
        direction='column'
        style={{ width: 200, margin: '0 20px' }}>
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: 'gray' }}>
          {track.artist}
        </div>
      </Grid>
      {active ? (
        <div>
          {formatTrackTime(currentTime)} /{' '}
          {formatTrackTime(track.duration)}
        </div>
      ) : (
        <div>{formatTrackTime(track.duration)}</div>
      )}
      {user ? (
        <IconButton
          onClick={deleteItem}
          style={{ marginLeft: 'auto' }}>
          <Delete />
        </IconButton>
      ) : null}
    </Card>
  )
}

export default TrackItem
