<template>
  <div class="wrapper_spinner">
    <img class="img_spinner" src="~/assets/spinner.gif" alt="spinner" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Spinner extends Vue {}
</script>

<style lang="scss">
.wrapper_spinner {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  min-height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .img_spinner {
    width: 54px;
    height: 54px;
  }
}
</style>

