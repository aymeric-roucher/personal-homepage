import { create } from "zustand";

// One shared focus for the whole attention walkthrough: hovering a score cell,
// a softmax row or an output column anywhere highlights the same (t, s) pair
// in every animation on screen.
interface FocusState {
  focusT: number | null; // query / output position
  focusS: number | null; // source / key position
  setFocus: (t: number | null, s: number | null) => void;
  clearFocus: () => void;
}

export const useFocusStore = create<FocusState>((set) => ({
  focusT: null,
  focusS: null,
  setFocus: (focusT, focusS) => set({ focusT, focusS }),
  clearFocus: () => set({ focusT: null, focusS: null }),
}));
