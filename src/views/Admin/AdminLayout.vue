<script lang="ts">
import AdminHeaderBar from "@/components/HeaderBar.vue"

export default {
  components: { AdminHeaderBar }
}
</script>

<template>
  <div>
    <AdminHeaderBar />
    <div class="outletContainer">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.outletContainer {
  height: calc(100vh - 54px);
  overflow-y: auto;
  background-color: #b8c2cc;
  padding: 20px 40px;
}
</style>