# MindSync — frontend

React + Vite SPA. Tailwind via the Play CDN (config inlined in `index.html`, matches
the Stitch canonical designs 1:1). Runs on an in-memory mock until a backend URL is set.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # -> dist/
npm run preview    # serve dist/
```

Node 20+ (`.nvmrc` = 22).

## Structure

```
src/
  api/
    client.js       fetch wrapper; API_URL from VITE_API_URL, USE_MOCK flag
    endpoints.js     the api surface — { auth, me, clinic, meta }; mock vs http impl
    mock.js          all placeholder data + response-shape reference
  hooks/useApi.js    { data, loading, error, reload } for any api call
  context/AppContext.jsx   session (role, onboarding), routing guard, calls api.auth
  components/
    MarketingNav · AppNav · ClinicianSidebar · SiteFooter   role-scoped chrome
    PersonView       the two-model view (Chronic + Weekly bands), shared
    Loading          spinner / error states
  pages/
    Home · Pricing · Login                      public
    Dashboard · AnalyticalDashboard · WearablesConnect   individual (role: patient)
    ClinicalPortal · PatientView                hospital (role: clinician)
  App.jsx            tab -> page map
```

### Roles & routing (`src/context/AppContext.jsx`)

| role | sees | lands on |
|---|---|---|
| logged out | Home, Pricing, Login | Home |
| `patient` | Dashboard, Analytics, Devices | Dashboard (new user: Devices first) |
| `clinician` | Patients roster, per-patient view | Patients |

`ACCESS` maps every tab to a required role; `resolve()` redirects anything out of role.
Session + onboarding flags live in `localStorage` (`mindsync.role`, `mindsync.token`,
`mindsync.onboarded`) and are cleared on logout.

## Attaching a backend

1. `cp .env.example .env.local`, set `VITE_API_URL=https://your-api`.
   Non-empty flips `USE_MOCK` off and every `api.*` call becomes real HTTP.
2. Implement these routes (response shapes = `src/api/mock.js`):

| method | route | returns |
|---|---|---|
| `POST` | `/auth/login` `{email,password,role}` | `{ role, token }` |
| `POST` | `/auth/logout` | `204` |
| `GET` | `/me/record` | `PersonRecord` (the individual's own) |
| `GET` | `/me/devices` | `Device[]` |
| `GET` | `/clinic/profile` | `{ name, unit }` |
| `GET` | `/clinic/patients` | `PatientSummary[]` |
| `GET` | `/clinic/patients/:id` | `PersonRecord` |
| `GET` | `/meta/model-context` | `{ chronicF1, weeklyF1, … }` |

`token` is sent as `Authorization: Bearer …` on every subsequent call (`client.js`).
No other file needs to change — pages already consume `api` through `useApi`.

## Deploy (Vercel)

- Framework preset **Vite** (auto-detected); `vercel.json` pins build command,
  output dir, and the SPA rewrite.
- Set **Root Directory** to `Mind-Sync-Frontend/mind-sync-frontend` if deploying
  from the repo root.
- Add `VITE_API_URL` in Project → Settings → Environment Variables (leave unset to
  ship the mock demo).

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```
