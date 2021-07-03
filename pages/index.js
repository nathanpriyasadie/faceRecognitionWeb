import Head from 'next/head'
import axios from 'axios'
import { useState } from "react"

import styles from '../styles/Home.module.css'

export default function Home() {
  const [mediaPreview, setMediaPreview] = useState()
  const [media, setMedia] = useState()
  const [model, setModel] = useState('detection_01')

  // result
  const [attributes, setAttributes] = useState()
  const [faces, setFaces] = useState()

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
    setAttributes()
    setMedia()
    setMediaPreview()
  }

  const demo = () => {
    setAttributes([{
      age: 28,
      facialHair: {
        moustache: 0.1,
        beard: 0.1,
        sideburns: 0.1
      },
      gender: "male",
      smile: 1,
    }])
    setFaces([{
      width: 70,
      height: 70,
      left: 191,
      top: 111,
    }])
  }

  const onSubmit = async () => {
    const data = new FormData()
    data.append("image", media)
    
    let response = await axios.post("/api/v1/face-detect", data, {
      'Content-type': 'multipart/form-data',
    })
    let faces = []
    let attributes = []
    for(result in response.data.data) {
      faces.append(result.faceRectangle)
      attributes.append(result.faceAttributes)
    }
    setFaces(faces)
    setAttributes(attributes)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.title}>
        <a href="https://azure.microsoft.com/en-us/">Azure</a> Face Recognition
      </h1>
      <p className={styles.description}>
        by Harly, Hansen and Nathan
      </p>
      <div className={styles.imageCard}>
        {!faces && !attributes &&
          <>
            <input type="file" onChange={onUploadMedia} />
            {mediaPreview && <br/>}
          </>
        }
        {mediaPreview &&
          <>
            <div style={{position: 'relative'}}>
              {faces && faces.map((face) =>
                <div style={{
                  position: 'absolute',
                  backgroundColor: '#00ff0080',
                  width: face.width / mediaPreview.width * 300,
                  height: face.height / mediaPreview.width * 300,
                  top: face.top / mediaPreview.width * 300,
                  left: face.left / mediaPreview.width * 300,
                }}/>
              )}
              <img className={styles.preview} src={mediaPreview.src} />
            </div>
            {attributes &&
              <>
                <h3>Attribute for largest face</h3>
                <table>
                  <thead>
                    <td>Attribute</td>
                    <td>Value</td>
                  </thead>
                  {Object.keys(attributes[0]).map(key => 
                    <tr>
                      <td>{key}</td>
                      <td>{JSON.stringify(attributes[0][key])}</td>
                    </tr>
                  )}
                </table>
              </>
            }
            {!faces && !attributes
              ? <p className={styles.submitBtn} onClick={demo}>Analyze</p>
              : <p className={styles.removeBtn} onClick={reset}>Remove</p>
            }
          </>
        }
      </div>
      <footer className={styles.footer}>
        <a href="https://vercel.com">
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
