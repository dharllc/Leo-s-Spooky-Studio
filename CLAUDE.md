# CLAUDE.md Instructions

## Conductor Workspaces

- This repository may be edited from Conductor workspaces, which are separate git worktrees on task branches.
- Do all work from the current workspace directory unless the user explicitly directs otherwise.
- Use the workspace-local `.context/` directory for temporary notes, plans, and coordination artifacts shared with other agents. It is gitignored.
- Treat `origin/main` as the default target branch for diffs, PRs, and merges unless repository docs or the user specify a different base.
- Do not rename the current branch unless the user explicitly asks.
- If the user asks for several unrelated tasks, suggest starting separate Conductor workspaces.
- Keep PR descriptions current. When opening a PR, describe the actual change: feature built, behavior changed, documentation updated, or operational impact. After every additional commit to an open PR, revisit the description and update it if the summary, scope, validation, or follow-up work changed. Do not leave stale PR descriptions from an earlier version of the work.
- Before the final response, include the essential status: files changed, checks run, PR or merge state, and any remaining blockers.
