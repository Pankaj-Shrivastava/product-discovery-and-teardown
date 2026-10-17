import { AppState, GeneratedPrompt, PillarInsights, ProductInput, StageNumber } from '../types'

export type AppAction =
  | { type: 'SET_PRODUCT'; payload: Partial<ProductInput> }
  | { type: 'SET_PROMPTS'; payload: GeneratedPrompt[] }
  | { type: 'SET_STAGE'; payload: StageNumber }
  | { type: 'COMPLETE_STAGE'; payload: StageNumber }
  | { type: 'SET_INSIGHTS'; payload: PillarInsights }
  | { type: 'TOGGLE_INSIGHT_SELECTION'; payload: { insightId: string } }
  | { type: 'RESET_STATE' }

export const initialProduct: ProductInput = {
  name: '',
  companyName: '',
  category: 'Productivity & Tools',
  platform: 'Cross-platform',
  businessModel: 'B2B',
  additionalContext: '',
}

export const initialState: AppState = {
  product: initialProduct,
  prompts: [],
  insights: null,
  deck: {
    slides: [],
    theme: 'dark-violet',
  },
  currentStage: 1,
  stageCompletion: {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  },
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_PRODUCT':
      return {
        ...state,
        product: {
          ...state.product,
          ...action.payload,
        },
      }

    case 'SET_PROMPTS':
      return {
        ...state,
        prompts: action.payload,
        stageCompletion: {
          ...state.stageCompletion,
          2: true,
        },
      }

    case 'SET_STAGE':
      return {
        ...state,
        currentStage: action.payload,
      }

    case 'COMPLETE_STAGE':
      return {
        ...state,
        stageCompletion: {
          ...state.stageCompletion,
          [action.payload]: true,
        },
      }

    case 'SET_INSIGHTS':
      return {
        ...state,
        insights: action.payload,
        stageCompletion: {
          ...state.stageCompletion,
          4: true,
        },
      }

    case 'TOGGLE_INSIGHT_SELECTION': {
      if (!state.insights) return state
      const targetId = action.payload.insightId

      const updatedPillars = state.insights.pillars.map((pillar) => ({
        ...pillar,
        insights: pillar.insights.map((ins) =>
          ins.id === targetId ? { ...ins, selected: !ins.selected } : ins
        ),
      }))

      const updatedUnmatched = state.insights.unmatched.map((ins) =>
        ins.id === targetId ? { ...ins, selected: !ins.selected } : ins
      )

      return {
        ...state,
        insights: {
          ...state.insights,
          pillars: updatedPillars,
          unmatched: updatedUnmatched,
        },
      }
    }

    case 'RESET_STATE':
      return initialState

    default:
      return state
  }
}
