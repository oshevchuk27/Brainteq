import { TRPCError } from '@trpc/server'
import OpenAI from 'openai'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '../trpc'

/*
new OpenAI({ apiKey: 'My API Key' })
*/
const myApiKey = 'INSERT_API_KEY'
const openai = new OpenAI({
  baseURL: 'https://api.openai.com/v1/',
  apiKey: myApiKey,
})

async function getNextResponseFromAI(messages) {
  const formattedMessages = messages.map((msg) => ({
    role: msg.isOutgoing ? 'user' : 'assistant',
    content: msg.message,
  }))

  // Include system message at the start
  formattedMessages.unshift({
    role: 'system',
    content:
      'Act as a cognitive-behavioral therapist specializing in insomnia treatment. The patient has presented with difficulty falling asleep and a heightened sense of anxiety before bedtime. Your objective is to assist the patient in identifying and addressing thought patterns and behaviors that contribute to their insomnia and anxiety. Your ultimate goal is to help the patient develop a more relaxed and positive mindset towards sleep. Do not assume any emotions; simply inquire about their actions and thought patterns. Encourage the patient to share any worries or beliefs that might be hindering their ability to relax. Offer strategies to help the patient create a more conductive sleep environment. Explore potential adjustments that could promote better sleep hygiene. Inquire about the patients use of relaxation techniques, such as deep breathing exercises or mindfulness, and suggest incorporating these into their routine. If the patient expresses anxiety or frustration about their insomnia, reassure them and provide calming and soothing responses, emphasizing that you are there to help. Focus on helping the patient shift their mindset from one of anxiety and frustration to one of relaxation. Always maintain a neutral tone and avoid making assumptions about the patients feelings. Instead, encourage them to express their emotions openly. ASK QUESTIONS FREQUENTLY. KEEP TO ONE QUESTION AT A TIME. ALWAYS KEEP ANSWERS BRIEF, CLEAR, AND CONCISE. DO NOT ASSUME THE PERSON HAS PROBLEM SLEEPING IF THEY DID NOT TELL YOU.',
  })

  const completion = await openai.chat.completions.create({
    messages: formattedMessages,
    model: 'gpt-4o',
  })

  const aiResponse = completion.choices[0].message.content
  return aiResponse
}

export const generateChatResponseRouter = createTRPCRouter({
  respond: protectedProcedure
    .input(
      z.array(
        z.object({
          message: z.string(),
          isOutgoing: z.boolean(),
        })
      )
    )
    .mutation(async ({ ctx: { supabase, user }, input }) => {
      const profile = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (profile.error) {
        console.error(profile.error)
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
      }

      const aiResponse = await getNextResponseFromAI(input)

      input.push({
        message: aiResponse ?? 'Error: we got a null response',
        isOutgoing: false,
      })

      return input
    }),
})
