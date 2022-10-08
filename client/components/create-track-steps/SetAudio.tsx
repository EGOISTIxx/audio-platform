/**
 * See SetPicture component
 */
import React from 'react'
import { Button } from '@material-ui/core'
import FileUpload from '../FileUpload'

interface SetAudioProps {
  setAudio: React.Dispatch<any>
}

const SetAudio: React.FC<SetAudioProps> = ({
  setAudio,
}) => {
  return (
    <FileUpload setFile={setAudio} accept='audio/*'>
      <div
        style={{
          marginTop: '20px',
          marginLeft: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column-reverse',
          // width: '300px'
          height: '400px',
        }}>
        <Button style={{ color: '#000000' }}>
          Загрузить аудио
        </Button>
      </div>
    </FileUpload>
  )
}

export default SetAudio
