<div align="center">

# 📊 IIP
### Investment Intelligence Platform

**Macro regime. Company valuation. Portfolio tracking.**
**One shared dataset. Zero backend. Installs like a native app.**

*A LAZLAB Creations product — Platform 01*

</div>

---

## The pitch

Most investment tools make you choose: a macro dashboard *or* a valuation model *or* a portfolio tracker — each locked in its own silo, each demanding its own login, none of them talking to each other.

**IIP doesn't make you choose.** Four linked single-file apps, sharing one `localStorage` origin, install once as a real Progressive Web App. Set your API key in any of them, it's instantly live in all four. Look up a stock in Research, and Portfolio already knows its margin of safety. Screen the S&P 500, and Macro's Market Valuation card already reflects it. No server. No database. No monthly bill. Just four HTML files that know about each other.

---

## What's inside

### 🧭 Macro — *Intelligence*
The market's weather report. A six-pillar regime score (growth, labor, inflation, rates, credit, sentiment) built entirely from percentile math you can inspect, not a black box you have to trust. Sector rotation with real Overweight/Neutral/Underweight calls. An AI-written briefing on what actually changed since you last looked. And a **Regime Backtest** that scores every historical month using only data that would have been known *at that time* — no lookahead, verified against synthetic data with a known answer.

### 🔍 Research — *& Valuation*
Point a ticker at three independent valuation methods — DCF, modified Graham, historical multiples — and get a range, not a false-precision single number. A first-pass **Screener** ranks the entire S&P 500 on trailing fundamentals in about a minute. **Monitor** tracks earnings and dividend dates for anything you're watching. And when a company reports, the **AI Analyst** reads the actual transcript and hands you guidance, risk, tone, and the quotes that matter — labeled as AI synthesis, never silently folded into the numbers above it.

### 💼 Portfolio — *& Journal*
What you actually own, how far it's drifted from target, and a plain **Overweight / Underweight** flag on each position — pulling margin of safety straight from Research's cache, no separate lookup. A capital-deployment tool that only ever suggests buying underweights, never selling. And a **Journal** for the reasoning behind a call, so six months from now you can check whether the thesis held up.

### 🏠 Home
The front door. Live status cards for all three apps, a type-ahead **search** that jumps straight to any section across the whole platform, an **Info** guide in plain language, saved **Reports** (frozen snapshots, not live links that drift), the full **build plan**, and **theming** — dark or light, four accent colors, shared everywhere.

---

## Why this architecture

| | Typical SaaS tool | IIP |
|---|---|---|
| Backend | Required | None |
| Your data | On their server | In your browser, period |
| Monthly cost | Usually | $0 |
| Data source | Their API, their limits | Your own FMP key |
| Cross-tool integration | Rarely, if ever | Built in — same origin, same state |
| What happens if they shut down | You lose everything | You still have the file |

Four `.html` files. One shared `localStorage` schema. A real service worker and manifest for offline app-shell loading. That's the whole stack.

---

## Get started

1. Drop all files from this repo into the same folder (same origin — this matters, it's how the four apps share data).
2. Open **`index.html`** — this is the entry point.
3. Go to **Settings** in any app, add a free [FMP API key](https://site.financialmodelingprep.com/register). Optionally add a free [Groq key](https://console.groq.com/keys) for AI features (earnings call analysis, macro briefings).
4. That's it. Every other app already has your key.

Look for the **Install** banner to add IIP to your home screen or dock — after that it opens like any other app, no browser chrome, works with the last-cached data even offline.

---

## Honest limitations

This isn't a pitch deck pretending everything's finished. A few things, said plainly:

- **Valuation is still being tested against real companies** — the math is verified against synthetic data (formulas compute correctly), but real-world sanity checking against diverse actual businesses is genuinely ongoing.
- **Screener and Monitor use trailing ratios**, not the full DCF/Graham/multiples engine — running that across 500 companies isn't practical client-side. Research's single-ticker deep dive is where the real math lives.
- **The Backtest applies today's weights retroactively** — it deliberately does not auto-optimize weights against history, since that's close to the exact overfitting good backtesting practice warns against.
- **No CAPE, no forward P/E, no market cap/GDP** — none of these have a clean data source available here, and they're absent rather than faked with a placeholder number.

If something looks wrong, it probably deserves a second look rather than blind trust — same standard this whole platform was built to.

---

<div align="center">

**Built by [John Lazzaro](https://johnlaz.github.io) · LAZLAB Creations**

*Not investment advice. Not a licensed financial product. A tool for your own research.*

</div>
