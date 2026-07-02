import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  MessageCircle,
  Scale,
  HeartHandshake,
  ShieldCheck,
  FileText,
  Eye,
  Sparkles,
  Star,
  Instagram,
  MapPin,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useReveal } from "@/hooks/use-reveal";
import heroPhoto from "../assets/thales-alt.png.asset.json";
import sobrePhoto from "../assets/thales-sobre.png.asset.json";
import ctaPhoto from "../assets/thales-cta.png.asset.json";

const WHATSAPP =
  "https://api.whatsapp.com/send/?phone=5527999559615&text=" +
  encodeURIComponent(
    "Olá, Thales! Vim pelo site e gostaria de uma orientação.",
  ) +
  "&type=phone_number&app_absent=0";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: heroPhoto.url },
      { name: "twitter:image", content: heroPhoto.url },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-navy-deep text-offwhite overflow-x-hidden">
      <Header />
      <Hero />
      <Marquee />
      <Comparison />
      <Honorarios />
      <Acompanhamento />
      <Processo />
      <Sobre />
      <Depoimentos />
      <CtaFinal />
      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}

/* ------------------------------- Header -------------------------------- */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-deep/85 backdrop-blur-lg border-b border-offwhite/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <span className="font-display text-xl font-normal text-offwhite tracking-tight">
            Thales<span className="text-beige">.</span>Ataíde
          </span>
          <span className="hidden sm:inline text-[10px] uppercase tracking-[0.25em] text-offwhite/60">
            Advogado · OAB/ES 40.851
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-offwhite/80">
          {[
            ["Sobre", "#sobre"],
            ["Áreas", "#areas"],
            ["Processo", "#processo"],
            ["Depoimentos", "#depoimentos"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="story-link font-medium transition-colors hover:text-champagne"
            >
              {label}
            </a>
          ))}
        </nav>
        <a href={WHATSAPP} target="_blank" rel="noreferrer">
          <Button
            size="sm"
            className="btn-glow rounded-full bg-beige text-offwhite hover:bg-champagne hover:text-navy-deep font-medium px-5"
          >
            <MessageCircle className="mr-2 size-4" /> Fale comigo
          </Button>
        </a>
      </div>
    </header>
  );
}

/* --------------------------------- Hero -------------------------------- */

function Hero() {
  return (
    <section id="top" className="relative isolate min-h-screen overflow-hidden">
      {/* Full-bleed background photo */}
      <img
        src={heroPhoto.url}
        alt="Thales de Ataíde Evangelista, advogado"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
      />
      {/* Left-to-right darkening for text legibility */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/70 to-navy-deep/20" />
      {/* Bottom black gradient */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent" />
      {/* Top gradient so header stays legible */}
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-black/50 to-transparent" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-10 px-6 pt-28 pb-14 lg:grid-cols-12 lg:gap-8">
        {/* Left: headline over photo */}
        <div className="flex flex-col justify-end lg:col-span-7 reveal">
          <div className="inline-flex w-fit items-center gap-2 rounded-full liquid-glass px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-champagne">
            Especialista em Direito Previdenciário e de Família
          </div>
          <h1 className="mt-5 font-display text-[38px] leading-[1.05] md:text-[58px] font-normal text-offwhite tracking-[-0.02em]">
            O primeiro passo <span className="text-beige">começa agora.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-offwhite/80 font-sans font-light leading-relaxed">
            Você chegou até aqui carregando uma dúvida, uma negativa ou uma
            dor que ninguém soube explicar direito. Eu conduzo o processo e
            caminho ao seu lado até o fim: com a técnica que o caso exige e o
            cuidado que você merece.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Metric value="OAB/ES" label="40.851" />
            <span className="h-8 w-px bg-offwhite/20" />
            <Metric value="Grande Vitória" label="Presencial · ES" />
            <span className="h-8 w-px bg-offwhite/20" />
            <Metric value="Todo Brasil" label="Atendimento online" />
          </div>
        </div>

        {/* Right: floating liquid glass contact card */}
        <div className="flex flex-col justify-center lg:col-span-5 reveal">
          <HeroForm />
        </div>
      </div>
    </section>
  );
}

function HeroForm() {
  const [area, setArea] = useState<"prev" | "fam" | null>(null);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.open(WHATSAPP, "_blank");
      }}
      className="rounded-3xl liquid-glass p-6 md:p-7"
    >
      <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-champagne">
        Consulta gratuita
      </p>
      <p className="mt-2 font-display text-2xl font-normal text-offwhite">
        Fale com o Thales agora
      </p>
      <p className="mt-1 text-sm text-offwhite/60 font-sans">
        Conte sua situação — respondo pessoalmente pelo WhatsApp em até 24h.
      </p>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input placeholder="Seu nome" className="h-11 bg-white/5 border-offwhite/15 text-offwhite placeholder:text-offwhite/40" />
        <Input placeholder="WhatsApp com DDD" className="h-11 bg-white/5 border-offwhite/15 text-offwhite placeholder:text-offwhite/40" />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <AreaPill active={area === "prev"} onClick={() => setArea("prev")}>
          Previdenciário
        </AreaPill>
        <AreaPill active={area === "fam"} onClick={() => setArea("fam")}>
          Família
        </AreaPill>
        <AreaPill active={area === null} onClick={() => setArea(null)}>
          Ainda não sei
        </AreaPill>
      </div>
      <Button
        type="submit"
        className="btn-glow mt-5 h-12 w-full rounded-full bg-beige text-offwhite hover:bg-beige/90 font-medium text-base group"
      >
        Falar com o Thales
        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
      </Button>
      <p className="mt-3 text-[11px] text-offwhite/50 font-sans text-center">
        Sem compromisso · Conforme Provimento OAB 205/2021
      </p>
    </form>
  );
}

function AreaPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-xs font-sans font-medium border transition-all ${
        active
          ? "bg-navy text-offwhite border-navy"
          : "bg-transparent text-offwhite/70 border-offwhite/20 hover:border-offwhite/40"
      }`}
    >
      {children}
    </button>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-lg font-normal text-offwhite">{value}</div>
      <div className="text-[11px] uppercase tracking-widest text-offwhite/50 mt-0.5">
        {label}
      </div>
    </div>
  );
}

/* ------------------------------- Marquee ------------------------------- */

function Marquee() {
  const items = [
    "Direito Previdenciário",
    "Direito de Família",
    "Atendimento humanizado",
    "Presencial e Online",
    "Empatia em cada causa",
    "OAB/ES 40.851",
  ];
  const row = [...items, ...items];
  return (
    <div id="areas" className="relative border-y border-navy/10 bg-navy text-offwhite py-5 overflow-hidden">
      <div className="flex marquee w-max whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="mx-8 flex items-center gap-8 font-display text-lg text-champagne/90">
            {t}
            <span className="size-1.5 rounded-full bg-beige/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- Comparison ------------------------------ */

function Comparison() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 reveal">
      <div className="text-center max-w-2xl mx-auto">
        <p className="font-sans text-xs uppercase tracking-[0.35em] text-beige">
          Sua causa merece
        </p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl font-normal text-offwhite">
          Atenção real, do início ao fim
        </h2>
        <p className="mt-4 text-offwhite/60 font-sans font-light">
          A diferença entre se sentir mais um número e ser tratado como pessoa
          começa no primeiro atendimento.
        </p>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <ComparisonCard
          tone="pain"
          title="Sem orientação"
          items={[
            "Benefício negado sem explicação clara",
            "Termos jurídicos que confundem mais do que ajudam",
            "Sensação de estar sozinho contra a burocracia",
            "Decisões tomadas na pressa, sem estratégia",
            "Ansiedade por respostas que nunca chegam",
          ]}
        />
        <ComparisonCard
          tone="gain"
          title="Com o Thales"
          items={[
            "Escuta atenta e diagnóstico honesto da sua causa",
            "Direito traduzido em linguagem simples",
            "Alguém que segura sua mão na burocracia",
            "Estratégia técnica, orientação antes do litígio",
            "Presença próxima em cada etapa do processo",
          ]}
        />
      </div>
    </section>
  );
}

function ComparisonCard({
  tone,
  title,
  items,
}: {
  tone: "pain" | "gain";
  title: string;
  items: string[];
}) {
  const isGain = tone === "gain";
  return (
    <div
      className={`liquid-glass rounded-3xl p-8 md:p-10 transition-all duration-500 hover:-translate-y-1 ${
        isGain ? "shadow-[0_30px_60px_-40px_rgba(15,26,38,0.7)]" : ""
      }`}
    >
      <div
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] uppercase tracking-widest ${
          isGain ? "bg-beige/20 text-champagne" : "bg-white/5 text-offwhite/60"
        }`}
      >
        {isGain ? "Recomendado" : "Cenário comum"}
      </div>
      <h3
        className={`mt-4 font-display text-2xl md:text-3xl font-normal ${
          isGain ? "text-champagne" : "text-offwhite"
        }`}
      >
        {title}
      </h3>
      <ul className="mt-6 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3 font-sans">
            {isGain ? (
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-beige" />
            ) : (
              <XCircle className="mt-0.5 size-5 shrink-0 text-offwhite/30" />
            )}
            <span
              className={isGain ? "text-offwhite/90" : "text-offwhite/70"}
            >
              {it}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ----------------------------- Honorarios ------------------------------ */

