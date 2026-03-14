# Senior Ease

Aplicação em Next.js com App Router, TypeScript, shadcn/ui e Tailwind CSS.

## Desenvolvimento

Requer Node 20.9+.

Se usar nvm:

```sh
nvm use
```

1. Instale as dependências.
2. Rode o servidor local.

```sh
bun install
bun run dev
```

Se preferir npm:

```sh
npm install
npm run dev
```

## Scripts

- `dev`: inicia o ambiente Next.js em desenvolvimento.
- `build`: gera o build de produção.
- `start`: sobe o build de produção.
- `lint`: executa o ESLint.
- `test`: roda os testes com Vitest.

## Estrutura

- `app/`: rotas e layout do App Router.
- `src/components/`: componentes reutilizáveis e UI.
- `src/contexts/`: providers e estado compartilhado.
- `src/pages/`: conteúdo de tela reutilizado pelas rotas do App Router.
