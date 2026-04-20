import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gameLevels } from "../../data/levels";
import { useGameContext } from "../../context";
import styles from "./Learn.module.scss";
import { motion, AnimatePresence } from "framer-motion";

// Generate a winding path for 32 nodes
const generateNodes = () => {
  const nodes = [];
  const spacing = 150; // Vertical spacing
  const amplitude = 30; // Horizontal swing percentage
  const centerX = 50;

  for (let i = 0; i < 32; i++) {
    const angle = i * 0.8;
    const x = centerX + Math.sin(angle) * amplitude;
    const y = i * spacing + 100;
    nodes.push({ id: gameLevels[i]?.id, level: gameLevels[i]?.level, title: gameLevels[i]?.title, x, y });
  }
  return nodes;
};

const NODES_DATA = generateNodes();

export default function Challenges() {
  const navigate = useNavigate();
  const { progress } = useGameContext();
  const [selectedLevelId, setSelectedLevelId] = useState(progress.level);
  const viewportRef = useRef(null);

  const selectedMission = useMemo(() =>
    gameLevels.find(l => l.id === selectedLevelId) || gameLevels[0]
    , [selectedLevelId]);

  const completionPercent = Math.round(((progress.level - 1) / 30) * 100);

  // Generate SVG path string
  const pathD = useMemo(() => {
    return NODES_DATA.map((n, i) => `${i === 0 ? 'M' : 'L'} ${n.x}% ${n.y}`).join(' ');
  }, []);

  return (
    <div className={styles.mapContainer}>
      {/* MAP VIEWPORT */}
      <section className={styles.mapViewport} ref={viewportRef}>
        <div className={styles.nodesLayer}>
          {/* SVG Connection Path */}
          <svg className={styles.svgLayer} style={{ height: '5000px' }}>
            <path d={pathD} className={styles.glowPath} />
            <motion.path
              d={pathD}
              className={styles.activePath}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress.level / 32 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          {/* Mission Nodes */}
          {NODES_DATA.map((node, idx) => {
            const isLocked = progress.level < node.level;
            const isCurrent = node.level === progress.level;
            const isCompleted = progress.level > node.level;
            const isSelected = selectedLevelId === node.id;

            let statusClass = styles.locked;
            if (isCurrent) statusClass = styles.active;
            if (isCompleted) statusClass = styles.completed;

            return (
              <motion.div
                key={node.id}
                className={`${styles.node} ${statusClass} ${isSelected ? styles.selected : ''}`}
                style={{ left: `${node.x}%`, top: `${node.y}px` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.03 }}
                onClick={() => {
                  if (!isLocked) {
                    setSelectedLevelId(node.id);
                  }
                }}
              >
                <div className={styles.nodeInside}>
                  {isCompleted ? "✓" : isLocked ? "🔒" : node.level}
                </div>
                <div className={styles.nodeLabel}>
                  {node.title}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* MISSION INTEL SIDEBAR */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <p className="gy-kicker" style={{ color: 'var(--gy-primary)', marginBottom: '0.5rem' }}>MISSION INTEL</p>
          <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>Neural Strategy</h2>
        </div>

        <div className={styles.sidebarContent}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMission.id}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className={styles.missionDetailCard}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="gy-pill" style={{ fontSize: '0.6rem' }}>{selectedMission.difficulty.toUpperCase()}</span>
                <span style={{ color: 'var(--gy-primary)', fontSize: '0.8rem', fontWeight: 800 }}>Lvl {selectedMission.level}</span>
              </div>

              <h3 style={{ fontSize: '1.6rem', fontWeight: 900, marginTop: '1rem', marginBottom: '0.5rem' }}>{selectedMission.title}</h3>
              <p style={{ color: 'var(--gy-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{selectedMission.mission}</p>

              <div className={styles.intelGrid}>
                <div className={styles.intelItem}>
                  <span>Reward</span>
                  <strong>+{selectedMission.xpReward} XP</strong>
                </div>
                <div className={styles.intelItem}>
                  <span>Status</span>
                  <strong style={{ color: progress.level > selectedMission.id ? 'var(--gy-success)' : progress.level === selectedMission.id ? '#6366f1' : 'rgba(255,255,255,0.2)' }}>
                    {progress.level > selectedMission.id ? 'VERIFIED' : progress.level === selectedMission.id ? 'ACTIVE' : 'LOCKED'}
                  </strong>
                </div>
              </div>

              <button
                className="gy-btn"
                style={{ width: '100%', marginTop: '2rem' }}
                onClick={() => navigate(`/challenge/${selectedMission.id}`)}
              >
                INITIALIZE PROTOCOL →
              </button>
            </motion.div>
          </AnimatePresence>

          <div className={styles.activityLog}>
            <p className="gy-kicker" style={{ color: 'var(--gy-primary)', marginBottom: '1rem' }}>SYSTEM ACTIVITY</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', fontSize: '0.75rem', border: '1px solid rgba(255,255,255,0.05)', color: 'var(--gy-muted)' }}>
                <span style={{ color: 'var(--gy-success)' }}>●</span> Neural pathway {progress.level} mapped successfully.
              </div>
            </div>
          </div>
        </div>

        <div className={styles.progressStats}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--gy-muted)' }}>CAMPAIGN PROGRESS</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 900 }}>{completionPercent}%</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.fill} style={{ width: `${completionPercent}%` }} />
          </div>
        </div>
      </aside>
    </div>
  );
}
