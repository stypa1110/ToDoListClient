<template>
  <div id="app" class="container mt-5">
    <div class="row mb-4">
      <div class="col">
        <h2>Wybierz datę, aby wczytać zadania</h2>
        <DateSelector @tasks-loaded="updateTasks" />
      </div>
    </div>
    <div class="row mb-4">
      <div class="col">
        <h2>Dodaj lub edytuj zadanie</h2>
        <TaskForm :editTask="currentTask" @task-added="fetchTasksForDate" @task-updated="fetchTasksForDate" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h2>Lista zadań</h2>
        <TaskList :tasks="tasks" @task-updated="fetchTasksForDate" @task-deleted="fetchTasksForDate" @edit-task="editTask" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import DateSelector from './components/DateSelector.vue';
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';
import { type Task, fetchTasksByDate } from './api';

export default defineComponent({
  name: 'App',
  components: {
    DateSelector,
    TaskForm,
    TaskList
  },
  setup() {
    const tasks = ref<Task[]>([]);
    const currentTask = ref<Task | null>(null);

    const updateTasks = (loadedTasks: Task[]) => {
      tasks.value = loadedTasks;
    };

    const fetchTasksForDate = async () => {
      const dateInput = document.getElementById("taskDate") as HTMLInputElement;
      if (dateInput && dateInput.value) {
        const date = dateInput.value;
        const loadedTasks = await fetchTasksByDate(date);
        tasks.value = loadedTasks;
      }
    };

    const editTask = (task: Task) => {
      currentTask.value = task;
    };

    return {
      tasks,
      currentTask,
      fetchTasksForDate,
      updateTasks,
      editTask
    };
  }
});
</script>
