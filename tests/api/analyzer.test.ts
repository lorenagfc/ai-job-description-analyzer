
/// <reference types="jest" />

import { analyzeJobDescription } from '../../src/api/analyzer'

describe('analyzeJobDescription', () => {
  const mockFetch = jest.fn()

  beforeEach(() => {
    globalThis.fetch = mockFetch
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should send the job description and profile and return the analysis', async () => {
    const analysis = {
      hardSkills: ['React', 'TypeScript'],
      matches: ['React'],
      gaps: ['TypeScript'],
    }

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => analysis,
    })

    const result = await analyzeJobDescription(
      'Frontend Developer with React and TypeScript',
      'Frontend Developer with React'
    )

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/analyze',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobDescription:
            'Frontend Developer with React and TypeScript',
          profile: 'Frontend Developer with React',
        }),
      }
    )

    expect(result).toEqual(analysis)
  })

  it('should throw the backend error message when the response fails', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({
        error: 'Failed to analyze job description',
      }),
    })

    await expect(
      analyzeJobDescription('Job description', 'Profile')
    ).rejects.toThrow('Failed to analyze job description')
  })
})