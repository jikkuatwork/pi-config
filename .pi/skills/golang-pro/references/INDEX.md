# Golang Pro Router

Use this index as the first loaded reference for Go implementation, review, testing, and performance work.

## Core workflow

1. **Analyze architecture** — Review module structure, interfaces, and concurrency patterns.
2. **Design interfaces** — Create small, focused interfaces with composition.
3. **Implement** — Write idiomatic Go with proper error handling and context propagation; run `go vet ./...` when available and relevant.
4. **Lint & validate** — Run `golangci-lint run` when the repo provides it or the user approves installing/using it.
5. **Optimize** — Profile with pprof, write benchmarks, eliminate allocations when performance matters.
6. **Test** — Prefer table-driven tests, `-race` for concurrency, fuzzing where useful, and coverage appropriate to the repo.

## Fast route

| Need | Load |
| --- | --- |
| Goroutines, channels, select, sync primitives | `concurrency.md`, optionally `modules/golang-concurrency/GUIDE.md` |
| Interface design, io.Reader/Writer, composition | `interfaces.md` |
| Type parameters, constraints, generic patterns | `generics.md` |
| Table-driven tests, benchmarks, fuzzing | `testing.md`, optionally `modules/golang-testing/GUIDE.md` |
| Module layout, internal packages, go.mod | `project-structure.md`, optionally `modules/golang-project-layout/GUIDE.md` |
| Benchmarks, pprof, tracing, regression checks | `modules/golang-benchmark/GUIDE.md` or `modules/golang-performance/GUIDE.md` |
| Context cancellation, deadlines, request scope | `modules/golang-context/GUIDE.md` |
| Database/sql patterns, transactions, scanning | `modules/golang-database/GUIDE.md` |
| Architecture and design patterns | `modules/golang-design-patterns/GUIDE.md` |
| Error wrapping and typed/sentinel errors | `modules/golang-error-handling/GUIDE.md` |
| golangci-lint and style rules | `modules/golang-lint/GUIDE.md` or `modules/golang-code-style/GUIDE.md` |
| Logging, metrics, tracing, profiling | `modules/golang-observability/GUIDE.md` |
| Security review and hardening | `modules/golang-security/GUIDE.md` |
| Troubleshooting build/test/runtime bugs | `modules/golang-troubleshooting/GUIDE.md` |

## Constraints

### Must do

- Use `gofmt` on all Go code.
- Add `context.Context` to blocking operations when cancellation/deadline matters.
- Handle errors explicitly; avoid naked returns in non-trivial functions.
- Prefer table-driven tests with subtests.
- Document exported functions, types, and packages.
- Use `X | Y` union constraints for generics when appropriate.
- Propagate errors with `fmt.Errorf("%w", err)`.
- Run the race detector for concurrency-sensitive tests when practical.

### Must not do

- Ignore errors with `_` without justification.
- Use `panic` for normal error handling.
- Create goroutines without clear lifecycle management.
- Skip context cancellation handling for long-running/blocking work.
- Use reflection without performance/maintainability justification.
- Mix sync and async patterns carelessly.
- Hardcode configuration when functional options, env vars, or config files fit better.

## Output contract

When implementing Go features, provide:

1. Interface definitions or contracts first when useful.
2. Implementation files with proper package structure.
3. Tests, preferably table-driven.
4. Brief explanation of concurrency/error/performance patterns used.

## Core pattern example

```go
// worker runs until ctx is cancelled or an error occurs.
// Errors are returned via the errCh channel; the caller must drain it.
func worker(ctx context.Context, jobs <-chan Job, errCh chan<- error) {
    for {
        select {
        case <-ctx.Done():
            errCh <- fmt.Errorf("worker cancelled: %w", ctx.Err())
            return
        case job, ok := <-jobs:
            if !ok {
                return // jobs channel closed; clean exit
            }
            if err := process(ctx, job); err != nil {
                errCh <- fmt.Errorf("process job %v: %w", job.ID, err)
                return
            }
        }
    }
}
```

Key properties: bounded goroutine lifetime via `ctx`, error propagation with `%w`, and no goroutine leak on cancellation.

## Knowledge reference

Go 1.21+, goroutines, channels, select, sync package, generics, type parameters, constraints, `io.Reader`/`io.Writer`, gRPC, `context`, error wrapping, pprof profiling, benchmarks, table-driven tests, fuzzing, `go.mod`, internal packages, and functional options.

Upstream documentation: <https://jeffallan.github.io/claude-skills/skills/language/golang-pro/>
