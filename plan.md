# Plano — Buzzvel Front-End Challenge (Nov 2026)

## 1. Resumo do desafio

Construir **uma página completa e responsiva** (desktop + mobile, funcionando também em tablet) a partir do Figma "Buzzvel FE Test 2026", usando **Next.js App Router + TypeScript + Tailwind CSS**.

- **Prazo de entrega:** sexta, 20/11/2026 (o convite define hora/fuso exatos — confirmar).
- **Entrega:** repositório **público** no GitHub + README **em inglês**, enviado pelo formulário da Buzzvel.
- **Opcionais que somam pontos:** live preview (Vercel), screenshot do Lighthouse, Storybook ou testes automatizados.

### Critérios de avaliação (o que eles olham)
| Critério | Como vamos atender |
|---|---|
| Fidelidade ao design | Tokens extraídos do Figma via MCP (cores, tipografia, espaçamentos), comparação visual seção a seção |
| Responsividade | Mobile-first, breakpoints alinhados com os frames do Figma, checagem em 375 / 768 / 1024 / 1440 |
| Qualidade de código | Componentes pequenos, reutilizáveis, com props tipadas; dados mockados separados da UI |
| Interações funcionando | Implementar todas as interações que aparecem no design (menu mobile, carrossel, accordion, etc. — confirmar no Figma) |
| Acessibilidade | HTML semântico, navegação por teclado, foco visível, `alt` em imagens, ARIA só quando necessário, contraste |
| Performance | `next/image`, `next/font`, Server Components por padrão, JS mínimo no client, Lighthouse ≥ 90 |
| Decisões claras | Registrar decisões e ambiguidades no README conforme surgirem |

> **Regra:** todas as seções do design desktop **e** mobile são obrigatórias. Onde algo for ambíguo, escolhemos algo razoável e documentamos no README.

---

## 2. Stack e convenções

- **Next.js 16.4.6** (App Router) — atenção: versão com breaking changes; consultar `node_modules/next/dist/docs/` antes de usar APIs (fonts, images, metadata, `cacheComponents` já está ativo no `next.config.ts`).
- **React 19.3**, **TypeScript** strict.
- **Tailwind CSS 4** (config via `@theme` no `globals.css`, sem `tailwind.config.js`).
- **Fontes:** `next/font` (Google ou local, conforme o Figma) com `display: swap` e subset `latin`.
- **Imagens:** exportadas do Figma (SVG para ícones/logos, WebP/AVIF para fotos) em `public/`, renderizadas com `next/image`.
- **Animações:** **Motion** (`motion/react`, ex-Framer Motion) via `LazyMotion` + `m` (features carregadas sob demanda) e `MotionConfig reducedMotion="user"`. Exceções em CSS puro: entrada do Hero (sem JS → não atrasa o LCP) e flutuações em loop (custo zero de JS).
- **Scroll suave:** **Lenis** (`lenis/react`, `ReactLenis root`). Âncoras tratadas por um handler próprio (`SmoothScroll.tsx`): rola com offset do header, atualiza a URL e move o foco para a seção (o `anchors` nativo do Lenis não faz `preventDefault` nem move o foco). Respeita `prefers-reduced-motion`.
- **Testes:** Vitest + React Testing Library (unitários/componentes) e, se der tempo, Playwright para um smoke test e2e + checagem de acessibilidade com axe.
- **Commits:** feitos manualmente pelo autor (o agente não commita).

### Estrutura de pastas proposta
```
app/
  layout.tsx          # fontes, metadata, <html lang>
  page.tsx            # compõe as seções
  globals.css         # @theme com tokens do Figma
  icon / opengraph-image (metadata files)
components/
  ui/                 # primitivos reutilizáveis: Button, Container, SectionHeading, Icon...
  sections/           # Header, Hero, ..., Footer (uma pasta/arquivo por bloco)
data/                 # conteúdo mockado tipado (textos, cards, links)
lib/                  # utils (cn, hooks como useReducedMotion)
types/                # tipos compartilhados
public/images/        # assets exportados do Figma
tests/ ou __tests__/  # testes
```

