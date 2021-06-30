import Head from 'next/head'
import { useState } from "react";
import styles from '../styles/Home.module.css'

export default function Home() {
  const [mediaPreview, setMediaPreview] = useState();
  const [media, setMedia] = useState([]);

  const onUploadMedia = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL;
      reader.onload = function (ev) {
        setMediaPreview(ev.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setMedia(e.target.files[0]);
    }
  };

  function postImage() {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
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
      {mediaPreview ?
        <div
          className={styles.imageCard}>
          <img className={styles.preview} src={mediaPreview} />

          <p className={styles.removeBtn} onClick={() => setMediaPreview()}>Remove</p>
        </div> : <input
          type="file"
          id="media-button"
          onChange={onUploadMedia}
          className={styles.imageCard}
        />
      }
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
