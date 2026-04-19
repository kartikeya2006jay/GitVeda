export const initialGitState = {
  initialized: false,
  currentBranch: "main",
  branches: { main: [] },
  head: null,
  staged: [],
  commits: [],
};

export function gitEngineReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return { ...state, initialized: true };
    case "ADD":
      return { ...state, staged: [...new Set([...state.staged, ...action.payload.files])] };
    case "COMMIT": {
      const commit = action.payload.commit;
      const branchCommits = state.branches[state.currentBranch] || [];
      return {
        ...state,
        head: commit.id,
        staged: [],
        commits: [...state.commits, commit],
        branches: {
          ...state.branches,
          [state.currentBranch]: [...branchCommits, commit.id],
        },
      };
    }
    case "BRANCH":
      return {
        ...state,
        branches: {
          ...state.branches,
          [action.payload.name]: [...(state.branches[state.currentBranch] || [])],
        },
      };
    case "CHECKOUT":
      return { ...state, currentBranch: action.payload.name };
    default:
      return state;
  }
}
