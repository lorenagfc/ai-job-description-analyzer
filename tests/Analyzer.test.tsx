// 01
/// <reference types="jest" />
// 02
/// <reference types="@testing-library/jest-dom" />

// 03
import { render, screen, waitFor } from '@testing-library/react'
// 04
import userEvent from '@testing-library/user-event'
// 05
import Analyzer from '../src/components/Analyzer'
// 06
import { analyzeJobDescription } from '../src/api/analyzer'

// 07
jest.mock('../src/api/analyzer', () => ({
  analyzeJobDescription: jest.fn(),
}))

// 08
const mockedAnalyzeJobDescription =
  analyzeJobDescription as jest.MockedFunction<
    typeof analyzeJobDescription
  >

// 09
describe('Analyzer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // 10
  it('should analyze the job description and display the results', async () => {
    const user = userEvent.setup()

    mockedAnalyzeJobDescription.mockResolvedValue({
      hardSkills: ['React', 'TypeScript', 'AWS'],
      matches: ['React', 'TypeScript'],
      gaps: ['AWS'],
    })

    render(<Analyzer />)

    await user.type(
      screen.getByPlaceholderText('Paste the job description here...'),
      'Frontend Developer with React, TypeScript and AWS'
    )

    await user.type(
      screen.getByPlaceholderText(
        'Paste your skills, experience, or resume here...'
      ),
      'Frontend Developer with React and TypeScript'
    )

    await user.click(
      screen.getByRole('button', { name: 'Analyze skills' })
    )

    await waitFor(() => {
      expect(
        screen.getByText('Hard skills detected')
      ).toBeInTheDocument()
    })

    expect(screen.getAllByText('React')).toHaveLength(2)
    expect(screen.getAllByText('TypeScript')).toHaveLength(2)
    expect(screen.getAllByText('AWS')).toHaveLength(2)

    expect(mockedAnalyzeJobDescription).toHaveBeenCalledWith(
      'Frontend Developer with React, TypeScript and AWS',
      'Frontend Developer with React and TypeScript'
    )
  })

  // 11
  it('should show the loading state while analyzing', async () => {
    const user = userEvent.setup()

    mockedAnalyzeJobDescription.mockImplementation(
      () => new Promise(() => {})
    )

    render(<Analyzer />)

    await user.type(
      screen.getByPlaceholderText('Paste the job description here...'),
      'Frontend Developer with React'
    )

    await user.type(
      screen.getByPlaceholderText(
        'Paste your skills, experience, or resume here...'
      ),
      'Frontend Developer with React'
    )

    await user.click(
      screen.getByRole('button', { name: 'Analyze skills' })
    )

    expect(
      screen.getByRole('button', { name: 'Analyzing...' })
    ).toBeDisabled()
  })

  // 12
  it('should show an error when the analysis fails', async () => {
    const user = userEvent.setup()

    mockedAnalyzeJobDescription.mockRejectedValue(
      new Error('Failed to analyze job description')
    )

    render(<Analyzer />)

    await user.type(
      screen.getByPlaceholderText('Paste the job description here...'),
      'Frontend Developer with React'
    )

    await user.type(
      screen.getByPlaceholderText(
        'Paste your skills, experience, or resume here...'
      ),
      'Frontend Developer with React'
    )

    await user.click(
      screen.getByRole('button', { name: 'Analyze skills' })
    )

    expect(
      await screen.findByText('Analysis unavailable')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Failed to analyze job description')
    ).toBeInTheDocument()
  })
})