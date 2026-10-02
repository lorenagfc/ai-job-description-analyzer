
/// <reference types="jest" />

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import JobDescriptionForm from '../src/components/JobDescriptionForm'

describe('JobDescriptionForm', () => {
  it('should render the job description, profile and analyze button', () => {
    const onAnalyze = jest.fn()

    render(
      <JobDescriptionForm
        onAnalyze={onAnalyze}
        isLoading={false}
      />
    )

    expect(
      screen.getByRole('textbox', { name: 'Job description' })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('textbox', { name: 'Your profile or resume' })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'Analyze skills' })
    ).toBeInTheDocument()
  })

  it('should disable the analyze button while loading', () => {
    const onAnalyze = jest.fn()

    render(
      <JobDescriptionForm
        onAnalyze={onAnalyze}
        isLoading={true}
      />
    )

    expect(
      screen.getByRole('button', { name: 'Analyzing...' })
    ).toBeDisabled()
  })

  it('should send the job description and profile when analyzing', async () => {
    const user = userEvent.setup()
    const onAnalyze = jest.fn()

    render(
      <JobDescriptionForm
        onAnalyze={onAnalyze}
        isLoading={false}
      />
    )

    const jobDescription = screen.getByRole(
      'textbox',
      { name: 'Job description' }
    )

    const profile = screen.getByRole(
      'textbox',
      { name: 'Your profile or resume' }
    )

    await user.type(
      jobDescription,
      'Frontend Developer with React and TypeScript'
    )

    await user.type(
      profile,
      'Frontend Developer with React experience'
    )

    await user.click(
      screen.getByRole('button', { name: 'Analyze skills' })
    )

    expect(onAnalyze).toHaveBeenCalledWith(
      'Frontend Developer with React and TypeScript',
      'Frontend Developer with React experience'
    )
  })
})