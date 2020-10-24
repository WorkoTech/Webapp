<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3>Statistics</h3>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table thead-classes="thead-light" :data="profileActions">
        <template slot="columns">
          <th>Current score</th>
          <th></th>
          <th>Personnal Best</th>
          <th>Next Goal</th>
        </template>

        <template slot-scope="{row}">
          <td>{{row.currentValue}}</td>
          <th scope="row">{{row.actionTitle}}</th>
          <td>{{row.maxValueReached}}</td>
          <td>
            {{row.nextGoal}}
          </td>
        </template>
      </base-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "statistics-table",
  data() {
    return {};
  },
  computed: {
    profileActions(){
      console.log("RUNNING PROFILE_ACTIONS")
        return this.$store.getters.profileActions
      },
  },
  mounted() {
    this.$store.dispatch('PROFILE_ACTIONS');
  }
};
</script>
<style>
</style>
