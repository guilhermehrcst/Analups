# Analunps

Mural pessoal de curadoria: beleza, cabelo, cachos, acessórios e treino.
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
- Rebrand de identidade Gen Z — categoria "beleza" virou "melu" (parceria
  de patrocínio), tipografia de interface trocada de Instrument Sans para
  Outfit (self-hosted, variável, pesos 400-600), microinterações de scroll
  reveal adicionadas via IntersectionObserver nativo:
  - `types.ts`, `categories.ts`, `products.ts` e `Home.tsx` migrados de
    `'beleza'` para `'melu'` — slug, label, `id`/`aria-labelledby`
    derivados de `category.slug` (nenhum anchor `#beleza` estava
    hardcoded, então a migração não deixou link quebrado). Os dois
    produtos de demonstração da seção viraram "Bruma Glow" (destaque,
    `ver meu favorito`) e "Creme Corporal Vanilove" (`ver produto`);
    os placeholders `beleza-{1,2}.svg` foram renomeados para
    `melu-{1,2}.svg` (mesma arte gerada, sem edição de conteúdo) em vez
    de ficarem com nome de categoria que não existe mais.
  - Outfit baixado como variável latin-only (cobre os diacríticos do
    PT-BR) direto do Google Fonts, self-hosted em `/public/fonts`,
    `font-display: swap`; `instrument-sans-normal.woff2` removido junto
    com o preload e o `@font-face` que apontavam pra ele.
  - Escala tipográfica recalculada por interpolação linear de dois pontos
    (375px/1440px) para bater exatamente com os alvos pedidos — conferido
    por `getComputedStyle` real, não só pelo cálculo: nome de produto
    normal 28→34px, variante grande/handle social 34→42px, featured
    42→56px, subtítulo/texto social 16,9→18px. Título de seção (`h2`)
    voltou de peso 500 para 400 (pedido explícito desta rodada); nome de
    produto featured ganhou peso 500 explícito (antes herdava 400 do
    reset de `h1-h4`, ficando fino demais no tamanho grande).
  - Um defeito real teria passado batido sem a checagem: a seção "melu"
    reusava a borda-hover em pink (herdada de "beleza", categoria de cor
    única) mesmo depois de a direção desta rodada pedir "hot pink +
    coral" para ela — igual à seção "treino". Corrigido agrupando
    `melu` com `acessorios`/`treino` no hover em coral, mantendo o mat
    de fundo em pink; confirmado por `getComputedStyle` antes e depois
    (`rgba(246,91,145,…)` → `rgba(255,122,99,…)`).
  - Scroll reveal: hook `useReveal` (IntersectionObserver, dispara uma
    vez) + classe utilitária `.reveal`/`.is-visible` em `global.css`,
    aplicado ao cabeçalho de cada seção e a todo card de produto/social,
    com stagger de 75ms entre cards que entram juntos (dentro da faixa
    60-90ms pedida) via `transitionDelay` inline. Sob
    `prefers-reduced-motion`, `.reveal` fica sempre visível sem
    transição — confirmado que o hook ainda dispara (não deixa o
    conteúdo dependente de JS para aparecer), só não há mais nada pra
    animar. Verificado via DOM real: elemento fora da viewport começa
    `opacity:0` sem a classe `is-visible`; após rolar até ele e esperar a
    transição, ganha `is-visible`, `opacity:1` e o delay de stagger
    correto (`0s`/`0.075s`) nos dois cards da seção "melu".
  - Escala do hover de foto ajustada de `scale(1.015)` para `scale(1.02)`
    nos três componentes de card (ProductCard, FeaturedProduct,
    SocialCard).
  - Gradiente do hero: stop de 78% ajustado de `#FF8B6A` para `#FF7A63`
    (o token `--color-coral` exato); contraste do texto sobre o hero
    re-medido por amostragem de pixel real após a mudança — mínimo
    5,22:1 nos 6 breakpoints, sem regressão em relação à rodada anterior.
  - `grep` de limpeza (`beleza`, `#beleza`, `Instrument Sans`): as únicas
    ocorrências restantes de "beleza" são uso natural da palavra (bio do
    Instagram, meta description, e o próprio subtítulo novo da seção
    "melu" — "com beleza leve, divertida..." — pedido literalmente pelo
    usuário), não a categoria; zero `#beleza`; zero `Instrument Sans`.
  - Corrigido incidentalmente: `theme-color` do `index.html` ainda
    apontava para o vinho antigo (`#5a1c28`) de antes da rodada de cores;
    atualizado para o `--color-wine` atual (`#5b2136`).
  - Não implementado por decisão deliberada: textura de grain/ruído
    (item 27 do pedido) — a própria instrução marca como opcional
    ("pode adicionar") e condiciona à ausência de custo de performance;
    sem esse item ser obrigatório, a complexidade de gerar e aplicar a
    textura sem custo perceptível não se justificava nesta rodada.
  - Build de produção servido sob `/Analups/` (base path real) após esta
    rodada: 0 erros de console, 0 requisições com falha, 0 overflow,
    Outfit e Bodoni Moda carregando (nenhum Instrument Sans), anchor
    `#melu` resolvendo — confirmado via Playwright.
