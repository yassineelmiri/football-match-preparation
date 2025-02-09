import { create } from 'zustand';
import { Player, Staff } from '../types';

interface TeamStore {
  players: Player[];
  staffs: Staff[];
  fieldPlayers: { [key: string]: Player | null };
  substitutes: Player[];
  staffMembers: Staff[];
  setPlayers: (players: Player[]) => void;
  setStaffs: (staffs: Staff[]) => void;
  setFieldPlayer: (position: string, player: Player | null) => void;
  setSubstitute: (player: Player) => void;
  removeSubstitute: (playerId: number) => void;
  setStaffMember: (member: Player | Staff) => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
  players: [],
  staffs: [],
  fieldPlayers: {
    gk: null,
    lb: null,
    cb1: null,
    cb2: null,
    rb: null,
    lm: null,
    cm: null,
    rm: null,
    lw: null,
    st: null,
    rw: null,
  },
  substitutes: [],
  staffMembers: [],
  setPlayers: (players: Player[]) => {
    localStorage.setItem('players', JSON.stringify(players));
    set({ players });
  },
  setStaffs: (staffs: Staff[]) => {
    localStorage.setItem('staffs', JSON.stringify(staffs));
    set({ staffs });
  },
  setFieldPlayer: (position, player) =>
    set((state) => ({
      fieldPlayers: { ...state.fieldPlayers, [position]: player },
    })),
  setSubstitute: (player: Player) =>
    set((state: TeamStore) => ({
      substitutes: [...state.substitutes, player]
    })),
  removeSubstitute: (playerId: number) =>
    set((state: TeamStore) => ({
      substitutes: state.substitutes.filter((p) => p.id !== playerId)
    })),
  setStaffMember: (member: Player | Staff) =>
    set((state: TeamStore) => ({
      staffMembers: [...state.staffMembers, member]
    })),
}));