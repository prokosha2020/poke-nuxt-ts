<template>
  <div class="container">
    <spinner v-if="loading"></spinner>
    <header class="header">
      <div class="cnt_item-on-page">
        <span>Show on page</span>
        <select class="item-on-page" v-model="perPokemons" @change="fetchList(offset)">
          <option v-for="(elem, index) in listItemOnPage" :value="elem" :key="index">{{elem}}</option>
        </select>
      </div>
      <button class="mode" title="Change mode" @click.prevent="changeMode">
        <svg v-if="isActive" aria-hidden="true" class="svg-tile" viewBox="0 0 448 512">
          <path
            d="M0 32v128h128V32H0zm120 120H8V40h112v112zm40-120v128h128V32H160zm120 120H168V40h112v112zm40-120v128h128V32H320zm120 120H328V40h112v112zM0 192v128h128V192H0zm120 120H8V200h112v112zm40-120v128h128V192H160zm120 120H168V200h112v112zm40-120v128h128V192H320zm120 120H328V200h112v112zM0 352v128h128V352H0zm120 120H8V360h112v112zm40-120v128h128V352H160zm120 120H168V360h112v112zm40-120v128h128V352H320z"
          />
        </svg>
        <svg v-else aria-hidden="true" class="svg-list" viewBox="0 0 512 512">
          <path
            d="M48 48a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 16H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"
          />
        </svg>
      </button>
    </header>
    <ul class="cont_pokemon" :class="{ tile: isActive}">
      <listpokemon v-for="(item, index) in listPokemons" :item="item" :key="index"></listpokemon>
    </ul>
    <pagination
      :perPokemons="perPokemons"
      :totalPokemons="totalPokemons"
      @pageChange="fetchList(offset)"
      :pageRange="pageRange"
    ></pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

@Component({
  components: {
    listpokemon: () => import('~/components/listPokemon.vue'),
    pagination: () => import('~/components/pagination.vue'),
    spinner: () => import('~/components/spinner.vue'),
  },
})
export default class HomePage extends Vue {
  listPokemons: any[] = []
  totalPokemons: number = 0
  listItemOnPage: number[] = [4, 8, 12, 24]
  windowWidth: number = 0
  loading: boolean = false
  protected get currentPage(): number {
    return this.$store.getters['currentPage']
  }
  get offset(): number {
    return this.currentPage > 1 ? (this.currentPage - 1) * this.perPokemons : 0
  }
  get perPokemons(): number {
    return this.$store.getters['perPokemons']
  }
  get isActive(): boolean {
    return this.$store.getters['isActive']
  }
  set perPokemons(val: number) {
    this.$store.dispatch('changeItemOnPage', val)
  }
  get pageRange(): number {
    return this.windowWidth <= 530 ? 1 : 2
  }
  created() {
    this.fetchList(this.offset)
    if (process.browser) {
      window.addEventListener('resize', this.getWindowWidth)
      this.getWindowWidth()
    }
  }

  destroyed() {
    if (process.browser) {
      window.removeEventListener('resize', this.getWindowWidth)
    }
  }
  changeItemOnPage() {
    this.$store.dispatch('changeItemOnPage', +this.perPokemons)
  }
  async fetchList(offsets: Number) {
    try {
      this.loading = true
      this.totalPokemons = await this.getTotalPokemons()
      const { data }: any = await axios.get(
        'https://pokeapi.co/api/v2/pokemon/',
        {
          params: { limit: this.perPokemons, offset: offsets },
        }
      )
      if (data) {
        this.listPokemons = await Promise.all(
          await data.results.map(async (item: any) => {
            return await axios.get(item.url)
          })
        )
      } else {
        this.$nuxt.context.error({ message: 'Failed response!!!' })
      }
    } catch (error) {
      console.log(error)
      this.$nuxt.context.error(error)
    } finally {
      this.loading = false
    }
  }

  async getTotalPokemons() {
    const { data }: any = await axios.get('https://pokeapi.co/api/v2/pokemon/')
    return data.count
  }

  changeMode(): void {
    this.$store.dispatch('changeIsActive', !this.isActive)
  }

  getWindowWidth(): void {
    this.windowWidth = window.innerWidth
  }
}
</script>

<style scoped lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  padding-bottom: 60px;
}
.mode {
  background: transparent;
  border: none;
  width: 30px;
  margin-left: 20px;
  cursor: pointer;
  outline: none;
  &:hover {
    .svg-list,
    .svg-tile {
      fill: rgb(24, 8, 172);
    }
  }
}
.svg-list,
.svg-tile {
  width: 30px;
  fill: #fff;
}
.header {
  display: flex;
  justify-content: flex-end;
  background-color: rgba(0, 191, 255, 0.418);
  width: 100%;
  padding: 20px;
  min-height: 79px;
}
.cnt_item-on-page {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 40%;
  color: #fff;
}
.item-on-page {
  display: inline-block;
  height: 34px;
  padding: 0 3px;
  margin-left: 10px;
  border: none;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
  -webkit-tap-highlight-color: transparent;
  background: rgb(51, 203, 230);
}
.cont_pokemon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 5px;
  &.tile {
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;
    align-items: stretch;
    margin: auto;
  }
}
@media (max-width: 400px) {
  .cnt_item-on-page {
    width: 100%;
  }
  .mode {
    display: none;
  }
}
</style>
