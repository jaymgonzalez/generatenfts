import {
  Box,
  Card,
  createStyles,
  Grid,
  Group,
  Image,
  Text,
  LoadingOverlay,
  Pagination,
  Center,
  Flex,
  Title,
  Button,
} from '@mantine/core'
import { Network, Alchemy, OwnedNftsResponse } from 'alchemy-sdk'
import { useEffect, useState } from 'react'
import { contractAddress } from '../constants'
import { useEffectOnce } from '../hooks/useEffectOnce'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import NFTModal from './NFTModal'
import { selectNftData, setNftData } from '../store/slices/nftSlice'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
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
    letterSpacing: -0.25,
  },
}))

const PAGE_SIZE = 12

export default function NFTGallery({ address }) {
  // const [nftList, setNftList] = useState<OwnedNftsResponse>()
  const [loading, setLoading] = useState(false)
  const [openedMap, setOpenedMap] = useState({})
  const [page, setPage] = useState(1)
  const [records, setRecords] = useState(null)

  const { classes } = useStyles()

  const dispacth = useDispatch()
  const nftList = useSelector(selectNftData)

  const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_MUMBAI_API_KEY,
    network: Network.MATIC_MUMBAI,
  }

  const alchemy = new Alchemy(settings)

  useEffectOnce(() => {
    if (nftList.length == 0) {
      setLoading(true)
      alchemy.nft
        .getNftsForOwner(address, {
          contractAddresses: [contractAddress],
        })
        .then((res) => {
          dispacth(setNftData(res.ownedNfts))
          setRecords(res.ownedNfts.slice(0, PAGE_SIZE))
        })
        .finally(() => setLoading(false))
    }
  })

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE
    setRecords(nftList.slice(from, to))
  }, [page])

  const nfts = records?.map((nft, index) => {
    return (
      <>
        <Grid.Col
          key={nft.tokenId + nft.tokenType}
          span={12}
          xs={6}
          sm={4}
          lg={3}
        >
          {/* <Link href={`/nft/${nft.contract.address}/${nft.tokenId}`}> */}
          <NFTModal
            nft={nft}
            timeAgo={timeAgo}
            openedMap={openedMap}
            setOpenedMap={setOpenedMap}
            index={index}
          />
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
                  src={nft.media[0]?.thumbnail || nft.media[0]?.gateway}
                  alt={nft.title}
                />
              </Box>
            </Card.Section>
            <Card.Section>
              <Box mih="140px">
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
      {<LoadingOverlay visible={loading} />}
      {nfts?.length === 0 && (
        <Box h="100vh">
          <Flex
            gap="md"
            justify="center"
            align="center"
            direction="column"
            h="80%"
          >
            <Title order={3}>No GNFT detected in your connected wallet.</Title>
            <Title order={5}>Click below to get your first one!</Title>
            <Group mx="auto" px={28}>
              <Button component={Link} href="/generate" size="md" radius="md">
                Generate NFT
              </Button>
            </Group>
          </Flex>
        </Box>
      )}
      {nfts && <Grid gutter="xl">{nfts}</Grid>}
      {nftList.length > PAGE_SIZE && (
        <Center py={32}>
          <Pagination
            page={page}
            onChange={setPage}
            total={
              nftList.length % PAGE_SIZE !== 0
                ? Math.floor(nftList.length / PAGE_SIZE) + 1
                : nftList.length / PAGE_SIZE
            }
          />
        </Center>
      )}
    </>
  )
}
