<script lang="ts">
import PatientHeaderBar from "@/components/HeaderBar.vue"

export default {
  components: { PatientHeaderBar }
}
</script>

<template>
  <div>
    <PatientHeaderBar />
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