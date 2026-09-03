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
  components/
    icons/      # EditorialIcons.tsx — único sistema de ícones do projeto
  data/         # site.ts, categories.ts, products.ts — única fonte de conteúdo
  pages/        # Home.tsx compõe o ritmo editorial a partir dos dados
  styles/       # tokens.css (design tokens) + global.css (reset/utilitários)
public/
  fonts/        # Bodoni Moda + Instrument Sans, self-hosted (woff2, subset latin)
  images/       # placeholders + fotografia real quando disponível
```

**Tipografia:** Bodoni Moda (display/editorial — títulos, nomes de produto,
assinatura) e Instrument Sans (interface — navegação, descrições, CTAs).
Ambas controladas só por `--font-display`/`--font-body` em `tokens.css`;
nenhum componente declara uma fonte diretamente.

**Ícones:** um sistema local só, `src/components/icons/EditorialIcons.tsx`
— outline fino, `currentColor`, sem biblioteca externa. Ao precisar de um
ícone novo, adicione ali; não crie um segundo arquivo de ícones.

## Editar conteúdo

- **Trocar produtos/categorias:** edite `src/data/products.ts` e
  `src/data/categories.ts`. Nenhum componente precisa mudar.
- **Trocar nome/Instagram/textos do hero:** edite `src/data/site.ts`
  (`heroTagline` é o texto pequeno, `heroHeading` é o título grande —
  atualmente "analunps" em minúsculas, de propósito).
- **Trocar a foto de fundo do hero:** troque `public/images/hero.svg` (hoje
  um gradiente abstrato — nenhuma foto real chegou para essa seção ainda,
  ver pendências) por uma foto real, mesmo caminho. Se o enquadramento
  cortar algo importante, ajuste `object-position` na regra `.image` de
  `Hero.module.css`.
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

1. **Foto do hero.** Nem a imagem de referência nem "a foto da Ana já
   separada" mencionadas no pedido chegaram anexadas — o hero usa
   `public/images/hero.svg`, um gradiente abstrato (mesmo tratamento dado
   a produtos sem foto real), para não reaproveitar as fotos já usadas em
   Instagram/TikTok logo abaixo (ficaria repetitivo) nem inventar uma
   fotografia que não foi fornecida. Assim que a foto definitiva chegar, é
   só trocar o arquivo — ver "Editar conteúdo" acima.
2. **`analunps-logo.png` não está em uso.** Ficou de uma direção anterior do
   hero (assinatura como imagem); o arquivo continua em `public/images/`
   caso sirva para outro lugar (favicon maior, rodapé, etc.), mas hoje
   nenhum componente o referencia. É também um PNG raster (2172×724px), não
   um SVG vetorial, apesar de ter sido descrito como SVG em um pedido
   anterior — vale confirmar com quem forneceu o arquivo original.
3. **Fotografia de produto.** A seção "me acompanha por lá." já usa fotos
   reais da Ana (`public/images/social/*.jpg`). Os produtos ainda são
   placeholders SVG abstratos na paleta da marca — não fotos de stock
   genéricas, para não comprometer a sensação de "feito para essa pessoa".
   Troque os arquivos em `products.ts` quando houver fotografia real.
4. **Links de produto.** Todos apontam para `example.com/produto/...`
   (domínio reservado para documentação). Troque pelos links reais/afiliados.
5. **Domínio.** `elisagouvea.com` em `index.html`, `site.ts`,
   `robots.txt` e `sitemap.xml` é um placeholder — atualize ao registrar o
   domínio definitivo.
6. **Ícone de app.** Só existe `favicon.svg` (ícone de aba). Falta um
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
- Hero: exatamente um `<h1>` na página ("analunps"), ícone do Instagram do
  header aponta para `instagram.com/analunps` (antes apontava para a conta
  errada — corrigido). Chips de categoria quebram linha no mobile em vez de
  rolar horizontalmente (mudança deliberada desta versão do hero).
- Tipografia (Bodoni Moda self-hosted): zero referências a "Fraunces",
  "SocialIcons" ou setas textuais "→" restando no código (checado via
  grep, não só assumido). `instrument-sans-italic.woff2` removido por
  estar genuinely sem uso (nenhum componente aplica itálico a texto em
  Instrument Sans). Fontes preloadadas (Bodoni normal + Instrument Sans
  normal) confirmadas carregando com `document.fonts` sob o base path real
  do GitHub Pages.
- Ícones Instagram/TikTok calibrados para o mesmo peso visual por medição
  real (`SVGGraphicsElement.getBBox()`), não só visualmente — ambos
  resultam em ~18×18 dentro do viewBox de 24×24, não só "mesmo `size` em
  px" (que já havia se mostrado insuficiente).
