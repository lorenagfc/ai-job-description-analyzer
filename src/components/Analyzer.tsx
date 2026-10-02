
import { useState } from 'react'
import Header from './Header'
import JobDescriptionForm from './JobDescriptionForm'
import {
  analyzeJobDescription,
  type AnalysisResult,
} from '../api/analyzer'

function Analyzer() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleAnalyze(
    jobDescription: string,
    profile: string
  ) {
    setError(null)
    setAnalysis(null)
    setIsLoading(true)

    try {
      const result = await analyzeJobDescription(
        jobDescription,
        profile
      )

      setAnalysis(result)
    } catch (error) {
      console.error('Analysis error:', error)

      setError(
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main>
      <Header
        title="AI Job Description Analyzer"
        subtitle="Understand job requirements, identify your matching skills, and discover where to focus your learning."
      />

      <JobDescriptionForm
        onAnalyze={handleAnalyze}
        isLoading={isLoading}
      />

      {error && (
        <div className="error-overlay">
          <div className="error-popup">
            <div className="error-icon">⚠️</div>

            <h2>Analysis unavailable</h2>

            <p>{error}</p>

            <button
              type="button"
              onClick={() => setError(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner" />
        </div>
      )}

      {analysis && (
        <section className="analysis-result">
          <div className="analysis-header">
            <div>
              <h2>Hard skills detected</h2>
              <p>
                {analysis.hardSkills.length} skills found in the job description.
              </p>
            </div>
          </div>

          <div className="skills-list">
            {analysis.hardSkills.map((skill) => (
              <span className="skill-tag" key={skill}>
                {skill}
              </span>
            ))}
          </div>

          <div className="analysis-section">
            <h3>Matches</h3>

            <div className="skills-list">
              {analysis.matches.map((skill) => (
                <span className="skill-tag match-tag" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="analysis-section">
            <h3>Gaps</h3>

            <div className="skills-list">
              {analysis.gaps.map((skill) => (
                <span className="skill-tag gap-tag" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

export default Analyzer