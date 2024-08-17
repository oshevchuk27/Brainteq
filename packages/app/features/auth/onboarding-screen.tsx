import { Onboarding, OnboardingStepInfo, StepContent } from '@my/ui'
import { Activity, Lightbulb, Sparkles, Search } from '@tamagui/lucide-icons'
import React from 'react'
import { useRouter } from 'solito/router'

const steps: OnboardingStepInfo[] = [
  {
    theme: 'blue',
    Content: () => (
      <StepContent title="BrainTeq" icon={Sparkles} description="Reprogram your mind" />
    ),
  },
  {
    theme: 'purple',
    Content: () => (
      <StepContent
        title="Discover"
        icon={Lightbulb}
        description="A treatment that actually helps you fall asleep: CBT"
      />
    ),
  },
  {
    theme: 'pink',
    Content: () => (
      <StepContent
        title="Reflect"
        icon={Activity}
        description="Track your progress with daily surveys and insights "
      />
    ),
  },
  {
    theme: 'green',
    Content: () => (
      <StepContent
        title="Introspect"
        icon={Search}
        description="Become more conscious of your thought patterns"
      />
    ),
  },
]

/**
 * note: this screen is used as a standalone page on native and as a sidebar on auth layout on web
 */
export const OnboardingScreen = () => {
  const router = useRouter()
  return <Onboarding autoSwipe onOnboarded={() => router.push('/sign-up')} steps={steps} />
}
