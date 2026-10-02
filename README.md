# AI Job Description Analyzer

An AI-powered tool that analyzes job descriptions against a professional profile, identifying relevant hard skills, matching qualifications, and skill gaps.

The project was built to help job seekers better understand job requirements and identify areas for professional development.

## Features

- Analyze job descriptions against a professional profile.
- Extract relevant hard skills.
- Identify matching qualifications.
- Highlight missing skills and potential gaps.
- Structured AI responses validated with Zod.
- Loading and error states.
- Responsive interface.
- Mock analysis mode for local development.
- Optional integration with the Google Gemini API.

## Tech Stack

**Frontend**
- React
- TypeScript
- Vite
- CSS

**Backend**
- Node.js
- Express
- TypeScript
- Zod
- Google Gemini API

**Testing & Code Quality**
- Jest
- React Testing Library
- ESLint

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/lorenagfc/ai-job-description-analyzer.git
cd ai-job-description-analyzer
```

Install frontend dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd server
npm install
```

### Environment Variables

Create a `.env` file inside the `server` directory.

**Mock mode:**

```env
ANALYSIS_MODE=mock
```

**Gemini mode:**

```env
ANALYSIS_MODE=gemini
GEMINI_API_KEY=your_gemini_api_key
```

The Gemini API key must remain on the backend and should never be exposed in frontend code or committed to version control.

### Running the Application

Start the backend from the `server` directory:

```bash
npm run dev
```

Start the frontend in a separate terminal, from the project root:

```bash
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

The backend runs at:

```text
http://localhost:3000
```

## Analysis Modes

### Mock Mode

The application uses predefined analysis data, allowing users to explore the interface without depending on an external AI service.

### Gemini Mode

The backend uses the Google Gemini API to analyze the job description and professional profile.

The integration is optional and requires a valid API key.

## Testing

Run the test suite from the project root:

```bash
npm test
```

The tests cover:

- API request behavior.
- Successful responses.
- Error handling.
- Form interactions.
- Analyzer component behavior.

## Code Quality

Run ESLint:

```bash
npm run lint
```

Create a production frontend build:

```bash
npm run build
```

### Backend Build

From the `server` directory:

```bash
npm run build
```

To start the compiled backend:

```bash
npm start
```

## Project Structure

```text
ai-job-description-analyzer/
├── src/
│   ├── api/
│   │   └── analyzer.ts
│   ├── components/
│   │   ├── Analyzer.tsx
│   │   ├── Header.tsx
│   │   └── JobDescriptionForm.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
│
├── server/
│   └── src/
│       └── index.ts
│
├── tests/
│   ├── Analyzer.test.tsx
│   ├── JobDescriptionForm.test.tsx
│   └── api/
│       └── analyzer.test.ts
│
├── jest.config.ts
├── tsconfig.test.json
├── setupTests.ts
└── README.md
```

## Future Improvements

- Configure production API deployment.
- Improve AI analysis and feedback.
- Expand automated test coverage.
- Add additional analysis capabilities.

---

# Analisador de Descrições de Vagas com IA

Uma aplicação que analisa descrições de vagas em relação a um perfil profissional, identificando hard skills relevantes, qualificações compatíveis e lacunas de conhecimento.

O projeto foi desenvolvido para ajudar candidatos a compreender melhor os requisitos das vagas e identificar oportunidades de desenvolvimento profissional.

## Funcionalidades

- Análise de descrições de vagas em relação ao perfil profissional.
- Extração de hard skills relevantes.
- Identificação de qualificações compatíveis.
- Identificação de habilidades ausentes e possíveis lacunas.
- Respostas estruturadas da IA validadas com Zod.
- Estados de carregamento e tratamento de erros.
- Interface responsiva.
- Modo mock para desenvolvimento local.
- Integração opcional com a API Google Gemini.

## Tecnologias

**Frontend**
- React
- TypeScript
- Vite
- CSS

**Backend**
- Node.js
- Express
- TypeScript
- Zod
- Google Gemini API

**Testes e qualidade de código**
- Jest
- React Testing Library
- ESLint

## Como executar

### Pré-requisitos

- Node.js
- npm

### Instalação

Clone o repositório:

```bash
git clone https://github.com/lorenagfc/ai-job-description-analyzer.git
cd ai-job-description-analyzer
```

Instale as dependências do frontend:

```bash
npm install
```

Instale as dependências do backend:

```bash
cd server
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env` dentro da pasta `server`.

**Modo mock:**

```env
ANALYSIS_MODE=mock
```

**Modo Gemini:**

```env
ANALYSIS_MODE=gemini
GEMINI_API_KEY=sua_chave_da_api
```

A chave da API Gemini deve permanecer exclusivamente no backend e nunca deve ser exposta no código do frontend ou enviada ao repositório.

### Executando a aplicação

Inicie o backend dentro da pasta `server`:

```bash
npm run dev
```

Em outro terminal, na raiz do projeto, inicie o frontend:

```bash
npm run dev
```

O frontend estará disponível em:

```text
http://localhost:5173
```

O backend estará disponível em:

```text
http://localhost:3000
```

## Modos de análise

### Mock

Utiliza dados de análise predefinidos, permitindo explorar a interface sem depender de um serviço externo de IA.

### Gemini

Utiliza a API Google Gemini no backend para analisar a descrição da vaga e o perfil profissional.

A integração é opcional e requer uma chave válida.

## Testes

Execute a suíte de testes na raiz do projeto:

```bash
npm test
```

Os testes cobrem:

- Comportamento das requisições à API.
- Respostas bem-sucedidas.
- Tratamento de erros.
- Interações com o formulário.
- Comportamento do componente principal de análise.

## Qualidade de código

Execute o ESLint:

```bash
npm run lint
```

Gere o build de produção do frontend:

```bash
npm run build
```

### Build do Backend

Dentro da pasta `server`:

```bash
npm run build
```

Para iniciar o backend compilado:

```bash
npm start
```

## Estrutura do projeto

```text
ai-job-description-analyzer/
├── src/
│   ├── api/
│   │   └── analyzer.ts
│   ├── components/
│   │   ├── Analyzer.tsx
│   │   ├── Header.tsx
│   │   └── JobDescriptionForm.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
│
├── server/
│   └── src/
│       └── index.ts
│
├── tests/
│   ├── Analyzer.test.tsx
│   ├── JobDescriptionForm.test.tsx
│   └── api/
│       └── analyzer.test.ts
│
├── jest.config.ts
├── tsconfig.test.json
├── setupTests.ts
└── README.md
```

## Melhorias futuras

- Configuração do deploy da API em produção.
- Aprimoramento da análise e dos feedbacks gerados pela IA.
- Ampliação da cobertura de testes automatizados.
- Implementação de funcionalidades adicionais de análise.

---

**Developed by Lorena**