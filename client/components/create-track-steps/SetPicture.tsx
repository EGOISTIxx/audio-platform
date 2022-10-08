/**
 * Set picture and set audio files are different components because of possibility of
 * changing SetPicture view in future.
 * Also implementing them as a single component violates the SRP principle
 */

import React from 'react'
import { Button } from '@material-ui/core'
import FileUpload from '../FileUpload'
import styles from '../../styles/SetPictureStep.module.scss'

interface SetPictureProps {
  picture: File
  setPicture: React.Dispatch<any>
}

const SetPicture: React.FC<SetPictureProps> = ({
  picture,
  setPicture,
}) => {
  return (
    <FileUpload setFile={setPicture} accept='image/*'>
      <div
        style={{
          marginTop: '20px',
          marginLeft: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column-reverse',
          height: '400px',
        }}>
        {picture && (
          <img
            className={styles['cover-image']}
            src={URL.createObjectURL(picture)}
          />
        )}

        <Button style={{ color: '#000000' }}>
          Загрузить изображение
        </Button>
      </div>
    </FileUpload>
  )
}

export default SetPicture
