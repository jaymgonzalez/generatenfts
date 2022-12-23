import {
  Box,
  Button,
  Card,
  createStyles,
  Grid,
  Group,
  Image,
} from '@mantine/core'
import { Network, Alchemy, OwnedNftsResponse } from 'alchemy-sdk'
import { useState } from 'react'
import { contractAddress } from '../constants'
import { useEffectOnce } from '../hooks/useEffectOnce'
import Link from 'next/link'

const useStyles = createStyles((theme, _params, getRef) => ({
  image: {
    ref: getRef('image'),
    transition: 'all .2s ease-in-out',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  card: {
    '&:hover': {
      [`& .${getRef('image')}`]: {
        transform: 'scale(1.1)',
      },
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.white,
    },
    cursor: 'pointer',
  },
}))

export default function NFTGallery({ address }) {
  const [nftList, setNftList] = useState<OwnedNftsResponse>()
  const { classes } = useStyles()

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
        <Grid.Col span={6} sm={4} md={3}>
          <Link href={`/nft/${nft.contract.address}/${nft.tokenId}`}>
            <Card
              shadow="sm"
              p="lg"
              radius="md"
              withBorder
              miw="200px"
              className={classes.card}
            >
              <Card.Section>
                <Box sx={{ overflow: 'hidden' }}>
                  <Image
                    className={classes.image}
                    mah="250px"
                    src={nft.media[0]?.thumbnail}
                    alt={nft.title}
                  />
                </Box>
              </Card.Section>
              <Card.Section>
                <Group position="center" py={16} mih="150px">
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </Group>
              </Card.Section>
            </Card>
          </Link>
        </Grid.Col>
      </>
    )
  })

  return (
    <>
      <div>holi</div>

      {nfts && <Grid gutter="xl">{nfts}</Grid>}
    </>
  )
}
