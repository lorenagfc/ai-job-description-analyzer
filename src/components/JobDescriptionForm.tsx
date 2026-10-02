
import { useState } from 'react'

type JobDescriptionFormProps = {
  onAnalyze: (jobDescription: string, profile: string) => void
  isLoading: boolean
}

function JobDescriptionForm({
  onAnalyze,
  isLoading,
}: JobDescriptionFormProps) {
  const [jobDescription, setJobDescription] = useState('')
  const [profile, setProfile] = useState('')

  function handleAnalyze() {
    onAnalyze(jobDescription, profile)
  }

  return (
    <section className="form-card">
      <div className="form-heading">
        <h2>Compare your profile with a job opportunity</h2>
        <p>
          Add the job description and your professional background
          to identify matching skills and learning opportunities.
        </p>
      </div>

      <div className="form-field">
        <label htmlFor="job-description">
          Job description
        </label>

        <textarea
          id="job-description"
          value={jobDescription}
          onChange={(event) => setJobDescription(event.target.value)}
          placeholder="Paste the job description here..."
        />
      </div>

      <div className="form-field">
        <label htmlFor="profile">
          Your profile or resume
        </label>

        <textarea
          id="profile"
          value={profile}
          onChange={(event) => setProfile(event.target.value)}
          placeholder="Paste your skills, experience, or resume here..."
        />
      </div>

      <button
        type="button"
        onClick={handleAnalyze}
        disabled={isLoading}
      >
        {isLoading ? 'Analyzing...' : 'Analyze skills'}
      </button>
    </section>
  )
}

export default JobDescriptionForm