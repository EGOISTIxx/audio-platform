import React from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import MainLayout from '../../layouts/MainLayout'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { Button } from '@material-ui/core'
import {
  PDFExport,
  savePDF,
} from '@progress/kendo-react-pdf'

const Index = () => {
  const { tracks, error } = useTypedSelector(
    (state) => state.track
  )

  const container = React.useRef(null)
  const pdfExportComponent = React.useRef(null)

  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save()
    }
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Общее количество просмотров',
      },
    },
  }

  const optionsDuration = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Длительность песни',
      },
    },
  }

  const labels = []
  const totalViews = []
  const durationTrack = []

  tracks.forEach((track) => {
    labels.push(`${track.artist} (${track.name})`)
    totalViews.push(Number(track.listens))
    durationTrack.push(Number(track.duration))
  })

  const bar1 = (
    <Bar
      options={options}
      data={{
        labels,
        datasets: [
          {
            label: 'Количетсво прослушиваний',
            data: totalViews,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      }}
    />
  )

  return (
    <MainLayout title={'Графики'}>
      <Button onClick={exportPDFWithComponent}>
        Скачать
      </Button>
      <PDFExport
        ref={pdfExportComponent}
        paperSize='auto'
        margin={40}
        fileName={`Отчёт по музыке за ${new Date().getFullYear()}`}
        author='Антон Ильин'>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '90vw',
          }}>
          <Bar
            options={options}
            data={{
              labels,
              datasets: [
                {
                  label: 'Прослушивания',
                  data: totalViews,
                  backgroundColor:
                    'rgba(255, 99, 132, 0.5)',
                },
              ],
            }}
          />
          <Bar
            options={optionsDuration}
            data={{
              labels,
              datasets: [
                {
                  label: 'Длительность песни в секундах',
                  data: durationTrack,
                  backgroundColor:
                    'rgba(130, 255, 99, 0.5)',
                },
              ],
            }}
          />
        </div>
      </PDFExport>
    </MainLayout>
  )
}

export default Index
