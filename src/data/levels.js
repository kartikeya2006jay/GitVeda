const levelBlueprints = [
  { title: "Initialize Repo", command: "git init", scenario: "Create a fresh repository in a project folder.", question: "Which command creates a new local Git repository?", options: ["git init", "git start", "git create"] },
  { title: "Check Status", command: "git status", scenario: "Check file changes before staging.", question: "Which command shows staged and unstaged changes?", options: ["git status", "git check", "git diff --name"] },
  { title: "Stage Changes", command: "git add .", scenario: "Stage all current file changes.", question: "Which command stages all modified and new files?", options: ["git add .", "git stage all", "git commit -a"] },
  { title: "Commit Work", command: "git commit -m \"message\"", scenario: "Save staged changes with a meaningful message.", question: "What command records staged changes into history?", options: ["git commit -m \"message\"", "git save", "git push"] },
  { title: "View History", command: "git log --oneline", scenario: "Read recent commit history quickly.", question: "Which command gives compact commit history?", options: ["git log --oneline", "git history", "git show --short"] },
  { title: "List Branches", command: "git branch", scenario: "List all local branches.", question: "How do you list local branches?", options: ["git branch", "git branches", "git list branch"] },
  { title: "New Feature Branch", command: "git checkout -b feature/login", scenario: "Create and switch to a feature branch.", question: "Which command both creates and switches branch?", options: ["git checkout -b feature/login", "git branch -s feature/login", "git switch feature/login --new"] },
  { title: "Switch Branch", command: "git switch main", scenario: "Return to the main branch.", question: "Which command switches to an existing branch?", options: ["git switch main", "git move main", "git checkout main --hard"] },
  { title: "Compare Changes", command: "git diff", scenario: "Inspect unstaged line-level changes.", question: "Which command shows unstaged content differences?", options: ["git diff", "git compare", "git status --full"] },
  { title: "Restore File", command: "git restore README.md", scenario: "Discard unwanted local edits in one file.", question: "Which command restores file content from last commit?", options: ["git restore README.md", "git undo README.md", "git reset README.md --soft"] },
  { title: "Link Remote", command: "git remote add origin <url>", scenario: "Connect local repo to remote origin.", question: "How do you add a new remote named origin?", options: ["git remote add origin <url>", "git push origin <url>", "git attach origin <url>"] },
  { title: "Push Upstream", command: "git push -u origin main", scenario: "Push branch and set upstream tracking.", question: "Which command sets upstream while pushing?", options: ["git push -u origin main", "git push origin main --set", "git sync origin main"] },
  { title: "Sync with Rebase", command: "git pull --rebase", scenario: "Update local branch with clean linear history.", question: "Which pull mode replays local commits after fetching?", options: ["git pull --rebase", "git pull --merge-only", "git fetch --squash"] },
  { title: "Fetch Updates", command: "git fetch --all", scenario: "Download all remote references without merging.", question: "Which command updates remote-tracking branches only?", options: ["git fetch --all", "git pull --all", "git merge --remote"] },
  { title: "Merge Feature", command: "git merge feature/login", scenario: "Integrate a feature branch into current branch.", question: "Which command joins another branch into your current one?", options: ["git merge feature/login", "git combine feature/login", "git include feature/login"] },
  { title: "Rebase Main", command: "git rebase main", scenario: "Replay feature work on top of latest main.", question: "Which command rewrites commits onto another base?", options: ["git rebase main", "git reset main", "git sync main"] },
  { title: "Stash Changes", command: "git stash push -m \"wip\"", scenario: "Temporarily shelve incomplete work with label.", question: "Which command saves work-in-progress to stash with a message?", options: ["git stash push -m \"wip\"", "git stash save --named wip", "git shelf -m wip"] },
  { title: "Apply Stash", command: "git stash pop", scenario: "Re-apply latest stashed changes.", question: "Which command restores and removes latest stash entry?", options: ["git stash pop", "git stash apply --drop", "git restore stash"] },
  { title: "Cherry Pick", command: "git cherry-pick <commit>", scenario: "Copy one specific commit into current branch.", question: "Which command applies a selected commit from another branch?", options: ["git cherry-pick <commit>", "git copy <commit>", "git merge <commit>"] },
  { title: "Soft Reset", command: "git reset --soft HEAD~1", scenario: "Undo last commit but keep staged changes.", question: "Which reset mode keeps files staged?", options: ["git reset --soft HEAD~1", "git reset --hard HEAD~1", "git reset --mixed HEAD~1"] },
  { title: "Hard Reset", command: "git reset --hard HEAD", scenario: "Discard all local tracked changes forcefully.", question: "Which command wipes tracked local edits to match HEAD?", options: ["git reset --hard HEAD", "git restore --all", "git clean --all"] },
  { title: "Reflog Recovery", command: "git reflog", scenario: "Recover lost commits by browsing HEAD movements.", question: "Which command shows where HEAD pointed over time?", options: ["git reflog", "git history --all", "git recover-log"] },
  { title: "Start Bisect", command: "git bisect start", scenario: "Begin binary search for a bug-causing commit.", question: "Which command starts bisect session?", options: ["git bisect start", "git bisect init", "git debug bisect"] },
  { title: "Mark Bad Commit", command: "git bisect bad", scenario: "Mark current checked commit as bad.", question: "In bisect, how do you mark a bad commit?", options: ["git bisect bad", "git bisect fail", "git bisect reject"] },
  { title: "Mark Good Commit", command: "git bisect good <hash>", scenario: "Mark known good commit during bisect.", question: "How do you label a known-good commit in bisect?", options: ["git bisect good <hash>", "git bisect pass <hash>", "git bisect ok <hash>"] },
  { title: "Interactive Rebase", command: "git rebase -i HEAD~4", scenario: "Interactively squash/reword recent commits.", question: "Which command opens interactive rebase for last 4 commits?", options: ["git rebase -i HEAD~4", "git commit --interactive 4", "git squash HEAD~4"] },
  { title: "Amend Commit", command: "git commit --amend", scenario: "Edit the latest commit message or staged content.", question: "Which command modifies your most recent commit?", options: ["git commit --amend", "git commit --edit-last", "git update-commit"] },
  { title: "Purge Untracked", command: "git clean -fd", scenario: "Delete untracked files and directories.", question: "Which command removes untracked files and folders?", options: ["git clean -fd", "git reset --clean", "git purge"] },
  { title: "Annotated Tag", command: "git tag -a v1.0.0 -m \"release\"", scenario: "Create annotated release tag.", question: "Which command creates an annotated tag?", options: ["git tag -a v1.0.0 -m \"release\"", "git release v1.0.0", "git label -a v1.0.0"] },
  { title: "Push Tags", command: "git push origin --tags", scenario: "Publish all local tags to remote.", question: "How do you push all tags to origin?", options: ["git push origin --tags", "git push --all-tags", "git publish tags"] },
];

