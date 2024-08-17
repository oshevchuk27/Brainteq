import { H2, Paragraph, SubmitButton, Theme, YStack, isWeb } from '@my/ui'
import { SchemaForm, formFields } from 'app/utils/SchemaForm'
import { z } from 'zod'

const numberOptions = Array.from({ length: 10 }, (_, i) => ({
  name: `${i + 1}`,
  value: `${i + 1}`, // Convert number to string
}))

export const CreateScreen = () => {
  return (
    <SchemaForm
      onSubmit={console.log}
      schema={z.object({
        feeling: formFields.select.describe('How are you feeling? // Happy, Sad, Neutral'),
        calmness: formFields.select.describe('How would you rate your calmness levels? // 1-10'),
        energy: formFields.select.describe('How would you rate your energy levels? // 1-10'),
      })}
      defaultValues={{
        feeling: '',
        calmness: '',
        energy: '',
      }}
      props={{
        feeling: {
          options: [
            {
              name: 'Select an option',
              value: '',
            },
            {
              name: 'Happy',
              value: 'happy',
            },
            {
              name: 'Sad',
              value: 'sad',
            },
            {
              name: 'Neutral',
              value: 'neutral',
            },
          ],
        },
        calmness: {
          options: [{ name: 'Select a level', value: '' }, ...numberOptions],
        },
        energy: {
          options: [{ name: 'Select a level', value: '' }, ...numberOptions],
        },
      }}
      renderAfter={({ submit }) => (
        <Theme inverse>
          <SubmitButton onPress={() => submit()}>Submit</SubmitButton>
        </Theme>
      )}
    >
      {(fields) => (
        <>
          <YStack gap="$2" py="$4" pb="$8">
            {isWeb && <H2 ta="center">Mood Survey</H2>}
            <Paragraph ta="center">Please answer the following questions:</Paragraph>
          </YStack>
          {Object.values(fields)}
        </>
      )}
    </SchemaForm>
  )
}
