# One-Job Cost Experiment

## Goal

Measure the actual Fal account charge for one controlled H3 Max video, rather
than treating list price, a stale dashboard, or a zero immediate delta as the
result.

## Preconditions

- The owner explicitly authorized one paid request with resolved settings.
- No unrelated Fal jobs should run during the measurement window. Otherwise the
  balance delta is confounded.
- `FAL_KEY` is present but never printed.
- Cloma can read the Fal dashboard. Run `cloma doctor` if that check fails.
- The prompt/input and output remain outside version control by default.

## Protocol

1. Record a monotonic wall-clock start time and an uncached private baseline:

   ```bash
   cloma fal --json --no-cache
   ```

   Keep the full account snapshot ephemeral. Do not paste balances, account IDs,
   or credentials into issues, commits, or public reports.

2. Record the immutable trial settings before spending:

   - route: `minimax/h3-max/image-to-video`
   - text-to-video, first-frame, or first-to-last-frame mode
   - duration, resolution, seed policy, safety checker, prompt expansion
   - number of requests: exactly `1`

3. Submit once using `01_core.md`. Record submission, completion, and download
   timestamps plus the returned `timings.inference` value when present.

4. Validate the output with `ffprobe`, a full decode, and human review.

5. Query uncached Fal account data after completion:

   ```bash
   cloma fal --json --no-cache
   ```

   Billing can lag generation. If no attributable charge appears, recheck the
   same request's accounting after a bounded delay; do not submit another video.
   Report `pending` until the charge posts.

6. Compute only when the measurement window is uncontaminated:

   ```text
   actual_charge_usd = balance_before_usd - balance_after_usd
   cost_per_output_second = actual_charge_usd / decoded_duration_seconds
   rtf = generation_wall_seconds / decoded_duration_seconds
   ```

   If other Fal activity occurred, report `confounded` and preserve the provider
   usage line for private review rather than inventing a per-video cost.

7. Check whether a failed or safety-rejected job was charged. Failure does not
   imply zero cost.

## Report contract

Use a compact two-column result:

```text
Provider / model       Fal.ai / MiniMax H3 Max
Mode                   <text | first frame | first-to-last frame>
Settings               <duration, resolution, seed, expansion, safety>
Generated in           <wall time; inference timing when supplied>
Number of seconds      <decoded output duration>
RTF                    <wall time / decoded duration>
Fal charge             <$delta | pending | confounded>
Cost / output second   <$value | pending | confounded>
Validation             <queue, ffprobe, full decode, human review>
Output                 <local path>
```

Also state:

- whether the request succeeded, failed, or remained ambiguous;
- whether any retry occurred (normally `no`);
- whether billing had posted at report time;
- any limitations that prevent a fair comparison with the local A100 route,
  such as different model weights, duration, resolution, audio, or warm-up.

Do not compare only headline cost. For a useful A100 comparison, keep source,
prompt, duration, canvas/aspect ratio, output validation, and human quality review
as close as each provider permits.
