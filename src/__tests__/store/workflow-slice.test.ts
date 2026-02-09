import { describe, it, expect } from "vitest";
import reducer, {
  setWizardStep,
  nextWizardStep,
  prevWizardStep,
  updateWizardDraft,
  resetWizard,
  setRevisionDraft,
  resetRevisionDraft,
} from "@/store/slices/workflow-slice";

const initialState = {
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

describe("workflow-slice", () => {
  describe("wizard reducers", () => {
    it("returns initial state", () => {
      const state = reducer(undefined, { type: "unknown" });
      expect(state).toEqual(initialState);
    });

    it("setWizardStep sets the current step", () => {
      const state = reducer(initialState, setWizardStep(2));
      expect(state.wizard.currentStep).toBe(2);
    });

    it("nextWizardStep increments step", () => {
      const state = reducer(initialState, nextWizardStep());
      expect(state.wizard.currentStep).toBe(1);
    });

    it("nextWizardStep does not exceed totalSteps - 1", () => {
      const atLast = { ...initialState, wizard: { ...initialState.wizard, currentStep: 3 } };
      const state = reducer(atLast, nextWizardStep());
      expect(state.wizard.currentStep).toBe(3);
    });

    it("prevWizardStep decrements step", () => {
      const atTwo = { ...initialState, wizard: { ...initialState.wizard, currentStep: 2 } };
      const state = reducer(atTwo, prevWizardStep());
      expect(state.wizard.currentStep).toBe(1);
    });

    it("prevWizardStep does not go below 0", () => {
      const state = reducer(initialState, prevWizardStep());
      expect(state.wizard.currentStep).toBe(0);
    });

    it("updateWizardDraft merges data and sets isDirty", () => {
      const state = reducer(initialState, updateWizardDraft({ name: "Test", email: "t@t.com" }));
      expect(state.wizard.draft).toEqual({ name: "Test", email: "t@t.com" });
      expect(state.wizard.isDirty).toBe(true);
    });

    it("updateWizardDraft merges incrementally", () => {
      const first = reducer(initialState, updateWizardDraft({ name: "Test" }));
      const second = reducer(first, updateWizardDraft({ email: "t@t.com" }));
      expect(second.wizard.draft).toEqual({ name: "Test", email: "t@t.com" });
    });

    it("resetWizard restores initial wizard state", () => {
      let state = reducer(initialState, nextWizardStep());
      state = reducer(state, updateWizardDraft({ name: "Test" }));
      state = reducer(state, resetWizard());
      expect(state.wizard).toEqual(initialState.wizard);
    });
  });

  describe("revisionDraft reducers", () => {
    it("setRevisionDraft updates partial fields", () => {
      const state = reducer(initialState, setRevisionDraft({ revisionId: "rev-1", action: "approve" }));
      expect(state.revisionDraft.revisionId).toBe("rev-1");
      expect(state.revisionDraft.action).toBe("approve");
      expect(state.revisionDraft.comment).toBe("");
    });

    it("setRevisionDraft merges incrementally", () => {
      const first = reducer(initialState, setRevisionDraft({ revisionId: "rev-1" }));
      const second = reducer(first, setRevisionDraft({ comment: "Looks good" }));
      expect(second.revisionDraft).toEqual({ revisionId: "rev-1", action: null, comment: "Looks good" });
    });

    it("resetRevisionDraft restores initial state", () => {
      let state = reducer(initialState, setRevisionDraft({ revisionId: "rev-1", action: "reject", comment: "No" }));
      state = reducer(state, resetRevisionDraft());
      expect(state.revisionDraft).toEqual(initialState.revisionDraft);
    });
  });
});
