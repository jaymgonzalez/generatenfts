import {
  Box,
  Button,
  Card,
  createStyles,
  Grid,
  Group,
  Image,
  Modal,
} from '@mantine/core'
import { Network, Alchemy, OwnedNftsResponse } from 'alchemy-sdk'
import { useState } from 'react'
import { contractAddress } from '../constants'
import { useEffectOnce } from '../hooks/useEffectOnce'
// import Link from 'next/link'

const useStyles = createStyles((theme, _params, getRef) => ({
  image: {
    ref: getRef('image'),
    transition: 'all .2s ease-in-out',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  modalImage: {},

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
  const [opened, setOpened] = useState(false)
  const [loading, setLoading] = useState(false)
  const { classes } = useStyles()

  const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_MUMBAI_API_KEY,
    network: Network.MATIC_MUMBAI,
  }

  const alchemy = new Alchemy(settings)

  useEffectOnce(() => {
    setLoading(true)
    alchemy.nft
      .getNftsForOwner(address, { contractAddresses: [contractAddress] })
      .then((res) => setNftList(res))
      .finally(() => setLoading(false))
  })

  console.log(nftList)

  const nfts = nftList?.ownedNfts.map((nft) => {
    return (
      <>
        <Grid.Col span={6} sm={4} md={3}>
          {/* <Link href={`/nft/${nft.contract.address}/${nft.tokenId}`}> */}
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title={nft.rawMetadata?.title}
          >
            <Image
              className={classes.modalImage}
              // mah="250px"
              src={nft.media[0]?.gateway}
              alt={nft.title}
            />
          </Modal>
          <Card
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            miw="200px"
            className={classes.card}
            onClick={() => setOpened(true)}
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
          {/* </Link> */}
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
