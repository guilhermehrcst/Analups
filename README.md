# Analunps

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
- **Trocar nome/Instagram/tagline do hero:** edite `src/data/site.ts`. O
  hero em si é só a assinatura (`public/images/analunps-logo.png`) + a
  frase de `site.heroTagline` — não há mais título/subtítulo próprios.
- **Trocar a assinatura do hero:** troque `public/images/analunps-logo.png`
  por um arquivo novo com o mesmo nome (ou ajuste o caminho em
  `Hero.tsx`) e atualize os atributos `width`/`height` do `<img>` para as
  dimensões reais do novo arquivo — eles existem para evitar layout shift
  e precisam bater com o arquivo.
- **Trocar Instagram/TikTok da seção "me acompanha por lá":** edite
  `src/data/social.ts`. Não depende de API do Instagram/TikTok — é só link e
  imagem local, igual aos produtos.
- **Trocar fotografia de produto:** troque o arquivo apontado por `image`
  em `products.ts`/`social.ts` por um `.webp`/`.jpg` real — o componente
  `AspectImage` já cuida de `object-fit`, `loading="lazy"` e proporção
  consistente (e aceita `objectPosition` quando a foto não é centralizada).
  Caminhos de imagem sempre passam por `publicUrl()` (`src/lib/publicUrl.ts`),
  que resolve contra o base path do deploy (`import.meta.env.BASE_URL`) —
  nunca referencie um arquivo de `/public` com uma string `/algo.jpg` direto
  em JSX/dados sem passar por `publicUrl()`, ou ele quebra quando o site for
  publicado fora da raiz do domínio (como no GitHub Pages, `base:
  '/Analups/'`).

## Pendências antes do lançamento (não implementadas nesta sessão)

Documentado explicitamente em vez de deixado como suposição silenciosa:

1. **Assinatura do hero é PNG, não SVG.** O arquivo fornecido para
   `public/images/analunps-logo.png` é um raster (2172×724px, com
   transparência) — não um SVG vetorial, apesar de referências anteriores a
   um `.svg`. Usado exatamente como enviado (sem redesenhar/vetorizar). Se
   houver uma versão `.svg` vetorial de origem, substitua o arquivo (mesmo
   caminho ou ajuste em `Hero.tsx`) para ganhar nitidez em qualquer escala.
2. **Fotografia de produto.** A seção "me acompanha por lá." já usa fotos
   reais da Ana (`public/images/social/*.jpg`). Os produtos ainda são
   placeholders SVG abstratos na paleta da marca — não fotos de stock
   genéricas, para não comprometer a sensação de "feito para essa pessoa".
   Troque os arquivos em `products.ts` quando houver fotografia real.
3. **Links de produto.** Todos apontam para `example.com/produto/...`
   (domínio reservado para documentação). Troque pelos links reais/afiliados.
4. **Domínio.** `elisagouvea.com` em `index.html`, `site.ts`,
   `robots.txt` e `sitemap.xml` é um placeholder — atualize ao registrar o
   domínio definitivo.
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
- Build servido sob `/Analups/` (base path real do GitHub Pages) sem 404 —
  hero, produtos, seção social, fontes e favicon resolvidos via
  `publicUrl()`/reescrita automática do Vite.
- Hero: exatamente um `<h1>` na página (a assinatura, via `alt`), animação
  de entrada resolve para o estado final quase instantaneamente sob
  `prefers-reduced-motion` (verificado via computed style, não só lido no
  CSS), ícone do Instagram do header aponta para `instagram.com/analunps`
  (antes apontava para a conta errada — corrigido).
