import Navbar from '../components/Navbar'
import Upload from '../components/Upload'
import ImageGrid from '../components/ImageGrid'
import { useState } from 'react'

const links = [
  {
    link: '/',
    label: 'Home',
  },
  {
    link: '#1',
    label: 'CreateNFT',
    links: [
      {
        link: '/upload',
        label: 'Upload Images',
      },
      {
        link: '/resources',
        label: 'Resources',
      },
      {
        link: '/community',
        label: 'Community',
      },
      {
        link: '/blog',
        label: 'Blog',
      },
    ],
  },
  {
    link: '/about',
    label: 'About',
  },
  {
    link: '/pricing',
    label: 'Pricing',
  },
  {
    link: '#2',
    label: 'Support',
    links: [
      {
        link: '/faq',
        label: 'FAQ',
      },
      {
        link: '/demo',
        label: 'Book a demo',
      },
      {
        link: '/forums',
        label: 'Forums',
      },
    ],
  },
]

export default function Home() {
  const [imagesURLs, setImagesURLs] = useState([])
  return (
    <>
      <Navbar links={links} />
      <Upload imagesURLs={imagesURLs} setImagesURLs={setImagesURLs} />
      {console.log({ imagesURLs })}
      <ImageGrid imagesURLs={imagesURLs} />
    </>
  )
}
