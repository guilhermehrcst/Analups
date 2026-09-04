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
- Rodada de legibilidade: `--color-text`/`--color-muted` recalibradas e
  toda a escala tipográfica (`--text-xs` a `--text-3xl`) redefinida por
  papel textual (corpo, título de seção, nome de produto normal/large/
  featured, eyebrow/marca, descrição, CTA, handle social), com contraste
  verificado por cálculo de luminância relativa (não visual): texto
  principal 14.56–16.13:1, texto secundário 5.59–6.64:1 — ambos folgados
  acima do mínimo AA de 4.5:1.
- Duas cores de texto que dependiam de `opacity` sobre o fundo vinho do
  footer (`rgba(255,253,249,0.75)` e `rgba(255,253,249,0.6)`) foram
  substituídas por hex sólidos pré-calculados via alpha-blend
  (`#d6c5c5`, 7.75:1; `#bda3a5`, 5.48:1) — contraste passa a ser
  determinístico, independente do que estiver atrás.
- `--text-md` e `--text-xl` foram redefinidos para os novos papéis
  (subtítulo de seção/texto social; nome de produto "large"/handle
  social). A assinatura do Header e a assinatura do Footer usavam esses
  mesmos tokens e foram deliberadamente desacopladas com `font-size`
  fixo equivalente ao valor antigo, para não herdar o novo tamanho —
  confirmado por grep que nenhum outro consumidor desses tokens ficou
  para trás.
- Revisão visual completa em 375/390/430/768/1024/1440px após os ajustes
  de tipografia: zero overflow horizontal (medido via Playwright), zero
  corte de hairline em Bodoni Moda peso 500 nos tamanhos novos (nome de
  produto, handle social), zero espaçamento apertado introduzido pelos
  textos maiores.
- Build de produção servido sob `/Analups/` (base path real) após esta
  rodada: 0 erros de console, 0 requisições com falha, 0 overflow,
  exatamente um `<h1>` — confirmado via Playwright, não apenas visual.
- Direção de arte — nova paleta (cream/hot pink/coral/amarelo/lilás/vinho):
  tokens de cor totalmente redefinidos em `tokens.css`; vinho continua
  carregando títulos de seção, marca/eyebrow, links editoriais e o focus
  ring — hot pink/coral/amarelo/lilás entram só como acento (ícone, borda,
  fundo muito suave, hover), nunca como texto corrido: medido por
  luminância relativa, nenhum dos quatro atinge 4,5:1 sozinho em fundo
  claro (1,5–3,1:1). Onde a direção pedia a cor vibrante como texto de
  hover, foi usada uma variante escurecida da mesma cor (`-text`,
  ≥4,5:1 medido) em vez da cor pura.
- Dois defeitos reais encontrados por medição, não por inspeção visual, e
  corrigidos antes do commit:
  1. o tom de fundo por categoria nos cards de produto (`--color-*-soft`)
     era invisível — `object-fit:cover` cobre o frame inteiro, sem brecha
     para o fundo aparecer. Corrigido com um "passe-partout": padding no
     frame que abre uma margem onde a cor aparece de verdade (confirmado
     por screenshot antes/depois).
  2. o ícone do TikTok em coral puro sobre o card branco media 2,56:1,
     abaixo até do piso de 3:1 para objetos gráficos (e o do Instagram em
     hot pink puro passava por margem de 0,08 — perto demais para
     confiar). Ambos os ícones passaram a usar as variantes `-text`
     (5,0-5,0:1 medido).
- Header pool de legibilidade do hero: a primeira versão do gradiente
  vívido (`120deg`, vinho → hot pink → pêssego) tinha o texto ilegível na
  borda direita em mobile (2,2–2,4:1, medido por amostragem real de pixel
  via canvas, não CSS computado) porque o "pool" escuro radial não cobria
  a largura toda do texto. Redesenhado como dois gradientes lineares
  (vertical + horizontal) formando um vinhete no canto inferior-esquerdo;
  reajustado três vezes até todos os pontos amostrados em 375–1440px
  passarem de 4,5:1 (mínimo observado: 4,83:1) sem escurecer o hero
  inteiro.
- Estados de hover verificados via `getComputedStyle` após o fim da
  transição CSS (a primeira leitura, feita antes de a transição
  assentar, capturou cores intermediárias e gerou falsos positivos):
  CTA editorial vinho→hot-pink-escuro, card de produto com borda por
  categoria, ícone e CTA do Instagram em hot pink, do TikTok em coral,
  chip do hero com wash de pink discreto (`color-mix`), @analunps do
  footer em hot pink sobre preto (6,14:1).
- Três tokens da paleta (`--color-coral`, `--color-yellow`,
  `--color-lilac`, na forma pura) não tinham nenhum consumidor seguro —
  todo uso real passa pelas variantes derivadas (`-soft`, `-border`,
  `-text`) — e foram removidos do arquivo em vez de ficarem como tokens
  mortos.
- Revisão visual em 375/390/430/768/1024/1440px: hero com gradiente vívido
  e texto legível em todas as larguras, seções de categoria cada uma com
  seu acento (beleza=pink, cabelo=amarelo, skincare=lilás,
  acessórios=coral, treino=pink+coral), footer e header permanecem
  neutros como âncora, zero overflow horizontal, zero erro de console.
