<template>
  <div div class="link-card" @click.prevent="openItem(item.data)">
    <pokecard :item="item"></pokecard>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  components: {
    pokecard: () => import('~/components/pokeCard.vue'),
  },
})
export default class ListPokemon extends Vue {
  @Prop({ type: Object, required: true }) readonly item!: any
  openItem(item: any) {
    this.$router.push('/poke/' + item.id)
  }
}
</script>

<style scoped lang="scss">
.link-card {
  display: flex;
  text-decoration: none;
  cursor: pointer;
  width: 50%;
  &:hover {
    background: rgba(0, 191, 255, 0.418);
  }
}
.cont_pokemon.tile {
  .link-card {
    margin: 5px;
    width: 22%;
  }
}
@media (max-width: 1000px) {
  .cont_pokemon.tile {
    .link-card {
      width: 33%;
    }
  }
  .link-card {
    width: 65%;
  }
}
@media (max-width: 621px) {
  .cont_pokemon.tile {
    .link-card {
      width: 45%;
    }
  }
  .link-card {
    width: 85%;
  }
}
@media (max-width: 420px) {
  .cont_pokemon.tile {
    .link-card {
      width: 100%;
    }
  }
  .link-card {
    width: 100%;
  }
}
</style>
