import { create } from "zustand";

export const useStore = create((set) => ({
  count: 0,
  increaseCount: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));

const intialState = {
  loading: false,
  users: [],
};

export const userStore = create((set) => ({
  ...intialState,
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  removeUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
  updateUser: (updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      ),
    })),
}));
