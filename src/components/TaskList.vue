<template>
  <div v-if="tasks.length">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nazwa zadania</th>
          <th>Opis</th>
          <th>Data zadania</th>
          <th>Data powiadomienia</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.taskId">
          <td>{{ task.name }}</td>
          <td>{{ task.description }}</td>
          <td>{{ formatDate(task.taskDate) }}</td>
          <td>{{ formatDate(task.notificationDate) }}</td>
          <td>
            <button @click="editTask(task)" class="btn btn-sm btn-warning">Edytuj</button>
            <button @click="deleteTask(task.taskId)" class="btn btn-sm btn-danger">Usuń</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <p>Brak zadań do wyświetlenia dla wybranej daty.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { deleteTask, type Task } from '../api';

export default defineComponent({
  name: 'TaskList',
  props: {
    tasks: {
      type: Array as PropType<Task[]>,
      required: true
    }
  },
  emits: ['task-updated', 'task-deleted', 'edit-task'],
  methods: {
    async editTask(task: Task) {
      this.$emit('edit-task', task);
    },
    async deleteTask(taskId: number) {
      await deleteTask(taskId);
      this.$emit('task-deleted');
    },
    formatDate(date: Date) {
      return date.toLocaleString([], {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
});
</script>
