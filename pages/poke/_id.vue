<template>
  <div class="cnt-pagePoke">
    <headerComp />
    <spinner v-if="loading"></spinner>
    <div v-if="item">
      <pokecard :item="item">
        <div class="cont-descr">
          <ul class="cont-desc_child">
            <p class="item-title">Abilities:</p>
            <li class="cont-descr-item" v-for="elem in abilities" :key="elem.name">
              <div class="item_name">{{elem.name}}</div>
              <div class="item_descr">
                <span class="item_descr-species-title">Decsription:</span>
                {{elem.descr}}
              </div>
            </li>
          </ul>
          <ul class="cont-desc_child">
            <p class="item-title">Stats:</p>
            <li class="cont-descr-item" v-for="elem in stats" :key="elem.name">
              <div class="item_name">{{elem.name}}</div>
              <div class="item_descr">
                <div>
                  <span class="item_descr-species-title">Affecting moves (decrease):</span>
                  {{elem.descr.affectingMovesDecr}}
                </div>
                <div>
                  <span class="item_descr-species-title">Affecting moves (increase):</span>
                  {{elem.descr.affectingMovesIncr}}
                </div>
              </div>
            </li>
          </ul>
          <ul class="cont-desc_child">
            <p class="item-title">Types:</p>
            <div class="cont-descr-item" v-for="elem in types" :key="elem.name">
              <div class="item_descr">{{elem.name}}</div>
            </div>
          </ul>
          <ul class="cont-desc_child">
            <p>
              <span class="item-title">Held items:</span>
              <span v-if="isHeldItems">No data</span>
            </p>
            <div class="cont-descr-item" v-for="elem in held_items" :key="elem.name">
              <div class="item_descr">{{elem.name}}</div>
            </div>
          </ul>
          <div class="cont-desc_child">
            <p class="item-title">Species:</p>
            <div class="item_descr">
              <p>
                <span class="item_descr-species-title">Color:</span>
                {{species.color}}
              </p>
              <p>
                <span class="item_descr-species-title">Shape:</span>
                {{species.shape}}
              </p>
              <p>
                <span class="item_descr-species-title">Capture rate:</span>
                {{species.captureRate}}
              </p>
            </div>
          </div>
          <ul class="cont-desc_child">
            <p>
              <span class="item-title">Location area encounters:</span>
              <span v-if="isLocation">No data</span>
            </p>
            <div v-for="elem in locationAreaEncounters" :key="elem.name">
              <div class="item_descr">{{elem}}</div>
            </div>
          </ul>
        </div>
      </pokecard>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import Item from '~/models/Item'
import { Component, Vue } from 'vue-property-decorator'
interface DataIndex {
  [index: number]: any
}
@Component({
  components: {
    pokecard: () => import('~/components/pokeCard.vue'),
    headerComp: () => import('~/components/header.vue'),
    spinner: () => import('~/components/spinner.vue'),
  },
})
export default class PokePage extends Vue {
  loading: boolean = false
  abilities: string[] = []
  stats: string[] = []
  types: string[] = []
  species: Item = {}
  held_items: string[] = []
  locationAreaEncounters: string[] = []
  item: any = null
  arrParamsForDesrc: string[][] = [
    ['abilities', 'ability'],
    ['types', 'type'],
    ['stats', 'stat'],
    ['held_items', 'item'],
  ]
  created() {
    this.fetchData(this.arrParamsForDesrc)
  }
  get isHeldItems(): boolean {
    return !this.held_items.length
  }
  get isLocation(): boolean {
    return !this.locationAreaEncounters.length
  }
  async fetchData(arrParams: string[][]) {
    try {
      this.loading = true
      const data: any = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}`
      )
      if (data) {
        this.item = data
        arrParams.forEach((el: DataIndex) => {
          this.getData(el[0], el[1])
        })
        this.getSpecies(data.data.species.url)
        this.getlocationAreaEncounters(data.data.location_area_encounters)
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
  async getData(arrData: string, key: string) {
    try {
      this[
        arrData as 'abilities' | 'types' | 'stats' | 'held_items'
      ] = await Promise.all(
        await this.item.data[arrData].map(async (item: any) => {
          let decsription: Item | string = {}
          try {
            const { data }: any = await axios.get(item[key].url)
            if (arrData === 'abilities') {
              decsription = data.effect_entries[0].effect
            } else if (arrData === 'stats') {
              decsription = {
                affectingMovesDecr:
                  this.getAffectingMoves('decrease', data) || 'No data',
                affectingMovesIncr:
                  this.getAffectingMoves('increase', data) || 'No data',
              }
            }
          } catch (error) {
            console.log(error)
            this.$nuxt.context.error(error)
          }
          return {
            name: item[key].name,
            descr: decsription,
          }
        })
      )
    } catch (error) {
      console.log(error)
      this.$nuxt.context.error(error)
    }
  }
  getAffectingMoves(param: string, data: any): string {
    return data.affecting_moves[param]
      .map((el: any) => {
        return el.move.name
      })
      .join(', ')
  }
  async getSpecies(url: string) {
    try {
      const { data }: any = await axios.get(url)
      this.species = {
        color: data.color.name,
        shape: data.shape.name,
        captureRate: data.capture_rate,
      }
    } catch (error) {
      console.log(error)
      this.$nuxt.context.error(error)
    }
  }
  async getlocationAreaEncounters(url: string) {
    try {
      const { data }: any = await axios.get(url)
      this.locationAreaEncounters = data.map((item: any) => {
        return item.location_area.name
      })
    } catch (error) {
      console.log(error)
      this.$nuxt.context.error(error)
    }
  }
}
</script>

<style scoped lang="scss">
.cont-descr {
  line-height: 20px;
  color: rgb(6, 6, 104);
  padding: 10px 60px 10px 40px;
}
.cont-descr-item {
  padding-left: 10px;
  list-style: none;
}
.item_name {
  font-size: 13pt;
  color: rgb(174, 2, 180);
  padding: 5px 15px;
}
.item-title {
  font-size: 15pt;
  margin: 5px;
  color: rgb(33, 36, 231);
  font-weight: bold;
}
.item_descr {
  margin-left: 30px;
}
.item_descr-species-title {
  color: rgb(33, 36, 231);
  padding: 3px;
}
.cont-desc_child {
  padding: 10px 0;
}
@media (max-width: 620px) {
  .poke_card {
    padding: 5px 5px 5px 10px;
  }
}
@media (max-width: 420px) {
  .cont-descr {
    padding: 10px 20px 10px 10px;
  }
}
</style>
