# Fal Video Index

Use this index as the first loaded reference for this skill.

## Purpose

Run controlled MiniMax H3 Max video trials through Fal.ai's queue API, validate
the returned artifact, and measure actual account cost without exposing
credentials or accidentally submitting duplicate paid jobs.

## Safety gate

A generation request is paid third-party compute and sends the prompt plus any
input media to Fal.ai. Before `POST` submission, require explicit authorization
for the concrete trial: model route, number of jobs, duration, resolution, and
input mode. A request to import, prepare, estimate, or show commands is not
permission to spend. Never retry or resubmit a paid request automatically.

## Use when

- The user says to use Fal or Fal.ai to generate a video.
- The user names Fal MiniMax H3 Max for text-to-video, image-to-video, or
  first-to-last-frame generation.
- The user wants a controlled Fal video cost or latency comparison.

## Do not use when

- The request only asks for Fal account balance, credits, or dashboard data;
  use `cloma` instead.
- The user requests video without naming Fal; follow the repository's default
  video-generation route.
- The user only wants a provider-neutral queue design or general API advice.

## Inputs expected

- A prompt and explicit approval for a paid submission.
- Optional first-frame URL and optional end-frame URL. Local/private media needs
  separate approval before any upload or public hosting.
- Duration, resolution, seed, and prompt-expansion preference, or consent to the
  documented defaults.
- A safe output location outside version control unless retention is requested.

## Workflow

1. Read `01_core.md` before preparing or submitting a Fal request.
2. Confirm `FAL_KEY` is present without printing it; never copy credentials into
   commands, logs, artifacts, or repository files.
3. Resolve and show the exact trial settings. Obtain explicit paid authorization
   if the current request did not already authorize those settings.
4. For a cost test, read `02_cost_experiment.md` and take an uncached Cloma
   baseline immediately before the single submission.
5. Submit once, poll the queue with a bounded wait, fetch the result once, and
   never convert an ambiguous timeout into another paid submission.
6. Download and validate the artifact, then check uncached Fal usage/balance
   after billing posts.
7. Report settings, outcome, timings, media validation, and measured cost delta;
   label delayed or confounded billing rather than claiming a zero cost.

## Output contract

Report:

- Fal model route and input mode.
- Resolved duration, resolution, seed, safety checker, and prompt expansion.
- Queue outcome and a shortened request identifier; do not persist private
  request URLs or full account data in public artifacts.
- Output path plus `ffprobe` metadata and full-decode result.
- Wall time, returned inference timing when available, output duration, and RTF.
- Actual charged delta and cost per output second, or `pending`/`confounded`
  with the reason.
- Any failure and whether Fal appears to have charged it. Do not retry silently.

## Route

- `01_core.md` — API contract, secure queue workflow, and validation.
- `02_cost_experiment.md` — one-job before/after cost measurement protocol.
- `90_provenance.md` — source, review, omissions, and safety findings.
- `99_eval_prompts.md` — trigger, non-trigger, and edge-case checks.
