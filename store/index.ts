import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  currentPage: 1 as number,
  perPokemons: 4 as number,
  isActive: false as boolean,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  currentPage: (state) => state.currentPage,
  perPokemons: (state) => state.perPokemons,
  isActive: (state) => state.isActive,
}

export const mutations: MutationTree<RootState> = {
  CHANGE_CURRENTPAGE: (state, newPage: number) => (state.currentPage = newPage),
  CHANGE_ITEMONPAGE: (state, newItem: number) => (state.perPokemons = newItem),
  CHANGE_ISACTIVE: (state, newItem: boolean) => (state.isActive = newItem),
}

export const actions: ActionTree<RootState, RootState> = {
  changePage({ commit }, payload: number) {
    commit('CHANGE_CURRENTPAGE', payload)
  },
  changeItemOnPage({ commit }, payload: number) {
    commit('CHANGE_ITEMONPAGE', payload)
  },
  changeIsActive({ commit }, payload: boolean) {
    commit('CHANGE_ISACTIVE', payload)
  },
}
