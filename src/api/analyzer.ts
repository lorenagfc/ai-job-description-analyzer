
export type AnalysisResult = {
  hardSkills: string[]
  matches: string[]
  gaps: string[]
}

const API_URL = 'http://localhost:3000'

export async function analyzeJobDescription(
  jobDescription: string,
  profile: string
): Promise<AnalysisResult> {
  const response = await fetch(`${API_URL}/api/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jobDescription,
      profile,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()

    throw new Error(
      errorData.error ?? 'Failed to analyze job description'
    )
  }

  return response.json() as Promise<AnalysisResult>
}