function buildLevel(levelNumber, difficulty, blueprint) {
  return {
    id: levelNumber,
    level: levelNumber,
    difficulty,
    title: blueprint.title,
    command: blueprint.command,
    mission: blueprint.scenario,
    question: blueprint.question,
    options: blueprint.options,
    answer: blueprint.options[0],
    xpReward: difficulty === "Easy" ? 80 : difficulty === "Medium" ? 120 : 170,
  };
}

export const gameLevels = levelBlueprints.map((blueprint, idx) => {
  const levelNumber = idx + 1;
  const difficulty = levelNumber <= 10 ? "Easy" : levelNumber <= 20 ? "Medium" : "Hard";
  return buildLevel(levelNumber, difficulty, blueprint);
});

export const easyLevels = gameLevels.filter((level) => level.difficulty === "Easy");
export const mediumLevels = gameLevels.filter((level) => level.difficulty === "Medium");
export const hardLevels = gameLevels.filter((level) => level.difficulty === "Hard");

export const endgameTracks = [
  {
    id: "revision",
    title: "Final Revision",
    description: "Rapid-fire recap of all 30 commands with scenario-based prompts.",
    reward: "+500 XP",
  },
  {
    id: "practice",
    title: "Practice Arena",
    description: "Unlimited command drills with instant feedback and retry loops.",
    reward: "Skill mastery",
  },
];
