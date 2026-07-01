# Site — Thales de Ataíde Evangelista

Landing page one-page para o advogado Thales de Ataíde (Direito Previdenciário & Família), inspirada visualmente no layout da Brenda Prinsk (referência enviada), mas adaptada à identidade dele: paleta azul-marinho + bege/champagne + off-white, fontes Degular (títulos) e Delight (corpo), tom acolhedor e humano.

## Estrutura da página (na ordem, espelhando a referência)

1. **Header fixo** — logo "Thales Ataíde · Advogado", nav (Sobre, Áreas, Processo, Depoimentos, Contato), botão CTA "Fale no WhatsApp".
2. **Hero** — foto do Thales (a de terno azul com abajur ao fundo) à esquerda, à direita card escuro em glass com título grande "Buscamos os seus direitos", subtítulo, e mini-form de contato (nome, WhatsApp, área de interesse: Previdenciário / Família, botão "Solicitar orientação"). Barra inferior com métricas: OAB/ES 40.851 · Atendimento Grande Vitória + Brasil · 100% online disponível.
3. **Faixa de logos/áreas** — tira com "Direito Previdenciário · Direito de Família · Atendimento humanizado · Presencial e online".
4. **"Sua causa merece atenção real"** — dois cards lado a lado: "Sem orientação" (dores: benefício negado, ansiedade…) vs "Com o Thales" (empatia, tradução, condução calma…).
5. **"Honorários claros. Sem surpresas."** — bloco explicando modelo de honorários fixos/transparência + CTA secundário.
6. **"Acompanhamento do início ao fim"** — grid de 6 cards (Escuta, Análise, Estratégia, Protocolo, Vigilância, Blindagem) com ícones sutis, primeiro card destaque com visual em degradê azul.
7. **"Processo simples. Do primeiro contato ao resultado."** — bloco escuro (azul-marinho) com 4 passos numerados: 01 Conversa · 02 Análise · 03 Estratégia · 04 Acompanhamento.
8. **Sobre o Thales** — foto (a de terno bege sentado na poltrona) + card branco com bio, selos ("OAB/ES 40.851", "Direito Previdenciário", "Direito de Família"), CTA "Falar com o Thales".
9. **Depoimentos** — 3 cards com estrelas + texto + nome (placeholder respeitando OAB: sem promessa de resultado).
10. **CTA final escuro** — "Cada dia sem orientação é um direito que pode se perder" + botão WhatsApp, com textura de ondas em azul-marinho.
11. **Footer** — logo, OAB, Instagram @adv.thalesataide, aviso de conformidade OAB (Provimento 205/2021), endereço Grande Vitória.

## Identidade visual

- **Cores** (tokens em `src/styles.css`):
  - `--navy: #1B2B3D` (autoridade, fundos escuros, títulos)
  - `--beige: #A8895F` (destaques, palavras-conceito)
  - `--champagne: #E7D6AC` (acento suave, hover)
  - `--offwhite: #F8F3EA` (fundo padrão)
  - `--ink: #15120E` (contraste)
  - Proporção ≈70% off-white/bege, 25% azul-marinho, 5% preto.
- **Tipografia**: Degular (títulos, ExtraBold para H1/H2, Medium para subs), Delight (corpo Light/Regular, Bold para ênfase). Fontes carregadas via `<link>`/@font-face no root; arquivos vindos dos .zip/.rar enviados extraídos para `/public/fonts`.
- **Textura**: painéis em glassmorphism sobre foto do hero, degradês quentes suaves champagne→bege, cantos arredondados médios (radius ~14px).

## Fotos

- Hero: `magnific_retrato-de-estudio-img2-s_kLaFagS16B_1.png` (terno azul, sorrindo, abajur).
- Alternativa hero secundária: `magnific_retrato-de-estudio-img2-s_VdRnzLmMMU.png` (mais sério, luminária cinema).
- Sobre: `magnific_querouse-a-primeira-foto-_5xe27pqKxe.png` (terno bege, poltrona marrom).
- CTA/Detalhe: `magnific_corpo-inclinado-pra-frent_fFetghkCDY.png` (fundo azul intenso, dramático).
- Todas via `lovable-assets` (não copiar binário para o repo).

## Movimento e transições

- Fade-in + subtle Y translate em cada seção ao entrar no viewport (IntersectionObserver + classes `animate-fade-in`).
- Hover-scale suave nos cards (`hover-scale`).
- Underline animado (`story-link`) nos itens do nav.
- Parallax leve na foto do hero (translate no scroll).
- Contadores animados nas métricas do hero.
- Marquee lento na faixa de áreas.
- Cards do processo com stagger de entrada.
- Transições `transition-all duration-300 ease-out` como padrão.

## Detalhes técnicos

- Rota única `/` em `src/routes/index.tsx` substituindo o placeholder atual.
- Componentes em `src/components/site/` (Header, Hero, Comparison, Honorarios, Acompanhamento, Processo, Sobre, Depoimentos, CtaFinal, Footer).
- Head SEO no `__root.tsx`: title "Thales Ataíde · Advogado Previdenciário e de Família — OAB/ES 40.851", description acolhedora, og:title/description/type, twitter:card. og:image no leaf da index (foto do hero via CDN Lovable Assets).
- shadcn Button/Input já disponíveis; usar tokens semânticos, nada de cores hardcoded.
- Formulário do hero: apenas visual/UX (submit desabilitado / abre WhatsApp com mensagem pré-preenchida) — sem backend nesta primeira versão.
- Botão flutuante WhatsApp fixo no canto inferior direito.
- Conformidade OAB: nada de promessa de resultado, tom informativo; disclaimer no footer.

## Fora do escopo desta primeira entrega

- Backend / envio real do formulário (pode ser adicionado depois com Lovable Cloud).
- Blog / múltiplas páginas de artigos.
- Autenticação / área do cliente.