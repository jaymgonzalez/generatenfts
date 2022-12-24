import {
  Box,
  Card,
  createStyles,
  Grid,
  Group,
  Image,
  Modal,
  Text,
} from '@mantine/core'
import { Network, Alchemy, OwnedNftsResponse } from 'alchemy-sdk'
import { useState } from 'react'
import { contractAddress } from '../constants'
import { useEffectOnce } from '../hooks/useEffectOnce'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
// import Link from 'next/link'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const useStyles = createStyles((theme, _params, getRef) => ({
  image: {
    ref: getRef('image'),
    transition: 'all .2s ease-in-out',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  modalImage: {},

  modal: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
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

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.sm,
    fontWeight: 700,
    marginRight: 4,
    paddingBottom: 8,
    paddingTop: 8,
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  table: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}))

export default function NFTGallery({ address }) {
  const [nftList, setNftList] = useState<OwnedNftsResponse>()
  const [loading, setLoading] = useState(false)
  const [openedMap, setOpenedMap] = useState({})
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

  const nfts = nftList?.ownedNfts.map((nft, index) => {
    return (
      <>
        <Grid.Col span={6} sm={4} md={3}>
          {/* <Link href={`/nft/${nft.contract.address}/${nft.tokenId}`}> */}
          <Modal
            opened={openedMap[index] || false}
            onClose={() => {
              setOpenedMap({
                ...openedMap,
                [index]: false,
              })
            }}
            title={nft.rawMetadata?.title}
            className={classes.modal}
          >
            <Image
              className={classes.modalImage}
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
            onClick={() =>
              setOpenedMap({
                ...openedMap,
                [index]: true,
              })
            }
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
              <Box mih="140px" my="auto">
                <Group position="right" className={classes.section}>
                  <Text
                    className={classes.label}
                  >{`${nft.contract.symbol} #${nft.tokenId}`}</Text>
                </Group>
                <Box px={8} pt={40}>
                  <Group position="apart" className={classes.table}>
                    <Text>name</Text>
                    <Text>{`${
                      nft.title.length > 14
                        ? nft.title.substring(0, 12) + '...'
                        : nft.title
                    }`}</Text>
                  </Group>
                  <Group position="apart" className={classes.table}>
                    <Text>description</Text>
                    <Text>{`${
                      nft.description.length > 14
                        ? nft.description.substring(0, 12) + '...'
                        : nft.description
                    }`}</Text>
                  </Group>
                  <Group position="apart" className={classes.table}>
                    <Text>Created</Text>
                    <Text>
                      {nft.rawMetadata?.timestamp
                        ? `${timeAgo.format(nft.rawMetadata?.timestamp * 1000)}`
                        : 'unknown'}
                    </Text>
                  </Group>
                </Box>
              </Box>
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
