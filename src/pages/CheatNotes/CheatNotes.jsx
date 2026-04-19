import { useState } from "react";
import { gameLevels } from "../../data/levels";

export default function CheatNotes() {
    const [search, setSearch] = useState("");
    const [activeCommand, setActiveCommand] = useState(gameLevels[0]);
    const [terminalOutput, setTerminalOutput] = useState([
        "user@gitveda:~$ git help --all",
        "Loading Git command intelligence...",
        "Select a command to view details and simulation."
    ]);

    const filteredCommands = gameLevels.filter(c =>
        c.command.toLowerCase().includes(search.toLowerCase()) ||
        c.mission.toLowerCase().includes(search.toLowerCase())
    );

    const simulateCommand = (cmd) => {
        setActiveCommand(cmd);
        setTerminalOutput(prev => [
            ...prev.slice(-10),
            `user@gitveda:~$ ${cmd.command}`,
            `Executing mission: ${cmd.mission}...`,
            `Result: Command validated. Target question: ${cmd.question}`
        ]);
    };

    return (
        <main className="gy-grid" style={{ gridTemplateColumns: '1fr 0.8fr', gap: '2rem' }}>
            <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <header>
                    <p className="gy-kicker">INTERACTIVE TERMINAL</p>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Git Command Simulator</h1>
                </header>

                <div className="gy-card" style={{
                    padding: '0',
                    background: '#0a0a0f',
                    borderRadius: '16px',
                    border: '1px solid #1e293b',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '500px'
                }}>
                    <div style={{
                        background: '#1e293b',
                        padding: '0.75rem 1rem',
                        display: 'flex',
                        gap: '0.5rem',
                        alignItems: 'center'
                    }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></div>
                        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'var(--gy-font-mono)' }}>git-bash-v4.2</span>
                    </div>
                    <div className="gy-term-out" style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        padding: '1.5rem',
                        color: '#10b981'
                    }}>
                        {terminalOutput.map((line, i) => (
                            <p key={i} style={{ margin: '0 0 0.5rem', fontFamily: 'var(--gy-font-mono)', fontSize: '0.9rem' }}>
                                {line}
                            </p>
                        ))}
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <span style={{ color: '#6366f1' }}>user@gitveda:~$</span>
                            <span style={{ width: '8px', height: '1.2em', background: '#10b981', animation: 'pulse 1s infinite' }}></span>
                        </div>
                    </div>
                </div>

                <article className="gy-card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(15, 23, 42, 0.8))' }}>
                    <p className="gy-kicker" style={{ color: 'var(--gy-accent)' }}>COMMAND INTEL</p>
                    <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{activeCommand?.command}</h3>
                    <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>{activeCommand?.mission}</p>
                    <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--gy-glass-border)' }}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--gy-muted)', marginBottom: '0.5rem' }}>SCENARIO CHALLENGE:</p>
                        <p style={{ fontWeight: 500 }}>{activeCommand?.question}</p>
                    </div>
                </article>
            </section>

            <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <header>
                    <p className="gy-kicker">CHEATSHEET DATABASE</p>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Git Knowledge Base</h2>
                </header>

                <div className="gy-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '700px' }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Search git commands..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem 0.75rem 2.5rem',
                                borderRadius: '12px',
                                background: 'rgba(0,0,0,0.2)',
                                border: '1px solid var(--gy-glass-border)',
                                color: '#fff',
                                outline: 'none'
                            }}
                        />
                        <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {filteredCommands.map((cmd) => (
                                <button
                                    key={cmd.id}
                                    onClick={() => simulateCommand(cmd)}
                                    style={{
                                        textAlign: 'left',
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        background: activeCommand?.id === cmd.id ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.02)',
                                        border: activeCommand?.id === cmd.id ? '1px solid var(--gy-primary)' : '1px solid transparent',
                                        color: '#fff',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <code style={{ fontFamily: 'var(--gy-font-mono)', fontWeight: 700, color: activeCommand?.id === cmd.id ? 'var(--gy-primary)' : '#fff' }}>
                                            {cmd.command}
                                        </code>
                                        <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>Lvl {cmd.level}</span>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--gy-muted)', marginTop: '0.3rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {cmd.mission}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
        </main>
    );
}