- Seção Melu expandida de 2 para exatamente 3 cards, cada um com sua
  própria identidade de cor (em vez de uma cor por categoria, como o
  resto do site):
  - Produtos: "Creme Corporal Vanilove" (Melu, acento amarelo/dourado,
    `ver produto`), "Sparkle Wave" (Tuluca by Melu, acento hot pink,
    `ver favorito`) e "Pistachill" (Melu, acento mint/pistache,
    `ver produto`) — "Bruma Glow" (produto de demonstração da rodada
    anterior) removido por não estar entre os três pedidos.
  - Novo campo opcional `Product.accent` (`'pink' | 'coral' | 'yellow' |
    'lilac' | 'mint'`), consumido via `data-accent` em `ProductCard`/
    `FeaturedProduct`. As demais categorias (cabelo/skincare/acessórios/
    treino) continuam coloridas por `data-category`, sem nenhuma mudança
    — o novo mecanismo é aditivo, não substitui o existente. Token de cor
    novo: `--color-mint-soft`/`--color-mint-border` (mint/pistache), só
    usado onde a Melu realmente precisa dele.
  - `ProductGrid` ganhou uma prop `columns` (2, padrão, ou 3) em vez de
    um componente novo — a seção Melu passou a usar
    `<ProductGrid products={melu} columns={3} />` no lugar do
    split-feature de 2 cards; `cabelo` continua no grid de 2 colunas de
    sempre, intocado. Grid verificado por posição real dos cards
    (bounding box, não CSS assumido): 1 coluna em 375px, 2 em 768px,
    3 em 1024px e 1440px.
  - 3 novos placeholders gerados com a mesma técnica das artes
    existentes (gradiente + ruído + borda sutil), cada um na direção de
    cor pedida por produto: `vanilove-1.svg` (amarelo/laranja/creme),
    `tuluca-1.svg` (rosa vibrante) e `pistachill-1.svg` (branco/mint).
    Os antigos `melu-1.svg`/`melu-2.svg` (arte genérica reaproveitada da
    extinta categoria "beleza") foram removidos por não corresponderem
    à direção visual de nenhum dos 3 produtos finais.
  - Duas regras de acento (`coral`, `lilac`) foram implementadas junto
    com as 3 usadas (`pink`, `yellow`, `mint`) mas removidas antes do
    commit por não terem nenhum produto que as consumisse — mesmo
    critério de "sem token/regra morta" já aplicado nas rodadas
    anteriores.
  - Marca dos 2 produtos "Melu" normalizada de `'MELU'` para `'Melu'` no
    dado-fonte (a exibição em caixa alta já vem do CSS
    `text-transform:uppercase`), alinhando com a convenção Title Case
    usada por todas as outras marcas do catálogo (Aurel, Raiz, Alva,
    Orla, Vívida).
  - Build de produção servido sob `/Analups/` (base path real) após esta
    rodada: 0 erros de console, 0 requisições com falha, 0 overflow,
    exatamente 3 cards em `#melu` — confirmado via Playwright.
- Fotos reais de produto substituem a arte-placeholder gerada da seção
  Melu (imagens fornecidas pelo usuário, copiadas byte-a-byte —
  checksum MD5 conferido antes/depois — para `public/images/melu/
  {vanilove,pistachill,tuluca}.png`; nenhum pixel editado, sem recorte
  de fundo, sem filtro):
  - Novo campo opcional `Product.imagePosition`, espelhando o já
    existente `SocialProfile.imagePosition`, passado por `ProductCard`
    até `AspectImage` (que já resolve o path com `publicUrl()` — mesma
    infraestrutura de base path usada em toda a imagem do site, nenhum
    `src="/images/..."` hardcoded introduzido).
  - Associação produto↔foto confirmada por conteúdo, não só pelo nome
    do arquivo: Vanilove → frascos amarelo/laranja, Sparkle Wave/Tuluca
    → flatlay rosa/azul, Pistachill → potes verde/mint — checado via
    `naturalWidth` de cada `<img>` batendo com a foto de origem
    correspondente e por inspeção visual do card renderizado.
  - `object-position` ajustado por card (não o padrão `center` para
    todos) para não cortar conteúdo importante das fotos, que têm
    proporção original mais alta que o `4/5` do card (crop necessário
    fica só no espaço vazio de fundo, nunca nos produtos/labels).
  - As 3 artes-placeholder de SVG geradas na rodada anterior
    (`vanilove-1.svg`, `tuluca-1.svg`, `pistachill-1.svg`) foram
    removidas por ficarem sem nenhum consumidor.
  - Build de produção servido sob `/Analups/` (base path real): 0 erros
    de console, 0 requisições com falha, 0 overflow, as 3 fotos
    carregando com a dimensão original (`naturalWidth`/`complete`
    confirmados via Playwright, não assumidos).
