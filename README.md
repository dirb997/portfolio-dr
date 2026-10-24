Repository for the personal portfolio.

## Deployment

The Vite development server binds to `0.0.0.0` and uses Render's `PORT`
environment variable when it is available. This allows the project to run as
a Render web service with `pnpm run dev`.

## Contact form

The contact form uses [Web3Forms](https://web3forms.com/) to send messages
without opening the visitor's email application. Copy `.env.example` to
`.env.local` and replace the placeholder with the access key from your
Web3Forms dashboard:

```sh
cp .env.example .env.local
```

Never commit `.env.local` or expose a private API credential in source code.
