import { useState } from "react";
import { gameLevels } from "../../data/levels";

function getSafetyNote(command) {
    if (command.includes("reset --hard") || command.includes("clean -fd")) {
        return "Danger command: can delete local work. Check `git status` first.";
    }
    if (command.includes("rebase") || command.includes("amend")) {
        return "Use carefully on shared branches. Prefer using on your own local branch.";
    }
    return "Safe for daily use. If unsure, run `git status` before and after.";
}

const simpleIntel = {
    "git init": {
        simple: "Like starting a new magic notebook. It makes a secret spot to remember everything you do.",
        usage: "git init",
        why: "So your computer can keep track of all your changes for you!",
        example: "You start a new game project. Run this first to make it a Git project.",
        steps: [
            "1) Open your project folder in the terminal (right-click → 'Open in Terminal').",
            "2) Type: git init and press Enter. You'll see 'Initialized empty Git repository'.",
            "3) Type: git status to confirm — it should say 'On branch main, No commits yet'."
        ]
    },
    "git status": {
        simple: "The Magic Map. It shows you which files you changed and which ones are ready to be saved.",
        usage: "git status",
        why: "So you don't forget what you were working on!",
        example: "You changed the colors in your game. Run this to see those files in red.",
        steps: [
            "1) Open terminal inside your project folder.",
            "2) Type: git status and press Enter.",
            "3) Look at the output — red files = not staged, green files = ready to commit."
        ]
    },
    "git add .": {
        simple: "Putting toys in the box. This picks up your changes and puts them in a special 'waiting bag'.",
        usage: "git add .",
        why: "To get your work ready to be saved forever.",
        example: "You finished your drawing. Run this to 'pack' it for saving.",
        steps: [
            "1) First run git status to see your changed files (they'll be in red).",
            "2) Type: git add . and press Enter (the dot means 'add everything').",
            "3) Run git status again — your files should now be green (staged and ready)."
        ]
    },
    "git commit -m \"message\"": {
        simple: "Taking a snapshot. This saves your work into the secret folder forever with a little note.",
        usage: "git commit -m \"First version!\"",
        why: "So you can go back in time if you ever make a mistake!",
        example: "You finished level 1. Save it so you never lose your progress.",
        steps: [
            "1) Make sure you ran git add . first (files must be green in git status).",
            "2) Type: git commit -m \"your message here\" — put a short note about what you did.",
            "3) Press Enter — you'll see a summary like '1 file changed, 5 insertions(+)'."
        ]
    },
    "git log --oneline": {
        simple: "Reading your diary. It shows a quick list of all the snapshots you've ever taken.",
        usage: "git log --oneline",
        why: "To see a timeline of how much you've worked!",
        example: "You want to see what you did yesterday. This shows your notes in a list.",
        steps: [
            "1) Open terminal in your project folder.",
            "2) Type: git log --oneline and press Enter.",
            "3) Read the list — each line is one commit with a short hash and your message. Press 'q' to exit."
        ]
    },
    "git branch": {
        simple: "Checking your paths. It shows which 'version' of your project you are currently on.",
        usage: "git branch",
        why: "So you don't accidentally work on the wrong version!",
        example: "You are on the 'Music' version. This confirms you're in the right spot.",
        steps: [
            "1) Open terminal in your project folder.",
            "2) Type: git branch and press Enter.",
            "3) The branch with a * star next to it is the one you're currently working on."
        ]
    },
    "git checkout -b feature/login": {
        simple: "Making a twin world. This creates a new version of your project so you can play without breaking things.",
        usage: "git checkout -b my-new-idea",
        why: "To try new things safely without ruining your main version!",
        example: "You want to try adding fire to your game. Make a new 'fire' branch first!",
        steps: [
            "1) First check which branch you're on with git branch (make sure you're on main).",
            "2) Type: git checkout -b my-new-idea and press Enter (replace 'my-new-idea' with your name).",
            "3) Run git branch again — you should see a * star next to your new branch name."
        ]
    },
    "git switch main": {
        simple: "Going back home. This takes you back to your main, stable version of the project.",
        usage: "git switch main",
        why: "To go back to the version that everyone else sees.",
        example: "Your experiment failed. Go back to 'main' where everything works.",
        steps: [
            "1) Save or commit any work on your current branch first.",
            "2) Type: git switch main and press Enter.",
            "3) Run git branch to confirm — the * star should now be next to 'main'."
        ]
    },
    "git diff": {
        simple: "Spot the difference. It shows exactly which lines of text you changed in your files.",
        usage: "git diff",
        why: "To double-check your work before you save it.",
        example: "You added a score button. This shows the old code vs the new button code.",
        steps: [
            "1) Make some changes to a file but do NOT run git add yet.",
            "2) Type: git diff and press Enter.",
            "3) Red lines (−) = what was removed. Green lines (+) = what you added. Press 'q' to exit."
        ]
    },
    "git restore README.md": {
        simple: "The Magic Undo. This brings back a file to how it was before you started messing with it.",
        usage: "git restore my-file.txt",
        why: "To fix mistakes instantly if you accidentally deleted something important.",
        example: "You deleted code by mistake. Run this and it comes back like magic!",
        steps: [
            "1) Run git status to see which file you messed up (it'll be in red).",
            "2) Type: git restore filename.txt — replace 'filename.txt' with the actual file name.",
            "3) Open the file — it's back to how it was at your last commit. The changes are gone!"
        ]
    },
    "git remote add origin <url>": {
        simple: "Connecting to the cloud. This links your secret folder to a folder on the internet magic cloud.",
        usage: "git remote add origin https://github.com/me/my-game",
        why: "So you can share your work with the whole world!",
        example: "You made a game. Now link it to GitHub to show your friends.",
        steps: [
            "1) Go to GitHub.com → click '+' → 'New repository' → copy the URL it gives you.",
            "2) Type: git remote add origin YOUR_URL_HERE and press Enter.",
            "3) Type: git remote -v to verify — you should see your URL listed twice (fetch & push)."
        ]
    },
    "git push -u origin main": {
        simple: "Sending a package. This sends all your snapshots to the internet cloud folder.",
        usage: "git push -u origin main",
        why: "To back up your work so you never lose it, even if your computer breaks!",
        example: "You finished your project. Push it to the cloud to keep it safe forever.",
        steps: [
            "1) Make sure you have committed your work (git add . → git commit -m \"message\").",
            "2) Type: git push -u origin main and press Enter (first time only needs -u).",
            "3) Go to your GitHub repo page and refresh — your files should now appear there!"
        ]
    },
    "git pull --rebase": {
        simple: "Getting treats. This fetches your friends' work from the cloud and puts your work on top.",
        usage: "git pull --rebase",
        why: "To stay up-to-date with your team without making a mess in your diary.",
        example: "Your friend added new levels. Pull them so you can play with them too!",
        steps: [
            "1) Commit or stash your current work first so nothing gets lost.",
            "2) Type: git pull --rebase and press Enter.",
            "3) If no conflicts → done! If conflicts appear → fix the marked files → git add . → git rebase --continue."
        ]
    },
    "git fetch --all": {
        simple: "Checking for updates. This looks at the cloud to see what's new without changing your work.",
        usage: "git fetch --all",
        why: "To see if your friends have finished their parts yet.",
        example: "You hear a new update is out. Fetch it to see what changed before you merge it.",
        steps: [
            "1) Open terminal in your project folder.",
            "2) Type: git fetch --all and press Enter — it downloads info but changes nothing.",
            "3) Type: git log --oneline --all to see everyone's new commits without affecting your code."
        ]
    },
    "git merge feature/login": {
        simple: "Combining worlds. This takes your new experiments and puts them into your main version.",
        usage: "git merge my-new-idea",
        why: "To finally add your cool new feature to your real game.",
        example: "Your 'fire' experiment works! Merge it so everyone can have fire in their game.",
        steps: [
            "1) Switch to the branch you want to merge INTO: git switch main.",
            "2) Type: git merge my-new-idea and press Enter (replace with your branch name).",
            "3) If it says 'Already up to date' or 'Fast-forward' → success! If conflicts → fix them and commit."
        ]
    },
    "git rebase main": {
        simple: "Lifting your work. This moves your new ideas to the end of your friends' new work.",
        usage: "git rebase main",
        why: "To keep your history looking like a straight line instead of a big messy knot.",
        example: "The main game changed. Rebase your branch so it stays compatible with the new stuff.",
        steps: [
            "1) Make sure you're on YOUR feature branch (not main): git branch to check.",
            "2) Type: git rebase main and press Enter — this replays your commits on top of main.",
            "3) If conflicts pop up → fix the file → git add . → git rebase --continue. Repeat until done."
        ]
    },
    "git stash push -m \"wip\"": {
        simple: "A quick shelf. This hides your messy, half-finished work so you can do something else fast.",
        usage: "git stash",
        why: "When you need to fix a bug right now but aren't done with your current work.",
        example: "Mom says dinner is ready! Stash your work so you don't lose it and log off.",
        steps: [
            "1) You have unsaved changes but need to switch tasks right now.",
            "2) Type: git stash and press Enter — poof! Your changes disappear (but they're saved safely).",
            "3) Type: git stash list to confirm — you'll see 'stash@{0}' with your hidden work."
        ]
    },
    "git stash pop": {
        simple: "Back from the shelf. This brings your hidden work back to your desk so you can finish it.",
        usage: "git stash pop",
        why: "To continue exactly where you left off.",
        example: "Dinner is over. Pop your work and get back to coding your game!",
        steps: [
            "1) Type: git stash list to see your stashed work (make sure something is there).",
            "2) Type: git stash pop and press Enter — your changes come back to your files.",
            "3) Run git status to verify — your old changes should now show up as modified files."
        ]
    },
    "git cherry-pick <hash>": {
        simple: "Picking a flower. This takes just one special commit from another branch and brings it to yours.",
        usage: "git cherry-pick abc1234",
        why: "When you want a specific fix but don't want the whole other version.",
        example: "Your friend made a cool 'blue button' commit. Pick just that button for your branch!",
        steps: [
            "1) Find the commit hash you want: git log --oneline other-branch (copy the 7-char code).",
            "2) Switch to YOUR branch: git switch my-branch.",
            "3) Type: git cherry-pick abc1234 (paste the hash) and press Enter — that one commit is now yours!"
        ]
    },
    "git reset --soft HEAD~1": {
        simple: "The Oops Save. This undoes your last save but keeps the files ready to be saved again.",
        usage: "git reset --soft HEAD~1",
        why: "When you forgot a file or made a tiny typo in your note.",
        example: "You saved but forgot to add the icon. Soft reset -> add icon -> save again.",
        steps: [
            "1) Run git log --oneline to see your last commit (make sure it's the one you want to undo).",
            "2) Type: git reset --soft HEAD~1 and press Enter — the commit is undone but files stay staged.",
            "3) Now fix your mistake, run git add . if needed, then git commit -m \"better message\"."
        ]
    },
    "git reset --hard HEAD": {
        simple: "The Nuclear Delete. This wipes EVERYTHING you did since your last save. No undo!",
        usage: "git reset --hard HEAD",
        why: "When your project is so broken you just want to restart from the last safe spot.",
        example: "You tried a library that ruined your project. Nuke it and go back to safety.",
        steps: [
            "1) ⚠️ WARNING: Run git status first — everything listed there WILL BE DELETED forever.",
            "2) Type: git reset --hard HEAD and press Enter — all uncommitted changes are gone.",
            "3) Run git status to confirm — it should say 'nothing to commit, working tree clean'."
        ]
    },
    "git reflog": {
        simple: "The Super Diary. It remembers every single thing you ever did, even parts you deleted!",
        usage: "git reflog",
        why: "To find 'lost' work that you thought was gone forever.",
        example: "You accidentally deleted a branch. Find it in the Reflog and bring it back!",
        steps: [
            "1) Type: git reflog and press Enter — you'll see a list of EVERYTHING you ever did.",
            "2) Find the action you want to go back to and copy its hash code (like abc1234).",
            "3) Type: git checkout abc1234 to visit that moment, or git reset --hard abc1234 to restore it."
        ]
    },
    "git bisect start": {
        simple: "Bug Detective. This helps you find exactly when a bug first appeared in your history.",
        usage: "git bisect start",
        why: "To find mistakes in giant projects very, very fast.",
        example: "The game worked last month. Use this to find the day it broke.",
        steps: [
            "1) Type: git bisect start and press Enter — detective mode is now ON.",
            "2) Type: git bisect bad to mark the current broken version.",
            "3) Type: git bisect good abc1234 (use a hash where it worked). Git will jump you to the middle to test!"
        ]
    },
    "git bisect bad": {
        simple: "Found a bug! During your detective work, tell Git: 'this version is broken'.",
        usage: "git bisect bad",
        why: "To help Git narrow down where the mistake is hiding.",
        example: "You tested this version and the character is flying. Mark it 'bad'.",
        steps: [
            "1) Git just jumped you to a version to test. Run your app and check if the bug exists.",
            "2) The bug IS here → Type: git bisect bad and press Enter.",
            "3) Git jumps you to another version. Keep testing and marking bad/good until Git finds the culprit!"
        ]
    },
    "git bisect good <hash>": {
        simple: "Safe version! During your detective work, tell Git: 'this version is okay'.",
        usage: "git bisect good",
        why: "To tell Git that the bug must be in a newer version.",
        example: "You went back to last Tuesday and it works! Mark it 'good'.",
        steps: [
            "1) Git just jumped you to a version to test. Run your app and check if the bug exists.",
            "2) The bug is NOT here → Type: git bisect good and press Enter.",
            "3) Git narrows the search. Keep going until it says 'first bad commit is...' — that's your culprit!"
        ]
    },
    "git rebase -i HEAD~4": {
        simple: "Cleaning your room. This lets you merge small commits, rename them, or delete bad ones.",
        usage: "git rebase -i HEAD~4",
        why: "So your project history looks professional and clean for others.",
        example: "You have 5 saves that say 'fix'. Combine them into one neat 'Game Over Fix' note.",
        steps: [
            "1) Type: git rebase -i HEAD~4 (change 4 to however many commits you want to edit).",
            "2) An editor opens → change 'pick' to 'squash' (to combine) or 'reword' (to rename). Save and close.",
            "3) Another editor opens for the final message → write one clean message. Save and close. Done!"
        ]
    },
    "git commit --amend": {
        simple: "Editing the last page. This lets you change the very last snapshot you took.",
        usage: "git commit --amend",
        why: "To fix a typo in your last note without making a whole new save.",
        example: "You wrote 'Game Start' but meant 'Game Finish'. Amend it and you're good!",
        steps: [
            "1) If you forgot a file → git add the-file-you-forgot first.",
            "2) Type: git commit --amend and press Enter — an editor opens with your old message.",
            "3) Fix the message (or leave it), save and close. Your last commit is now updated!"
        ]
    },
    "git clean -fd": {
        simple: "Spring Cleaning. This deletes every file that Git isn't tracking (like trash).",
        usage: "git clean -fd",
        why: "To get rid of temporary files that are cluttering your project.",
        example: "You have 100 log files you don't need. Clean them all at once!",
        steps: [
            "1) ⚠️ First do a dry run: git clean -fdn — this SHOWS what will be deleted without deleting.",
            "2) Check the list carefully — make sure nothing important is there!",
            "3) If safe → Type: git clean -fd and press Enter. All untracked junk files are gone forever."
        ]
    },
    "git tag -a v1.0.0 -m \"release\"": {
        simple: "A Gold Star. This puts a permanent label on a special moment, like a big update.",
        usage: "git tag -a v1.0 -m \"First release!\"",
        why: "So you can always find the 'Official Version' of your app later.",
        example: "You finished the game! Tag it 'v1.0' so it's easy to find.",
        steps: [
            "1) Make sure your latest commit is the one you want to tag (check with git log --oneline).",
            "2) Type: git tag -a v1.0 -m \"First release!\" and press Enter.",
            "3) Type: git tag to see your tags listed. Your gold star is now attached to that commit!"
        ]
    },
    "git push origin --tags": {
        simple: "Sharing your Gold Stars. This sends your version tags to the internet cloud.",
        usage: "git push origin --tags",
        why: "So everyone else can see where your official versions are.",
        example: "You tagged v1.0. Push the tags so your friends see the official release on GitHub.",
        steps: [
            "1) Make sure you already created tags locally (check with git tag).",
            "2) Type: git push origin --tags and press Enter.",
            "3) Go to your GitHub repo → click 'Releases/Tags' tab — your version tags should appear there!"
        ]
    }
};