### Princípios de componentes
- **Server Components por padrão**; `"use client"` só nos componentes com interação (menu mobile, carrossel, tabs...).
- Conteúdo vem de `data/*.ts` tipado → seções recebem props, não strings hardcoded.
- Primitivos (`Button`, `Container`, `SectionHeading`) com variantes tipadas, reaproveitados por todas as seções.
- Um nível de heading coerente na página (`h1` único no Hero, `h2` por seção).

---

## 3. Etapas

### Etapa 0 — Setup e fundação
- [x] Receber a cópia do Figma e conectar via MCP do Figma.
- [x] Mapear **todas as seções** (desktop e mobile) e listar as interações de cada uma → atualizar a seção 4 deste plano.
- [x] Extrair tokens: cores, fontes (famílias, pesos, tamanhos, line-heights), espaçamentos, raios, sombras, largura do container, breakpoints.
- [x] Limpar o boilerplate do create-next-app (página, SVGs, tema dark padrão).
- [x] Configurar `globals.css` com `@theme` (tokens) e fontes via `next/font` no `layout.tsx`.
- [x] Metadata base: `title`, `description`, `openGraph`, `viewport`, favicon, `lang`.
- [x] Criar primitivos de UI (`Container`, `Button`, `SectionHeading`...).
- [x] Exportar assets do Figma para `public/images`.
- [x] Scripts `lint`, `typecheck`, `test` e `test:watch` (Prettier dispensado).

### Etapa 1 — Construção das seções (uma por vez)
Para **cada** seção, o mesmo ciclo:
1. Ler o frame desktop + mobile no Figma (MCP: design context + screenshot).
2. Modelar os dados em `data/` e os tipos das props.
3. Implementar mobile-first, depois tablet/desktop.
4. Implementar a interação da seção (se houver) com suporte a teclado.
5. Comparar visualmente com o Figma (screenshot lado a lado) em 375 e 1440.
6. Checar a11y básica (semântica, foco, alt, contraste).
7. Revisão sua → ajustes → você commita.

Ordem (ver mapa na seção 4):
- [x] 1.1 Header / Navbar (+ menu mobile)
- [x] 1.2 Hero
- [x] 1.3 Categories
- [x] 1.4 FeaturedCourse
- [x] 1.5 HowItWorks
- [x] 1.6 Testimonial + stats
- [x] 1.7 People (colagem de fotos)
- [x] 1.8 Contact (formulário com validação)
- [x] 1.9 FinalCTA
- [x] 1.10 Footer

### Etapa 2 — Polimento e responsividade
- [ ] Varredura em 320 / 375 / 768 / 1024 / 1280 / 1440 / 1920.
- [ ] Navegação completa só pelo teclado (Tab, Shift+Tab, Enter, Esc em menus/modais).
- [x] Skip link "Skip to content".
- [ ] Estados de hover/focus/active consistentes com o design.

### Etapa 3 — Animações (sua parte criativa)
- [x] Primeira rodada (ideias do Claude) — o autor vai polir/ajustar:
  - Hero: entrada escalonada em CSS (H1 só com transform, para não atrasar o LCP) + cards "120+" e "4.9" flutuando.
  - Header: fundo translúcido com blur + sombra ao rolar; scrollspy com sublinhado que desliza entre os links (`layoutId`).
  - Menu mobile: painel desliza, links em cascata, ícone ☰/✕ gira.
  - Reveal ao rolar (`Reveal`, `RevealGroup`, `RevealItem` em `components/motion/`) em todas as seções, com stagger.
  - Categories: cards sobem com sombra no hover.
  - How It Works: linha conectora "se desenha" (scaleX) e passos em sequência.
  - Testimonial: contadores 24K+ / 120+ / 92% contam a partir de 0 (`CountUp`, leitor de tela sempre recebe o valor final).
  - People: fotos aparecem em cascata, colunas com parallax em velocidades diferentes, zoom leve no hover.
  - Contact: cards e formulário entram em sequência.
  - Final CTA: conteúdo em cascata; formas flutuam (CSS) e seguem o mouse com profundidades diferentes (parallax).
  - Botões: leve "afundar" ao clicar.
