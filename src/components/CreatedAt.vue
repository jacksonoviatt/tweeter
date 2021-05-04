<template>
  <div>
    <img @click="viewDate = !viewDate"
      class="dateButton"
      src="../assets/calendar.svg"
      alt="calendar"
    />
    <p v-if="viewDate === true"> {{ createdAt }}</p>
  </div>
</template>

<script>
export default {
  name: "created-at",
  props: {
    createdAt: String,
  },
  data() {
      return {
          viewDate: false,
      }
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 15px;
  margin: 0 10px;
}
p {
    margin-top: 2px;
}
</style>