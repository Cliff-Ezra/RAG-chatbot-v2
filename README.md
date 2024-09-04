# Law Guru Chatbot 👨🏽‍⚖️

This is an app for a Law Chatbot. It is built upon RAG principles and uses the [Llama 3](https://replicate.com/meta/llama-3-70b-chat) language model.

## Usage

Install dependencies:

```console
npm install
```

Add your [Replicate API token](https://replicate.com/account#token) to as well as your [Supabase Authenication](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs) to `.env.local`:

```
REPLICATE_API_TOKEN=r8...
NEXT_PUBLIC_SUPABASE_URL=https...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
```

Run the development server:

```console
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.