- [x] Toda animação respeita `prefers-reduced-motion` (`MotionConfig reducedMotion="user"`, `motion-safe:` no CSS, parallax/contador desligados via `useReducedMotion`, e uma regra CSS global de segurança).
- [x] Só `transform`/`opacity` (e `scale`/`translate`) são animados — sem layout shift.
- [ ] Polimento do autor (ajustar intensidade, remover/adicionar efeitos).

### Etapa 4 — Testes
Básicos mas significativos:
- [x] **Vitest + RTL** (32 testes em `__tests__/`: validação, Button, ContactForm, MobileMenu, LocaleSwitcher, Categories → Featured Course, paridade EN/PT): primitivos (`Button` variantes/aria), componentes interativos (menu mobile abre/fecha, `aria-expanded`, Esc fecha; carrossel/tabs/accordion trocam estado), seções renderizam dados mockados.
- [ ] **Playwright (se der tempo)**: smoke test da página em viewport mobile e desktop + `@axe-core/playwright` sem violações críticas.
- [x] Script `npm test` documentado no README.

### Etapa 5 — Performance e qualidade
- [x] `npm run build` sem erros nem avisos; `npm run lint` e `tsc --noEmit` limpos. (O aviso de `metadataBase` vinha do `app/opengraph-image.tsx` na raiz; virou a rota `app/og.png/route.tsx`, referenciada no `generateMetadata` do layout.)
- [x] Imagens: `sizes` em todas, `loading="eager"` + `fetchPriority="high"` só no Hero, AVIF/WebP via `next/image`.
- [x] Fontes: Inter e Plus Jakarta Sans são fontes variáveis (um arquivo por família, subset latin), módulo compartilhado em `lib/fonts.ts`.
- [ ] Lighthouse (mobile e desktop) — meta ≥ 90 em todas as categorias; salvar screenshot.
- [x] Verificar que componentes client são mínimos (seções estáticas são Server Components; client só onde há estado/animação).

### Etapa 6 — Entrega
- [x] Deploy na Vercel (live preview): https://luma-buzzvel-fechallenge26.vercel.app/
- [ ] README em inglês com:
  - Instalar, rodar, buildar, testar.
  - Decisões técnicas e interpretações de ambiguidades do design.
  - Gaps conhecidos / checks falhando (ser honesto).
  - Tempo aproximado gasto.
  - Uso de IA (Claude Code + MCP do Figma): como foi usado e como os resultados foram verificados.
  - Link do preview + screenshot do Lighthouse.
- [ ] Repositório público no GitHub.
- [ ] Testar a página final em celular real + desktop.
- [ ] Enviar o link pelo formulário até 20/11.

---

## 4. Mapa de seções (preencher com o Figma)

Figma: arquivo `uD31QWrjqQzwTKqILFo53r`, página `TEST`. Frames: **FE - Desktop** (`2:7`, 1280px) e **FE - Mobile** (`2:4195`, 402px). Não há frame de tablet.
Marca fictícia: **luma.** (plataforma de cursos online).

