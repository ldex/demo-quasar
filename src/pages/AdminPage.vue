<template>
  <q-page padding>
    <div>
      <h2>Admin Page</h2>
      <div>
        Hello {{ userStore.username }}
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useUserStore } from 'stores/user';
const userStore = useUserStore();
</script>
