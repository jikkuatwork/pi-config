---
status: complete
topic: 2026 SOTA model costs, performance benchmarks, and latency
tags: llm, benchmarking, pricing, latency, 2026
created: 2026-05-25
updated: 2026-05-25
---

# Research 001: 2026 SOTA model costs, performance benchmarks, and latency

## Question

What are the state-of-the-art (SOTA) models released in 2026, and how do they compare on cost, benchmark performance, and latency?

## Scope and method

- Scope: major frontier text/API models with 2026 release evidence and publicly documented pricing.
- "SOTA" operationalized as top frontier proprietary models from OpenAI, Anthropic, and Google with comparable independent benchmarking.
- Source priority:
  1. Official provider release/pricing docs for release status and cost.
  2. Artificial Analysis for cross-model benchmark and latency measurements.

## Findings

### Comparison snapshot (2026 releases)

| Model | Release signal | API price (USD / 1M tokens) | AA Intelligence Index v4.0 | AA GDPval normalized | AA latency (TTFA, medium) | AA output speed (medium) |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| Claude Opus 4.7 (max) | Anthropic Newsroom: Apr 16, 2026 | Input $5.00 / Output $25.00 | 57.2775 | 0.6263 | 16.89s | 47.59 tok/s |
| Gemini 3.1 Pro Preview | Google changelog: Feb 19, 2026 | Input $2.00 / Output $12.00 (standard, <=200k prompt tier applies) | 57.1755 | 0.4071 | 23.69s | 124.60 tok/s |
| GPT-5.4 (xhigh) | OpenAI release notes: Mar 5, 2026 | Input $2.50 / Output $15.00 | 56.7997 | 0.5868 | 173.79s | 81.52 tok/s |
| Gemini 3.5 Flash | Google changelog: May 19, 2026 (GA) | Input $1.50 / Output $9.00 | 55.3290 | 0.5779 | 12.93s | 210.47 tok/s |

Notes:
- AA metrics above are from Artificial Analysis data for `prompt_length_type = medium`.
- Latency metric is AA "time to first answer token" (includes reasoning/thinking behavior for reasoning models).

### Key takeaways

1. **Best raw benchmark leader (in this set): Claude Opus 4.7**
   - Highest AA Intelligence Index and strongest GDPval score among compared models.
   - Most expensive token pricing in this set.

2. **Best cost-latency-efficiency profile: Gemini 3.5 Flash**
   - Lowest listed token price among compared frontier models here.
   - Fastest observed output speed and lowest TTFA among this set.

3. **GPT-5.4 appears quality-strong but latency-heavy in independent measurements**
   - Competitive intelligence score and GDPval.
   - Very high TTFA in AA medium profile relative to peers.

4. **Gemini 3.1 Pro Preview shows high aggregate intelligence but weaker GDPval than peers here**
   - Strong aggregate AA Intelligence Index.
   - Lower GDPval than GPT-5.4 / Opus 4.7 / Gemini 3.5 Flash in this snapshot.

## Contradictions and uncertainty

- **Marketing claims vs independent latency**:
  - OpenAI and Anthropic release messaging emphasizes practical gains; AA measurements show large latency spread (especially for GPT-5.4 xhigh).
  - Status: unresolved; likely affected by effort/reasoning settings, benchmark harness, and workload mix.

- **Single independent benchmark source for cross-vendor latency/perf**:
  - AA provides strong comparability, but this is still one methodology.
  - Status: unresolved; should be validated with workload-specific internal benchmark.

- **Pricing mode/tier variability**:
  - Google and some providers have tiered pricing and cache/storage nuances.
  - Status: resolved for base comparison only (standard per-token view), unresolved for exact production blended cost.

## Recommendation

- If your priority is **highest benchmark capability** and budget is secondary: start with **Claude Opus 4.7**.
- If your priority is **latency + cost efficiency at strong quality**: start with **Gemini 3.5 Flash**.
- If your priority is **OpenAI ecosystem + high reasoning quality** and long think-time is acceptable: evaluate **GPT-5.4** with strict latency SLO tests.

Use router strategy rather than single-model lock-in:
- fast path: Gemini 3.5 Flash,
- hard-path escalation: Opus 4.7 or GPT-5.4,
- guardrail by latency SLO and per-task quality tests.

## Follow-ups

- [ ] Run a local eval harness on your real prompts (e.g., 50–200 prompts across coding/research/support).
- [ ] Compute blended production cost with your expected cache-hit ratio and average output lengths.
- [ ] Validate p50/p95 TTFA and full-response time against your own infrastructure and region.

## Sources

- OpenAI model release notes (GPT-5.4 release signal): https://help.openai.com/en/articles/9624314-model-release-notes
- OpenAI API pricing (GPT-5.4 token prices): https://openai.com/api/pricing/
- Anthropic Newsroom (Opus 4.7 date signal): https://www.anthropic.com/news
- Anthropic Opus 4.7 launch post (pricing confirmation): https://www.anthropic.com/news/claude-opus-4-7
- Anthropic models overview (Opus/Sonnet pricing table): https://platform.claude.com/docs/en/about-claude/models/overview
- Google Gemini API changelog (Gemini 3.1 Pro Preview, Gemini 3.5 Flash GA release dates): https://ai.google.dev/gemini-api/docs/changelog.md.txt
- Google Gemini API pricing (Gemini 3.x prices): https://ai.google.dev/gemini-api/docs/pricing.md.txt
- Artificial Analysis models dataset/page (cross-model intelligence, GDPval, speed, latency): https://artificialanalysis.ai/models
