import { Button, Card, Grid, Group, Image } from '@mantine/core'
import { Network, Alchemy, OwnedNftsResponse } from 'alchemy-sdk'
import { useState } from 'react'
import { contractAddress } from '../constants'
import { useEffectOnce } from '../hooks/useEffectOnce'

export default function NFTGallery({ address }) {
  const [nftList, setNftList] = useState<OwnedNftsResponse>()

  const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_MUMBAI_API_KEY,
    network: Network.MATIC_MUMBAI,
  }

  const alchemy = new Alchemy(settings)

  useEffectOnce(() => {
    alchemy.nft
      .getNftsForOwner(address, { contractAddresses: [contractAddress] })
      .then((res) => setNftList(res))
  })

  console.log(nftList)

  const nfts = nftList?.ownedNfts.map((nft) => {
    return (
      <>
        <Card shadow="sm" p="lg" radius="md" withBorder maw="200px">
          <Card.Section>
            <Image width={200} src={nft.media[0]?.thumbnail} alt={nft.title} />
          </Card.Section>
          <Card.Section>
            <Group position="center" py={16}>
              <Button>Edit</Button>
              <Button>Delete</Button>
            </Group>
          </Card.Section>
        </Card>
      </>
    )
  })

  return (
    <>
      <div>holi</div>

      {nfts && <Grid>{nfts}</Grid>}
    </>
  )
}
