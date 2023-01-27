import {
  createStyles,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
} from '@mantine/core'
import { IconFileText, IconUser, IconZoomQuestion } from '@tabler/icons'
import Link from 'next/link'
import Navbar from '../components/Navbar'

const data = [
  {
    title: 'Guides',
    description:
      'Learn How to Use Our Product or Service with Detailed Instructions - Our guides are designed to provide you with step-by-step instructions on how to use our dApp.',
    icon: IconFileText,
    link: '/guide',
  },
  {
    title: 'FAQs',
    description:
      'Find Quick Answers to Common Questions - Our FAQs are designed to provide you with quick and easy solutions to the most frequently asked questions about our dApp.',
    icon: IconZoomQuestion,
    link: '/faqs',
  },
  {
    title: 'Contact us',
    description:
      'Get Personalized Assistance from Our Support Team - Our support team is here to help you with any questions or concerns you may have about our dApp.',
    icon: IconUser,
    link: '/contact-us',
  },
]

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 34,
    fontWeight: 900,
    [theme.fn.smallerThan('sm')]: {
      fontSize: 24,
    },
  },

  description: {
    maxWidth: 600,
    margin: 'auto',

    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  card: {
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
    },
  },
}))

export default function Support() {
  const { classes, theme } = useStyles()
  const features = data.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      p="xl"
      component={Link}
      href={feature.link}
    >
      <feature.icon size={50} stroke={2} color={theme.fn.primaryColor()} />
      <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text size="sm" color="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ))
  return (
    <Navbar>
      <Container size="lg" py="xl">
        <Title order={2} className={classes.title} align="center" mt="sm">
          Support Center
        </Title>

        <Text
          color="dimmed"
          className={classes.description}
          align="center"
          mt="md"
        >
          Get the Help You Need - Guides, FAQs, and Contact Information
        </Text>

        <SimpleGrid
          cols={3}
          spacing="xl"
          mt={50}
          breakpoints={[{ maxWidth: 'md', cols: 1 }]}
        >
          {features}
        </SimpleGrid>
      </Container>
    </Navbar>
  )
}
