# Portfolio AI Chatbot

A streaming portfolio assistant that helps visitors explore a developer's projects, skills, and background through a conversational interface. The assistant uses Google Gemini and answers portfolio questions using the content in `content/portfolio.md`.

## Features

- Real-time Gemini responses with a word-by-word reveal in the chat UI
- Portfolio-grounded system instructions to reduce unsupported answers
- Persian and English responses based on the visitor's language
- Responsive chat interface with light and dark themes
- Accessible message input, loading states, and error feedback
- Server-side API key handling and request validation

## Tech Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS
- Vercel AI SDK (`ai` and `@ai-sdk/react`)
- Google Gemini provider (`@ai-sdk/google`)

## Prerequisites

- Node.js 20.9 or later
- npm
- A Google Gemini API key

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the Gemini API key

Create a Gemini API key in [Google AI Studio](https://aistudio.google.com/apikey). Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

On Windows PowerShell, use:

```powershell
Copy-Item .env.local.example .env.local
```

Set the key in `.env.local`:

```dotenv
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
```

Never commit `.env.local` or expose the API key in client-side code. The repository ignores local environment files by default.

### 3. Add your portfolio information

Edit [`content/portfolio.md`](./content/portfolio.md) and replace its contents with accurate, up-to-date information about the portfolio owner. The chat API loads this file on the server and includes it as the assistant's reference material.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Start the production server (run `npm run build` first) |

## Project Structure

```text
app/
├── api/
│   └── chat/
│       └── route.ts       # Validates requests and streams Gemini responses
├── globals.css            # Global styles and theme backgrounds
├── layout.tsx             # Root layout, font, and SEO metadata
└── page.tsx               # Portfolio landing page
components/
├── Chat.tsx               # Chat state, streaming UI, and error handling
├── ChatInput.tsx          # Accessible message form
└── ChatMessage.tsx        # Chat bubble and word-by-word reveal
content/
└── portfolio.md           # Assistant reference content
lib/
└── portfolio.ts           # Server-side portfolio content loader
```

## Configuration and Troubleshooting

- The API route uses the `gemini-3.1-flash-lite` model. If that model is unavailable to your Google AI Studio project, select a model that is enabled for your account in `app/api/chat/route.ts`.
- Gemini API quotas and rate limits depend on the Google AI Studio project and model. Check the project's quota and billing status if requests are rejected.
- After editing `.env.local`, restart the development server so Next.js reloads the environment variables.
- Provider errors are logged by the server; the chat displays a user-facing message when a request fails.

## Deployment

Deploy the repository to Vercel and add `GOOGLE_GENERATIVE_AI_API_KEY` to the project's environment variables for each required environment. Ensure `content/portfolio.md` is included in the deployment. Then deploy using the standard Next.js build configuration.

## Screenshot

Add a screenshot of the running application here, for example:

```text
![Portfolio AI Chatbot](./docs/screenshot.png)
```

## License

No license has been specified for this project. Add a `LICENSE` file before distributing or reusing it.
