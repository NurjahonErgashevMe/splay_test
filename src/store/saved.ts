import { create } from "zustand";
import { persist } from "zustand/middleware";

type savedId = number | string;

interface ISavedStore {
  saved: savedId[];
  addSaved: (dataId: savedId) => void;
  removeSaved: (dataId: savedId) => void;
  toggleSaved: (dataId: savedId) => void;
}

const removeSaved = (state: ISavedStore, dataId: savedId): savedId[] => {
  return state.saved.filter((item) => item !== dataId);
};

const addSaved = (state: ISavedStore, data: string | number): savedId[] => {
  return [...state.saved, data];
};

export const isSaved = (
  saved: ISavedStore["saved"],
  dataId: savedId
): boolean => {
  return !!saved.find((id) => id === dataId);
};

const useSaved = create<ISavedStore>()(
  persist(
    (set) => ({
      saved: [],
      addSaved: (dataId) =>
        set((state) => ({
          saved: addSaved(state, dataId),
        })),
      removeSaved: (dataId) =>
        set((state) => ({
          saved: removeSaved(state, dataId),
        })),
      toggleSaved: (dataId) =>
        set((state) => ({
          saved: isSaved(state.saved, dataId)
            ? removeSaved(state, dataId)
            : addSaved(state, dataId),
        })),
    }),
    { name: "saved" }
  )
);

export default useSaved;
