import {
  Box,
  Card,
  Collapse,
  createStyles,
  Grid,
  Group,
  Image,
  Modal,
  Paper,
  SimpleGrid,
  Text,
  UnstyledButton,
} from '@mantine/core'
import { Network, Alchemy, OwnedNftsResponse } from 'alchemy-sdk'
import { useState } from 'react'
import { contractAddress } from '../constants'
import { useEffectOnce } from '../hooks/useEffectOnce'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { IconChevronDown, IconChevronDownLeft } from '@tabler/icons'
// import Link from 'next/link'

// TimeAgo.addDefaultLocale(en)
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
    letterSpacing: -0.25,
  },

  modalTable: {
    fontSize: theme.fontSizes.md,
    fontWeight: 700,
    color: 'dimmed',
    paddingBottom: 1,
    paddingTop: 1,
  },

  unstyledButton: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    fontSize: theme.fontSizes.md,
    fontWeight: 700,
    color: 'dimmed',
    textTransform: 'uppercase',
    paddingBottom: 1,
    paddingTop: 1,
  },
}))

export default function NFTGallery({ address }) {
  const [nftList, setNftList] = useState<OwnedNftsResponse>()
  const [loading, setLoading] = useState(false)
  const [openedMap, setOpenedMap] = useState({})
  const [openedDescription, setOpenedDescription] = useState(false)
  const [openedAttributes, setOpenedAttributes] = useState(false)

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
    const attributes = nft.rawMetadata?.attributes?.map((attr, i) => {
      return (
        <Paper withBorder p="md" radius="md" key={attr.value + i}>
          <Group position="apart">
            <Text size="xs" color="dimmed">
              {attr.trait_type}
            </Text>
            <Text>{attr.value}</Text>
          </Group>
        </Paper>
      )
    })

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
              setOpenedDescription(false)
              setOpenedAttributes(false)
            }}
            title={nft.rawMetadata?.title}
            className={classes.modal}
          >
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  className={classes.modalImage}
                  src={nft.media[0]?.gateway}
                  alt={nft.title}
                />
              </Card.Section>
              <Card.Section>
                <Box p={16}>
                  <Group position="apart" className={classes.modalTable}>
                    <Text>name</Text>
                    <Text>{`${
                      nft.title.length > 14
                        ? nft.title.substring(0, 12) + '...'
                        : nft.title
                    }`}</Text>
                  </Group>
                  <UnstyledButton
                    className={classes.unstyledButton}
                    onClick={() => setOpenedDescription((o) => !o)}
                  >
                    <Text>Description</Text>
                    <IconChevronDown />
                  </UnstyledButton>
                  <Collapse in={openedDescription}>
                    {
                      <Paper withBorder p="md" radius="md">
                        <Text>{`${
                          nft.description.length > 0
                            ? nft.description
                            : 'No description'
                        }`}</Text>
                      </Paper>
                    }
                  </Collapse>
                  <Group position="apart" className={classes.modalTable}>
                    <Text>Token uri</Text>
                    <Text>{`${
                      nft.title.length > 14
                        ? nft.title.substring(0, 132) + '...'
                        : nft.title
                    }`}</Text>
                  </Group>
                  <Group position="apart" className={classes.modalTable}>
                    <Text>name</Text>
                    <Text>{`${
                      nft.title.length > 14
                        ? nft.title.substring(0, 12) + '...'
                        : nft.title
                    }`}</Text>
                  </Group>
                  <UnstyledButton
                    className={classes.unstyledButton}
                    onClick={() => setOpenedAttributes((o) => !o)}
                  >
                    <Text>attributes</Text>
                    <IconChevronDown />
                  </UnstyledButton>
                  <Collapse in={openedAttributes}>
                    {attributes ? (
                      <SimpleGrid
                        cols={2}
                        breakpoints={[{ maxWidth: 'xs', cols: 1 }]}
                      >
                        {attributes}
                      </SimpleGrid>
                    ) : (
                      <Paper withBorder p="md" radius="md">
                        <Text>No Added attributes</Text>
                      </Paper>
                    )}
                  </Collapse>
                  <Group position="apart" className={classes.modalTable}>
                    <Text>name</Text>
                    <Text>{`${
                      nft.title.length > 14
                        ? nft.title.substring(0, 12) + '...'
                        : nft.title
                    }`}</Text>
                  </Group>
                  <Group position="apart" className={classes.modalTable}>
                    <Text>name</Text>
                    <Text>{`${
                      nft.title.length > 14
                        ? nft.title.substring(0, 12) + '...'
                        : nft.title
                    }`}</Text>
                  </Group>
                  <Group position="apart" className={classes.modalTable}>
                    <Text>name</Text>
                    <Text>{`${
                      nft.title.length > 14
                        ? nft.title.substring(0, 12) + '...'
                        : nft.title
                    }`}</Text>
                  </Group>
                </Box>
              </Card.Section>
            </Card>
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
