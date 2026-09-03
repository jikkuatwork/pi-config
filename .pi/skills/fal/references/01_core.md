# Core Fal H3 Max Workflow

## Fixed route and defaults

Use the reviewed queue route:

```text
POST https://queue.fal.run/minimax/h3-max/image-to-video
GET  https://queue.fal.run/minimax/h3-max/requests/<request_id>/status
GET  https://queue.fal.run/minimax/h3-max/requests/<request_id>
```

Despite the route name, `image_url` is optional. Without it, the request is
text-to-video and defaults to 16:9. With it, the output follows the first
frame's aspect ratio. `end_image_url` optionally adds a final keyframe.

Reviewed input fields:

- `prompt` (string, required)
- `duration` (integer, default `5` seconds)
- `resolution` (`480P` or `768P`, default `768P`)
- `seed` (integer, random when omitted)
- `enable_safety_checker` (boolean, default `true`; keep enabled)
- `sync_mode` (boolean; avoid it so large video bytes are not returned inline)
- `prompt_expansion_mode` (default `balanced`; `quality` may add about 30 seconds)
- `image_url` (optional first frame)
- `end_image_url` (optional final frame)

Expected result fields include `video`, `expanded_prompt`, and `timings`.
`video.url` identifies the downloadable artifact. `timings.inference` may be
null when the backend does not expose it.

## Before any paid request

1. Confirm the user authorized this exact number of jobs and resolved settings.
2. Explain that Fal receives the prompt and media. Do not send private or
   rights-restricted content without approval.
3. Keep `enable_safety_checker: true` unless a later reviewed contract requires
   otherwise; do not disable it merely to make a request pass.
4. Verify tools and credential presence without exposing values:

```bash
command -v curl jq ffprobe >/dev/null
[ -n "${FAL_KEY:-}" ] || { echo "FAL_KEY is not configured" >&2; exit 1; }
```

5. Use a public HTTPS input URL only when the owner accepts that hosting and
   third-party access boundary. A local path is not accepted by this endpoint.
   Do not upload local media or create a data URI without explicit approval.
6. Choose a non-versioned output directory. Never put prompts, request payloads,
   credentials, account snapshots, or generated videos into Git by default.

## Submit exactly once

Build JSON with `jq` so prompt text is escaped correctly. This example is a
five-second 768P text-to-video request; add approved `image_url`,
`end_image_url`, or `seed` fields deliberately.

```bash
endpoint='https://queue.fal.run/minimax/h3-max/image-to-video'
payload=$(jq -nc --arg prompt "$PROMPT" '{
  prompt: $prompt,
  duration: 5,
  resolution: "768P",
  enable_safety_checker: true,
  sync_mode: false,
  prompt_expansion_mode: "balanced"
}')

response=$(curl --fail-with-body --silent --show-error \
  --request POST \
  --url "$endpoint" \
  --header "Authorization: Key $FAL_KEY" \
  --header 'Content-Type: application/json' \
  --data "$payload")
request_id=$(jq -er '.request_id' <<<"$response")
```

Do not echo the request payload when it contains private prompt or media data.
Treat a connection timeout after submission as ambiguous: query known status or
report the ambiguity. Do not issue another `POST` unless the owner explicitly
authorizes another potentially billable job.

## Poll with a bound, then fetch

Poll the status endpoint at a modest interval and stop on the provider's
reported terminal state. Queue response labels can evolve, so inspect the
returned status rather than assuming an undocumented fixed enum. Bound the wait
by wall time; a local polling timeout is not evidence that generation failed.

```bash
status_url="$endpoint/requests/$request_id/status"
result_url="$endpoint/requests/$request_id"

# Example single checks; wrap these in a bounded 5–10 second polling loop.
curl --fail-with-body --silent --show-error \
  --url "$status_url" \
  --header "Authorization: Key $FAL_KEY" | jq .

result=$(curl --fail-with-body --silent --show-error \
  --url "$result_url" \
  --header "Authorization: Key $FAL_KEY")
video_url=$(jq -er '.video.url' <<<"$result")
```

Never place `FAL_KEY` in a URL or saved command transcript. Do not persist the
full result JSON if it contains private URLs or expanded prompts.

## Download and validate

Download only the URL returned by the successful result, use HTTPS, and write to
an explicit safe path:

```bash
curl --fail --location --proto '=https' \
  --output "$OUTPUT" "$video_url"
ffprobe -v error -show_entries \
  format=duration:stream=index,codec_type,codec_name,width,height,r_frame_rate \
  -of json "$OUTPUT"
ffmpeg -v error -i "$OUTPUT" -f null -
```

Validate:

1. The queue reached a successful terminal state.
2. The file is non-empty and `ffprobe` identifies a video stream.
3. Resolution/aspect ratio and duration match the resolved request closely.
4. A full decode completes without errors.
5. Human review checks prompt adherence, first/end-frame continuity when used,
   camera behavior, motion, audio if present, and visible artifacts.
6. Preserve multiple takes under distinct names; never overwrite an accepted
   result.

Do not trust the source documentation's illustrative file extension or MIME
example as a contract; validate the returned media itself.