- Sistema tipográfico trocado por completo: `Bodoni Moda` → `Fraunces`
  (editorial/display) e `Outfit` → `Inter` (interface/leitura). Rodada
  exclusiva de tipografia — layout, grid, cores, imagens e conteúdo
  intocados; identidade visual já aprovada nas rodadas anteriores.
  - `fonts.css` reescrito: as duas antigas famílias (3 `@font-face`,
    incluindo um itálico de Bodoni Moda confirmado morto por `grep` —
    nenhum componente aplica `font-style: italic`) foram substituídas
    por 2 declarações novas, ambas variable, `normal`, peso `400 600`,
    `font-display: swap`, self-hosted em `public/fonts/`
    (`fraunces-variable.woff2`, `inter-variable.woff2`) — mesmo processo
    de extração das rodadas anteriores: CSS2 API do Google Fonts com
    User-Agent de Chrome desktop para obter woff2, subset "latin" (cobre
    acentuação do português), baixado direto via `curl`.
  - `tokens.css`: `--font-display` passou de `'Bodoni Moda', serif` para
    `'Fraunces', Georgia, serif` (fallback trocado por instrução
    explícita); `--font-body` de `'Outfit', ...` para `'Inter', ...`.
    Duas escalas foram retunadas porque o alvo em px mudou nesta rodada
    (mesma fórmula de interpolação linear de 2 pontos usada em todo o
    projeto): `--text-2xl` (nome de produto featured) de 42-56px para
    40-54px; `--text-md` (subtítulo de seção/cards sociais) de
    ~16.9-18px para 16-19px. As demais 6 tokens de escala já batiam
    exatamente com o novo alvo — recalculadas e conferidas uma a uma
    antes de decidir não mexer, não assumido.
  - `font-weight` do `.heading` subiu de 400 para 500 em
    `EditorialSection.module.css` e `SocialProfiles.module.css` (títulos
    de seção), por especificação explícita desta rodada; o `<h1>` do
    Hero ("analunps") permanece em 400, sem instrução para mudá-lo.
  - `index.html`: os 2 `<link rel="preload">` passaram a apontar para os
    novos arquivos; nenhum peso adicional precisou de preload por ambas
    as fontes serem variable (cobrem 400-600 num único arquivo).
  - Os 3 arquivos antigos (`bodoni-moda-normal.woff2`,
    `bodoni-moda-italic.woff2`, `outfit-variable.woff2`) foram
    removidos de `public/fonts/`; `grep -rn "Bodoni Moda\|Outfit" src
    public index.html` retorna vazio — nenhuma referência morta restante.
  - Verificado via Playwright (Chromium headless), não assumido:
    `document.fonts` mostra só `Fraunces 400 600 [loaded]` e
    `Inter 400 600 [loaded]`, nenhuma entrada de Bodoni Moda/Outfit; 0
    overflow horizontal nos 6 breakpoints padrão (375/390/430/768/
    1024/1440); 0 erros de console; `--text-2xl` medido por
    `getComputedStyle` em 40.0033px @375 e 54px @1440 (bate exato com o
    alvo); `--text-md` em 16.0015px @375 e 19px @1440 (idem); título de
    seção em Fraunces 500 confirmado em 7 seções, wordmark do Hero em
    Fraunces 400; nenhum uso de Fraunces abaixo de 24px (menor
    ocorrência: nome de produto normal, 28px). Screenshots de página
    inteira em 375/768/1024/1440 (com scroll incremental prévio para
    dar tempo ao `IntersectionObserver` do `.reveal` antes da captura —
    sem isso, cards fora do viewport inicial aparecem em branco na
    screenshot mesmo estando corretos no DOM, artefato de método já
    identificado e descartado, não um bug real) não mostram corte de
    descendentes do Fraunces, quebra de nome de produto ou desalinhamento
    de cards. Repetido sob `/Analups/` (base path real, `http-server`
    emulando GitHub Pages): mesmos resultados, 0 requisições com falha,
    nenhum 404 de fonte. `npm run lint` e `npm run build` limpos.
  - Instrução condicional de manter "o SVG oficial Analunps onde ele já
    estiver sendo usado" é no-op: `Hero.tsx`, `Header.tsx` e
    `Footer.tsx` foram lidos por completo e nenhum usa um SVG como
    assinatura/wordmark — todos os três exibem texto puro; nada a trocar
    aqui.
