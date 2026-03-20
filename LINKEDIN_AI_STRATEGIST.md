# 🚀 LinkedIn AI Strategist — SaaS Full-Stack

> **Documento Maestro del Proyecto** · Versión 1.0 · Contexto completo para desarrollo con IA
>
> ⚠️ **Instrucción para cualquier IA que lea esto:** Este es el documento base del proyecto. Léelo completo antes de escribir una sola línea de código. Cada decisión técnica, nombre de archivo y convención está aquí definida. Respétala.

---

## 📌 Índice

1. [Visión del producto](#1-visión-del-producto)
2. [Propuesta de valor y diferenciadores](#2-propuesta-de-valor-y-diferenciadores)
3. [Stack tecnológico definitivo](#3-stack-tecnológico-definitivo)
4. [Arquitectura del sistema](#4-arquitectura-del-sistema)
5. [Estructura de carpetas](#5-estructura-de-carpetas)
6. [Modelo de datos](#6-modelo-de-datos)
7. [Internacionalización (i18n)](#7-internacionalización-i18n)
8. [Flujo de la aplicación](#8-flujo-de-la-aplicación)
9. [Módulo de Inteligencia Artificial](#9-módulo-de-inteligencia-artificial)
10. [Sistema de Planes y Monetización](#10-sistema-de-planes-y-monetización)
11. [APIs externas e integraciones](#11-apis-externas-e-integraciones)
12. [Fases de desarrollo](#12-fases-de-desarrollo)
13. [Estado actual del proyecto](#13-estado-actual-del-proyecto)
14. [Decisiones técnicas tomadas](#14-decisiones-técnicas-tomadas)
15. [Instrucciones para continuar el desarrollo](#15-instrucciones-para-continuar-el-desarrollo)

---

## 1. Visión del producto

### ¿Qué es LinkedIn AI Strategist?

Una plataforma SaaS de doble cara (B2C + B2B) que usa Inteligencia Artificial para transformar LinkedIn de una red social pasiva en una **máquina activa de oportunidades**, tanto para candidatos que buscan trabajo como para empresas que buscan talento.

No es un analizador de perfiles más. Es un **Estratega de Marca Personal** para candidatos y un **Headhunter Inteligente** para empresas, con automatización real del proceso de principio a fin.

### El problema que resuelve

**Para candidatos:**

- El 87% de los recruiters rechaza perfiles en menos de 10 segundos por keywords incorrectas
- La mayoría no sabe cómo escribir un "About" que convierta visitas en contactos
- Construir autoridad en LinkedIn requiere consistencia de contenido que nadie tiene tiempo de mantener

**Para empresas:**

- Leer 200 CVs por vacante es ineficiente y sesgado
- Las ofertas de trabajo mal redactadas atraen candidatos incorrectos
- El matchmaking manual entre JD y candidatos es lento y subjetivo

### La solución

```
Candidato sube perfil/texto de LinkedIn
              ↓
       IA analiza y puntúa
              ↓
   Recibe plan de acción concreto:
   - Palabras clave que le faltan
   - Reescritura del About section
   - Posts generados en su voz
   - Roadmap de habilidades hacia su objetivo
```

```
Empresa sube Job Description
              ↓
       IA optimiza la oferta
              ↓
   Sistema busca y rankea candidatos:
   - Score de compatibilidad semántica
   - Resumen de fortalezas/debilidades por candidato
   - Carta de contacto personalizada generada
```

---

## 2. Propuesta de valor y diferenciadores

### Lo que NO hace ningún competidor actual

| Feature                                   | LinkedIn AI Strategist | LinkedIn Premium | CV parsers |
| ----------------------------------------- | ---------------------- | ---------------- | ---------- |
| Score de empleabilidad con IA             | ✅                     | ❌               | ❌         |
| Reescritura de perfil en tu voz           | ✅                     | ❌               | ❌         |
| Generador de posts diarios personalizados | ✅                     | ❌               | ❌         |
| Career Roadmap IA (skills gap)            | ✅                     | ❌               | ❌         |
| Matchmaking semántico JD ↔ Candidato      | ✅                     | Básico           | ❌         |
| Generador de ofertas optimizadas          | ✅                     | ❌               | ❌         |
| Bilingüe EN + ES                          | ✅                     | ✅               | ❌         |

### Los 4 módulos estrella

**1. Profile Auditor 360°**

> Analiza texto del perfil de LinkedIn, asigna score 0-100 de empleabilidad y da feedback accionable punto por punto.

**2. SEO Keyword Optimizer**

> Compara el perfil con los términos más buscados por recruiters en el sector/rol objetivo. Muestra qué keywords faltan y dónde insertarlas.

**3. Ghostwriter AI**

> Aprende el estilo de escritura del usuario analizando sus posts pasados (o una muestra). Genera posts semanales en su voz que construyen autoridad.

**4. Precision Matchmaking (B2B)**

> Comparación semántica vectorial entre Job Descriptions y perfiles de candidatos. No keyword matching, sino comprensión real del contexto.

---

## 3. Stack tecnológico definitivo

```
FRONTEND          → Next.js 15 (App Router) + React + TypeScript
ESTILOS           → Tailwind CSS + Shadcn/UI
IDIOMAS           → next-intl (Inglés EN + Español ES)
BASE DE DATOS     → PostgreSQL via Supabase
ORM               → Prisma
AUTENTICACIÓN     → Clerk (gestión completa de usuarios, organizaciones, roles)
IA ENGINE         → Anthropic Claude API (principal) + Google Gemini (backup/especialización)
EMBEDDINGS        → OpenAI text-embedding-3-small (para matchmaking vectorial)
VECTOR STORE      → pgvector (extensión de PostgreSQL en Supabase)
EMAIL             → Resend + React Email
PAGOS             → Stripe (planes FREE/PRO/ENTERPRISE)
STORAGE           → Supabase Storage (CVs, avatares)
MONITORIZACIÓN    → Sentry
DEPLOYMENT        → Vercel (frontend + API routes)
```

### Decisiones clave explicadas

**Clerk sobre NextAuth:**

- Gestión de organizaciones nativa (perfecto para el módulo B2B de empresas)
- Roles y permisos out-of-the-box (CANDIDATE / RECRUITER / ADMIN)
- UI de auth lista, no hay que construirla
- Webhooks para sincronizar usuarios con PostgreSQL

**Supabase sobre Railway/Neon:**

- PostgreSQL + Storage + pgvector en un solo servicio
- Row Level Security (RLS) para seguridad de datos entre empresas
- Dashboard visual para ver datos sin herramientas externas
- Generoso tier gratuito para desarrollo y MVP

**pgvector sobre Pinecone:**

- Los embeddings viven en la misma DB que los datos → queries JOIN posibles
- Sin servicio externo adicional que gestionar
- Suficiente para las necesidades del MVP y primeros 10k usuarios

**Claude como IA principal:**

- Mejor calidad de escritura en castellano y en contextos profesionales
- Más fiable para seguir instrucciones estructuradas (JSON output)
- Gemini como fallback para tareas de análisis masivo (más barato por token)

---

## 4. Arquitectura del sistema

```
┌──────────────────────────────────────────────────────────────────────┐
│                          CLIENTE (Browser)                            │
│                    Next.js 15 + React + TypeScript                    │
│              Tailwind CSS + Shadcn/UI + next-intl                    │
└───────────────────────────┬──────────────────────────────────────────┘
                            │ HTTPS
┌───────────────────────────▼──────────────────────────────────────────┐
│                        NEXT.JS 15 SERVER                              │
│                                                                       │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │                      App Router Pages                           │  │
│  │  /[locale]/(marketing)  → Landing, Pricing, About              │  │
│  │  /[locale]/(candidate)  → Dashboard candidato                  │  │
│  │  /[locale]/(recruiter)  → Dashboard empresa/recruiter          │  │
│  │  /[locale]/(admin)      → Panel de administración              │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                       │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │                       API Routes                                │  │
│  │  /api/webhooks/clerk    → Sincroniza usuarios con PostgreSQL   │  │
│  │  /api/webhooks/stripe   → Gestiona eventos de pago            │  │
│  │  /api/profile/*         → CRUD de perfiles                    │  │
│  │  /api/analysis/*        → Análisis IA de perfiles             │  │
│  │  /api/content/*         → Generación de posts/contenido       │  │
│  │  /api/matching/*        → Motor de matchmaking B2B            │  │
│  │  /api/jobs/*            → CRUD de ofertas de trabajo          │  │
│  └────────────────────────────────────────────────────────────────┘  │
└────────┬────────────────────┬──────────────────┬─────────────────────┘
         │                    │                  │
         ▼                    ▼                  ▼
┌────────────────┐  ┌──────────────────┐  ┌──────────────────────────┐
│   PostgreSQL   │  │ Supabase Storage │  │    SERVICIOS EXTERNOS    │
│  (Supabase)   │  │                  │  │                          │
│  + pgvector   │  │  · CVs (PDF)     │  │  ┌──────────────────┐   │
│               │  │  · Avatares      │  │  │  Clerk (Auth)    │   │
│  · Users      │  │  · Exports       │  │  └──────────────────┘   │
│  · Profiles   │  │                  │  │                          │
│  · Analysis   │  │                  │  │  ┌──────────────────┐   │
│  · Content    │  │                  │  │  │  Claude API      │   │
│  · Jobs       │  │                  │  │  │  Gemini API      │   │
│  · Embeddings │  │                  │  │  │  OpenAI Embed.   │   │
│    (vectors)  │  │                  │  │  └──────────────────┘   │
└────────────────┘  └──────────────────┘  │                          │
                                          │  ┌──────────────────┐   │
                                          │  │  Stripe (Pagos)  │   │
                                          │  └──────────────────┘   │
                                          │                          │
                                          │  ┌──────────────────┐   │
                                          │  │  Resend (Email)  │   │
                                          │  └──────────────────┘   │
                                          │                          │
                                          │  ┌──────────────────┐   │
                                          │  │  Sentry (Errors) │   │
                                          │  └──────────────────┘   │
                                          └──────────────────────────┘
```

---

## 5. Estructura de carpetas

```
linkedin-ai-strategist/
│
├── 📁 app/                              # Next.js 15 App Router (raíz)
│   │
│   ├── 📁 [locale]/                     # ⚠️ RAÍZ i18n — captura /en/... y /es/...
│   │   │
│   │   ├── 📁 (marketing)/              # Grupo: páginas públicas sin auth
│   │   │   ├── 📁 (home)/
│   │   │   │   └── page.tsx             # Landing page principal
│   │   │   ├── 📁 pricing/
│   │   │   │   ├── page.tsx             # Página de precios
│   │   │   │   └── loading.tsx
│   │   │   ├── 📁 about/
│   │   │   │   └── page.tsx
│   │   │   ├── 📁 blog/
│   │   │   │   ├── page.tsx             # Lista de posts del blog
│   │   │   │   └── 📁 [slug]/
│   │   │   │       ├── page.tsx
│   │   │   │       └── loading.tsx
│   │   │   ├── error.tsx                # Error en páginas de marketing
│   │   │   └── layout.tsx               # Layout con Navbar + Footer públicos
│   │   │
│   │   ├── 📁 (auth)/                   # Grupo: páginas de Clerk (sign-in/up)
│   │   │   ├── 📁 sign-in/
│   │   │   │   └── [[...sign-in]]/
│   │   │   │       └── page.tsx         # Página Clerk sign-in
│   │   │   ├── 📁 sign-up/
│   │   │   │   └── [[...sign-up]]/
│   │   │   │       └── page.tsx         # Página Clerk sign-up
│   │   │   └── layout.tsx               # Layout centrado para auth
│   │   │
│   │   ├── 📁 (candidate)/              # Grupo: dashboard del candidato (protegido)
│   │   │   ├── 📁 dashboard/
│   │   │   │   ├── page.tsx             # Resumen: score, últimos análisis, tareas
│   │   │   │   └── loading.tsx          # Skeleton del dashboard
│   │   │   │
│   │   │   ├── 📁 profile/
│   │   │   │   ├── page.tsx             # Ver y editar perfil de LinkedIn
│   │   │   │   ├── loading.tsx
│   │   │   │   └── error.tsx
│   │   │   │
│   │   │   ├── 📁 audit/                # 🌟 Auditoría 360°
│   │   │   │   ├── page.tsx             # Form: pega texto de LinkedIn → analiza
│   │   │   │   ├── loading.tsx          # Skeleton mientras la IA procesa
│   │   │   │   ├── error.tsx            # Error conexión IA
│   │   │   │   └── 📁 [analysisId]/
│   │   │   │       ├── page.tsx         # Resultado completo del análisis
│   │   │   │       ├── loading.tsx
│   │   │   │       └── error.tsx
│   │   │   │
│   │   │   ├── 📁 keywords/             # 🌟 SEO Keyword Optimizer
│   │   │   │   ├── page.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   └── error.tsx
│   │   │   │
│   │   │   ├── 📁 ghostwriter/          # 🌟 Generador de posts AI
│   │   │   │   ├── page.tsx             # Configura voz + tema → genera post
│   │   │   │   ├── loading.tsx
│   │   │   │   ├── error.tsx
│   │   │   │   └── 📁 history/
│   │   │   │       ├── page.tsx         # Todos los posts generados
│   │   │   │       └── loading.tsx
│   │   │   │
│   │   │   ├── 📁 roadmap/              # 🌟 Career Roadmap IA
│   │   │   │   ├── page.tsx             # Skills actuales vs objetivo → plan
│   │   │   │   ├── loading.tsx
│   │   │   │   └── error.tsx
│   │   │   │
│   │   │   ├── 📁 history/
│   │   │   │   ├── page.tsx             # Historial de todos los análisis
│   │   │   │   └── loading.tsx
│   │   │   │
│   │   │   ├── 📁 settings/
│   │   │   │   └── page.tsx             # Configuración cuenta, plan, facturación
│   │   │   │
│   │   │   ├── error.tsx                # Error global del área candidato
│   │   │   └── layout.tsx               # Sidebar + Header del área candidato
│   │   │
│   │   ├── 📁 (recruiter)/              # Grupo: dashboard del recruiter (protegido)
│   │   │   ├── 📁 dashboard/
│   │   │   │   ├── page.tsx             # Resumen: vacantes activas, matches recientes
│   │   │   │   └── loading.tsx
│   │   │   │
│   │   │   ├── 📁 jobs/                 # Gestión de ofertas de trabajo
│   │   │   │   ├── page.tsx             # Lista de ofertas
│   │   │   │   ├── loading.tsx
│   │   │   │   ├── error.tsx
│   │   │   │   ├── 📁 new/
│   │   │   │   │   └── page.tsx         # Crear nueva oferta (con IA optimizer)
│   │   │   │   └── 📁 [jobId]/
│   │   │   │       ├── page.tsx         # Detalle oferta + candidatos matcheados
│   │   │   │       ├── loading.tsx
│   │   │   │       └── error.tsx
│   │   │   │
│   │   │   ├── 📁 matching/             # 🌟 Matchmaking IA
│   │   │   │   ├── page.tsx             # Selecciona JD → ver candidatos rankeados
│   │   │   │   ├── loading.tsx
│   │   │   │   └── error.tsx
│   │   │   │
│   │   │   ├── 📁 candidates/
│   │   │   │   ├── page.tsx             # Base de candidatos (plan Enterprise)
│   │   │   │   ├── loading.tsx
│   │   │   │   └── 📁 [candidateId]/
│   │   │   │       ├── page.tsx         # Perfil completo de candidato
│   │   │   │       └── loading.tsx
│   │   │   │
│   │   │   ├── 📁 settings/
│   │   │   │   └── page.tsx             # Configuración empresa, miembros del equipo
│   │   │   │
│   │   │   ├── error.tsx
│   │   │   └── layout.tsx               # Sidebar + Header del área recruiter
│   │   │
│   │   ├── 📁 (admin)/                  # Grupo: panel de administración (solo ADMIN)
│   │   │   ├── 📁 dashboard/
│   │   │   │   └── page.tsx             # Métricas globales de la plataforma
│   │   │   ├── 📁 users/
│   │   │   │   └── page.tsx             # Gestión de todos los usuarios
│   │   │   ├── 📁 plans/
│   │   │   │   └── page.tsx             # Gestión de planes y suscripciones
│   │   │   └── layout.tsx
│   │   │
│   │   ├── not-found.tsx                # Página 404 localizada
│   │   ├── error.tsx                    # Error boundary global
│   │   ├── global-error.tsx             # Error fatal (rompe layout raíz)
│   │   └── layout.tsx                   # Root layout con Clerk + next-intl providers
│   │
│   └── 📁 api/                          # API Routes (fuera del [locale], sin i18n)
│       ├── 📁 webhooks/
│       │   ├── 📁 clerk/
│       │   │   └── route.ts             # POST: sincroniza user Clerk → PostgreSQL
│       │   └── 📁 stripe/
│       │       └── route.ts             # POST: gestiona eventos de pago
│       ├── 📁 profile/
│       │   ├── route.ts                 # GET perfil, POST crear/actualizar
│       │   └── 📁 upload/
│       │       └── route.ts             # POST: subir CV a Supabase Storage
│       ├── 📁 analysis/
│       │   ├── route.ts                 # POST: iniciar análisis 360° con IA
│       │   ├── 📁 [analysisId]/
│       │   │   └── route.ts             # GET: resultado de análisis
│       │   └── 📁 history/
│       │       └── route.ts             # GET: historial de análisis del usuario
│       ├── 📁 content/
│       │   ├── 📁 generate/
│       │   │   └── route.ts             # POST: generar post con Ghostwriter
│       │   └── 📁 history/
│       │       └── route.ts             # GET: posts generados
│       ├── 📁 keywords/
│       │   └── route.ts                 # POST: análisis SEO de keywords
│       ├── 📁 roadmap/
│       │   └── route.ts                 # POST: generar career roadmap
│       ├── 📁 jobs/
│       │   ├── route.ts                 # GET lista, POST crear oferta
│       │   └── 📁 [jobId]/
│       │       ├── route.ts             # GET, PUT, DELETE oferta
│       │       └── 📁 optimize/
│       │           └── route.ts         # POST: optimizar JD con IA
│       └── 📁 matching/
│           └── route.ts                 # POST: ejecutar matchmaking vectorial
│
├── 📁 components/
│   ├── 📁 ui/                           # Shadcn/UI + componentes base custom
│   │   ├── button.tsx                   # (generados por shadcn CLI)
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── progress.tsx
│   │   ├── skeleton.tsx
│   │   ├── tabs.tsx
│   │   ├── tooltip.tsx
│   │   └── LanguageSwitcher.tsx         # Selector EN / ES
│   │
│   ├── 📁 layout/
│   │   ├── Navbar.tsx                   # Navbar pública (marketing)
│   │   ├── Footer.tsx
│   │   ├── CandidateSidebar.tsx         # Sidebar del área candidato
│   │   ├── RecruiterSidebar.tsx         # Sidebar del área recruiter
│   │   ├── DashboardHeader.tsx          # Header común a ambos dashboards
│   │   └── MobileNav.tsx               # Navegación mobile (hamburger)
│   │
│   ├── 📁 candidate/                    # Componentes del módulo candidato
│   │   ├── ProfileForm.tsx              # Form para introducir texto del perfil LinkedIn
│   │   ├── ScoreGauge.tsx               # Indicador visual del score 0-100
│   │   ├── AnalysisResultCard.tsx       # Tarjeta con resultado del análisis
│   │   ├── KeywordBadgeList.tsx         # Lista de keywords con estado (tiene/falta)
│   │   ├── PostPreviewCard.tsx          # Preview del post generado por Ghostwriter
│   │   ├── RoadmapTimeline.tsx          # Timeline visual del Career Roadmap
│   │   ├── AuditSectionFeedback.tsx     # Feedback por sección (About, Experience...)
│   │   └── AnalysisHistoryTable.tsx     # Tabla de historial de análisis
│   │
│   ├── 📁 recruiter/                    # Componentes del módulo recruiter
│   │   ├── JobForm.tsx                  # Form crear/editar oferta de trabajo
│   │   ├── JobCard.tsx                  # Tarjeta resumen de una oferta
│   │   ├── CandidateMatchCard.tsx       # Candidato con score de match + resumen IA
│   │   ├── MatchScoreBar.tsx            # Barra visual de compatibilidad %
│   │   ├── JDOptimizerPanel.tsx         # Panel de optimización de JD con IA
│   │   └── TeamMembersList.tsx          # Lista de miembros del equipo recruiter
│   │
│   └── 📁 shared/                       # Componentes compartidos entre módulos
│       ├── PlanBadge.tsx                # Badge FREE / PRO / ENTERPRISE
│       ├── UpgradeCTA.tsx               # Banner/modal de upgrade de plan
│       ├── EmptyState.tsx               # Estado vacío genérico con ilustración
│       ├── LoadingSkeleton.tsx          # Skeleton genérico reutilizable
│       └── ErrorBoundaryFallback.tsx    # UI de error con reintentar
│
├── 📁 i18n/                             # ⚠️ Configuración de internacionalización
│   ├── routing.ts
│   ├── request.ts
│   └── 📁 messages/
│       ├── en.json                      # Todos los textos en inglés
│       └── es.json                      # Todos los textos en español
│
├── 📁 lib/
│   ├── 📁 db/
│   │   ├── prisma.ts                    # Cliente Prisma singleton
│   │   └── supabase.ts                  # Cliente Supabase (server + client)
│   ├── 📁 ai/
│   │   ├── claude.ts                    # Cliente Claude API
│   │   ├── gemini.ts                    # Cliente Gemini API
│   │   ├── embeddings.ts               # Generador de embeddings (OpenAI)
│   │   ├── prompts/
│   │   │   ├── audit.ts                 # Prompts para auditoría 360°
│   │   │   ├── keywords.ts              # Prompts para SEO optimizer
│   │   │   ├── ghostwriter.ts           # Prompts para generación de posts
│   │   │   ├── roadmap.ts               # Prompts para career roadmap
│   │   │   ├── jobOptimizer.ts          # Prompts para optimizar JD
│   │   │   └── matching.ts              # Prompts para matchmaking
│   │   └── parsers/
│   │       ├── auditParser.ts           # Parsea JSON de respuesta de auditoría
│   │       └── matchParser.ts           # Parsea JSON de respuesta de matching
│   ├── 📁 stripe/
│   │   ├── client.ts                    # Cliente Stripe
│   │   └── plans.ts                     # Definición de planes y límites
│   ├── 📁 email/
│   │   ├── resend.ts                    # Cliente Resend
│   │   └── 📁 templates/
│   │       ├── WelcomeEmail.tsx          # Email bienvenida (React Email)
│   │       ├── AnalysisReadyEmail.tsx    # Email análisis listo
│   │       └── UpgradeConfirmEmail.tsx  # Email confirmación upgrade
│   └── 📁 utils/
│       ├── formatScore.ts               # Formatea score 0-100 con color
│       ├── planLimits.ts                # Verifica límites del plan del usuario
│       └── vectorSearch.ts             # Lógica de búsqueda vectorial pgvector
│
├── 📁 types/
│   ├── user.ts
│   ├── profile.ts
│   ├── analysis.ts
│   ├── content.ts
│   ├── job.ts
│   └── matching.ts
│
├── 📁 hooks/
│   ├── useProfile.ts
│   ├── useAnalysis.ts
│   ├── useContent.ts
│   ├── useJobs.ts
│   └── usePlan.ts                       # Hook para verificar plan y límites
│
├── 📁 prisma/
│   └── schema.prisma                    # Schema completo de la base de datos
│
├── middleware.ts                        # Clerk auth + next-intl locale routing
├── next.config.ts
├── tailwind.config.ts
├── components.json                      # Config Shadcn/UI
└── tsconfig.json
```

---

## 6. Modelo de datos

### Schema Prisma completo

```prisma
// prisma/schema.prisma

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions"]
}

datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")
  directUrl  = env("DIRECT_URL")
  extensions = [pgvector(map: "vector")]  // Para matchmaking semántico
}

// ─────────────────────────────────────────
// USUARIOS Y PERFILES
// ─────────────────────────────────────────

model User {
  id            String   @id @default(cuid())
  clerkId       String   @unique          // ID del usuario en Clerk
  email         String   @unique
  name          String?
  imageUrl      String?
  role          UserRole @default(CANDIDATE)
  plan          PlanType @default(FREE)
  planExpiresAt DateTime?
  stripeCustomerId String? @unique

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // Relaciones candidato
  profile            Profile?
  analysisHistory    AnalysisHistory[]
  generatedContent   GeneratedContent[]

  // Relaciones recruiter
  organization       Organization?     @relation(fields: [organizationId], references: [id])
  organizationId     String?
  jobPositions       JobPosition[]

  // Uso de la plataforma (para límites de plan)
  monthlyAnalysisCount  Int @default(0)
  monthlyContentCount   Int @default(0)
  lastResetAt           DateTime @default(now())

  @@map("users")
}

model Profile {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Datos del perfil LinkedIn
  linkedinUrl     String?
  headline        String?
  aboutText       String?  @db.Text
  experienceJson  Json?    // Array de posiciones
  educationJson   Json?    // Array de educación
  skillsList      String[] // Array de habilidades
  languagesList   String[] // Array de idiomas

  // Objetivo profesional
  targetRole      String?
  targetIndustry  String?
  targetLocation  String?

  // Score más reciente
  latestScore     Int?
  lastAnalyzedAt  DateTime?

  // Vector embedding del perfil (para matchmaking)
  embedding       Unsupported("vector(1536)")?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@map("profiles")
}

// ─────────────────────────────────────────
// ANÁLISIS Y CONTENIDO (MÓDULO CANDIDATO)
// ─────────────────────────────────────────

model AnalysisHistory {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Input del análisis
  profileSnapshot String  @db.Text   // Texto del perfil en el momento del análisis
  targetRole      String?

  // Output del análisis IA
  overallScore    Int                // 0-100
  scoreBreakdown  Json               // { headline: 80, about: 65, experience: 90, ... }
  strengths       String[]           // Puntos fuertes detectados
  improvements    String[]           // Áreas de mejora
  keywordsMissing String[]           // Keywords que faltan
  keywordsPresent String[]           // Keywords que ya tiene
  rewrittenAbout  String? @db.Text   // Sugerencia de reescritura del About
  actionItems     Json               // Lista priorizada de acciones concretas
  rawAiResponse   String? @db.Text   // Respuesta completa de la IA (para debug)

  // Metadatos
  aiModel         String             // "claude-3-5-sonnet" / "gemini-pro"
  processingMs    Int?

  createdAt       DateTime @default(now())

  @@map("analysis_history")
}

model GeneratedContent {
  id       String   @id @default(cuid())
  userId   String
  user     User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Configuración de la generación
  contentType     ContentType        // POST, ARTICLE, COMMENT, HEADLINE
  topic           String
  tone            String             // "professional", "casual", "thought-leader"
  targetAudience  String?

  // Contenido generado
  body            String @db.Text    // El contenido en sí
  hashtags        String[]           // Hashtags sugeridos
  estimatedReach  String?            // "Alta", "Media", "Baja"

  // Estado
  status          ContentStatus @default(DRAFT)
  publishedAt     DateTime?
  platform        String @default("linkedin")

  // Metadatos
  aiModel         String
  processingMs    Int?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@map("generated_content")
}

model CareerRoadmap {
  id       String   @id @default(cuid())
  userId   String   @unique

  currentSkills   String[]
  targetRole      String
  skillsGap       Json      // Array de skills a aprender con recursos
  timelineMonths  Int       // Meses estimados para alcanzar el objetivo
  milestones      Json      // Hitos del roadmap con fechas estimadas
  resources       Json      // Cursos, libros, proyectos recomendados

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@map("career_roadmaps")
}

// ─────────────────────────────────────────
// MÓDULO RECRUITER / EMPRESA
// ─────────────────────────────────────────

model Organization {
  id          String  @id @default(cuid())
  clerkOrgId  String  @unique              // ID de organización en Clerk
  name        String
  logoUrl     String?
  website     String?
  industry    String?
  size        String?                      // "1-10", "11-50", "51-200", etc.

  plan        PlanType @default(FREE)
  planExpiresAt DateTime?
  stripeCustomerId String? @unique

  members     User[]
  jobs        JobPosition[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("organizations")
}

model JobPosition {
  id            String   @id @default(cuid())
  recruiterId   String
  recruiter     User     @relation(fields: [recruiterId], references: [id])
  organizationId String?

  // Datos de la oferta
  title         String
  description   String   @db.Text          // JD original
  optimizedDescription String? @db.Text   // JD optimizada por IA
  requirements  String[]
  niceToHave    String[]
  location      String?
  modality      String?                    // "remote", "hybrid", "on-site"
  salaryRange   String?
  industry      String?
  experienceYears Int?

  // Estado
  status        JobStatus @default(DRAFT)
  publishedAt   DateTime?
  closedAt      DateTime?

  // Vector embedding de la oferta (para matchmaking)
  embedding     Unsupported("vector(1536)")?

  // Métricas
  viewCount     Int @default(0)
  matchCount    Int @default(0)

  matches       JobMatch[]

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@map("job_positions")
}

model JobMatch {
  id            String   @id @default(cuid())
  jobId         String
  job           JobPosition @relation(fields: [jobId], references: [id], onDelete: Cascade)
  candidateProfileId String

  // Resultado del matching
  matchScore    Float                      // 0.0 - 1.0 (similitud vectorial)
  strengthsList String[]                   // Fortalezas del candidato para este rol
  gapsList      String[]                   // Carencias del candidato para este rol
  aiFeedback    String? @db.Text           // Resumen IA del match
  coverLetter   String? @db.Text           // Carta de presentación generada

  // Estado de la revisión del recruiter
  status        MatchStatus @default(PENDING)
  recruiterNote String?

  createdAt     DateTime @default(now())

  @@unique([jobId, candidateProfileId])
  @@map("job_matches")
}

// ─────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────

enum UserRole {
  CANDIDATE
  RECRUITER
  ADMIN
}

enum PlanType {
  FREE
  PRO
  ENTERPRISE
}

enum ContentType {
  POST
  ARTICLE
  COMMENT
  HEADLINE
  ABOUT_REWRITE
}

enum ContentStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

enum JobStatus {
  DRAFT
  PUBLISHED
  PAUSED
  CLOSED
}

enum MatchStatus {
  PENDING       // Aún no revisado por recruiter
  SHORTLISTED   // Marcado como interesante
  CONTACTED     // Recruiter contactó al candidato
  REJECTED      // Descartado
}
```

---

## 7. Internacionalización (i18n)

### Librería: `next-intl`

La app es bilingüe desde el primer día: **Inglés (EN)** y **Español (ES)**.

- El mercado hispanohablante (España + Latam) es el target principal
- El inglés permite escalar a mercado internacional y atraer recruiters globales
- Las URLs quedan limpias: `/en/dashboard` y `/es/dashboard`

### Configuración

**`middleware.ts`** — Combina Clerk (auth) + next-intl (locale):

```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

const isProtectedRoute = createRouteMatcher([
    "/:locale/dashboard(.*)",
    "/:locale/audit(.*)",
    "/:locale/keywords(.*)",
    "/:locale/ghostwriter(.*)",
    "/:locale/roadmap(.*)",
    "/:locale/jobs(.*)",
    "/:locale/matching(.*)",
    "/:locale/candidates(.*)",
    "/:locale/settings(.*)",
    "/:locale/admin(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
        await auth.protect();
    }
    return intlMiddleware(req);
});

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

**`i18n/routing.ts`:**

```typescript
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["en", "es"],
    defaultLocale: "en",
    localePrefix: "always",
});
```

### Estructura de traducciones

```json
// i18n/messages/en.json
{
    "common": {
        "loading": "Loading...",
        "error": "Something went wrong",
        "retry": "Try again",
        "save": "Save",
        "cancel": "Cancel",
        "upgrade": "Upgrade plan",
        "freePlan": "Free",
        "proPlan": "Pro",
        "enterprisePlan": "Enterprise"
    },
    "nav": {
        "dashboard": "Dashboard",
        "audit": "Profile Audit",
        "keywords": "Keyword Optimizer",
        "ghostwriter": "AI Ghostwriter",
        "roadmap": "Career Roadmap",
        "jobs": "Job Positions",
        "matching": "AI Matching",
        "candidates": "Candidates",
        "settings": "Settings"
    },
    "audit": {
        "title": "Profile Audit 360°",
        "subtitle": "Paste your LinkedIn profile and get an AI-powered employability score",
        "placeholder": "Paste your LinkedIn About section and work experience here...",
        "analyzeButton": "Analyze my profile",
        "analyzing": "Analyzing your profile with AI...",
        "score": "Employability Score",
        "strengths": "Strengths",
        "improvements": "Areas to improve",
        "missingKeywords": "Missing keywords",
        "actionPlan": "Action plan"
    },
    "ghostwriter": {
        "title": "AI Ghostwriter",
        "subtitle": "Generate LinkedIn posts in your voice",
        "topicLabel": "What do you want to post about?",
        "toneLabel": "Tone",
        "tones": {
            "professional": "Professional",
            "casual": "Casual",
            "thoughtLeader": "Thought Leader"
        },
        "generateButton": "Generate post",
        "generating": "Writing your post...",
        "copyButton": "Copy to clipboard",
        "regenerate": "Regenerate"
    },
    "matching": {
        "title": "AI Matching",
        "subtitle": "Find the most compatible candidates for each position",
        "selectJob": "Select a job position",
        "runMatching": "Run AI matching",
        "processing": "Comparing profiles with AI...",
        "matchScore": "Match score",
        "strengths": "Candidate strengths",
        "gaps": "Skill gaps",
        "generateCoverLetter": "Generate cover letter"
    },
    "plans": {
        "limitReached": "You've reached your plan limit",
        "upgradeMessage": "Upgrade to Pro to continue using this feature",
        "freeLimit": "{{count}} analyses per month on the free plan"
    },
    "errors": {
        "notFound": "Page not found",
        "serverError": "Server error. Please try again.",
        "aiUnavailable": "AI service temporarily unavailable",
        "profileLoad": "Could not load your profile",
        "unauthorized": "You need to sign in to access this page",
        "planRequired": "This feature requires a Pro or Enterprise plan"
    }
}
```

```json
// i18n/messages/es.json
{
    "common": {
        "loading": "Cargando...",
        "error": "Algo salió mal",
        "retry": "Intentar de nuevo",
        "save": "Guardar",
        "cancel": "Cancelar",
        "upgrade": "Mejorar plan",
        "freePlan": "Gratuito",
        "proPlan": "Pro",
        "enterprisePlan": "Empresa"
    },
    "nav": {
        "dashboard": "Panel principal",
        "audit": "Auditoría de perfil",
        "keywords": "Optimizador SEO",
        "ghostwriter": "Ghostwriter IA",
        "roadmap": "Mapa de carrera",
        "jobs": "Ofertas de trabajo",
        "matching": "Matching IA",
        "candidates": "Candidatos",
        "settings": "Configuración"
    },
    "audit": {
        "title": "Auditoría de Perfil 360°",
        "subtitle": "Pega tu perfil de LinkedIn y obtén un score de empleabilidad con IA",
        "placeholder": "Pega aquí tu sección About y experiencia laboral de LinkedIn...",
        "analyzeButton": "Analizar mi perfil",
        "analyzing": "Analizando tu perfil con IA...",
        "score": "Score de Empleabilidad",
        "strengths": "Puntos fuertes",
        "improvements": "Áreas de mejora",
        "missingKeywords": "Keywords que te faltan",
        "actionPlan": "Plan de acción"
    },
    "ghostwriter": {
        "title": "Ghostwriter IA",
        "subtitle": "Genera posts de LinkedIn en tu voz",
        "topicLabel": "¿Sobre qué quieres publicar?",
        "toneLabel": "Tono",
        "tones": {
            "professional": "Profesional",
            "casual": "Informal",
            "thoughtLeader": "Líder de opinión"
        },
        "generateButton": "Generar post",
        "generating": "Escribiendo tu post...",
        "copyButton": "Copiar al portapapeles",
        "regenerate": "Regenerar"
    },
    "matching": {
        "title": "Matching IA",
        "subtitle": "Encuentra los candidatos más compatibles para cada vacante",
        "selectJob": "Selecciona una oferta de trabajo",
        "runMatching": "Ejecutar matching IA",
        "processing": "Comparando perfiles con IA...",
        "matchScore": "Score de compatibilidad",
        "strengths": "Puntos fuertes del candidato",
        "gaps": "Carencias de habilidades",
        "generateCoverLetter": "Generar carta de presentación"
    },
    "plans": {
        "limitReached": "Has alcanzado el límite de tu plan",
        "upgradeMessage": "Mejora a Pro para seguir usando esta función",
        "freeLimit": "{{count}} análisis por mes en el plan gratuito"
    },
    "errors": {
        "notFound": "Página no encontrada",
        "serverError": "Error del servidor. Por favor inténtalo de nuevo.",
        "aiUnavailable": "Servicio de IA temporalmente no disponible",
        "profileLoad": "No se pudo cargar tu perfil",
        "unauthorized": "Necesitas iniciar sesión para acceder a esta página",
        "planRequired": "Esta función requiere un plan Pro o Enterprise"
    }
}
```

### Archivos especiales de Next.js (obligatorios)

> ⚠️ Estos archivos son **imprescindibles**. Sin ellos la UX es deficiente.

| Archivo            | Cuándo se activa                                | Qué debe mostrar                 |
| ------------------ | ----------------------------------------------- | -------------------------------- |
| `loading.tsx`      | Durante navegación o fetch de Server Components | Skeleton de la página específica |
| `error.tsx`        | Cuando un Server Component lanza un error       | UI de error + botón reintentar   |
| `not-found.tsx`    | Al llamar `notFound()` o ruta inexistente       | Página 404 con navegación        |
| `global-error.tsx` | Error que rompe el layout raíz                  | Fallback mínimo sin layout       |

**Regla:** Cada ruta del (candidate) y (recruiter) tiene su propio `loading.tsx` y `error.tsx`. Los errores de un módulo no afectan a los demás.

```typescript
// Ejemplo: app/[locale]/(candidate)/audit/error.tsx
'use client'  // ⚠️ SIEMPRE Client Component
import { useTranslations } from 'next-intl'

export default function AuditError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('errors')
  return (
    <div className="flex flex-col items-center justify-center min-h-100 gap-4">
      <p className="text-destructive font-medium">{t('aiUnavailable')}</p>
      <button onClick={reset} className="btn-primary">{t('retry')}</button>
    </div>
  )
}
```

---

## 8. Flujo de la aplicación

### Flujo candidato nuevo

```
[LANDING PAGE]
       │ Clic en "Get Started"
       ▼
[SIGN UP — Clerk]
  → Elige rol: Candidato o Empresa
  → Email / Google / LinkedIn OAuth
       │ Webhook Clerk → crea User en PostgreSQL
       ▼
[ONBOARDING — 3 pasos]
  Paso 1: Datos básicos (nombre, URL LinkedIn, sector)
  Paso 2: Objetivo profesional (rol deseado, industria, ubicación)
  Paso 3: Pegar texto del perfil LinkedIn (About + Experience)
       │
       ▼
[PRIMERA AUDITORÍA AUTOMÁTICA]
  → Se lanza el análisis 360° inmediatamente
  → Loading con mensaje motivacional
       │
       ▼
[DASHBOARD CANDIDATO]
  ├── Score de empleabilidad (gauge 0-100)
  ├── Top 3 mejoras urgentes
  ├── Keywords que faltan (con botón de copiar)
  └── Acceso rápido a Ghostwriter y Roadmap
```

### Flujo del análisis IA (Audit 360°)

```
POST /api/analysis
       │
       ├── 1. Verificar límites del plan del usuario
       ├── 2. Obtener perfil del usuario (PostgreSQL)
       ├── 3. Construir prompt con perfil + rol objetivo
       │
       ▼
Claude API (streaming opcional para UX)
       │
       ▼
Parser: extrae JSON estructurado
  {
    overallScore: 73,
    scoreBreakdown: { headline: 80, about: 65, ... },
    strengths: [...],
    improvements: [...],
    keywordsMissing: [...],
    rewrittenAbout: "...",
    actionItems: [...]
  }
       │
       ▼
Guardar en AnalysisHistory (PostgreSQL)
Incrementar contador mensual del usuario
       │
       ▼
Generar embedding del perfil → guardar en Profile.embedding
(Esto alimenta el matchmaking B2B)
       │
       ▼
Retornar resultado al cliente
Enviar email "Tu análisis está listo" (Resend)
```

### Flujo del matchmaking B2B

```
Recruiter selecciona Job Position
       │
       ▼
POST /api/matching { jobId }
       │
       ├── 1. Obtener embedding de la oferta (JobPosition.embedding)
       │   Si no existe → generar con OpenAI → guardar
       │
       ├── 2. Búsqueda vectorial en PostgreSQL:
       │   SELECT profiles.*,
       │     1 - (embedding <=> job_embedding) AS similarity
       │   FROM profiles
       │   WHERE similarity > 0.65
       │   ORDER BY similarity DESC
       │   LIMIT 20
       │
       ├── 3. Para cada candidato top-10:
       │   → Llamada a Claude con JD + perfil del candidato
       │   → Genera: strengths, gaps, cover letter personalizada
       │
       ├── 4. Guardar resultados en JobMatch
       │
       ▼
Mostrar ranking de candidatos con:
  - Score de compatibilidad (%)
  - Resumen de por qué encaja
  - Carencias a evaluar
  - Carta de contacto lista para copiar
```

---

## 9. Módulo de Inteligencia Artificial

### Arquitectura de prompts

Cada funcionalidad tiene su propio archivo de prompt en `lib/ai/prompts/`. Los prompts siguen una estructura consistente:

```typescript
// lib/ai/prompts/audit.ts

export const AUDIT_SYSTEM_PROMPT = `You are a senior LinkedIn profile strategist and personal branding expert with 15+ years of experience in recruitment and talent acquisition.

Your task is to perform a comprehensive 360° audit of a LinkedIn profile.

SCORING CRITERIA (each section 0-100):
- Headline (15% weight): Clarity, keywords, value proposition
- About/Summary (25% weight): Hook, storytelling, keywords, CTA
- Experience (30% weight): Quantified achievements, action verbs, relevance
- Skills (15% weight): Relevance to target role, completeness
- Overall Presence (15% weight): Profile completeness, consistency

KEYWORDS DATABASE:
You know the most searched keywords by recruiters for each role/industry. Compare the profile against this knowledge.

OUTPUT FORMAT: Respond ONLY with valid JSON, no markdown, no extra text:
{
  "overallScore": <0-100>,
  "scoreBreakdown": {
    "headline": <0-100>,
    "about": <0-100>,
    "experience": <0-100>,
    "skills": <0-100>,
    "presence": <0-100>
  },
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "improvements": [
    { "priority": "high", "section": "about", "issue": "...", "fix": "..." },
    { "priority": "medium", "section": "headline", "issue": "...", "fix": "..." }
  ],
  "keywordsPresent": ["keyword1", "keyword2"],
  "keywordsMissing": ["keyword3", "keyword4"],
  "rewrittenAbout": "<improved about section text>",
  "actionItems": [
    { "order": 1, "action": "...", "impact": "high", "timeToImplement": "10 min" }
  ]
}`;

export function buildAuditPrompt(
    profileText: string,
    targetRole: string,
    language: "en" | "es",
): string {
    const langInstruction =
        language === "es"
            ? "Write all text values in Spanish."
            : "Write all text values in English.";

    return `${langInstruction}

PROFILE TO ANALYZE:
Target Role: ${targetRole}

${profileText}

Perform the complete 360° audit following the system instructions.`;
}
```

### Motor de matchmaking vectorial

```typescript
// lib/utils/vectorSearch.ts
import { prisma } from "@/lib/db/prisma";

export async function findMatchingCandidates(
    jobEmbedding: number[],
    minSimilarity: number = 0.65,
    limit: number = 20,
) {
    // pgvector: operador <=> = distancia coseno
    const results = await prisma.$queryRaw`
    SELECT
      p.id,
      p."userId",
      p.headline,
      p."aboutText",
      p."skillsList",
      p."targetRole",
      1 - (p.embedding <=> ${jobEmbedding}::vector) AS similarity
    FROM profiles p
    WHERE p.embedding IS NOT NULL
      AND 1 - (p.embedding <=> ${jobEmbedding}::vector) > ${minSimilarity}
    ORDER BY similarity DESC
    LIMIT ${limit}
  `;
    return results;
}
```

### Ghostwriter — aprendizaje de voz

```typescript
// El prompt de ghostwriter incluye ejemplos de posts anteriores del usuario
// para aprender su estilo y voz antes de generar nuevo contenido

export function buildGhostwriterPrompt(
    topic: string,
    tone: string,
    userBio: string,
    previousPosts: string[], // Últimos 3-5 posts del usuario
    language: "en" | "es",
): string {
    const langInstruction =
        language === "es"
            ? "Escribe el post completamente en español."
            : "Write the post entirely in English.";

    const styleExamples =
        previousPosts.length > 0
            ? `USER'S WRITING STYLE (learn and replicate):
${previousPosts.map((p, i) => `--- Example ${i + 1} ---\n${p}`).join("\n\n")}`
            : `No previous posts available. Create an authentic, ${tone} voice.`;

    return `${langInstruction}

USER PROFILE:
${userBio}

${styleExamples}

TASK: Write a LinkedIn post about: "${topic}"
Tone: ${tone}

Requirements:
- Match the user's writing style from the examples
- 150-300 words ideal length
- Include a hook in the first line (no question marks in hooks)
- End with a subtle CTA or reflection
- Generate 5 relevant hashtags

Respond ONLY with JSON:
{
  "body": "<post content>",
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"],
  "estimatedReach": "high|medium|low",
  "bestTimeToPost": "<day and time recommendation>"
}`;
}
```

---

## 10. Sistema de Planes y Monetización

### Definición de planes

```typescript
// lib/stripe/plans.ts

export const PLANS = {
    FREE: {
        name: "Free",
        price: 0,
        limits: {
            analysisPerMonth: 3, // Auditorías 360° al mes
            contentPerMonth: 5, // Posts generados al mes
            savedAnalyses: 10, // Análisis guardados en historial
            jobPositions: 0, // Ofertas de trabajo (solo B2B)
            matchingPerMonth: 0, // Matchmaking (solo B2B)
            keywordOptimizations: 2, // Análisis de keywords al mes
        },
    },
    PRO: {
        name: "Pro",
        price: 19, // €19/mes
        stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
        limits: {
            analysisPerMonth: 30,
            contentPerMonth: 60,
            savedAnalyses: -1, // Ilimitado (-1 = sin límite)
            jobPositions: 0,
            matchingPerMonth: 0,
            keywordOptimizations: -1,
        },
    },
    ENTERPRISE: {
        name: "Enterprise",
        price: 99, // €99/mes por organización
        stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
        limits: {
            analysisPerMonth: -1,
            contentPerMonth: -1,
            savedAnalyses: -1,
            jobPositions: -1, // Ofertas ilimitadas
            matchingPerMonth: -1, // Matching ilimitado
            keywordOptimizations: -1,
            teamMembers: 10, // Hasta 10 recruiters por organización
        },
    },
} as const;

// Hook para verificar límites antes de cada acción
export function checkPlanLimit(
    currentCount: number,
    planLimit: number,
): { allowed: boolean; remaining: number } {
    if (planLimit === -1) return { allowed: true, remaining: -1 };
    return {
        allowed: currentCount < planLimit,
        remaining: Math.max(0, planLimit - currentCount),
    };
}
```

---

## 11. APIs externas e integraciones

### Variables de entorno necesarias

```env
# .env.example

# Base de datos (Supabase)
DATABASE_URL="postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://[project].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Autenticación (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/en/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/en/sign-up"
CLERK_WEBHOOK_SECRET="whsec_..."

# IA
ANTHROPIC_API_KEY="sk-ant-..."
GOOGLE_GEMINI_API_KEY="AIza..."
OPENAI_API_KEY="sk-..."             # Solo para embeddings

# Pagos (Stripe)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."
STRIPE_SECRET_KEY="sk_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRO_PRICE_ID="price_..."
STRIPE_ENTERPRISE_PRICE_ID="price_..."

# Email (Resend)
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@linkedinaistrategist.com"

# Monitorización
SENTRY_DSN="https://...@sentry.io/..."
NEXT_PUBLIC_SENTRY_DSN="https://...@sentry.io/..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Webhook de Clerk — sincronización de usuarios

```typescript
// app/api/webhooks/clerk/route.ts
// Cada vez que un usuario se registra en Clerk,
// este webhook crea el registro en nuestra PostgreSQL

import { Webhook } from "svix";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
    const payload = await req.text();
    const headers = Object.fromEntries(req.headers);

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
    const event = wh.verify(payload, headers) as any;

    if (event.type === "user.created") {
        await prisma.user.create({
            data: {
                clerkId: event.data.id,
                email: event.data.email_addresses[0].email_address,
                name: `${event.data.first_name} ${event.data.last_name}`.trim(),
                imageUrl: event.data.image_url,
                // El rol lo elige el usuario en el onboarding
            },
        });
    }

    return Response.json({ received: true });
}
```

---

## 12. Fases de desarrollo

### Fase 1 — Fundamentos (Semana 1-2)

**Objetivo:** Estructura del proyecto completa y funcional

- [ ] Inicializar Next.js 15 con TypeScript + Tailwind + Shadcn/UI
- [ ] Configurar `next-intl` con soporte EN + ES (routing + messages)
- [ ] Crear todos los archivos `loading.tsx`, `error.tsx`, `not-found.tsx` en cada ruta
- [ ] Configurar Clerk (auth, webhooks, roles CANDIDATE/RECRUITER)
- [ ] Configurar Supabase + Prisma (ejecutar migraciones con schema completo)
- [ ] Activar extensión `pgvector` en Supabase
- [ ] Webhook Clerk → crear User en PostgreSQL
- [ ] Layouts base: Navbar pública, Sidebar candidato, Sidebar recruiter
- [ ] Componente `LanguageSwitcher` en header
- [ ] Middleware combinado Clerk + next-intl

**Entregable:** Usuario puede registrarse, ver su rol y navegar por el dashboard vacío en EN o ES

---

### Fase 2 — Perfil de usuario y onboarding (Semana 3)

**Objetivo:** Captura de datos del usuario

- [ ] Flujo de onboarding en 3 pasos (con `next/navigation` y estado)
- [ ] `ProfileForm` para pegar texto de LinkedIn
- [ ] CRUD de perfil (API routes + Prisma)
- [ ] Subida de avatar/foto a Supabase Storage
- [ ] Página de perfil completa con datos guardados
- [ ] Validación de formularios con Zod

**Entregable:** Usuario completa su perfil y datos son persistidos en PostgreSQL

---

### Fase 3 — Auditoría 360° (Semana 4-5)

**Objetivo:** El corazón del módulo candidato

- [ ] Integración Claude API con manejo de errores robusto
- [ ] Prompt de auditoría completo con output JSON estructurado
- [ ] Parser de respuesta con validación de esquema (Zod)
- [ ] API route `/api/analysis` con verificación de límites de plan
- [ ] Generación de embeddings del perfil (OpenAI) → guardar en pgvector
- [ ] Componente `ScoreGauge` (indicador visual animado 0-100)
- [ ] Componente `AuditSectionFeedback` por cada sección
- [ ] Componente `KeywordBadgeList` (keywords presentes vs. ausentes)
- [ ] Historial de análisis con tabla paginada
- [ ] Email de "análisis listo" con Resend

**Entregable:** Usuario puede analizar su perfil y ver resultado detallado con score, keywords y plan de acción

---

### Fase 4 — Ghostwriter AI (Semana 6)

**Objetivo:** Generador de contenido personalizado

- [ ] Prompt de ghostwriter con aprendizaje de voz
- [ ] UI de configuración: tema, tono, audiencia
- [ ] Preview del post generado con opción de regenerar
- [ ] Copiado al portapapeles con feedback visual
- [ ] Historial de posts generados
- [ ] Contador de uso mensual visible en UI

**Entregable:** Candidato puede generar posts en su estilo y guardarlos

---

### Fase 5 — SEO Keywords + Career Roadmap (Semana 7)

**Objetivo:** Completar módulo candidato

- [ ] Keyword optimizer: comparar perfil vs. keywords del sector objetivo
- [ ] Visualización de keywords: tiene ✅ / falta ❌ / parcial ⚠️
- [ ] Career Roadmap: input skills actuales + rol objetivo → plan con recursos
- [ ] Timeline visual del roadmap con hitos y fechas estimadas
- [ ] Recursos recomendados (cursos, libros, proyectos)

**Entregable:** Módulo candidato completo (B2C listo para lanzar)

---

### Fase 6 — Módulo Recruiter B2B (Semana 8-9)

**Objetivo:** CRUD de ofertas + matchmaking

- [ ] Clerk Organizations para gestión de equipos de empresa
- [ ] CRUD completo de Job Positions
- [ ] Generador de JD optimizadas con IA
- [ ] Motor de matchmaking vectorial (pgvector)
- [ ] UI de resultados con ranking de candidatos
- [ ] Generador de cartas de contacto personalizadas por candidato
- [ ] Sistema de estados de match (PENDING/SHORTLISTED/CONTACTED/REJECTED)

**Entregable:** Recruiter puede publicar vacantes, ejecutar matching y contactar candidatos

---

### Fase 7 — Monetización (Semana 10)

**Objetivo:** Stripe integrado y planes funcionando

- [ ] Integración Stripe Checkout y Customer Portal
- [ ] Webhook Stripe → actualizar plan en PostgreSQL
- [ ] Verificación de límites en todas las API routes
- [ ] Componente `UpgradeCTA` con modal atractivo
- [ ] Página de Pricing con comparativa de planes
- [ ] Email de confirmación de pago/upgrade

**Entregable:** Usuarios pueden pagar y la app respeta los límites de cada plan

---

### Fase 8 — Pulido y producción (Semana 11-12)

**Objetivo:** Listo para usuarios reales

- [ ] Sentry configurado para monitorización de errores
- [ ] Tests E2E con Playwright (flujos críticos: registro, análisis, pago)
- [ ] Optimización de rendimiento (lazy loading, suspense boundaries)
- [ ] SEO: meta tags, Open Graph, sitemap.xml
- [ ] Landing page pulida con demos animadas
- [ ] README impecable en GitHub con documentación técnica
- [ ] Deploy en Vercel con variables de entorno de producción
- [ ] Rate limiting en API routes (evitar abuso)
- [ ] GDPR: política de privacidad, cookies, eliminación de cuenta

---

## 13. Estado actual del proyecto

> 📅 **Última actualización:** Fase 0 — Planificación completada

### ✅ Completado

- [x] Definición completa del producto y visión
- [x] Elección definitiva del stack tecnológico
- [x] Diseño de arquitectura del sistema
- [x] Estructura de carpetas completa
- [x] Schema de base de datos (Prisma + pgvector)
- [x] Diseño del sistema de i18n (EN + ES)
- [x] Prompts de IA diseñados (audit, ghostwriter, matching)
- [x] Sistema de planes y monetización definido
- [x] Documentación completa del proyecto (este archivo)

### 🔄 Próximo paso inmediato

```bash
# FASE 1: Ejecutar este comando para iniciar el proyecto
npx create-next-app@latest linkedin-ai-strategist \
  --typescript \
  --tailwind \
  --app \
  --import-alias="@/*"
```

### ❌ Pendiente

- Todo el desarrollo (ver Fases 1-8)

---

## 14. Decisiones técnicas tomadas

| Decisión       | Elección                      | Alternativa descartada | Motivo                                                       |
| -------------- | ----------------------------- | ---------------------- | ------------------------------------------------------------ |
| Framework      | Next.js 15                    | Remix / Vite           | Estándar del mercado, SSR, mejor ecosistema                  |
| UI Components  | Shadcn/UI + Tailwind          | MUI / Chakra           | Sin vendor lock-in, full control del código                  |
| Auth           | Clerk                         | NextAuth v5            | Gestión de organizaciones nativa (B2B), roles out-of-the-box |
| DB             | PostgreSQL (Supabase)         | PlanetScale / MongoDB  | pgvector integrado, Storage, RLS, dashboard visual           |
| Vector Search  | pgvector                      | Pinecone / Weaviate    | Misma DB = queries JOIN, sin servicio extra                  |
| IA principal   | Claude (Anthropic)            | OpenAI GPT-4o          | Mejor escritura en español, JSON output más fiable           |
| IA backup      | Gemini Pro                    | GPT-3.5                | Más barato para análisis masivos, buena calidad              |
| Embeddings     | OpenAI text-embedding-3-small | Cohere                 | Mejor calidad/precio para matchmaking semántico              |
| Pagos          | Stripe                        | LemonSqueezy           | Más robusto, mejor soporte de organizaciones B2B             |
| Email          | Resend + React Email          | SendGrid               | API moderna, templates en JSX/TSX                            |
| i18n           | next-intl                     | react-i18next          | Integración nativa App Router, soporte SSR/RSC               |
| Monitorización | Sentry                        | Datadog / LogRocket    | Gratuito para startups, integración Next.js excelente        |
| Deploy         | Vercel                        | Railway / Render       | Optimizado para Next.js, Edge Functions, Analytics           |

---

## 15. Instrucciones para continuar el desarrollo

> 🤖 **Si eres una IA leyendo esto**, sigue estas reglas sin excepción.

### Reglas absolutas del proyecto

1. **TypeScript estricto siempre** — nunca `any`, siempre tipos explícitos
2. **Shadcn/UI para componentes UI** — no reinventes botones ni inputs
3. **La estructura de carpetas es sagrada** — no crear archivos fuera del lugar definido
4. **Cada ruta DEBE tener `loading.tsx` y `error.tsx`** — sin excepciones
5. **Todos los textos en componentes usan `useTranslations()`** — cero textos hardcodeados
6. **Verificar límites de plan antes de cualquier llamada a la IA** — nunca saltarse este paso
7. **Los prompts de IA siempre incluyen la instrucción de idioma** — según el locale activo
8. **Usar Server Components por defecto** — `'use client'` solo cuando sea necesario
9. **Validar inputs con Zod** — en API routes y formularios
10. **Manejar errores explícitamente** — nunca `catch (e) { console.log(e) }` sin más

### Convenciones de código

```typescript
// ✅ Nombres de archivos: PascalCase para componentes, camelCase para utils
// ScoreGauge.tsx, buildAuditPrompt.ts, formatScore.ts

// ✅ Server Component por defecto (sin directive)
export default async function AuditPage() {
  const session = await currentUser() // Clerk server-side
  const analyses = await getAnalysisHistory(session.id)
  return <AnalysisHistoryTable data={analyses} />
}

// ✅ Client Component solo cuando hay interactividad
'use client'
export function GhostwriterForm() {
  const [isGenerating, setIsGenerating] = useState(false)
  // ...
}

// ✅ API Routes con manejo de errores y validación
export async function POST(req: Request) {
  try {
    const { userId } = await currentUser()
    const body = await req.json()
    const parsed = AuditInputSchema.parse(body) // Zod

    const user = await prisma.user.findUnique({ where: { clerkId: userId } })
    if (!user) return Response.json({ error: 'User not found' }, { status: 404 })

    const { allowed } = checkPlanLimit(user.monthlyAnalysisCount, PLANS[user.plan].limits.analysisPerMonth)
    if (!allowed) return Response.json({ error: 'plan_limit_reached' }, { status: 402 })

    // ... lógica principal

    return Response.json({ data: result })
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({ error: 'Invalid input', details: error.errors }, { status: 400 })
    }
    console.error('[ANALYSIS_ERROR]', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ✅ Variables de entorno con validación al inicio
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
if (!ANTHROPIC_API_KEY) throw new Error('Missing ANTHROPIC_API_KEY')
```

### Cómo continuar en cada sesión

**Al inicio de cada sesión de desarrollo, di:**

> _"Estoy trabajando en el proyecto LinkedIn AI Strategist. Aquí está el documento maestro: [pega este archivo]. Actualmente estoy en la Fase X. El último archivo que terminé fue [nombre]. Ahora necesito [tarea específica]."_

**Al terminar una tarea:**

> _"He completado [tarea]. Aquí está el código: [pega código]. Marca este item como ✅ en el documento y dime el siguiente paso de la Fase X."_

### Comandos de referencia rápida

```bash
# Instalar dependencias
npm install next-intl @clerk/nextjs @prisma/client prisma
npm install @anthropic-ai/sdk @google/generative-ai openai
npm install stripe @stripe/stripe-js resend
npm install @sentry/nextjs zod
npx shadcn@latest init

# Inicializar Prisma con Supabase
npx prisma init --datasource-provider postgresql
npx prisma db push        # Aplicar schema sin migración
npx prisma generate       # Regenerar cliente

# Activar pgvector en Supabase (ejecutar en SQL Editor de Supabase)
# CREATE EXTENSION IF NOT EXISTS vector;

# Añadir componentes Shadcn
npx shadcn@latest add button card badge dialog input textarea
npx shadcn@latest add progress skeleton tabs tooltip

# Desarrollo
npm run dev

# Build y deploy
npm run build
vercel --prod
```

---

## 📎 Notas adicionales

### Disclaimer legal (obligatorio en la app)

```
⚠️ LinkedIn AI Strategist es una herramienta de análisis y optimización
independiente. No está afiliada, respaldada ni patrocinada por LinkedIn Corporation.
Los análisis y recomendaciones son generados por IA y tienen carácter orientativo.
Los resultados pueden variar según el sector, mercado laboral y otras variables.
```

### Recursos y referencias

- **Next.js 15 Docs**: https://nextjs.org/docs
- **Clerk Docs**: https://clerk.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **pgvector**: https://github.com/pgvector/pgvector
- **Prisma Docs**: https://www.prisma.io/docs
- **Anthropic Claude API**: https://docs.anthropic.com
- **Shadcn/UI**: https://ui.shadcn.com
- **next-intl**: https://next-intl-docs.vercel.app
- **Stripe Docs**: https://stripe.com/docs
- **Resend Docs**: https://resend.com/docs
- **Sentry Next.js**: https://docs.sentry.io/platforms/javascript/guides/nextjs

---

_Documento creado el 20/03/2026 · LinkedIn AI Strategist · v1.0_
_Stack: Next.js 15 · TypeScript · Tailwind · Shadcn/UI · Clerk · Supabase · pgvector · Claude API · Stripe · next-intl_
