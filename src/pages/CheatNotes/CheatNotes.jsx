import { useState } from "react";
import { gameLevels } from "../../data/levels";

const advancedDetails = {
    "git init": {
        complexity: "Low",
        sideEffects: "Creates a hidden .git directory. Local only.",
        bestPractices: "Run in the root of your project folder. Avoid nesting .git repos.",
        related: ["git status", "git remote add"],
        deepDive: "Initializes a new Git repository. If executed in an existing repo, it will reinitialize it, which is safe but usually unnecessary unless resetting templates."
    },
    "git status": {
        complexity: "Low",
        sideEffects: "None. Read-only operation.",
        bestPractices: "Run frequently to maintain situational awareness of your working directory.",
        related: ["git diff", "git add"],
        deepDive: "Shows the state of the working directory and the staging area. It lets you see which changes have been staged, which haven't, and which files aren't being tracked by Git."
    },
    "git add .": {
        complexity: "Low",
        sideEffects: "Stages all changes in the current directory and subdirectories.",
        bestPractices: "Use 'git add -p' for interactive staging if you want to be precise.",
        related: ["git commit", "git reset"],
        deepDive: "Adds all modifications to the staging area. The '.' is a wildcard for 'everything here'. Be careful not to stage sensitive info like secrets or large binaries."
    },
    "git commit -m \"message\"": {
        complexity: "Medium",
        sideEffects: "Creates a new snapshot in the history. Immutable once pushed (safely).",
        bestPractices: "Write clear, imperative messages (e.g., 'Fix typo' instead of 'Fixed typo'). Keep commits atomic.",
        related: ["git log", "git push"],
        deepDive: "The commit command captures a snapshot of the project's currently staged changes. Each commit has a unique SHA-1 hash for identification."
    },
};

export default function CheatNotes() {
    const [search, setSearch] = useState("");
    const [activeCommand, setActiveCommand] = useState(gameLevels[0]);

    const filteredCommands = gameLevels.filter(c =>
        c.command.toLowerCase().includes(search.toLowerCase()) ||
        c.mission.toLowerCase().includes(search.toLowerCase())
    );

    const currentDetails = advancedDetails[activeCommand.command] || {
        complexity: "N/A",
        sideEffects: "Standard git operation.",
        bestPractices: "Follow team conventions.",
        related: [],
        deepDive: "Advanced documentation for this command is being synchronized. Please standby."
    };

    return (
        <main className="gy-grid" style={{ gridTemplateColumns: '1fr 0.8fr', gap: '2.5rem' }}>
            <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <header>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <p className="gy-kicker" style={{ margin: 0, color: 'var(--gy-primary)', fontWeight: 800 }}>TECHNICAL INTELLIGENCE</p>
                        <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, var(--gy-primary), transparent)' }}></div>
                    </div>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, marginTop: '0.5rem' }}>Git Command Core</h1>
                </header>

                <article className="gy-card" style={{
                    background: 'linear-gradient(165deg, rgba(99, 102, 241, 0.1), rgba(15, 23, 42, 0.95))',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(99, 102, 241, 0.1)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '2rem' }}>
                        <div>
                            <code style={{ fontSize: '2.5rem', color: '#fff', fontWeight: 800, fontFamily: 'var(--gy-font-mono)', textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
                                {activeCommand.command}
                            </code>
                            <p className="gy-muted" style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>{activeCommand.mission}</p>
                        </div>
                        <span className="gy-pill" style={{ background: 'var(--gy-primary)', color: '#fff', padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                            Complexity: {currentDetails.complexity}
                        </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.2)', borderRadius: '16px', borderLeft: '4px solid var(--gy-secondary)' }}>
                            <p className="gy-kicker" style={{ color: 'var(--gy-secondary)', marginBottom: '0.5rem' }}>SIDE EFFECTS</p>
                            <p style={{ fontSize: '0.9rem' }}>{currentDetails.sideEffects}</p>
                        </div>
                        <div style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.2)', borderRadius: '16px', borderLeft: '4px solid var(--gy-accent)' }}>
                            <p className="gy-kicker" style={{ color: 'var(--gy-accent)', marginBottom: '0.5rem' }}>BEST PRACTICES</p>
                            <p style={{ fontSize: '0.9rem' }}>{currentDetails.bestPractices}</p>
                        </div>
                    </div>

                    <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid var(--gy-glass-border)' }}>
                        <p className="gy-kicker" style={{ marginBottom: '0.75rem' }}>DEEP DIVE ANALYSIS</p>
                        <p style={{ lineHeight: 1.6, color: '#e2e8f8' }}>{currentDetails.deepDive}</p>
                    </div>

                    {currentDetails.related.length > 0 && (
                        <div style={{ marginTop: '2rem' }}>
                            <p className="gy-kicker" style={{ marginBottom: '0.5rem' }}>RELATED PROTOCOLS</p>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                {currentDetails.related.map(r => (
                                    <span key={r} style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--gy-primary)', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700 }}>
                                        {r}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </article>
            </section>

            <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className="gy-card" style={{ height: '800px', display: 'flex', flexDirection: 'column', border: '1px solid var(--gy-glass-border)' }}>
                    <header style={{ marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Knowledge Matrix</h2>
                        <div style={{ position: 'relative', marginTop: '1rem' }}>
                            <input
                                type="text"
                                placeholder="Search command intelligence..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '1rem 1rem 1rem 3rem',
                                    borderRadius: '16px',
                                    background: 'rgba(0,0,0,0.3)',
                                    border: '1px solid var(--gy-glass-border)',
                                    color: '#fff',
                                    outline: 'none',
                                    fontSize: '1rem'
                                }}
                            />
                            <span style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                        </div>
                    </header>

                    <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {filteredCommands.map((cmd) => (
                            <button
                                key={cmd.id}
                                onClick={() => setActiveCommand(cmd)}
                                style={{
                                    textAlign: 'left',
                                    padding: '1.25rem',
                                    borderRadius: '20px',
                                    background: activeCommand.id === cmd.id ? 'linear-gradient(90deg, rgba(99, 102, 241, 0.2), transparent)' : 'rgba(255,255,255,0.02)',
                                    border: activeCommand.id === cmd.id ? '1px solid var(--gy-primary)' : '1px solid transparent',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                    transform: activeCommand.id === cmd.id ? 'translateX(5px)' : 'none'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <code style={{ fontFamily: 'var(--gy-font-mono)', fontWeight: 800, color: activeCommand.id === cmd.id ? 'var(--gy-primary)' : '#fff', fontSize: '1rem' }}>
                                        {cmd.command}
                                    </code>
                                    <span style={{ fontSize: '0.7rem', opacity: 0.5, fontWeight: 700 }}>LEVEL {cmd.level}</span>
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--gy-muted)', marginTop: '0.4rem' }}>
                                    {cmd.mission}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
