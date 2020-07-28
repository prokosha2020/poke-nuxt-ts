<template>
  <div class="main_cont-poke_card">
    <div class="poke_card">
      <div class="poke-img">
        <div class="card__front">
          <img
            class="card-img"
            v-if="item.data.sprites.front_default"
            :src="item.data.sprites.front_default"
          />
          <img class="card-img" v-else src="~/assets/No-image-available.png" alt="noImg" />
        </div>
        <div class="card__back">
          <img
            class="card-img"
            v-if="item.data.sprites.back_default"
            :src="item.data.sprites.back_default"
          />
          <img class="card-img" v-else src="~/assets/No-image-available.png" alt="noImg" />
        </div>
      </div>
      <div class="poke_card-descr">
        <p class="poke_card-descr-item">
          <span class="title">Name:</span>
          <span class="poke_name">{{name}}</span>
        </p>
        <p class="poke_card-descr-item">
          <span class="title">Id:</span>
          {{item.data.id}}
        </p>
        <p class="poke_card-descr-item">
          <span class="title">Weight:</span>
          {{item.data.weight}}
        </p>
        <p class="poke_card-descr-item">
          <span class="title">Height:</span>
          {{item.data.height}}
        </p>
        <p class="poke_card-descr-item">
          <span class="title">Base experience:</span>
          {{item.data.base_experience}}
        </p>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class PokeCard extends Vue {
  @Prop({ type: Object, required: true }) readonly item!: any
  get name(): String {
    const name: string = this.item.data.name
    return name.charAt(0).toUpperCase() + name.substr(1)
  }
}
</script>

<style scoped lang="scss">
.main_cont-poke_card {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 11pt;
}
.cont_pokemon.tile {
  .poke_card {
    flex-direction: column;
    height: 100%;
    padding: 5px;
    .poke-img {
      padding-bottom: 45%;
      width: 45%;
    }
  }
}
.main_cont-poke_card {
  display: flex;
  width: 100%;
}
.card-img {
  width: 100%;
  height: 100%;
}
.poke_card {
  display: flex;
  width: 100%;
  align-items: center;
  padding: 10px 20px;
  text-align: left;
  background: rgba(169, 233, 243, 0.616);
  margin: 3px;
  color: rgb(33, 36, 231);
}
.poke_card-descr {
  padding-left: 10px;
}
.poke_card-descr-item {
  margin: 10px;
  .title {
    color: rgb(105, 10, 107);
    margin-right: 5px;
  }
  &:first-child {
    font-weight: bold;
    font-size: 12pt;
  }
}
.poke-img {
  position: relative;
  padding-bottom: 25%;
  width: 25%;
  text-align: center;
  &:hover .card__front {
    -webkit-transform: rotateY(-180deg);
    transform: rotateY(-180deg);
  }
  &:hover .card__back {
    -webkit-transform: rotateY(0);
    transform: rotateY(0);
  }
}
.card__front,
.card__back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
}
.card__back {
  -webkit-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
}
@media (max-width: 820px) {
  .poke_card {
    padding: 5px 5px 5px 10px;
  }
}
</style>