- Corrigido desequilíbrio de escala entre os cards de cada seção — não
  "cards pequenos", como uma leitura anterior do mesmo sintoma poderia
  sugerir, mas um único `aspect-ratio` (4/5 vertical, 1/1 horizontal)
  aplicado igual em todo lugar, que produz alturas absolutas muito
  diferentes conforme a largura que cada layout dá ao card (2 vs. 3
  colunas de grid, uma coluna 1.6fr de split-feature, ...), já que altura
  escala direto com largura. Nenhum grid, contagem de coluna, cor,
  tipografia, imagem ou conteúdo foi alterado — só a proporção da imagem
  por categoria/tamanho, mais 2 ajustes pontuais de padding/largura.
  - Medido o estado real ANTES de mexer em qualquer coisa (`git stash` +
    Playwright, 1440px): melu 693px, cabelo 894px, skincare-featured
    733px, acessórios (as duas colunas, forçadas à mesma altura por
    `align-items: stretch` no `.splitFeature`) 1066px — mais alto que o
    viewport de teste (900px) sozinho, confirmando o "pôster gigante"
    relatado — e treino 188px, a menor de todas por larga margem.
  - `ProductCard.tsx` ganhou uma função `imageRatio(category,
    orientation, size)` — antes o ratio era só `orientation === 
    'horizontal' ? '1/1' : '4/5'`, agora cabelo usa `7/8`, acessórios
    `9/8` (tamanho "large") ou `8/9` (default), mantendo `4/5` para melu
    (única seção "praticamente correta", zero mudança) e para o resto.
    `FeaturedProduct.tsx` (uso único, skincare) foi de `4/5` para
    `16/15`. Nenhum destes é uma fração "bonita" escolhida a esmo — cada
    uma foi resolvida analiticamente a partir da ALTURA TOTAL do card
    (imagem + gap + bloco de texto, não só a imagem) para cair na faixa
    pedida, e então confirmada por medição, não assumida.
  - Resultado medido em 1440px (% da altura real anterior): melu 100%
    (inalterado, como pedido), cabelo 93.3% (6.7% de redução — a
    instrução da seção pedia "5-8%"; a tabela-resumo global pedia
    "95-100%": as duas só se sobrepõem perto de 5%, e a instrução mais
    específica foi a que prevaleceu), skincare-featured 75.0% (exato no
    piso da faixa 75-80% pedida — 733px→550px, bem abaixo de "quase tela
    inteira"), acessórios (as duas colunas, ainda iguais entre si via
    stretch) 76.8% (dentro de 75-80%), treino 112.8% (dentro de 110-115%,
    a única seção que devia crescer).
  - Repetido nos 7 breakpoints pedidos (1440/1280/1024/768/430/390/375):
    melu seguiu 100% em todos; cabelo 93.3-94.8%; skincare-featured
    75.0-75.0% no desktop mas 82-84% no mobile (a proporção fixa reduz a
    imagem igual em toda parte, mas no mobile o bloco de texto — que não
    muda de tamanho — vira uma fatia maior do total; o problema relatado
    era especificamente de desktop, onde a imagem ocupa muito mais
    espaço absoluto, então a correção mais branda no mobile é esperada e
    aceitável); acessórios-grande 76.8-81.1%; acessórios-pequeno
    76.8-93.3% (77% no desktop, igualado ao grande pelo stretch; ~93% no
    mobile, onde o `.splitFeature` empilha em coluna e cada card volta a
    ser dimensionado pelo próprio conteúdo — a redução "leve" pedida
    especificamente para este card); treino 108.8-120.5%. O pico de
    120.5% em 390px não é a correção "estourando": a MEDIÇÃO DA
    BASELINE em 390px (239px) já era, sozinha, mais baixa que a de 375px
    (264px) e 430px (239px) — quebra de linha do texto pré-existente,
    não relacionada a esta mudança — então o percentual ali compara
    contra um ponto de referência anormalmente baixo; o valor absoluto
    corrigido (288px) é idêntico ao de 375px e consistente com 430px
    (263px). Confirmado lendo a baseline diretamente, não assumido.
  - Ao tentar ampliar treino só alargando a imagem, uma instabilidade
    real de CSS foi encontrada e não contornada às cegas: com
    `align-items: stretch`, a altura da linha é o maior entre o
    "preferido" da imagem (largura × ratio) e o do texto; em 1440px,
    194px de `max-width` mede 212px de card (texto ainda manda), mas
    196px mede 255px (a imagem passa a mandar) — um salto de 43px por 2px
    de diferença de input, não uma curva suave. A correção final fica
    deliberadamente 2px abaixo desse ponto de virada (`max-width: 193px`
    para a imagem) e usa o padding do bloco de texto — que cresce de
    forma linear e previsível, confirmado testando vários valores — para
    fechar a diferença até a faixa pedida. Comentário deixado no CSS
    citando os números medidos, para que um "arredondamento" futuro para
    195/200px não reintroduza o salto sem re-medir.
  - `Home.module.css`: `.spotlightSecondary` (card secundário da seção
    skincare) teve o `max-width` aumentado de 640px para 760px — não
    pedido para mudar a imagem (que continua presa no cap de 180px, sem
    efeito visível vindo desse aumento), mas para dar ao card mais
    presença ao lado do featured agora mais curto, formando uma
    composição, não featured-gigante-mais-nota-de-rodapé.
  - `npm run lint` e `npm run build` limpos. 0 overflow horizontal em
    todos os 7 breakpoints, antes e depois. Repetido sob `/Analups/`
    (base path real, `http-server` emulando GitHub Pages): 0 erros de
    console, 0 requisições com falha. Screenshots de página inteira em
    1440/1024/768/375 (com scroll incremental prévio, mesmo cuidado do
    round anterior) confirmam visualmente o ritmo pedido: skincare e
    acessórios não dominam mais a tela, treino não parece miniatura,
    melu e cabelo continuam como referência.
- Footer reduzido a só `@analunps`: removidos `© {ano} Analunps` e a nav
  de categorias (melu/cabelo/skincare/acessórios/treino) de
  `Footer.tsx`, junto com os imports (`categories`, `site.fullName`,
  `year`) que ficaram sem uso — e as regras `.copyright`/`.nav`/`.nav a`
  de `Footer.module.css`, que ficariam mortas sem esses elementos.
  - `.bar` mantém `display:flex; justify-content:space-between` como
    estava — não foi tocado. Com um só filho, `space-between` sozinho
    jogaria o handle para a ESQUERDA (o comportamento do flexbox com 1
    item), então `margin-left:auto` foi adicionado a `.handle`
    especificamente para continuar empurrando-o para a direita, exatamente
    onde estava.
  - Nada mais em `.bar`/`.footer` mudou: `min-height` (56px mobile/64px
    desktop), `padding-block`, `background:#111111` e a tipografia do
    `.handle` (tamanho, peso, tracking, cor, hover) ficaram intocados —
    confirmado por medição, não assumido: altura do footer 56px em
    375px e 64px em 768px/1440px, idêntica a antes da mudança; fundo
    `rgb(17, 17, 17)`; texto do footer é exatamente `"@analunps"`.
  - `npm run lint` e `npm run build` limpos (a remoção dos imports não
    usados era obrigatória — `noUnusedLocals` está ligado no
    `tsconfig`). 0 overflow em 375/768/1440, 0 erros de console.
    Repetido sob `/Analups/` via `http-server`: mesmo resultado, 0
    requisições com falha. Nenhuma outra parte da página foi tocada.