export default function CheatNotes() {
    const [search, setSearch] = useState("");
    const [activeId, setActiveId] = useState(1);

    const filteredLevels = gameLevels.filter((l) =>
        l.command.toLowerCase().includes(search.toLowerCase()) ||
        l.mission.toLowerCase().includes(search.toLowerCase())
    );

    const groupedLevels = [
        { title: "Section 1", subtitle: "Basics 1-10", items: filteredLevels.slice(0, 10) },
        { title: "Section 2", subtitle: "Workflow 11-20", items: filteredLevels.slice(10, 20) },
        { title: "Section 3", subtitle: "Advanced 21-30", items: filteredLevels.slice(20, 30) },
    ];

    return (
        <main className="max-w-[1200px] mx-auto px-4 py-4">
            <section className="gy-card" style={{ padding: "1rem", border: "1px solid var(--gy-glass-border)" }}>
                <header style={{ marginBottom: "0.85rem" }}>
                    <h2 style={{ fontSize: "1.55rem", fontWeight: 800, marginBottom: "0.35rem" }}>Git Cheat Notes</h2>
                    <p style={{ color: "var(--gy-muted)", fontSize: "0.9rem", marginBottom: "0.65rem" }}>
                        Click any command and read easy notes directly below it.
                    </p>
                    <input
                        type="text"
                        placeholder="Search command or mission..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "0.65rem 0.9rem",
                            borderRadius: "10px",
                            background: "rgba(0,0,0,0.3)",
                            border: "1px solid var(--gy-glass-border)",
                            color: "#fff",
                            fontSize: "0.92rem",
                        }}
                    />
                </header>

                <div style={{ display: "grid", gap: "1rem" }}>
                    {groupedLevels.map((group) => (
                        <section key={group.title} className="gy-card" style={{ padding: "0.85rem", background: "rgba(10,20,55,0.35)", border: "1px solid rgba(99,102,241,0.2)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
                                <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 800 }}>{group.title}</h3>
                                <span className="gy-pill" style={{ fontSize: "0.72rem" }}>{group.subtitle}</span>
                            </div>

                            {group.items.length === 0 ? (
                                <p style={{ margin: 0, color: "var(--gy-muted)", fontSize: "0.85rem" }}>No commands in this section for current search.</p>
                            ) : (
                                <div style={{ display: "grid", gap: "0.55rem" }}>
                                    {group.items.map((lvl) => {
                                        const intel = simpleIntel[lvl.command] || {
                                            simple: "A Git command used for specific missions.",
                                            usage: lvl.command,
                                            why: "It helps manage your project history.",
                                            example: "Use this in your Git challenges.",
                                            steps: [
                                                "1) Open terminal in your project folder.",
                                                `2) Type: ${lvl.command} and press Enter.`,
                                                "3) Run git status to verify the result."
                                            ]
                                        };
                                        const isOpen = activeId === lvl.id;
                                        const safetyNote = getSafetyNote(lvl.command);
                                        const easySteps = intel.steps;

                                        return (
                                            <article key={lvl.id} style={{ borderRadius: "12px", border: isOpen ? "1px solid var(--gy-primary)" : "1px solid rgba(255,255,255,0.07)", overflow: "hidden", background: isOpen ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.02)" }}>
                                                <button
                                                    onClick={() => setActiveId((prev) => (prev === lvl.id ? 0 : lvl.id))}
                                                    style={{
                                                        width: "100%",
                                                        textAlign: "left",
                                                        padding: "0.78rem 0.9rem",
                                                        background: "transparent",
                                                        border: "none",
                                                        color: "inherit",
                                                        cursor: "pointer",
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <div>
                                                        <code style={{ fontWeight: 800, color: "#e2e8f0", fontSize: "0.92rem" }}>{lvl.command}</code>
                                                        <p style={{ margin: "0.2rem 0 0", color: "var(--gy-muted)", fontSize: "0.78rem" }}>{lvl.mission}</p>
                                                    </div>
                                                    <span style={{ fontSize: "0.75rem", opacity: 0.85 }}>{isOpen ? "▲" : "▼"}</span>
                                                </button>

                                                {isOpen && (
                                                    <div style={{ padding: "0.9rem", borderTop: "1px solid rgba(255,255,255,0.08)", display: "grid", gap: "0.7rem", background: "rgba(0,0,0,0.18)" }}>
                                                        <div>
                                                            <p className="gy-kicker" style={{ marginBottom: "0.35rem", color: "var(--gy-primary)" }}>// SIMPLE</p>
                                                            <p style={{ margin: 0, fontSize: "0.98rem", color: "#f1f5f9" }}>{intel.simple}</p>
                                                        </div>

                                                        <div>
                                                            <p className="gy-kicker" style={{ marginBottom: "0.35rem", color: "#22d3ee" }}>USAGE</p>
                                                            <div style={{ background: "#050505", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "0.55rem 0.7rem" }}>
                                                                <code style={{ color: "#22d3ee" }}>{intel.usage}</code>
                                                            </div>
                                                        </div>

                                                        <div style={{ display: "grid", gap: "0.4rem" }}>
                                                            <p className="gy-kicker" style={{ margin: 0, color: "#10b981" }}>EXAMPLE</p>
                                                            <p style={{ margin: 0, fontSize: "0.9rem", color: "#cbd5e1" }}>{intel.example}</p>
                                                            <p className="gy-kicker" style={{ margin: "0.25rem 0 0", color: "#f59e0b" }}>WHY</p>
                                                            <p style={{ margin: 0, fontSize: "0.9rem", color: "#e2e8f0" }}>{intel.why}</p>
                                                        </div>

                                                        <div>
                                                            <p className="gy-kicker" style={{ marginBottom: "0.35rem", color: "#60a5fa" }}>3 EASY STEPS</p>
                                                            {easySteps.map((step) => (
                                                                <p key={step} style={{ margin: "0 0 0.25rem", fontSize: "0.86rem", color: "#cbd5e1" }}>{step}</p>
                                                            ))}
                                                        </div>

                                                        <p style={{ margin: 0, fontSize: "0.8rem", color: "#fbbf24" }}>
                                                            <strong>Before run:</strong> {safetyNote}
                                                        </p>
                                                    </div>
                                                )}
                                            </article>
                                        );
                                    })}
                                </div>
                            )}
                        </section>
                    ))}
                </div>
            </section>
        </main>
    );
}
