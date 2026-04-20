import { useAuth } from "../../hooks";
import { useGameContext } from "../../context";
import styles from "./Profile.module.scss";
import { motion } from "framer-motion";

export default function Profile() {
  const { user } = useAuth();
  const { progress } = useGameContext();
  const completedLevels = Math.max(0, progress.level - 1);
  const totalLevels = 30;
  const completionPercent = Math.min(100, Math.round((completedLevels / totalLevels) * 100));

  const rank = progress.level <= 10 ? "Novice Committer" : progress.level <= 20 ? "Workflow Architect" : "Git Legend";

  const badges = [
    { id: 'first-commit', name: "First Commit", icon: "🌱", unlockLevel: 1, color: "#10b981" },
    { id: 'branch-explorer', name: "Branch Explorer", icon: "🌿", unlockLevel: 10, color: "#6366f1" },
    { id: 'conflict-resolver', name: "Conflict Resolver", icon: "⚔️", unlockLevel: 15, color: "#ef4444" },
    { id: 'in-training', name: "In-Training", icon: "⏳", unlockLevel: 25, color: "#f59e0b" },
    { id: 'git-master', name: "Git Master", icon: "👑", unlockLevel: 30, color: "#fff" },
  ];

  const milestones = [
    { lv: 6, label: "LV 6", icon: "🛡️" },
    { lv: 10, label: "LV 10", icon: "🔓" },
    { lv: 20, label: "LV 20", icon: "🔒" },
    { lv: 30, label: "LV 30", icon: "⭐" }
  ];

  const nextBadge = badges.find((badge) => progress.level < badge.unlockLevel);

  return (
    <div className={styles.profileContainer}>
      <motion.div
        className={styles.profileLayout}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left Panel: Profile Summary */}
        <aside className={`${styles.glassCard} ${styles.sidebar}`}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Avatar" />
              ) : (
                user?.displayName?.[0] || user?.email?.[0]?.toUpperCase() || "K"
              )}
            </div>
            <div className={styles.email}>{user?.email || "developer@gitveda.io"}</div>

            <div className={styles.levelBarContainer}>
              <div className={styles.levelLabel}>LEVEL <span>{progress.level}</span></div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${(progress.xp % 500) / 5}%` }}
                />
              </div>
              <div className={styles.xpValue}><b>{progress.xp}</b> / 500 XP</div>
            </div>

            <div className={styles.statRow}>
              <div className={styles.statLabel}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0l2 5h5l-4 3 1.5 5-4.5-3-4.5 3 1.5-5-4-3h5z" /></svg>
                MISSIONS COMPLETED
              </div>
              <div className={styles.statValue}>{completedLevels} / {totalLevels}</div>
            </div>

            <div className={styles.campaignProgress}>
              <div className={styles.campaignLabel}>
                <span>CAMPAIGN PROGRESS</span>
                <span>{completionPercent}%</span>
              </div>
              <div className={styles.track}>
                <div className={styles.fill} style={{ width: `${completionPercent}%` }} />
              </div>
              <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.4rem' }}>{completionPercent}% campaign completion</p>
            </div>

            <div className={styles.highlightAchievement}>
              <div className={styles.token}>🏆</div>
              <div className={styles.content}>
                <h4>{rank}</h4>
                <p>+{(progress.level * 100).toLocaleString()} XP</p>
              </div>
            </div>

            <div className={styles.milestones}>
              {milestones.map((m, i) => (
                <div key={i} className={styles.milestoneItem}>
                  <div className={`${styles.milestoneBadge} ${progress.level >= m.lv ? styles.active : styles.locked}`}>
                    {m.icon}
                  </div>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Panel: Content Content */}
        <main className={styles.mainPanel}>
          {/* Achievement Hall */}
          <section className={`${styles.glassCard} ${styles.achievementHall}`}>
            <div className={styles.header}>
              <h3><span>Achievement</span> Hall</h3>
            </div>

            {/* Featured Achievement */}
            <div className={styles.highlightAchievement} style={{ marginBottom: '2rem', width: '100%', boxSizing: 'border-box' }}>
              <div className={styles.token}>🏅</div>
              <div className={styles.content}>
                <h4 style={{ fontSize: '1.4rem' }}>{rank}</h4>
                <p>Current Milestone Progress: {completionPercent}% Complete</p>
                <div className={styles.track} style={{ marginTop: '0.75rem', height: '4px', background: 'rgba(255,255,255,0.1)' }}>
                  <div className={styles.fill} style={{ width: `${completionPercent}%`, background: '#fbbf24' }} />
                </div>
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fbbf24' }}>+{(progress.level * 100).toLocaleString()} XP</span>
              </div>
            </div>

            <div className={styles.achievementGrid}>
              {badges.map((badge) => {
                const isUnlocked = progress.level >= badge.unlockLevel;
                return (
                  <div
                    key={badge.id}
                    className={`${styles.achievementCard} ${isUnlocked ? styles.unlocked : ''}`}
                  >
                    <div className={styles.icon}>{badge.icon}</div>
                    <h5>{badge.name}</h5>
                    <p>{isUnlocked ? `Unlocked at Lvl ${badge.unlockLevel}` : `Pass Lvl ${badge.unlockLevel} to unlock`}</p>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>
                {nextBadge
                  ? `Next achievement: ${nextBadge.name}. Pass Level ${nextBadge.unlockLevel} to unlock it.`
                  : "Git Master status achieved. All systems synchronized."}
              </p>
            </div>
          </section>

          {/* Operational Telemetry */}
          <section className={`${styles.glassCard} ${styles.telemetrySection}`}>
            <div className={styles.header}>
              <h3>Operational Telemetry</h3>
            </div>

            <div className={styles.telemetryGrid}>
              <div className={styles.telemetryItem}>
                <div className={`${styles.label} ${styles.cyan}`}>COMMITS</div>
                <div className={styles.value}>{Math.floor(progress.xp / 42)}</div>
                <div className={styles.telemetryBar}>
                  <div className={`${styles.fill} ${styles.cyan}`} style={{ width: '45%' }} />
                </div>
              </div>

              <div className={styles.telemetryItem}>
                <div className={`${styles.label} ${styles.indigo}`}>PULL REQUESTS</div>
                <div className={styles.value}>{Math.floor(progress.level / 2) + 1}</div>
                <div className={styles.telemetryBar}>
                  <div className={`${styles.fill} ${styles.indigo}`} style={{ width: '30%' }} />
                </div>
              </div>

              <div className={styles.telemetryItem}>
                <div className={`${styles.label} ${styles.amber}`}>MERGE CONFLICTS</div>
                <div className={styles.value}>0</div>
                <div className={styles.telemetryBar}>
                  <div className={`${styles.fill} ${styles.amber}`} style={{ width: '0%' }} />
                </div>
              </div>
            </div>
          </section>
        </main>
      </motion.div>
    </div>
  );
}
