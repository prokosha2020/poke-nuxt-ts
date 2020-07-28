<template>
  <div>
    <div class="container-error">
      <h1 v-if="error.statusCode === 404">Page not found</h1>
      <h1 v-else>{{ error.message }}</h1>
      <h1>{{ error.statusCode }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Error extends Vue {
  @Prop({ type: Object, required: true }) readonly error: any
}
</script>

<style lang='scss'>
.container-error {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 100vw;
  height: 100vh;
}
</style>
