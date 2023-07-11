<template>
  <div class="pagination" v-if="items.length > page">
    <button
      @click="loadPage(page - 1)"
      :disabled="page === 1"
      :class="page === 1 ? 'btn--previous-disabled' : ''"
      class="btn btn--previous"
    >
      Previous
    </button>
    <button
      @click="loadPage(page + 1)"
      :disabled="!hasMoreData"
      :class="!hasMoreData ? 'btn--previous-disabled' : ''"
      class="btn btn--next"
    >
      Next
    </button>
  </div>
</template>
<script setup>
const router = useRouter()
const { items, page, hasMoreData } = defineProps([
  "items",
  "page",
  "hasMoreData",
])

const emit = defineEmits(["handlePaginate"])

const loadPage = (pageNumber) => {
  emit("handlePaginate", pageNumber)
}
</script>
