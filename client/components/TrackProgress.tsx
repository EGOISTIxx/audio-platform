import axios from 'axios'
import React, {
  useCallback,
  useEffect,
  useMemo,
  memo,
} from 'react'
import formatTrackTime from '../utils/formatTime'

interface TrackProgressProps {
  left: number
  right: number
  onChange: (e) => void
  activeAudio: string
  audioId: string
}

const TrackProgress: React.FC<TrackProgressProps> = ({
  left,
  right,
  onChange,
  activeAudio,
  audioId,
}) => {
  const addListens = useMemo(async () => {
    try {
      await axios.post(
        `http://localhost:5000/tracks/listen/${audioId}`
      )
    } catch (e) {
      console.log(e)
    }
  }, [audioId])

  useEffect(() => {
    if (formatTrackTime(left) === formatTrackTime(right)) {
      addListens
    }
  }, [left, right])

  return (
    <div style={{ display: 'flex' }}>
      <input
        className='input-range'
        type='range'
        min={0}
        max={right}
        value={left}
        onChange={onChange}
      />
      <div>
        {formatTrackTime(left)} / {formatTrackTime(right)}
      </div>
    </div>
  )
}

export default memo(TrackProgress)
