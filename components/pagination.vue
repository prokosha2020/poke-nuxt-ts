<template>
  <div class="cnt-pagination">
    <button class="btn btn-prev_page" v-if="hasPrev()" @click="changePage(prevPage)">&larr;</button>
    <div class="bnt-middle">
      <button class="btn bnt-middle_item" v-if="hasFirst()" @click="changePage(1)">
        <span>1</span>
      </button>
      <button class="btn bnt-middle_item" v-if="hasFirst()">...</button>
      <button
        class="btn bnt-middle_item"
        v-for="(page, index) in pages"
        :key="index"
        :class="{current: currentPage === page}"
        @click="changePage(page)"
      >
        <span class="bnt-middle_item_text">{{page}}</span>
      </button>
      <button class="btn bnt-middle_item" v-if="hasLast()">...</button>
      <button class="btn bnt-middle_item" v-if="hasLast()" @click="changePage(totalPages)">
        <span>{{totalPages}}</span>
      </button>
    </div>
    <button class="btn btn-next_page" v-if="hasNext()" @click="changePage(nextPage)">&rarr;</button>
  </div>
</template>
<script lang='ts'>
import { Vue, Component, Prop, PropSync } from 'vue-property-decorator'

@Component
export default class Pagination extends Vue {
  @Prop(Number) totalPokemons!: number
  @Prop(Number) perPokemons!: number
  @Prop(Number) pageRange!: number
  protected get currentPage(): number {
    return this.$store.getters['currentPage']
  }
  get pages(): number[] {
    const pages: number[] = []
    for (let i: number = this.rangeStart; i <= this.rangeEnd; i++) {
      pages.push(i)
    }
    return pages
  }
  get nextPage(): number {
    return this.currentPage + 1
  }
  get prevPage(): number {
    return this.currentPage - 1
  }
  get totalPages(): number {
    return Math.ceil(this.totalPokemons / this.perPokemons)
  }
  get rangeStart(): number {
    const start: number = this.currentPage - this.pageRange
    return start > 0 ? start : 1
  }
  get rangeEnd(): number {
    const end: number = this.currentPage + this.pageRange
    return end < this.totalPages ? end : this.totalPages
  }
  hasFirst(): boolean {
    return this.rangeStart !== 1
  }
  hasLast(): boolean {
    return this.rangeEnd !== this.totalPages
  }
  changePage(page: number) {
    this.$store.dispatch('changePage', page)
    this.$emit('pageChange')
  }
  hasPrev(): boolean {
    return this.currentPage > 1
  }
  hasNext(): boolean {
    return this.currentPage < this.totalPages
  }
}
</script>

<style scoped>
.cnt-pagination {
  position: absolute;
  left: 0;
  bottom: 20px;
  height: 40px;
}
.btn {
  outline: none;
}
.cnt-pagination,
.bnt-middle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  font-size: 10px;
}
.bnt-middle {
  justify-content: center;
}
.btn-prev_page,
.btn-next_page,
.bnt-middle_item {
  height: 100%;
  padding: 15px 20px;
  color: rgb(207, 32, 32);
  background: rgba(240, 233, 233, 0.897);
  border-radius: 3px;
  line-height: 0;
  border: none;
  cursor: pointer;
}
.btn-prev_page:hover,
.btn-next_page:hover,
.bnt-middle_item:hover,
.bnt-middle_item.current {
  background: rgb(207, 32, 32);
  color: white;
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}
.bnt-middle_item {
  padding: 10px;
  margin-right: 10px;
  list-style: none;
}
.bnt-middle_item:last-child {
  margin-right: 0px;
}
@media (max-width: 1000px) {
  .btn-prev_page,
  .btn-next_page,
  .bnt-middle_item {
    padding: 10px;
    font-size: 10px;
  }
  .cnt-pagination,
  .bnt-middle {
    padding: 20px 10px;
  }
}
@media (max-width: 400px) {
  .btn-prev_page,
  .btn-next_page,
  .bnt-middle_item {
    font-size: 9px;
  }
  .bnt-middle_item {
    margin-right: 3px;
  }
  .cnt-pagination {
    padding: 10px;
  }
  .cnt-pagination,
  .bnt-middle {
    padding: 10px 5px;
  }
}
</style>