function Honorarios() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 reveal">
      <div className="liquid-glass rounded-3xl p-8 md:p-14 grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7">
          <p className="font-sans text-xs uppercase tracking-[0.35em] text-beige">
            Transparência
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-normal text-offwhite leading-tight">
            Honorários claros.
            <br />
            <span className="text-beige">Sem surpresas.</span>
          </h2>
          <p className="mt-4 text-offwhite/65 font-sans font-light max-w-lg">
            Antes de qualquer contrato, você entende exatamente o que será
            feito, quanto custa e por quê. Nada de cobranças escondidas —
            respeito começa pelo bolso do cliente.
          </p>
        </div>
        <div className="md:col-span-5">
          <div className="liquid-glass rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-xl bg-beige/15 text-beige">
                <Sparkles className="size-5" />
              </div>
              <div>
                <div className="font-display text-lg font-normal text-offwhite">
                  Consulta inicial guiada
                </div>
                <div className="text-xs text-offwhite/55">
                  Sem compromisso · Sem venda agressiva
                </div>
              </div>
            </div>
            <a href={WHATSAPP} target="_blank" rel="noreferrer">
              <Button className="btn-glow mt-5 h-11 w-full rounded-full bg-navy hover:bg-navy-deep text-offwhite">
                Solicitar orientação
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Acompanhamento --------------------------- */