| # | Seção | Desktop | Mobile | Conteúdo / Interações | Client? | Status |
|---|---|---|---|---|---|---|
| 1 | Header | `15:116` | `2:4199` | Logo, nav (Courses, For Teams, Community, About), Log in, Start learning. Mobile: menu hambúrguer | sim (toggle) | ✅ |
| 2 | Hero | `2:38` | `2:4208` | Eyebrow, H1, texto, 2 CTAs, avatares "Trusted by 24,000+", imagem com cards flutuantes (120+ courses, 4.9 rating) | não | ✅ |
| 3 | Categories | `2:100` | `2:4269` | 4 cards numerados (Product Design, Technology, Business, Creative) com link "Explore →" | não | ✅ |
| 4 | FeaturedCourse | `2:193` | `2:4361` | Fundo azul, imagem com badge, título, instrutor, tags (8 lessons, 2h 40min, Intermediate), botão amarelo + link | não | ✅ |
| 5 | HowItWorks | `2:238` | `2:4405` | 3 passos com ícones ligados por linha (horizontal no desktop, vertical no mobile) | não | ✅ |
| 6 | Testimonial | `2:305` | `2:4471` | Citação + autor + 3 estatísticas (24K+, 120+, 92%) | não | ✅ |
| 7 | People ("Section") | `4:1136` | `4:1234` | Texto + botão, colagem de fotos sobre círculo | não | ✅ |
| 8 | Contact | `19:77` | `21:52` | Info (email, tempo de resposta) + formulário (nome, email, dúvida) | sim (form) | ✅ |
| 9 | FinalCTA | `2:352` | `2:4517` | Fundo amarelo com formas decorativas, avatares, título, 2 CTAs | não | ✅ |
| 10 | Footer | `2:384` | `2:4544` | Logo branco, tagline, 3 colunas de links (Explore, Company, Support), copyright | não | ✅ |

### Tokens do Figma
- **Cores:** text-primary `#171b2c`, text-secondary `#656770`, text-tertiary `#6d7384`, primary-blue `#3157f6`, primary-blue-light `#e2e8ff`, primary-orange `#ff704d`, background-orange `#ffcb9f`, secondary-yellow `#ffee7e`, background-yellow `#fff1c2`, background-light-yellow `#f9f8f3`, background-darkblue `#171b2c`, line-1 `#dbdfeb`, text-white-primary `#fff`, text-white-secondary `#e7e7ec`, text-white-tertiary `#9e9faa`.
- **Fontes:** Plus Jakarta Sans (headings, 600/700/800) e Inter (corpo, 400/600/700).
- **Tipografia desktop → mobile:** H1 64/70 (-1.6) → 40/44 (-1); H2 56/64 (-1.4); H3 48/56 (-1.2); H5 20/32; quotes 30/44 (-0.75); subtitle-1 18/28 → 16/26; subtitle-2 16/28; body-1 14/24; overline 12/16 (+1.44, uppercase).
- **Layout:** container de 1120px (padding lateral de 80px no desktop e 20px no mobile).

