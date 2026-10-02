
import 'dotenv/config'

import express from 'express'
import cors from 'cors'

import { GoogleGenAI } from '@google/genai'
import { z } from 'zod/v4'

const app = express()
const PORT = Number(process.env.PORT) || 3000

const ANALYSIS_MODE = process.env.ANALYSIS_MODE ?? 'mock'

if (!['mock', 'gemini'].includes(ANALYSIS_MODE)) {
  throw new Error('ANALYSIS_MODE must be mock or gemini')
}

if (ANALYSIS_MODE === 'gemini' && !process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is required in Gemini mode')
}

const ai =
  ANALYSIS_MODE === 'gemini'
    ? new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
      })
    : null

const analysisSchema = z.object({
  hardSkills: z.array(z.string()),
  matches: z.array(z.string()),
  gaps: z.array(z.string()),
})

const requestSchema = z.object({
  jobDescription: z.string().trim().min(20),
  profile: z.string().trim().min(10),
})

app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.get('/', (_request, response) => {
  response.json({
    message: 'AI Job Description Analyzer API is running!',
    mode: ANALYSIS_MODE,
  })
})

app.post('/api/analyze', async (request, response) => {
  try {
    const validation = requestSchema.safeParse(request.body)

    if (!validation.success) {
      response.status(400).json({
        error: 'Please provide a valid job description and profile.',
      })
      return
    }

    const { jobDescription, profile } = validation.data

    if (ANALYSIS_MODE === 'mock') {
      response.json({
        hardSkills: ['React', 'TypeScript', 'REST APIs', 'Git', 'AWS'],
        matches: ['React', 'TypeScript', 'REST APIs', 'Git'],
        gaps: ['AWS'],
      })
      return
    }

    if (!ai) {
      throw new Error('Gemini client is not configured')
    }

    const result = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `
        You are a career skills analysis assistant.

        Analyze the job description and the candidate profile.

        Identify:
        1. hardSkills: technical skills and tools explicitly required or relevant in the job description.
        2. matches: skills from hardSkills that are also demonstrated in the candidate profile.
        3. gaps: skills from hardSkills that are not demonstrated in the candidate profile.

        Do not invent skills that are not supported by the provided texts.
        Keep skill names concise and consistent.
        Return all three arrays, even if an array is empty.

        JOB DESCRIPTION:
        ${jobDescription}

        CANDIDATE PROFILE:
        ${profile}
        `,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'object',
          properties: {
            hardSkills: {
              type: 'array',
              items: { type: 'string' },
            },
            matches: {
              type: 'array',
              items: { type: 'string' },
            },
            gaps: {
              type: 'array',
              items: { type: 'string' },
            },
          },
          required: ['hardSkills', 'matches', 'gaps'],
        },
      },
    })

    if (!result.text) {
      throw new Error('Gemini did not return a text response')
    }

    const parsedResult: unknown = JSON.parse(result.text)
    const analysis = analysisSchema.parse(parsedResult)

    response.json(analysis)
  } catch (error) {
    console.error('Analysis error:', error)

    const errorStatus =
      typeof error === 'object' &&
      error !== null &&
      'status' in error
        ? Number(error.status)
        : null

    if (errorStatus === 503) {
      response.status(503).json({
        error:
          'Gemini is currently experiencing high demand. Please try again shortly.',
      })
      return
    }

    response.status(500).json({
      error: 'Failed to analyze job description',
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Analysis mode: ${ANALYSIS_MODE}`)
})