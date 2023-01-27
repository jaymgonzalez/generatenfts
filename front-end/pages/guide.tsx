import Navbar from '../components/Navbar'
import ReactMarkdown from 'react-markdown'
import { Container } from '@mantine/core'
import rehypeRaw from 'rehype-raw'

const md = `

<h1 align="center">Welcome to our guide on how to use GenerateNfts.xyz</h1>

By following these instructions, you will be able to easily upload your images and ensure that all the information is correct before approving the transaction. The process is very simple - upload an image, add metadata, approve the transaction in your wallet and receive your ***freshly baked*** NFT. 

We recommend trying it out in POLYGON MUMBAI first to see how it works before using a mainnet. Just select the MUMBAI network in your wallet, add few test MATIC and follow the steps below.

Let's get started! 🏁 

<h2 align="center">Steps</h2>
<br />

1. Start by connecting your wallet in your web browser or phone by clicking the button on the top right. 🔝➡️

    <img src="/imgs/guide/connectWallet.png" alt="connectWallet" width="500">

1. Go to *Generate NFTs* page and Click on the "Select files" button. This will open a file picker where you can select an image from your device. 🖼️ Alternatively, you could also drag your files into the box.

    <img src="/imgs/guide/selectFiles.png" alt="selectFiles" width="500">

    \`⚠️ Only PGN, JPEG and GIF files smaller than 3mb are supported at the moment.\`

1. Once the images has been uploaded correctly, you will see them below. 

    <img src="/imgs/guide/imageGrid.png" alt="imageGrid" width="500">

1. There, you will be able to click on them and start adding the metadata. This include information such as the image's name, author's name, description, and up to 8 relevant attributes. You can also review the metadata on the next step.

    <img src="/imgs/guide/imageForm.png" alt="imageForm" height="600">

1. By clicking on "Next step" you get to the 2nd step of the process where you can review the information to ensure that everything is correct and make any necessary changes. ✅

    <img src="/imgs/guide/step2.png" alt="step2" width="600">

1. Once you are happy with the data, click on "Next step" to go to the 3rd step of the process where you see all the image you are about to convert into NFTs. 🎉 The "Generate NFTs" button kicks off the process.

    <img src="/imgs/guide/step3.png" alt="step3" width="600">

1. After clicking "Generate NFTs" you should see a pop up form your wallet asking you to confirm the transaction. Click on "Confirm."

    <img src="/imgs/guide/generatingNft.png" alt="generatingNft" width="600">

    \`⚠️ Before confirming the transaction, make sure that you have enough funds in your wallet to pay for the gas fees associated with the transaction.\`

1. Wait for the transaction to be mined and confirmed on the blockchain. You will receive a notification like the one below once the process is complete.

    <img src="/imgs/guide/txConfirm.png" alt="txConfirm" width="600">

1. An that's it. 🤗 Your brand new NFT it's now be stored in a decentralize way on the blockchain. To view it, go to *NFT Gallery*.

<img src="/imgs/guide/nftCard.png" alt="nftCard" height="600">
`

export default function Guide() {
  return (
    <Navbar>
      <Container size={900} px="xs">
        <ReactMarkdown children={md} rehypePlugins={[rehypeRaw]} />
      </Container>
    </Navbar>
  )
}
