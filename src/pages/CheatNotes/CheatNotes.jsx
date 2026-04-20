import { useState } from "react";
import { gameLevels } from "../../data/levels";

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

    const activeCommand = gameLevels.find(l => l.id === activeId) || gameLevels[0];
    const intel = simpleIntel[activeCommand.command] || {
        simple: "A Git command used for specific missions.",
        usage: activeCommand.command,
        why: "Because it helps you manage your code history better!",
        example: "Used during your GitVeda challenges."
    };

    const filteredLevels = gameLevels.filter(l =>
        l.command.toLowerCase().includes(search.toLowerCase()) ||
        l.mission.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <main style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 400px) 1fr',
            gap: '1.5rem',
            height: 'calc(100vh - 120px)',
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '1rem'
        }}>
            {/* Sidebar: List of Commands */}
            <section className="gy-card" style={{ display: 'flex', flexDirection: 'column', padding: '1.25rem', overflow: 'hidden' }}>
                <header style={{ marginBottom: '1rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Git Intelligence</h2>
                    <input
                        type="text"
                        placeholder="Search commands..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.6rem 1rem',
                            borderRadius: '10px',
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid var(--gy-glass-border)',
                            color: '#fff',
                            fontSize: '0.9rem'
                        }}
                    />
                </header>

                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingRight: '0.4rem' }}>
                    {filteredLevels.map(lvl => (
                        <button
                            key={lvl.id}
                            onClick={() => setActiveId(lvl.id)}
                            style={{
                                textAlign: 'left',
                                padding: '0.75rem 1rem',
                                borderRadius: '12px',
                                background: activeId === lvl.id ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.03)',
                                border: '1px solid',
                                borderColor: activeId === lvl.id ? 'var(--gy-primary)' : 'transparent',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <div style={{ pointerEvents: 'none' }}>
                                <code style={{ fontWeight: 800, fontSize: '0.9rem', color: activeId === lvl.id ? '#fff' : '#cbd5e1' }}>{lvl.command}</code>
                                <p style={{ fontSize: '0.75rem', color: 'var(--gy-muted)', marginTop: '0.2rem' }}>{lvl.mission.slice(0, 30)}...</p>
                            </div>
                            <span style={{ fontSize: '0.65rem', opacity: 0.5, fontWeight: 800 }}>L{lvl.level}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* Main Content: Bento Grid */}
            <section style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.5rem' }}>
                <header className="gy-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), transparent)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, fontFamily: 'var(--gy-font-mono)', margin: 0 }}>{activeCommand.command}</h1>
                        <span className="gy-pill" style={{ background: 'var(--gy-primary)', color: '#fff' }}>MISSION {activeCommand.level}</span>
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {/* Simplified Meaning */}
                    <div className="gy-card" style={{ gridColumn: 'span 2', padding: '1.5rem', borderLeft: '6px solid var(--gy-primary)' }}>
                        <p className="gy-kicker" style={{ color: 'var(--gy-primary)', marginBottom: '0.5rem' }}>// SIMPLE STORY</p>
                        <p style={{ fontSize: '1.2rem', lineHeight: 1.5, fontWeight: 400, color: '#f8fafc' }}>{intel.simple}</p>
                    </div>

                    {/* Usage & Example */}
                    <div className="gy-card" style={{ padding: '1.5rem' }}>
                        <p className="gy-kicker" style={{ color: 'var(--gy-secondary)', marginBottom: '0.75rem' }}>// HOW TO USE</p>
                        <div style={{ background: '#000', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '1rem' }}>
                            <code style={{ color: 'var(--gy-secondary)', fontSize: '1rem' }}>{intel.usage}</code>
                        </div>
                        <p className="gy-kicker" style={{ color: 'var(--gy-muted)', marginBottom: '0.5rem' }}>REAL EXAMPLE:</p>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{intel.example}</p>
                    </div>

                    {/* Why Cool */}
                    <div className="gy-card" style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                        <p className="gy-kicker" style={{ color: 'var(--gy-success)', marginBottom: '0.75rem' }}>// WHY IT'S AWESOME</p>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>{intel.why}</p>
                        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gy-success)' }}>
                            <span style={{ fontSize: '1.2rem' }}>✨</span>
                            <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em' }}>MASTER PROTOCOL</span>
                        </div>
                    </div>
                </div>

                <div className="gy-card" style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--gy-glass-border)' }}>
                    <p className="gy-kicker" style={{ fontSize: '0.6rem', opacity: 0.5 }}>MISSION LOG ENTRY</p>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>In this mission, you will learn to use <code>{activeCommand.command}</code> to solve: {activeCommand.mission}</p>
                </div>
            </section>
        </main>
    );
}
