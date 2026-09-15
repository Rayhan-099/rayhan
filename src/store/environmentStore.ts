import { create } from 'zustand';

interface EnvironmentState {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useEnvironmentStore = create<EnvironmentState>((set) => ({
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
}));
