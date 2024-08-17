import {
  AchievementCard,
  Anchor,
  Banner,
  Button,
  EventCard,
  FeedCard,
  H2,
  H4,
  OverviewCard,
  Paragraph,
  ScrollView,
  Separator,
  Theme,
  TodoCard,
  XStack,
  YStack,
  isWeb,
  useMedia,
  validToken,
} from '@my/ui'
import { ArrowRight, Pencil, Sticker, Users } from '@tamagui/lucide-icons'
import { api } from 'app/utils/api'
import { useUser } from 'app/utils/useUser'
import React from 'react'
import { Platform } from 'react-native'
import { useLink } from 'solito/link'

const defaultAuthors = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=67/32/32?ca=1',
  },
  {
    id: 2,
    name: 'Jane Doe',
    avatar: 'https://i.pravatar.cc/150?img=30/32/32?ca=1',
  },
]

export function HomeScreen() {
  return (
    <XStack maw={1480} als="center" f={1}>
      <ScrollView f={3} fb={0}>
        <YStack gap="$3" pt="$5" pb="$8">
          <Greetings />
          <YStack gap="$6">
            <AchievementsSection />
            <OverviewSection />
            <PostsSection />
          </YStack>
        </YStack>
      </ScrollView>

      <Separator vertical />

      {isWeb && <EventCards />}
    </XStack>
  )
}

const EventCards = () => {
  return (
    <ScrollView f={1} fb={0} $md={{ dsp: 'none' }}>
      <YStack separator={<Separator />}>
        <YStack>
          <EventCard
            title="Event #1"
            description="Lorem ipsum dolor sit, amet."
            action={{
              text: 'Show Event',
              props: useLink({ href: '/' }),
            }}
            tags={[
              { text: 'New', theme: 'green_alt2' },
              { text: 'Hot', theme: 'orange_alt2' },
            ]}
          />
          <EventCard
            title="Event #2"
            description="Lorem ipsum dolor sit, amet."
            action={{
              text: 'Show Event',
              props: useLink({ href: '/' }),
            }}
            tags={[{ text: '1 Day Remaining', theme: 'blue_alt2' }]}
          />
          <EventCard
            title="Event #3"
            description="Lorem ipsum dolor sit, amet."
            action={{
              text: 'Show Event',
              props: useLink({ href: '/' }),
            }}
            tags={[{ text: 'Ongoing', theme: 'alt1' }]}
          />
          <EventCard
            title="Event #4"
            description="Lorem ipsum dolor sit, amet."
            action={{
              text: 'Show Event',
              props: useLink({ href: '/' }),
            }}
            tags={[{ text: 'Finished', theme: 'alt2' }]}
          />
        </YStack>
        <YStack p="$3">
          <Theme name="blue_alt1">
            <Banner {...useLink({ href: '/' })} cur="pointer">
              <H4>Upgrade Now!</H4>
              <Paragraph size="$2" mt="$1">
                Upgrade to access exclusive features and more!
              </Paragraph>
            </Banner>
          </Theme>
        </YStack>
        <YStack>
          <TodoCard label="Contribute to OSS" checked={false} />
          <TodoCard label="Learn about Tamagui's latest features" checked />
          <TodoCard label="Upgrade to the new Expo version" checked={false} />
          <TodoCard label="Do the dishes" checked={false} />
        </YStack>
      </YStack>
    </ScrollView>
  )
}

const halfMinusSpace = validToken(
  Platform.select({
    web: 'calc(50% - 12px)',
    native: '53%',
  })
)

const quarterMinusSpace = validToken(
  Platform.select({
    web: 'calc(25% - 12px)',
    native: '21%',
  })
)

