export const initialUserProgress = {
  level: 1,
  xp: 0,
  streakDays: 0,
  achievements: [],
  missionPerformance: {}, // { [levelId]: { trials: N, breakthrough: M } }
};

export function userProgressReducer(state, action) {
  switch (action.type) {
    case "ADD_XP":
      return { ...state, xp: state.xp + action.payload };
    case "COMPLETE_LEVEL":
      const isNextLevel = action.payload.level === state.level;
      return {
        ...state,
        xp: state.xp + action.payload.xp,
        level: isNextLevel ? state.level + 1 : state.level
      };
    case "UPDATE_STREAK":
      return { ...state, streakDays: state.streakDays + 1 };
    case "SAVE_MISSION_STATS":
      return {
        ...state,
        missionPerformance: {
          ...state.missionPerformance,
          [action.payload.levelId]: {
            trials: action.payload.trials,
            breakthrough: action.payload.breakthrough
          }
        }
      };
    case "SET_PROFILE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
