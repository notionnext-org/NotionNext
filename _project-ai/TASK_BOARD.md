# Task Board

Current rule: one smallest verifiable task per round.

## Queues

- `PIPELINE/ready/`: approved task files waiting for execution
- `PIPELINE/running/`: one executor actively working
- `PIPELINE/review/`: deliverables waiting for QA or director review
- `PIPELINE/blocked/`: tasks missing required input
- `PIPELINE/done/`: accepted tasks

## Metrics To Track

- accepted deliverables
- first-pass acceptance rate
- retry count
- cycle time
- human approval count
- real business outcome

Do not track message count, role count, or meeting summaries.
