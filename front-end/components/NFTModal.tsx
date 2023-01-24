import {
  Box,
  Card,
  Collapse,
  createStyles,
  Group,
  Image,
  Modal,
  Paper,
  SimpleGrid,
  Text,
  UnstyledButton,
} from '@mantine/core'
import { IconChevronDown } from '@tabler/icons'
import { useState } from 'react'
import { useNetwork } from 'wagmi'

const useStyles = createStyles((theme) => ({
  modal: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xl,
    fontWeight: 700,
    marginRight: 16,
    paddingBottom: 16,
    paddingTop: 16,
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
    fontSize: theme.fontSizes.sm,
    fontWeight: 700,
    color: 'dimmed',
    paddingBottom: 1,
    paddingTop: 1,
    a: {
      textDecoration: 'none',
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.blue[4]
          : theme.colors.gray[3],
      '&:hover': {
        color: theme.colors.blue[7],
      },
    },
  },

  unstyledButton: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    fontSize: theme.fontSizes.sm,
    fontWeight: 700,
    color: 'dimmed',
    textTransform: 'uppercase',
    paddingBottom: 1,
    paddingTop: 1,
  },
}))

export default function NFTModal({
  nft,
  timeAgo,
  openedMap,
  setOpenedMap,
  index,
}) {
  const [openedDescription, setOpenedDescription] = useState(false)
  const [openedAttributes, setOpenedAttributes] = useState(false)

  const { classes } = useStyles()

  const { chain } = useNetwork()

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
          <Image src={nft.media[0]?.gateway} alt={nft.title} />
        </Card.Section>
        <Card.Section>
          <Group position="right" className={classes.section}>
            <Text
              className={classes.label}
            >{`${nft.contract.symbol} #${nft.tokenId}`}</Text>
          </Group>
          <Box p={16} mt={16}>
            <Group position="apart" className={classes.modalTable}>
              <Text>name</Text>
              <Text>{`${
                nft.title.length > 14
                  ? nft.title.substring(0, 12) + '...'
                  : nft.title
              }`}</Text>
            </Group>
            {nft.rawMetadata.author && (
              <Group position="apart" className={classes.modalTable}>
                <Text>author</Text>
                <Text>{`${
                  nft.rawMetadata.author.length > 14
                    ? nft.rawMetadata.author.substring(0, 12) + '...'
                    : nft.rawMetadata.author
                }`}</Text>
              </Group>
            )}
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
              <Text>created</Text>
              <Text>{`${timeAgo.format(
                new Date(nft.timeLastUpdated),
                'twitter-first-minute'
              )}`}</Text>
            </Group>
            <Group position="apart" className={classes.modalTable}>
              <Text>Token id</Text>
              <Text>#{nft.tokenId}</Text>
            </Group>
            <Group position="apart" className={classes.modalTable}>
              <Text>Token uri</Text>
              <a target="_blank" href={nft.tokenUri?.gateway}>
                json
              </a>
            </Group>
            <Group position="apart" className={classes.modalTable}>
              <Text>Image uri</Text>
              <a target="_blank" href={nft.media[0]?.gateway}>
                image
              </a>
            </Group>
            <Group position="apart" className={classes.modalTable}>
              <Text>network</Text>
              <Text>{nft.rawMetadata.network}</Text>
            </Group>
            <Group position="apart" className={classes.modalTable}>
              <Text>token type</Text>
              <Text>{nft.tokenType}</Text>
            </Group>
            <Group position="apart" className={classes.modalTable}>
              <Text>contract address</Text>
              <a
                target="_blank"
                href={`${chain.blockExplorers.default.url}/address/${nft.contract.address}`}
              >{`${nft.contract.address.slice(
                0,
                6
              )}...${nft.contract.address.slice(
                nft.contract.address.length - 4,
                nft.contract.address.length
              )}`}</a>
            </Group>
          </Box>
        </Card.Section>
      </Card>
    </Modal>
  )
}