## 5. Decisões / ambiguidades (vai para o README)
- **Rótulo de passo repetido:** no desktop, o HowItWorks mostra "STEP 01" nos três passos; o mobile mostra 01/02/03. Vamos usar 01/02/03 (provável erro no design).
- **Formulário mobile em português:** o Contact mobile está em PT ("Nome completo", "Enviar mensagem") e o desktop em EN. A versão padrão (`/`) usa inglês nos dois; o texto PT do Figma foi reaproveitado na versão `/pt` (ver item 6 da tabela 5.1).
- **Erro de digitação nos tokens:** o Figma usa `backgrounnd-*`. Normalizamos para `background-*` no `@theme`.
- **Menu mobile aberto:** não existe no design; o estado aberto foi decisão nossa, seguindo o estilo do header.
- **Sem frame de tablet:** o layout entre 402px e 1280px foi decisão nossa (empilhado até `lg`, com ajustes intermediários).
- **Assets do Figma:** algumas imagens vêm como JPEG com extensão `.png`; renomeamos para a extensão real (`.jpg`).
- **Identidade da página:** favicon/ícones criados a partir da marca "l." do logo (não existe no Figma); imagem Open Graph gerada no build com `next/og`.
- **CTAs do Featured Course:** não existe página de curso; "View course" leva ao formulário de contato (inscrição) e "Browse all courses" às categorias.
- **Foco em fundo azul:** o anel de foco padrão é azul; na seção azul os links usam anel branco para manter a visibilidade.
- **People (tablet/desktop):** a colagem (520px) só cabe ao lado do texto a partir de 1280px; entre 768 e 1279 o texto fica acima e a colagem centralizada. Em telas < 402px a colagem é reduzida com `scale` para não transbordar.
- **Final CTA:** as formas decorativas aparecem só a partir de 1280px (o frame mobile não tem e, em 1024px, o cubo encostaria no título). As da metade direita são ancoradas pela direita para acompanharem telas largas.
- **Formulário de contato:** validação no client (nome ≥ 2, e-mail válido, mensagem ≥ 10 caracteres), erros ligados aos campos via `aria-describedby`, foco no primeiro campo inválido e envio simulado (800ms) com mensagem de sucesso em `role="status"`. Cor de erro `#c62828` (não existe no Figma; escolhida por contraste AA).
- **Texto do How It Works:** o mobile diz "who actually use these skills" e o desktop "who use these skills"; usamos o texto do desktop.
- **Links do footer** sem página correspondente (Careers, Journal, Terms, Privacy) usam `#` como placeholder.
- **How It Works no tablet:** os 3 passos ficam empilhados (como no mobile) até 1024px; em 768px três colunas ficariam apertadas.
- **Header sticky:** o design não define; deixamos o header fixo no topo (sticky) para facilitar a navegação.
- **Página 404:** não existe no design. Criamos uma 404 com a identidade da página (logo, "404" vazado na cor primária, botão para o início), traduzida (`app/[locale]/not-found.tsx` + catch-all `[...rest]`) e um `global-not-found` (flag experimental do Next 16) para URLs fora do layout de idioma.
- **Easter egg no console:** quem abre o DevTools vê uma mensagem com a stack e o link do repositório (`ConsoleGreeting`).
- **Links e formulário:** os links de navegação apontam para âncoras das seções. O formulário valida no client e simula o envio (sem backend, como o desafio permite).

## 5.1 Mudanças intencionais no design (decisão do autor — ⚠️ OBRIGATÓRIO no README)

Alterações feitas **de propósito** em relação ao Figma original da Buzzvel. Também foram aplicadas na cópia do Figma (`uD31QWrjqQzwTKqILFo53r`). Devem aparecer numa seção própria do README (ex.: *"Intentional design changes"*), para o avaliador não confundir com falta de fidelidade.

