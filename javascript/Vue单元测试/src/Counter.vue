<template>
    <div>
      {{ count }}
      <button @click="increment">自增</button>
    </div>
</template>
<script>
export default {
  data: () => ({
    count: 0
  }),
  methods: {
    increment() {
      this.count++;
    }
  }
};
</script>

