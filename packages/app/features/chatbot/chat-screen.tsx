import { Theme } from '@my/ui'
import { api } from 'app/utils/api'
import { useState, useRef, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, Keyboard, ScrollView, Pressable } from 'react-native'
import { Button, Input, XStack, YStack, Card, Paragraph } from 'tamagui'

export const ChatScreen = () => {
  const [messages, setMessages] = useState<{ message: string; isOutgoing: boolean }[]>([])
  const [inputValue, setInputValue] = useState('')
  const scrollViewRef = useRef<ScrollView>(null)

  const handleSend = () => {
    if (inputValue.trim()) {
      const userMessage = { message: inputValue, isOutgoing: true }

      // Optimistically update the UI
      setMessages((prevMessages) => [...prevMessages, userMessage])
      setInputValue('') // Clear the input after sending the message

      // Trigger the mutation to get the AI response
      chatResponseMutation.mutate([...messages, userMessage])
    }
  }

  const chatResponseMutation = api.generateChatResponse.respond.useMutation({
    onSuccess: (data) => {
      const responseMessage = data[data.length - 1]
      setMessages((prevMessages) => [...prevMessages, responseMessage])

      // Scroll to the bottom when a new message is added
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 0)
    },
  })

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <YStack style={{ flex: 1, justifyContent: 'flex-end', padding: '2%', paddingBottom: '4%' }}>
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <YStack gap="$2">
            {messages.map((msg, index) => (
              <ChatBubble key={index} message={msg.message} isOutgoing={msg.isOutgoing} />
            ))}
          </YStack>
        </ScrollView>
        <Pressable onPress={Keyboard.dismiss}>
          <XStack gap="$1.5">
            <Input
              theme="blue"
              size="$4"
              style={{ flex: 1 }}
              placeholder="Send a message"
              placeholderTextColor="white"
              value={inputValue}
              onChangeText={setInputValue}
            />
            <Button theme="blue" size="$4" onPress={handleSend}>
              Send
            </Button>
          </XStack>
        </Pressable>
      </YStack>
    </KeyboardAvoidingView>
  )
}

const ChatBubble = ({ message, isOutgoing = false }) => {
  return (
    <Theme name={isOutgoing ? 'blue' : 'green'}>
      <Card
        elevate
        size="$4"
        bordered
        style={{ maxWidth: '80%', alignSelf: isOutgoing ? 'flex-end' : 'flex-start' }}
      >
        <Card.Header padded>
          <Paragraph>{message}</Paragraph>
        </Card.Header>
      </Card>
    </Theme>
  )
}