| # | Seção | Original (Figma Buzzvel) | Alteração | Motivo |
|---|---|---|---|---|
| 1 | Hero (mobile/tablet) | Imagem com os cards flutuantes **acima** do título e dos textos | Imagem movida para **abaixo** dos textos e CTAs | O título (H1) e os botões aparecem logo no primeiro scroll, a mensagem principal vem antes da ilustração e a ordem visual passa a seguir a ordem do HTML (melhor para leitores de tela). |
| 2 | Categories (todos os breakpoints) | Cards só com o número (01–04) | Ícone animado ao lado do número em cada card ([lucide-animated](https://lucide-animated.com), MIT): Product Design → `pen-tool`, Technology → `cpu`, Business → `trending-up`, Creative → `sparkles`. O ícone anima uma vez quando o card entra na tela e de novo no hover/foco | Reforça visualmente cada categoria e dá personalidade/micro-interação aos cards, sem mudar layout nem hierarquia do design. |
| 3 | Header (mobile/tablet) | Ícone de menu estático (☰) do Figma; estado aberto não existia | Ícone `menu` do lucide-animated que faz morph ☰ → ✕ ao abrir/fechar; painel abre como cortina (clip-path), links sobem por máscara, divisórias se desenham, fundo da página escurece/desfoca e a rolagem trava enquanto aberto | Feedback claro do estado aberto/fechado e transição coerente com o resto das animações do site. |
| 4 | Categories + Featured Course | Cards de categoria apenas linkam para a seção; um único curso em destaque | Clicar num card seleciona a categoria, rola até o Featured Course e troca o curso exibido (4 cursos mock; Product Design é o original do Figma), repetindo as animações de cortina/máscara; card selecionado fica destacado; troca anunciada a leitores de tela (`aria-live`) | Transforma conteúdo estático em interação real ("Implement the interactions") e conecta duas seções do design. |
| 5 | Global (desktop com mouse) | Cursor nativo | Anel na cor da marca que segue o cursor nativo (que continua visível) com mola; sobre botões (e CTAs com estilo de botão) o anel se transforma no contorno do elemento (posição, tamanho e raio), com leve efeito magnético; amarelo nas seções azul/escura; some em campos de texto e em links de texto comuns (nav, "Browse all courses", footer), que já têm o próprio hover de sublinhado. Desligado em touch e com `prefers-reduced-motion` | Personalidade e feedback de interação sem esconder o cursor do sistema (sem perda de usabilidade). |
| 6 | Global — idiomas | Página só em inglês (o frame mobile tinha o formulário em PT, por inconsistência) | Seletor **EN / PT** no header com **next-intl**: `/` = inglês (idioma do design) e `/pt` = português (pt-BR, reaproveitando as strings PT do frame mobile). Sem redirecionamento automático pelo idioma do navegador. Números formatados com Intl (24,000 → 24.000, 24K → 24 mil, 4.9 → 4,9). `<html lang>`, `hreflang`, canonical e Open Graph por idioma; as duas versões são estáticas | Transforma a inconsistência do Figma em recurso; mostra i18n de verdade (roteamento, SEO, formatação), não só tradução de strings. |

Rascunho para o README (inglês):
> **Intentional design changes**
> - **Hero on mobile:** the original design places the image above the headline. I moved it below the copy and CTAs so the main message and the primary actions are visible in the first viewport, and so the visual order matches the DOM/reading order.
> - **Category icons:** I added a small animated icon next to each category number (from [lucide-animated](https://lucide-animated.com), adapted to the project's lazy-loaded Motion setup). Each icon plays once as its card scrolls in and again on hover or keyboard focus — a small touch of personality that reinforces each category without changing the layout.
> - **Mobile menu:** the static hamburger from the design was replaced by an animated icon (lucide-animated `menu`) that morphs into a close icon; the panel opens as a top-down curtain with masked links, the page behind dims, and scrolling is locked while it is open.
> - **Categories drive the featured course:** clicking a category card scrolls to the Featured Course and swaps it for a course from that category (Product Design is the original design content; the other three are mock courses). The swap replays the curtain/mask animations and is announced to screen readers.
> - **Custom cursor:** the native cursor stays visible; a brand-coloured ring trails it and morphs into an outline around buttons (matching their size and border radius); over plain text links it hides, since those have their own underline hover. It only runs on mouse/trackpad devices and is disabled for users who prefer reduced motion.
> - **English / Portuguese (next-intl):** the site is available in **English at `/`** (the design language) and **Portuguese (pt-BR) at `/pt`**, switchable from the EN / PT toggle in the header. The idea came from the mobile design, whose contact form was in Portuguese. The browser language does **not** redirect automatically, so the original design is always what you see first. Long-form copy lives in typed per-locale modules (`data/*`), UI strings in `messages/*.json`, and numbers are formatted with Intl (24,000 / 24.000, 24K / 24 mil). Both versions are statically prerendered with locale-specific `<html lang>`, hreflang, canonical and Open Graph tags.

## 6. Cronograma sugerido
| Dia | Foco |
|---|---|
| 16/11 (seg) | Etapa 0 + Header + Hero |
| 17/11 (ter) | Seções intermediárias |
| 18/11 (qua) | Seções restantes + Footer + polimento responsivo |
| 19/11 (qui) | Animações + testes + performance |
| 20/11 (sex) | README, deploy, revisão final e envio |
