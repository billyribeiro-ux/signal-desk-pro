import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface WizardState {
  currentStep: number;
  totalSteps: number;
  draft: Record<string, unknown>;
  isDirty: boolean;
}

interface RevisionDraft {
  revisionId: string | null;
  action: "approve" | "reject" | "request_changes" | null;
  comment: string;
}

interface WorkflowState {
  wizard: WizardState;
  revisionDraft: RevisionDraft;
}

const initialState: WorkflowState = {
  wizard: {
    currentStep: 0,
    totalSteps: 4,
    draft: {},
    isDirty: false,
  },
  revisionDraft: {
    revisionId: null,
    action: null,
    comment: "",
  },
};

export const workflowSlice = createSlice({
  name: "workflow",
  initialState,
  reducers: {
    setWizardStep(state, action: PayloadAction<number>) {
      state.wizard.currentStep = action.payload;
    },
    nextWizardStep(state) {
      if (state.wizard.currentStep < state.wizard.totalSteps - 1) {
        state.wizard.currentStep += 1;
      }
    },
    prevWizardStep(state) {
      if (state.wizard.currentStep > 0) {
        state.wizard.currentStep -= 1;
      }
    },
    updateWizardDraft(state, action: PayloadAction<Record<string, unknown>>) {
      state.wizard.draft = { ...state.wizard.draft, ...action.payload };
      state.wizard.isDirty = true;
    },
    resetWizard(state) {
      state.wizard = initialState.wizard;
    },
    setRevisionDraft(state, action: PayloadAction<Partial<RevisionDraft>>) {
      state.revisionDraft = { ...state.revisionDraft, ...action.payload };
    },
    resetRevisionDraft(state) {
      state.revisionDraft = initialState.revisionDraft;
    },
  },
});

export const {
  setWizardStep,
  nextWizardStep,
  prevWizardStep,
  updateWizardDraft,
  resetWizard,
  setRevisionDraft,
  resetRevisionDraft,
} = workflowSlice.actions;

export default workflowSlice.reducer;
