<template>
  <div>
    <label for="taskDate" class="form-label">Wybierz datę:</label>
    <input type="date" v-model="selectedDate" @change="fetchTasksForDate" id="taskDate" class="form-control mb-3" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { fetchTasksByDate, type Task } from '../api';

export default defineComponent({
  name: 'DateSelector',
  emits: ['tasks-loaded'],
  setup(props, { emit }) {
    const selectedDate = ref('');

    const fetchTasksForDate = async () => {
      if (selectedDate.value) {
        const tasks = await fetchTasksByDate(selectedDate.value);
        emit('tasks-loaded', tasks);
      }
    };

    return {
      selectedDate,
      fetchTasksForDate
    };
  }
});
</script>
