import { useEffect, useRef, useState } from "react";
import { gameLevels } from "../../data/levels";

function getKidSteps(command, usage) {
    return [
        `1) Open terminal in your project folder.`,
        `2) Type: ${usage || command}`,
        "3) Press Enter and then run `git status` to verify."
    ];
}

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
        example: "You start a new game project. Run this first to make it a Git project."
    },
    "git status": {
        simple: "The Magic Map. It shows you which files you changed and which ones are ready to be saved.",
        usage: "git status",
        why: "So you don't forget what you were working on!",
        example: "You changed the colors in your game. Run this to see those files in red."
    },
    "git add .": {
        simple: "Putting toys in the box. This picks up your changes and puts them in a special 'waiting bag'.",
        usage: "git add .",
        why: "To get your work ready to be saved forever.",
        example: "You finished your drawing. Run this to 'pack' it for saving."
    },
    "git commit -m \"message\"": {
        simple: "Taking a snapshot. This saves your work into the secret folder forever with a little note.",
        usage: "git commit -m \"First version!\"",
        why: "So you can go back in time if you ever make a mistake!",
        example: "You finished level 1. Save it so you never lose your progress."
    },
    "git log --oneline": {
        simple: "Reading your diary. It shows a quick list of all the snapshots you've ever taken.",
        usage: "git log --oneline",
        why: "To see a timeline of how much you've worked!",
        example: "You want to see what you did yesterday. This shows your notes in a list."
    },
    "git branch": {
        simple: "Checking your paths. It shows which 'version' of your project you are currently on.",
        usage: "git branch",
        why: "So you don't accidentally work on the wrong version!",
        example: "You are on the 'Music' version. This confirms you're in the right spot."
    },
    "git checkout -b feature/login": {
        simple: "Making a twin world. This creates a new version of your project so you can play without breaking things.",
        usage: "git checkout -b my-new-idea",
        why: "To try new things safely without ruining your main version!",
        example: "You want to try adding fire to your game. Make a new 'fire' branch first!"
    },
    "git switch main": {
        simple: "Going back home. This takes you back to your main, stable version of the project.",
        usage: "git switch main",
        why: "To go back to the version that everyone else sees.",
        example: "Your experiment failed. Go back to 'main' where everything works."
    },
    "git diff": {
        simple: "Spot the difference. It shows exactly which lines of text you changed in your files.",
        usage: "git diff",
        why: "To double-check your work before you save it.",
        example: "You added a score button. This shows the old code vs the new button code."
    },
    "git restore README.md": {
        simple: "The Magic Undo. This brings back a file to how it was before you started messing with it.",
        usage: "git restore my-file.txt",
        why: "To fix mistakes instantly if you accidentally deleted something important.",
        example: "You deleted code by mistake. Run this and it comes back like magic!"
    },
    "git remote add origin <url>": {
        simple: "Connecting to the cloud. This links your secret folder to a folder on the internet magic cloud.",
        usage: "git remote add origin https://github.com/me/my-game",
        why: "So you can share your work with the whole world!",
        example: "You made a game. Now link it to GitHub to show your friends."
    },
    "git push -u origin main": {
        simple: "Sending a package. This sends all your snapshots to the internet cloud folder.",
        usage: "git push -u origin main",
        why: "To back up your work so you never lose it, even if your computer breaks!",
        example: "You finished your project. Push it to the cloud to keep it safe forever."
    },
    "git pull --rebase": {
        simple: "Getting treats. This fetches your friends' work from the cloud and puts your work on top.",
        usage: "git pull --rebase",
        why: "To stay up-to-date with your team without making a mess in your diary.",
        example: "Your friend added new levels. Pull them so you can play with them too!"
    },
    "git fetch --all": {
        simple: "Checking for updates. This looks at the cloud to see what's new without changing your work.",
        usage: "git fetch --all",
        why: "To see if your friends have finished their parts yet.",
        example: "You hear a new update is out. Fetch it to see what changed before you merge it."
    },
    "git merge feature/login": {
        simple: "Combining worlds. This takes your new experiments and puts them into your main version.",
        usage: "git merge my-new-idea",
        why: "To finally add your cool new feature to your real game.",
        example: "Your 'fire' experiment works! Merge it so everyone can have fire in their game."
    },
    "git rebase main": {
        simple: "Lifting your work. This moves your new ideas to the end of your friends' new work.",
        usage: "git rebase main",
        why: "To keep your history looking like a straight line instead of a big messy knot.",
        example: "The main game changed. Rebase your branch so it stays compatible with the new stuff."
    },
    "git stash push -m \"wip\"": {
        simple: "A quick shelf. This hides your messy, half-finished work so you can do something else fast.",
        usage: "git stash",
        why: "When you need to fix a bug right now but aren't done with your current work.",
        example: "Mom says dinner is ready! Stash your work so you don't lose it and log off."
    },
    "git stash pop": {
        simple: "Back from the shelf. This brings your hidden work back to your desk so you can finish it.",
        usage: "git stash pop",
        why: "To continue exactly where you left off.",
        example: "Dinner is over. Pop your work and get back to coding your game!"
    },
    "git cherry-pick <hash>": {
        simple: "Picking a flower. This takes just one special commit from another branch and brings it to yours.",
        usage: "git cherry-pick abc1234",
        why: "When you want a specific fix but don't want the whole other version.",
        example: "Your friend made a cool 'blue button' commit. Pick just that button for your branch!"
    },
    "git reset --soft HEAD~1": {
        simple: "The Oops Save. This undoes your last save but keeps the files ready to be saved again.",
        usage: "git reset --soft HEAD~1",
        why: "When you forgot a file or made a tiny typo in your note.",
        example: "You saved but forgot to add the icon. Soft reset -> add icon -> save again."
    },
    "git reset --hard HEAD": {
        simple: "The Nuclear Delete. This wipes EVERYTHING you did since your last save. No undo!",
        usage: "git reset --hard HEAD",
        why: "When your project is so broken you just want to restart from the last safe spot.",
        example: "You tried a library that ruined your project. Nuke it and go back to safety."
    },
    "git reflog": {
        simple: "The Super Diary. It remembers every single thing you ever did, even parts you deleted!",
        usage: "git reflog",
        why: "To find 'lost' work that you thought was gone forever.",
        example: "You accidentally deleted a branch. Find it in the Reflog and bring it back!"
    },
    "git bisect start": {
        simple: "Bug Detective. This helps you find exactly when a bug first appeared in your history.",
        usage: "git bisect start",
        why: "To find mistakes in giant projects very, very fast.",
        example: "The game worked last month. Use this to find the day it broke."
    },
    "git bisect bad": {
        simple: "Found a bug! During your detective work, tell Git: 'this version is broken'.",
        usage: "git bisect bad",
        why: "To help Git narrow down where the mistake is hiding.",
        example: "You tested this version and the character is flying. Mark it 'bad'."
    },
    "git bisect good <hash>": {
        simple: "Safe version! During your detective work, tell Git: 'this version is okay'.",
        why: "To tell Git that the bug must be in a newer version.",
        example: "You went back to last Tuesday and it works! Mark it 'good'."
    },
    "git rebase -i HEAD~4": {
        simple: "Cleaning your room. This lets you merge small commits, rename them, or delete bad ones.",
        usage: "git rebase -i HEAD~4",
        why: "So your project history looks professional and clean for others.",
        example: "You have 5 saves that say 'fix'. Combine them into one neat 'Game Over Fix' note."
    },
    "git commit --amend": {
        simple: "Editing the last page. This lets you change the very last snapshot you took.",
        usage: "git commit --amend",
        why: "To fix a typo in your last note without making a whole new save.",
        example: "You wrote 'Game Start' but meant 'Game Finish'. Amend it and you're good!"
    },
    "git clean -fd": {
        simple: "Spring Cleaning. This deletes every file that Git isn't tracking (like trash).",
        usage: "git clean -fd",
        why: "To get rid of temporary files that are cluttering your project.",
        example: "You have 100 log files you don't need. Clean them all at once!"
    },
    "git tag -a v1.0.0 -m \"release\"": {
        simple: "A Gold Star. This puts a permanent label on a special moment, like a big update.",
        usage: "git tag -v1.0",
        why: "So you can always find the 'Official Version' of your app later.",
        example: "You finished the game! Tag it 'v1.0' so it's easy to find."
    },
    "git push origin --tags": {
        simple: "Sharing your Gold Stars. This sends your version tags to the internet cloud.",
        usage: "git push origin --tags",
        why: "So everyone else can see where your official versions are.",
        example: "You tagged v1.0. Push the tags so your friends see the official release on GitHub."
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
                                        };
                                        const isOpen = activeId === lvl.id;
                                        const safetyNote = getSafetyNote(lvl.command);
                                        const easySteps = getKidSteps(lvl.command, intel.usage);

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