function Acompanhamento() {
  const cards = [
    { icon: HeartHandshake, title: "Escuta", desc: "Você conta o que aconteceu, sem julgamento. É daí que nasce a estratégia." },
    { icon: FileText, title: "Análise", desc: "Documentos, provas e prazos avaliados com técnica e olhar humano." },
    { icon: Scale, title: "Estratégia", desc: "Caminho recomendado, alternativas e o que esperar em cada cenário." },
    { icon: ShieldCheck, title: "Protocolo", desc: "Ação ajuizada ou requerimento protocolado com padrão de excelência." },
    { icon: Eye, title: "Vigilância", desc: "Acompanhamento ativo dos autos — nada passa despercebido." },
    { icon: Sparkles, title: "Blindagem", desc: "Orientação preventiva para que o problema não volte a acontecer." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 reveal">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.35em] text-beige">
            Do início ao fim
          </p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-normal text-offwhite leading-[1.05]">
            Acompanhamento
            <br />
            que você <span className="text-beige">sente</span>.
          </h2>
        </div>
        <p className="max-w-md text-offwhite/60 font-sans font-light">
          Cada etapa pensada para que você entenda onde está, para onde vai e o
          que depende de você — sem juridiquês.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:row-span-2 liquid-glass rounded-3xl p-8 text-offwhite relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 size-64 rounded-full bg-beige/20 blur-3xl" />
          <div className="relative">
            <div className="text-champagne font-display text-6xl font-normal leading-none">
              06
            </div>
            <p className="mt-4 text-champagne/70 uppercase tracking-widest text-xs">
              Etapas do cuidado
            </p>
            <h3 className="mt-6 font-display text-3xl font-normal text-offwhite leading-tight">
              Um método construído com empatia e técnica.
            </h3>
            <p className="mt-4 text-offwhite/70 text-sm font-light">
              Menos ansiedade, mais clareza — a partir da primeira conversa.
            </p>
          </div>
        </div>
        {cards.map((c) => (
          <div
            key={c.title}
            className="group liquid-glass rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-beige/60 hover:shadow-[0_20px_50px_-30px_rgba(168,137,95,0.5)]"
          >
            <div className="grid size-11 place-items-center rounded-xl bg-white/5 text-beige transition-colors group-hover:bg-beige group-hover:text-offwhite">
              <c.icon className="size-5" />
            </div>
            <h3 className="mt-4 font-display text-xl font-normal text-offwhite">
              {c.title}
            </h3>
            <p className="mt-1.5 text-sm text-offwhite/60 font-sans leading-relaxed">
              {c.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------- Processo ----------------------------- */

function Processo() {
  const steps = [
    { n: "01", title: "Conversa", desc: "Você fala, eu escuto. Sem pressa, sem cobrança." },
    { n: "02", title: "Análise", desc: "Documentos e provas em revisão técnica." },
    { n: "03", title: "Estratégia", desc: "Plano com cenários, prazos e expectativas realistas." },
    { n: "04", title: "Acompanhamento", desc: "Presença ativa até o desfecho — e depois dele." },
  ];
  return (
    <section id="processo" className="bg-navy text-offwhite py-24 relative overflow-hidden reveal">
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{
        backgroundImage:
          "radial-gradient(circle at 20% 30%, #E7D6AC 0, transparent 40%), radial-gradient(circle at 80% 70%, #A8895F 0, transparent 40%)",
      }} />
      <div className="relative mx-auto max-w-7xl px-6">
        <p className="font-sans text-xs uppercase tracking-[0.35em] text-beige">
          Método
        </p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl font-normal text-offwhite max-w-2xl leading-[1.05]">
          Processo simples.
          <br />
          Do primeiro <span className="text-champagne">contato</span> ao
          resultado.
        </h2>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="relative border-l border-champagne/25 pl-6 pt-2 transition-all hover:border-champagne"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="font-display text-champagne text-4xl font-normal">
                {s.n}
              </div>
              <h3 className="mt-3 font-display text-xl font-normal text-offwhite">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-offwhite/60 font-sans leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Sobre ------------------------------- */

function Sobre() {
  return (
    <section id="sobre" className="mx-auto max-w-7xl px-6 py-24 reveal">
      <div className="grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-5">
          <div className="relative overflow-hidden rounded-[28px] border border-offwhite/10 shadow-[0_30px_80px_-40px_rgba(15,26,38,0.4)]">
            <img
              src={sobrePhoto.url}
              alt="Thales de Ataíde em seu escritório"
              className="w-full h-[560px] object-cover object-center"
            />
            <div className="absolute left-4 bottom-4 rounded-2xl bg-navy/85 backdrop-blur px-4 py-3 text-offwhite">
              <div className="font-display text-sm font-normal">
                Thales de Ataíde
              </div>
              <div className="text-[10px] uppercase tracking-widest text-champagne/80">
                OAB/ES 40.851
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-7">
          <p className="font-sans text-xs uppercase tracking-[0.35em] text-beige">
            Quem é
          </p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-normal text-offwhite leading-[1.05]">
            O advogado por trás
            <br />
            do <span className="text-beige">propósito</span>.
          </h2>
          <div className="mt-6 space-y-4 text-offwhite/70 font-sans font-light text-lg leading-relaxed max-w-xl">
            <p>
              Thales de Ataíde Evangelista atua no{" "}
              <span className="font-medium text-champagne">
                Direito Previdenciário
              </span>{" "}
              e no{" "}
              <span className="font-medium text-champagne">Direito de Família</span>{" "}
              — duas frentes escolhidas pelo peso humano que carregam.
            </p>
            <p>
              Foi, ao lado de uma prima, o primeiro advogado da família.
              Técnico no processo, humano na relação: orienta antes de litigar
              e trata cada causa como a história de uma pessoa, não como um
              número.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {["OAB/ES 40.851", "Previdenciário", "Família", "Grande Vitória/ES", "Online · Brasil"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full border border-offwhite/15 bg-white/5 px-3 py-1 text-xs text-offwhite/70 font-sans"
                >
                  {t}
                </span>
              ),
            )}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={WHATSAPP} target="_blank" rel="noreferrer">
              <Button className="btn-glow h-12 rounded-full bg-navy hover:bg-navy-deep text-offwhite px-6">
                Falar com o Thales
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </a>
            <a
              href="https://instagram.com/adv.thalesataide"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="outline"
                className="h-12 rounded-full border-offwhite/20 text-offwhite hover:bg-offwhite hover:text-navy-deep px-6"
              >
                <Instagram className="mr-2 size-4" />
                @adv.thalesataide
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Depoimentos ---------------------------- */

function Depoimentos() {
  const data = [
    {
      quote:
        "Eu chegou perdida, sem entender por que meu benefício foi negado. Ele explicou cada passo — pela primeira vez me senti ouvida.",
      name: "Cliente · Previdenciário",
    },
    {
      quote:
        "Divórcio nunca é fácil. A calma e a clareza do Thales fizeram toda a diferença para eu conseguir recomeçar com segurança.",
      name: "Cliente · Família",
    },
    {
      quote:
        "Não é só técnica: é presença. Sempre respondeu, sempre explicou. Recomendo de olhos fechados a quem procura um advogado de confiança.",
      name: "Cliente · Previdenciário",
    },
  ];
  return (
    <section id="depoimentos" className="mx-auto max-w-7xl px-6 py-24 reveal">
      <div className="text-center">
        <p className="font-sans text-xs uppercase tracking-[0.35em] text-beige">
          Confiança
        </p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl font-normal text-offwhite">
          O que dizem os clientes
        </h2>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {data.map((t, i) => (
          <div
            key={i}
            className="liquid-glass rounded-3xl p-8 flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_-40px_rgba(15,26,38,0.4)]"
          >
            <div className="flex gap-0.5 text-beige">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <p className="mt-5 font-sans font-light text-offwhite/80 leading-relaxed flex-1">
              “{t.quote}”
            </p>
            <div className="mt-6 pt-5 border-t border-offwhite/10 text-sm font-display font-normal text-offwhite">
              {t.name}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-[11px] text-offwhite/45 font-sans">
        Depoimentos ilustrativos · Conforme Provimento OAB 205/2021, casos não
        são divulgados como oferta ou promessa de resultado.
      </p>
    </section>
  );
}

/* -------------------------------- CTA Final ---------------------------- */

function CtaFinal() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 reveal">
      <div className="relative overflow-hidden rounded-[32px] bg-navy text-offwhite">
        <img
          src={ctaPhoto.url}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy/40" />
        <div className="relative grid md:grid-cols-12 gap-8 p-10 md:p-16 items-center">
          <div className="md:col-span-8">
            <p className="font-sans text-xs uppercase tracking-[0.35em] text-champagne">
              Antes que seja tarde
            </p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-normal text-offwhite leading-[1.05]">
              Cada dia sem orientação
              <br />
              é um direito que{" "}
              <span className="text-champagne">pode se perder</span>.
            </h2>
            <p className="mt-5 max-w-lg text-offwhite/70 font-sans font-light">
              Um benefício negado, um prazo curto, uma decisão familiar em
              aberto. Converse comigo hoje mesmo — sem compromisso.
            </p>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="block">
              <Button className="btn-glow h-14 rounded-full bg-beige hover:bg-champagne text-navy hover:text-navy-deep font-medium px-7 text-base">
                <MessageCircle className="mr-2 size-5" />
                Solicitar orientação
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Footer ------------------------------- */

function Footer() {
  return (
    <footer className="bg-navy-deep text-offwhite/80 pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="font-display text-2xl font-normal text-offwhite">
              Thales<span className="text-beige">.</span>Ataíde
            </div>
            <p className="mt-2 text-sm text-offwhite/60 font-sans font-light max-w-xs">
              Advocacia humana em Direito Previdenciário e de Família.
            </p>
            <div className="mt-4 text-xs text-champagne/80 uppercase tracking-widest">
              OAB/ES 40.851
            </div>
          </div>
          <div className="text-sm font-sans space-y-2">
            <div className="font-display text-champagne text-xs uppercase tracking-widest mb-3">
              Contato
            </div>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-champagne transition-colors">
              <Phone className="size-4" /> WhatsApp
            </a>
            <a
              href="https://instagram.com/adv.thalesataide"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-champagne transition-colors"
            >
              <Instagram className="size-4" /> @adv.thalesataide
            </a>
            <div className="flex items-center gap-2 text-offwhite/60">
              <MapPin className="size-4" /> Grande Vitória · ES
            </div>
          </div>
          <div className="text-xs text-offwhite/50 font-sans leading-relaxed">
            <div className="font-display text-champagne text-xs uppercase tracking-widest mb-3">
              Conformidade
            </div>
            <p>
              Site institucional de caráter informativo, em conformidade com o
              Provimento OAB 205/2021. Não constitui oferta, captação de
              clientela nem promessa de resultado.
            </p>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-offwhite/40 font-sans">
          <span>© {new Date().getFullYear()} Thales de Ataíde Evangelista</span>
          <span>Feito com cuidado, em Vitória / ES</span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------- Floating WhatsApp --------------------------- */

function FloatingWhatsapp() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      className="btn-glow fixed bottom-6 right-6 z-50 grid size-14 place-items-center rounded-full bg-beige text-offwhite shadow-[0_15px_35px_-10px_rgba(168,137,95,0.7)] transition-all duration-300 hover:scale-110 hover:bg-champagne hover:text-navy-deep"
      aria-label="Fale no WhatsApp"
    >
      <MessageCircle className="size-6" />
      <span className="absolute inset-0 rounded-full animate-ping bg-beige/40" />
    </a>
  );
}