- As 6 fotos reais da nailsbyanacc substituíram os placeholders: copiadas
  byte-a-byte (checksum MD5 conferido antes/depois) para
  `public/images/nailsbyanacc/nail-01.jpg` a `nail-06.jpg` — nenhum pixel
  editado, sem recorte de arquivo, sem filtro.
  - Nomes editoriais associados por conteúdo real de cada foto, não pela
    ordem do arquivo: nail-01 (chrome magenta/roxo com charms de
    estrela/lua) → "Chrome Estelar"; nail-02 (francesinha branca + flores
    e borboletas 3D douradas) → "Dourado Floral"; nail-03 (nude/dourado
    com folha de ouro e pérolas) → "Luz Dourada"; nail-04 (chrome
    roxo/lilás com cristais prateados sobre fundo preto) → "Cosmic
    Purple"; nail-05 (vermelho/branco/azul-turquesa com estrelas
    douradas, a mais colorida das 6) → "Pop Colors"; nail-06 (chrome
    branco/prateado com reflexo iridescente roxo) → "Chrome Aura" — por
    coincidência (ou não: os nomes sugeridos originalmente pelo usuário
    já estavam nessa ordem), bate exatamente com a ordem dos arquivos
    enviados, mas a associação foi feita olhando cada foto, não assumida
    pela ordem.
  - `object-position` padrão (centro) mantido em todas as 6 — verificado
    visualmente card por card (screenshot de cada um via clique nos
    dots) que nenhum charm/detalhe importante fica cortado; nenhuma
    precisou de ajuste individual.
  - Placeholders SVG (`public/images/placeholders/nails-01..06.svg`)
    removidos.
  - Repetida a verificação completa dos 7 breakpoints com as fotos reais
    carregadas: mesmos números de antes (0 overflow, mesma fração de
    cards visíveis por breakpoint — a troca de imagem não muda a
    geometria, que já era controlada por aspect-ratio + object-fit,
    não pela imagem em si). Interações (setas, dots, teclado, drag,
    loop, pausa no hover) re-testadas com as fotos reais: idênticas ao
    round anterior. Repetido sob `/Analups/` via `http-server`: 0 erros
    de console, 0 requisições com falha, `publicUrl()` resolvendo
    `/Analups/images/nailsbyanacc/nail-01.jpg` corretamente.
  - Validação específica em Safari/iPad pedida pelo usuário NÃO foi
    possível neste ambiente: só há motor Chromium disponível no
    sandbox (sem WebKit instalado, e instalação de novos browsers do
    Playwright está fora do permitido aqui) — dizendo isso
    explicitamente em vez de presumir. Como proxy mais próximo:
    comportamento de toque testado via contexto Playwright com
    `hasTouch:true`/`isMobile:true` (swipe real avançou o carrossel,
    0 erros), e o carrossel usa Embla, biblioteca com suporte
    documentado e testado para Safari/iOS — mas isso não substitui um
    teste real em dispositivo/Safari, que continua pendente.
  - `npm run lint` e `npm run build` limpos.
