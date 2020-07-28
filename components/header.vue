<template>
  <div>
    <div class="cont_header">
      <button class="btn-home" @click="backToHome()">Home</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class HeaderPokePage extends Vue {
  backToHome() {
    this.$router.back();
  }
}
</script>

<style scoped lang="scss">
.cont_header {
  display: flex;
  margin: 0 auto;
  justify-content: flex-end;
  padding: 20px;
  width: 100%;
}
.btn-home {
  background-color: crimson;
  box-shadow: 0 0 7px rgb(163, 53, 53);
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: rgb(241, 28, 28);
  }
}
</style>
