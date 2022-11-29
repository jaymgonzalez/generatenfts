import Navbar from '../components/Navbar'
import Upload from '../components/Upload'
import ImageGrid from '../components/ImageGrid'
import { useState } from 'react'

const links = [
  {
    link: '/about',
    label: 'Features',
  },
  {
    link: '#1',
    label: 'Learn',
    links: [
      {
        link: '/docs',
        label: 'Documentation',
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
