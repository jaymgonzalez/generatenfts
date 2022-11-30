import Navbar from '../components/Navbar'
import Upload from '../components/Upload'
import ImageGrid from '../components/ImageGrid'
import { useState } from 'react'

export default function Home() {
  const [imagesURLs, setImagesURLs] = useState([])
  return (
    <>
      <Upload imagesURLs={imagesURLs} setImagesURLs={setImagesURLs} />
      {console.log({ imagesURLs })}
      <ImageGrid imagesURLs={imagesURLs} />
    </>
  )
}
