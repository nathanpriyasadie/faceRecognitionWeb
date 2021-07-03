import axios from 'axios'
import '../styles/globals.css'

// axios.defaults.baseURL = process.env.NEXT_PUBLIC_HOST_API
axios.defaults.baseURL = "http://ec2-18-181-167-59.ap-northeast-1.compute.amazonaws.com:8080"

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