const AchievementsSection = () => {
  return (
    <YStack gap="$4">
      <XStack px="$4.5" ai="center" gap="$2" jc="space-between" mb="$4">
        <H4 theme="alt1" fow="400">
          It's a good day.
        </H4>
        <Theme name="alt2">
          <Button size="$2" chromeless {...useLink({ href: '/create' })} iconAfter={ArrowRight}>
            Start Mood Survey
          </Button>
        </Theme>
      </XStack>

      <ScrollAdapt>
        <XStack px="$4" fw="wrap" f={1} gap="$3">
          <Theme name="green">
            <AchievementCard
              w={300}
              $gtMd={{
                w: halfMinusSpace,
              }}
              $gtLg={{
                w: quarterMinusSpace,
              }}
              icon={Pencil}
              title="Track your mood"
              progress={{ current: 1, full: 7, label: 'days completed' }}
              action={{
                text: 'Take daily survey',
                props: useLink({ href: '/create' }),
              }}
            />
          </Theme>
          <Theme name="blue">
            <AchievementCard
              w={300}
              $gtMd={{
                w: halfMinusSpace,
              }}
              $gtLg={{
                w: quarterMinusSpace,
              }}
              icon={Sticker}
              title="Your calmness levels"
              progress={{
                current: 75,
                full: 100,
                label: 'calm days this week',
                format: 'percentage',
              }}
              action={{
                text: 'View your insights',
                props: useLink({ href: '#' }),
              }}
            />
          </Theme>
          <Theme name="pink">
            <AchievementCard
              w={300}
              $gtMd={{
                w: halfMinusSpace,
              }}
              $gtLg={{
                w: quarterMinusSpace,
              }}
              icon={Users}
              title="Refer 5 friends"
              progress={{ current: 2, full: 5, label: 'friends referred' }}
              action={{
                text: 'Refer friends',
                props: useLink({ href: '#' }),
              }}
            />
          </Theme>
        </XStack>
      </ScrollAdapt>
    </YStack>
  )
}

const OverviewSection = () => {
  return (
    <YStack gap="$4">
      <XStack px="$4.5" ai="center" gap="$2" jc="space-between" mb="$4">
        <H4 fow="400">Insights</H4>
      </XStack>

      <ScrollAdapt>
        <XStack fw="wrap" ai="flex-start" jc="flex-start" px="$4" gap="$8" mb="$4">
          <OverviewCard title="avg Sleep Score" value="9" />

          <OverviewCard title="Most Common Mood" value="Happy" />

          <OverviewCard title="avg Calmness levels" value="7" />
        </XStack>
      </ScrollAdapt>
    </YStack>
  )
}

const feedCardWidthMd = validToken(
  Platform.select({
    web: 'calc(33.33% - 12px)',
    native: '32%',
  })
)

const PostsSection = () => {
  return (
    <YStack gap="$4">
      <XStack px="$4.5" ai="center" gap="$2" jc="space-between" mb="$4">
        <H4 fow="400">Latest Research</H4>
      </XStack>
      <ScrollAdapt>
        <XStack px="$4" gap="$4" mb="$4" jc="flex-start" fw="wrap">
          <Anchor href="https://www.apa.org/ptsd-guideline/patients-and-families/cognitive-behavioral#:~:text=Cognitive%20behavioral%20therapy%20(CBT)%20is,disorders%2C%20and%20severe%20mental%20illness.">
            <FeedCard
              withImages
              w={300}
              $gtMd={{ w: feedCardWidthMd }}
              title="cognitive behavioral therapy"
              description="CBT is a form of psychological treatment that has been demonstrated to be effective for a range of problems including depression, anxiety disorders..."
              tag="CBT"
            />
          </Anchor>

          <Anchor href="https://www.webmd.com/sleep-disorders/remedies-for-insomnia">
            <FeedCard
              withImages
              w={300}
              $gtMd={{ w: feedCardWidthMd }}
              title="Remedies For Insomnia"
              description="Getting a good night’s sleep is an important part of maintaining your overall health. If you find yourself having difficulty falling asleep or sleeping through the night, this could be a sign of insomnia. "
              tag="Insomnia"
            />
          </Anchor>

          <Anchor href="https://www.mindful.org/how-to-meditate/">
            <FeedCard
              withImages
              w={300}
              $gtMd={{ w: feedCardWidthMd }}
              title="How To Meditate"
              description="When we meditate, we inject far-reaching and long-lasting benefits into our lives: We lower our stress levels, we get to know our pain, we connect better, we improve our focus, and we're kinder to ourselves."
              tag="Relaxation"
            />
          </Anchor>

          <Anchor href="https://utswmed.org/medblog/sleep-disorders-mental-illness/">
            <FeedCard
              withImages
              w={300}
              $gtMd={{ w: feedCardWidthMd }}
              title="Sleep disorders and mental illness go hand in hand"
              description="An early day at the office. Late nights checking email on our laptops or smartphones. Watching our favorite TV shows late into the night. And then we get up early the next morning..."
              tag="Mental Health"
            />
          </Anchor>
        </XStack>
      </ScrollAdapt>
    </YStack>
  )
}

function ScrollAdapt({ children }: { children: React.ReactNode }) {
  const { md } = useMedia()
  return md ? (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <>{children}</>
  )
}

const Greetings = () => {
  const greetingQuery = api.greeting.greet.useQuery()
  return (
    <H2 px="$4" my="$2">
      {greetingQuery.data || '-'}
    </H2>
  )
}
