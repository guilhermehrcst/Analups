# Elisa — achados.

Mural pessoal de curadoria: beleza, cabelo, skincare, acessórios e treino.
React + Vite + TypeScript, sem framework de UI, sem backend — conteúdo em
dados estruturados locais.

## Rodando localmente

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # build de produção em dist/
npm run preview   # serve o build de produção
npm run lint
```

## Estrutura

```
src/
  components/   # componentes de UI reutilizáveis (dumb, sem regra de negócio)
  data/         # site.ts, categories.ts, products.ts — única fonte de conteúdo
  pages/        # Home.tsx compõe o ritmo editorial a partir dos dados
  styles/       # tokens.css (design tokens) + global.css (reset/utilitários)
public/
  fonts/        # Fraunces + Instrument Sans, self-hosted (woff2, subset latin)
  images/       # placeholders + fotografia real quando disponível
```

## Editar conteúdo

- **Trocar produtos/categorias:** edite `src/data/products.ts` e
  `src/data/categories.ts`. Nenhum componente precisa mudar.
- **Trocar nome/Instagram/textos do hero:** edite `src/data/site.ts`.
- **Trocar fotografia:** troque o arquivo apontado por `image` em
  `products.ts` (ou `/public/images/hero.svg`) por um `.webp`/`.jpg` real —
  o componente `AspectImage` já cuida de `object-fit`, `loading="lazy"` e
  proporção consistente.

## Pendências antes do lançamento (não implementadas nesta sessão)

Documentado explicitamente em vez de deixado como suposição silenciosa:

1. **Fotografia real.** Sem acesso a fotos da criadora nem ao Unsplash (a
   conta MCP retornou "email não confirmado"), todas as imagens são
   placeholders SVG abstratos na paleta da marca — não fotos de stock
   genéricas, para não comprometer a sensação de "feito para essa pessoa".
   Troque os arquivos em `products.ts` e `hero.svg` por fotografia real.
2. **Links de produto.** Todos apontam para `example.com/produto/...`
   (domínio reservado para documentação). Troque pelos links reais/afiliados.
3. **Domínio.** `elisagouvea.com` em `index.html`, `site.ts`,
   `robots.txt` e `sitemap.xml` é um placeholder — atualize ao registrar o
   domínio definitivo.
4. **OG image.** `og:image`/`twitter:image` apontam para o SVG do hero;
   várias redes (Facebook, em especial) não renderizam SVG em preview de
   link. Gerar um raster 1200×630 (JPG/PNG) a partir da foto real de hero
   antes do lançamento.
5. **Ícone de app.** Só existe `favicon.svg` (ícone de aba). Falta um
   `apple-touch-icon.png` (180×180) para adicionar à tela inicial no iOS.

## Verificado nesta sessão

- Build de produção limpo (`tsc -b && vite build`), sem erros de tipo.
- `oxlint` sem apontamentos.
- Sem overflow horizontal em 375/390/430/768/1024/1440px (verificado via
  Playwright, medindo `scrollWidth` vs `innerWidth`, não apenas visualmente).
- Contraste de todo par texto/fundo do design system ≥ 4.5:1 (WCAG AA),
  calculado formula de luminância relativa.
- `prefers-reduced-motion` reduz todas as transições/animações a 0ms.
- Sem erros de console nem requisições falhas no build de produção.
