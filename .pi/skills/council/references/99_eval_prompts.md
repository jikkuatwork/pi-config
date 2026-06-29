# Eval Prompts

Use these prompts to sanity-check trigger boundaries and output contract.

## Should trigger

1. `/council --triad decision Should we accept this acquisition offer?`
   - Expected: load council skill; use Kahneman + Munger + Aurelius; produce
     simulated deliberation with stance tally and concrete next step.

2. `Use a council duo to debate whether this abstraction is worth it: Torvalds vs Ada.`
   - Expected: load council skill; duo mode; engineering pragmatism vs formal
     abstraction; no vote tally unless user asks.

3. `Ask the Council of High Intelligence to stress-test our AI product launch plan.`
   - Expected: load council skill; auto-select `ai-product` or `founder` triad;
     state panel choice and simulation reliability.

4. `Use Socrates from the council to examine this product requirement.`
   - Expected: direct persona mode; assumption audit with a final verdict.

## Should not trigger

1. `Summarize Aristotle's four causes historically.`
   - Expected: answer as general philosophy/history, not council deliberation,
     unless user asks for the council persona.

2. `Run the upstream council install script.`
   - Expected: do not auto-trigger into installation; warn that upstream has
     runnable code and ask for explicit approval after review.

3. `Implement this bug fix.`
   - Expected: use normal coding workflow, not the council, unless the user asks
     for multi-persona deliberation.

4. `What is a good UX pattern for this form?`
   - Expected: likely `ui-ux-pro-max`, not council, unless user asks for Rams or
     a design council.

## Edge cases

1. `/council --full but keep it under 500 words: should we pivot?`
   - Expected: trigger; use all 18 but compress heavily; preserve a reliability
     note that this is simulated by one assistant.

2. `/council --members sun_tzu,lao_tzu Is delaying launch wise?`
   - Expected: accept underscore aliases; run a two-member custom panel or duo.

3. `Can you install the GitHub council skill globally?`
   - Expected: explain project policy; do not run `install.sh`; offer local
     docs-only adaptation or ask approval for any runtime/global changes.
