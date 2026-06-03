import { create } from 'zustand'

const useStore = create((set, get) => ({
  currentZone: 0,
  previousZone: null,
  isTransitioning: false,
  isLoading: true,
  isMuted: true,

  setZone: (zoneIndex) => set((state) => ({
    previousZone: state.currentZone,
    currentZone: zoneIndex,
  })),

  setTransitioning: (val) => set({ isTransitioning: val }),
  setLoading: (val) => set({ isLoading: val }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
}))

export default useStore
