import Head from 'next/head'
import axios from 'axios'
import { useState } from "react"

import styles from '../styles/Home.module.css'



export default function Home() {
  const [mediaPreview, setMediaPreview] = useState()
  const [media, setMedia] = useState()
  const [model, setModel] = useState('detection_01')
  const [faces, setFaces] = useState()

  const dim = 450

  const onUploadMedia = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL;
      reader.onload = (ev) => {
        let image = new Image()
        image.src = ev.target.result
        image.onload = () => setMediaPreview(image)
      };
      reader.readAsDataURL(e.target.files[0])
      setMedia(e.target.files[0])
    }
  }

  const reset = () => {
    setFaces()
    setMedia()
    setMediaPreview()
  }

  const onSubmit = async () => {
    if (!media) return;

    const data = new FormData()
    data.append("image", media)
    data.append("detection_model", model)

    let response = await axios.post("/api/v1/face-detect", data, {
      'Content-type': 'multipart/form-data',
    })
    setFaces(response.data.data)
  }

  const viewFaceCard = (face, idx) => {
    const attributes = face.faceAttributes
    if (model === 'detection_01')
      return (
        <div className={styles.card}>
          <b>Face {idx + 1}</b>
          <table>
            <tr>
              <td>Age</td>
              <td>: {attributes.age}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>: {attributes.gender}</td>
            </tr>
            <tr>
              <td>Smile</td>
              <td>: {attributes.smile}</td>
            </tr>
          </table>
        </div>
      )
    if (model === 'detection_02')
      return (
        <div className={styles.card}>
          <p>No Attributes Available for this model</p>
        </div>
      )
    if (model === 'detection_03')
      return (
        <div className={styles.card}>
          <b>Face {idx + 1}</b>
          <table>
            <tr>
              <td>Roll</td>
              <td>: {attributes.headPose.roll}</td>
            </tr>
            <tr>
              <td>Yaw</td>
              <td>: {attributes.headPose.yaw}</td>
            </tr>
            <tr>
              <td>Pitch</td>
              <td>: {attributes.headPose.pitch}</td>
            </tr>
          </table>
        </div>
      )
  }

  return (
    <div className={styles.main}>
      <Head>
        <title>Azure Face Recognition</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.preview}>
        <h1 className={styles.title}>
          <a href="https://azure.microsoft.com/en-us/">Azure</a> Face Recognition
        </h1>
        <p className={styles.description}>Made for Mobile Technology & Cloud Computing Assignment</p>
        <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            {faces && faces.map((face, idx) => {
              const rect = face.faceRectangle
              return <div style={{
                position: 'absolute',
                color: 'white',
                border: '2px solid',
                width: rect.width / mediaPreview.width * dim,
                height: rect.height / mediaPreview.width * dim,
                top: rect.top / mediaPreview.width * dim,
                left: rect.left / mediaPreview.width * dim,
              }}>Face {idx + 1}</div>
            })}
            {mediaPreview &&
              <img src={mediaPreview.src}
                style={{
                  maxWidth: dim,
                  maxHeight: dim,
                }}
              />
            }
          </div>
        </div>
      </div>
      <div className={styles.sidebar}>

        <div className={styles.content}>
          <h2>Result</h2>
          {faces ? (
            <div>
              {faces.map(viewFaceCard)}
            </div>
          ) : (
            <div>
              <h2>Choose Image and Model</h2>
              <div className={styles.form}>
                <span style={{ marginBottom: '1em' }}>
                  <label>Model: </label>
                  <select onChange={e => setModel(e.target.value)}>
                    <option>detection_01</option>
                    <option>detection_02</option>
                    <option>detection_03</option>
                  </select>
                </span>
                <input type="file" onChange={onUploadMedia} />
              </div>
            </div>
          )}
        </div>
        <div className={styles.footer}>
          {!faces
            ? <p className={styles.submitBtn} onClick={onSubmit}>Analyze</p>
            : <p className={styles.removeBtn} onClick={reset}>Remove</p>
          }
          <br />
          <div style={{ marginBottom: '0.8em', fontWeight: '500' }}>Made by</div>
          <div className={styles.credit}>
            William  Harly  : 2340081683
            <br />
            Hansen Riady Kwee : 2340081563
            <br />
            Nathan  Priyasadie : 2340081954
          </div>
          <div style={{ marginTop: '1em', fontWeight: '500' }}>Powered by</div>
          <br />
          <div className={styles.tools}>
            <a href="https://azure.microsoft.com/en-us/">
              <img src="/azure.svg" alt="Azure Logo" style={{ height: '2em' }} />
            </a>
            &nbsp;
            <a href="https://vercel.com">
              <img src="/vercel.svg" alt="Vercel Logo" style={{ height: '1.5em' }} />
            </a>
          </div>
        </div>
      </div>
    </div >
  )
}
