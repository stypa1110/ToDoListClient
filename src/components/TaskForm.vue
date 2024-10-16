<template>
  <form @submit.prevent="submitForm" class="mb-4">
    <div class="mb-3">
      <input v-model="task.name" class="form-control" placeholder="Nazwa zadania" />
    </div>
    <div class="mb-3">
      <input v-model="task.description" class="form-control" placeholder="Opis" />
    </div>
    <div class="mb-3">
      <label for="taskDate" class="form-label">Data zadania:</label>
      <input v-model="task.taskDate" type="datetime-local" id="taskDate" class="form-control" step="60" />
    </div>
    <div class="mb-3">
      <label for="notificationDate" class="form-label">Data powiadomienia:</label>
      <input v-model="task.notificationDate" type="datetime-local" id="notificationDate" class="form-control" step="60" />
    </div>
    <button type="submit" class="btn btn-primary">{{ isEditing ? 'Aktualizuj zadanie' : 'Dodaj zadanie' }}</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { addTask, updateTask, type Task } from '../api';

export default defineComponent({
  name: 'TaskForm',
  props: {
    editTask: Object as () => Task | null
  },
  emits: ['task-added', 'task-updated'],
  setup(props, { emit }) {
    const task = ref<Task>({
      taskId: 0,
      name: '',
      description: '',
      taskDate: new Date(),
      notificationDate: new Date()
    });
    const isEditing = ref(false);

    const resetForm = () => {
      task.value = {
        taskId: 0,
        name: '',
        description: '',
        taskDate: new Date(),
        notificationDate: new Date()
      };
      isEditing.value = false;
    };

    watch(() => props.editTask, (newTask) => {
      if (newTask) {
        task.value = { ...newTask };
        isEditing.value = true;
      } else {
        resetForm();
      }
    }, { immediate: true });

    const submitForm = async () => {
      if (isEditing.value) {
        await updateTask(task.value);
        emit('task-updated');
      } else {
        await addTask(task.value);
        emit('task-added');
      }
      resetForm();
    };

    return {
      task,
      isEditing,
      submitForm,
      resetForm
    };
  }
});
</script>
