<template>
  <div>
    <div class="cont-app">
      <nuxt />
    </div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.cont-app {
  margin: 0 auto;
  width: 60%;
  background: rgb(212, 242, 252);
  font-family: "Times New Roman", Times, serif;
}
@media (max-width: 820px) {
  .cont-app {
    width: 90%;
  }
}
@media (max-width: 620px) {
  .cont-app {
    width: 100%;
  }
}
</style>