- Reformulada a composição da seção nailsbyanacc para ficar fiel à
  referência visual aprovada: o problema real não era nenhum detalhe
  isolado, era estrutural — o carrossel vivia dentro do `.container`
  padrão (max-width 1240px) e por isso lia como "3 cards dentro de uma
  caixa", nunca conseguindo mostrar mais que uma lasca de pixels dos
  cards vizinhos. Título/subtítulo, cards, setas, dots e CTA — só esta
  seção; nenhuma outra parte do site foi tocada.
  - **Full-bleed real**: o carrossel saiu de dentro do `<div
    className="container">` e passou a ser filho direto da `<section>`
    (que já é 100% da viewport) — confirmado por medição, não visual:
    `viewport.getBoundingClientRect().width` bate exatamente com
    `window.innerWidth` em todos os 7 breakpoints (antes ficava
    plafonado em 1144px, o teto do `--content-max`). O cabeçalho
    continua dentro de `.container`, só que agora centralizado
    (`text-align:center; margin-inline:auto`) e mais estreito (720px).
  - **Título**: `clamp(72px, 9vw, 132px)`, peso 400, line-height 0.92,
    letter-spacing -0.01em — exatamente a fórmula pedida. Mesmo
    problema de ajuste do round anterior reapareceu numa escala maior:
    "nailsbyanacc." é uma palavra só (não quebra em espaço) e não cabe
    numa linha em 375-430px no piso pedido de 72px (largura natural
    medida: 379px contra ~335px disponíveis). Piso abaixado para 50px
    (medido: 316px de texto contra 335px disponíveis, com margem) —
    9vw e o teto de 132px ficaram como pedido.
  - **Cards**: proporção da imagem mudou de 4/5 para 6/7 — não porque
    6/7 fosse o alvo (a imagem em si não tinha alvo declarado), mas
    porque a proporção TOTAL do card (imagem + legenda) pedida era
    0.70-0.76, e a legenda abaixo da imagem empurra esse número pra
    baixo; 6/7 na imagem fecha o card em 0.73 (1440px) e 0.70 (768px) —
    medido depois de cada tentativa, não assumido. Largura do card:
    `clamp(320px, 27vw, 380px)` no desktop, dentro do
    `clamp(300px,25vw,360px)` sugerido com folga pequena.
  - **Peek dos cards laterais — a parte mais difícil desta rodada**:
    o pedido de "20-35% visível" no desktop bateu direto num limite
    matemático do `align:'center'` do Embla, que sempre centraliza
    exatamente 1 slide — por construção, isso só produz contagens
    ÍMPARES de cards cheios ao redor do centro (1, 3, 5...) via peek
    simétrico. "2 cards completos" (pedido pro tablet) não é um estado
    alcançável dessa forma sem trocar a estratégia de alinhamento por
    breakpoint, o que arriscaria o "sem salto perceptível" exigido no
    resize. Resolvido assim: desktop (≥1200px) usa a fórmula correta
    (`viewport = 3W + 2×gap + 2×peek×W`) para as 3 completas + parcial —
    medido 20-27% nos 3 breakpoints desktop, dentro do alvo; tablet
    (768-1024px) fica com 1 completo + ~70-72% de cada vizinho (a
    aproximação mais honesta alcançável — visivelmente menor e
    diferente do desktop, sem forçar 3 cards minúsculos só pra bater um
    número); mobile (375-430px) resolvido pela mesma fórmula do
    desktop, 20-21% medido, dentro do pedido de 15-25%. Documentado no
    CSS para a próxima pessoa não tentar "consertar" o tablet pra virar
    3 cards sem entender por que isso quebra a intenção.
  - **Detalhes do card**: badge "NAILS" (canto superior esquerdo) e
    ícone de bookmark outline (canto superior direito) sobre a imagem;
    sparkle sólido (não outline — em 14px um traço de 1.5px vira borrão,
    não forma) na legenda, mesmo ícone reaproveitado no CTA. Dois ícones
    novos (`BookmarkIcon`, `SparkleIcon`) em `EditorialIcons.tsx`, SVG
    local, mesma convenção dos existentes — nenhuma biblioteca
    instalada.
  - **Card ativo**: `scale(0.985)` → `scale(1)`, sem opacity (a rodada
    anterior também dimmava opacidade; removido porque o pedido desta
    vez foi explícito — "nada além disso").
  - **CTA "ver mais inspirações"**: não é `<button>`/`<a>` — é texto
    simples estilizado como pill, sem `href`, `onClick`, hover ou estado
    de foco. Não existe uma página real de "mais inspirações" neste
    site de página única, e a convenção já estabelecida neste projeto
    (ver entrada da primeira rodada da nailsbyanacc) é nunca simular um
    link pra um destino que não existe — a própria instrução desta
    rodada previa esse caso ("renderizar visualmente... ou deixar
    preparado sem quebrar UX"). Sem `aria-hidden`: o texto é lido
    normalmente por leitor de tela, já que é uma legenda visível, não
    teria sentido escondê-la de quem usa leitor de tela enquanto quem
    enxerga a vê.
  - **Espaçamento**: padding-top da seção subiu para `--space-9`
    (104px); título→subtítulo `--space-6` (32px); subtítulo→carrossel
    60px (nenhum token bate exato no meio de 50-70px, valor literal
    documentado); carrossel→dots `--space-6` (32px); dots→CTA
    `--space-5` (24px); CTA→fim da seção via `padding-bottom:
    --space-8` (72px, dentro de 60-90px).
  - Interações (setas, dots, teclado, drag do mouse, loop, pausa em
    hover/foco, swipe touch, `prefers-reduced-motion`) re-testadas do
    zero após a reestruturação: idênticas ao round anterior — inclusive
    a mesma verificação matemática do loop (8 cliques "anterior"
    fecham no índice esperado por `mod 6`). As 6 fotos reais
    reconferidas card por card com o novo crop 6/7: nenhum charm
    importante cortado.
  - 0 overflow horizontal nos 7 breakpoints, 0 erros de console, 0
    requisições com falha — testado no dev server e repetido sob
    `/Analups/` via `http-server`. `npm run lint` e `npm run build`
    limpos. Validação real em Safari/iPad continua não realizada por
    falta de motor WebKit neste ambiente (mesma limitação já registrada
    na rodada anterior).
- Categoria `skincare` (2 placeholders sem foto real) substituída por
  `cachos`, com as 4 fotos reais de cabelo cacheado da Analunps:
  - **Dados**: `CategorySlug` migrado de `'skincare'` para `'cachos'` em
    `types.ts`; `categories.ts` com o novo título/subtítulo
    (`cachos.` / `meus favoritos pra cuidar, finalizar e viver cada
    fase do meu cabelo.`); as 2 entradas de `products.ts` do skincare
    removidas. Como em `NailLook` (rodada da nailsbyanacc), criada uma
    interface própria `CachosLook` em vez de reusar `Product` — são
    fotos pessoais sem `brand`/`url`/CTA, não itens de vitrine.
  - **Fotos**: as 4 imagens fornecidas copiadas byte a byte para
    `public/images/cachos/cachos-0{1..4}.png` (checksum MD5 conferido
    antes/depois — nenhum recorte, filtro ou reencode). Defeito real
    encontrado e corrigido antes do commit: as 4 primeiras cópias
    foram salvas com extensão `.jpg`, mas `file` confirmou que os bytes
    são PNG — corrigido renomeando para `.png` e reconferindo os
    checksums (extensão errada arrisca Content-Type incorreto no
    GitHub Pages, que infere o MIME type pela extensão). Título de
    cada card decidido olhando o conteúdo real da foto, não a ordem de
    upload — 1 desvio deliberado do microcopy sugerido ("ondas em
    rosa" → "ondas em vermelho": a iluminação da foto é vermelha/
    magenta, não rosa).
  - **Composição (`CachosGrid`, novo componente)**: grid 2×2 — destaque
    + 1 secundário na linha de cima, 2 secundários na linha de baixo —
    em vez de "1 destaque ao lado de uma coluna com os outros 3", que
    foi a primeira tentativa e escondia dois defeitos reais, ambos
    medidos via Playwright (`getBoundingClientRect`/computed styles),
    não estimados:
    1. Com `grid-row: 1 / span 3` forçando o destaque a ocupar a mesma
       altura da coluna de 3 empilhados, a imagem do destaque foi
       espremida para uma proporção ~0,27 (larga faixa vertical, sem
       parecido com um retrato) a 1440px — corrigido trocando para
       `display:flex; align-items:flex-start`, cada coluna com altura
       própria.
    2. Com as colunas independentes, sobrou um vazio de ~1493px sob o
       destaque (915px) ao lado da coluna de 3 empilhados (2409px) — 3
       cards de proporção 4/5 empilhados são, por natureza, ~3x mais
       altos que 1 só; nenhum ajuste de largura ou proporção do
       destaque fecha essa conta sem esticá-lo a um formato inutilizável
       ou sem forçar cortes ruins de rosto/cabelo nos outros 3 (retrato
       4/5 é o crop que já validei visualmente como correto pra essas
       4 fotos). Resolvido reestruturando para 2×2: cada linha tem no
       máximo 2 cards, então o maior desnível possível é "1 card mais
       largo (logo mais alto) ao lado de 1 mais estreito" — medido em
       210px de diferença a 1440px (destaque 956px vs. par 746px, ~22%
       da altura do destaque), não mais os ~1493px da tentativa
       anterior. Nenhum card fica vazio, e o espaço sobrando sob o
       card menor lê como respiro editorial, não como algo quebrado
       (confirmado via screenshot de página inteira, não só números).
    - Defeito adicional só descoberto ao depurar o item 2: `.card` no
      CSS antigo tinha `height: 100%`, que resolve para um valor de
      pixel definido dentro de uma grid mesmo com `align-items: start`
      no container — isto é, o card mais curto de uma linha era
      esticado pra bater com o mais alto (mesmo mecanismo do bug 1, em
      escala menor), espremendo a proporção 4/5 da imagem sem que
      nenhum erro aparecesse (a métrica só ficou visível comparando a
      altura da imagem-filha com a largura, não a altura do card).
      Corrigido removendo o `height: 100%` do `.card` e movendo
      `align-items: start` para o breakpoint de 768px (antes só
      existia a partir de 1024px) — sem isso, o mesmo esmagamento
      silencioso ocorreria em tablet.
  - **Limpeza de código morto** disparada pela troca: `FeaturedProduct`
    (componente + CSS) removido — órfão assim que `Home.tsx` deixou de
    usá-lo; regras `[data-category='skincare']` e comentário
    desatualizado em `ProductCard.module.css`; tokens
    `--color-lilac-soft`/`--color-lilac-border` (únicos consumidores
    eram essas regras); `'lilac'` removido da union de `Product.accent`
    (nenhum produto usava); `.spotlightSecondary` de `Home.module.css`;
    os 2 placeholders `skincare-*.svg`.
  - `metaDescription` (`site.ts`) e `<meta name="description">`
    (`index.html`) atualizados de "skincare" para "cachos".
  - `grep -rn "skincare"` final: 0 ocorrências em código; as únicas
    ocorrências restantes no projeto são entradas de log de rodadas
    anteriores neste próprio arquivo (histórico do que era verdade
    naquele momento — não reescrito, é registro, não estado atual).
  - `npm run lint` e `npm run build` limpos. 0 overflow horizontal, 4
    cards presentes, 0 imagem quebrada/incompleta, 0 erro de console,
    0 requisição com falha nos 7 breakpoints (375/390/430/768/1024/
    1280/1440) — testado no dev server e repetido sob `/Analups/` via
    `http-server` (emulação do path real do GitHub Pages).
  - **Risco residual não resolvido nesta sessão**: as 4 fotos somam
    ~12,4MB (fotos reais não reencodadas, por decisão consistente com
    as rodadas anteriores de manter os bytes originais) — o `dist/`
    da build ficou com ~23MB no total. Nenhuma compressão foi aplicada
    por não ter sido pedida; sinalizando aqui para decisão consciente
    do usuário caso o tempo de carregamento em conexões lentas vire
    prioridade.
- Rodada de proporção/composição da seção `cachos`, sem tocar fotos,
  textos ou tipografia (só `CachosGrid.tsx`/`CachosGrid.module.css`
  mudaram): pedido era reduzir ~20% da altura visual dos cards, deixar
  o primeiro card "levemente destacado sem dominar" e ler como
  composição editorial compacta, sem virar carrossel nem grade rígida.
  - **Proporção da imagem**: `4/5` (retrato) → `1/1` (quadrado) nos 4
    cards. Um crop quadrado tira ~20% da altura da imagem por si só
    (`altura = largura/proporção`; passar de 1,25× a largura para 1×
    a largura é exatamente 20% a menos) e continua enquadrando bem
    close-ups de rosto — confirmado por screenshot nos 3 breakpoints
    testados (nenhum corte ruim de rosto/cabelo nas 4 fotos). Nenhum
    `object-position` teve que ser ajustado.
  - **Captions**: padding reduzido (`--space-4/--space-4/--space-5` →
    `--space-3/--space-4/--space-4`; no destaque, `--space-5/--space-6/
    --space-6` → `--space-4/--space-5/--space-5`) — mesmo tamanho de
    fonte, título e descrição, só menos respiro ao redor.
  - **Medido, não estimado**: altura das duas linhas somadas (topRow +
    bottomRow + gap) caiu de 1817px para 1474px a 1440px — redução de
    18,9%, dentro do "aproximadamente 20%" pedido. Por card individual
    a redução variou 12-22% (o card secundário do topo ficou um pouco
    mais largo com a nova divisão de colunas, o que compensa parte do
    ganho do crop quadrado nele especificamente) — mas o resultado
    visual agregado da seção é o que foi pedido, e foi conferido por
    screenshot, não só por número.
  - **"Levemente destacado sem dominar"**: a divisão de colunas do
    destaque caiu de `1.3fr / 1fr` (uma diferença de 30% de largura,
    só a partir de 1024px) para `1.12fr / 1fr` (12%, já a partir de
    768px) — sem tocar `--text-xl`/`--text-md` do caption do destaque,
    que continuam os únicos responsáveis por ele "pesar" mais que os
    outros 3.
  - **"Não parecer grade rígida"**: a segunda linha, que antes era
    perfeitamente `1fr / 1fr`, agora é `1fr / 1.08fr` — uma assimetria
    sutil e espelhada (menor que a do topo, e na direção oposta), só
    para a seção não ler como uma grade 2×2 idêntica em todas as
    células.
  - `npm run lint` e `npm run build` limpos antes e depois do merge de
    uma PR concorrente (`Torna o HERO um banner cinematográfico
    full-bleed`, mesclada nesta branch enquanto esta rodada estava em
    andamento) — `git pull --ff-only` sem conflito (arquivos
    completamente diferentes: Hero/CategoryNav vs. CachosGrid), e os 7
    breakpoints reconferidos depois do merge deram os mesmos números
    de antes, confirmando que a mudança do Hero não teve nenhum efeito
    colateral aqui. 0 overflow, 4 cards, 0 imagem quebrada, 0 erro de
    console, 0 requisição com falha nos 7 breakpoints.
- Removida a faixa branca acima do hero. Causa raiz: `Header.tsx`
  renderizava um `<header>` com `background: #ffffff` e um `.bar` com
  `min-height: 64px` — literalmente uma barra branca vazia, sem
  logo/nav/conteúdo nenhum, herdada de uma rodada anterior
  ("Esvazia o header: faixa branca sem conteúdo") que deliberadamente
  a deixou assim. Ela ficava em fluxo normal, antes do `<main>`, então
  empurrava o hero pra baixo em toda a página. Investigação descartou
  qualquer outra causa antes de decidir a correção: `global.css` zera
  margin de todo elemento (`* { margin: 0 }`, sem colapso possível),
  `body`/`html` não têm padding-top, não existe regra para `#root` em
  lugar nenhum do projeto, e o skip-link é `position:absolute`
  (não ocupa espaço em fluxo).
  - Como o header não tinha nenhum conteúdo real (nem mesmo um wordmark
    — só uma div vazia), mascará-lo (deixar `background:transparent`
    e `min-height:0`, por exemplo) seria manter um elemento sem
    propósito só pra escondê-lo — exatamente o tipo de gambiarra que
    a correção deveria evitar. Removidos `Header.tsx` e
    `Header.module.css`, e em `App.tsx` o `<div id="top"><Header /></div>`
    (o `id="top"` não era usado por nenhum link/âncora — grep
    confirmou) deu lugar direto ao `<main id="main">`, que agora é o
    primeiro elemento da página depois do skip-link (que fica fora do
    fluxo).
  - Nada do Hero em si mudou (`Hero.tsx`/`Hero.module.css` intactos) —
    ele já era full-bleed (`position:absolute; inset:0` na imagem,
    `.hero` como único ancestral em fluxo); o espaço branco nunca veio
    de dentro dele.
  - Medido via Playwright nos 7 breakpoints (375-1440): topo do hero e
    da imagem em `y=0` em todos, sem exceção; largura da imagem igual
    à do viewport; 0 overflow horizontal; 0 erro de console; 0
    requisição com falha. Repetido sob `/Analups/` (base path real via
    `http-server`): mesmos números. `npm run lint` e `npm run build`
    limpos.
