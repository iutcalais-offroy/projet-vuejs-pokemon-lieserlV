<template>
  <n-card>
    <n-text>Connexion / Inscription <br><br></n-text>
    <n-tabs type="line">
      <n-tab-pane name="login" tab="Se connecter">
        <n-form @submit.prevent="login">
          <n-form-item label="Adresse email">
            <n-input v-model:value="user" placeholder="Adresse email"/>
          </n-form-item>
          <n-form-item label="Mot de passe">
            <n-input type="password" v-model:value="password" placeholder="Mot de passe" />
          </n-form-item>
          <n-form-item>
            <n-button type="primary" htmlType="submit">Connexion</n-button>
          </n-form-item>
          <n-text>Pas de compte ? <a @click="() => $refs.tabs.setActiveName('register')">S'inscrire</a></n-text>
        </n-form>
      </n-tab-pane>
      <n-tab-pane name="register" tab="S'inscrire">
        <n-form @submit.prevent="register">
          <n-form-item label="Adresse email">
            <n-input v-model:value="user" placeholder="Adresse email"/>
          </n-form-item>
          <n-form-item label="Mot de passe">
            <n-input type="password" v-model:value="password" placeholder="Mot de passe" />
          </n-form-item>
          <n-form-item label="Confirmer le mot de passe">
            <n-input type="password" v-model:value="confirmPassword" placeholder="Confirmer le mot de passe" />
          </n-form-item>
          <n-form-item>
            <n-button type="primary" htmlType="submit">S'inscrire</n-button>
          </n-form-item>
          <n-text>Déjà un compte ? <a @click="() => $refs.tabs.setActiveName('login')">Se connecter</a></n-text>
        </n-form>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user.store';
import { NButton, NCard, NText, NInput } from 'naive-ui';
import { router } from '../router';

const user = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');

const userStore = useUserStore();

async function login() {
  const isValid = await userStore.verifyPassword(user.value, password.value);
  if (isValid) {
    alert('Connexion réussie');
    router.push('/deck-builder');
  } else {
    alert('Nom d\'utilisateur ou mot de passe incorrect');
  }
}

async function register() {
  if (password.value !== confirmPassword.value) {
    alert('Les mots de passe ne correspondent pas');
    return;
  }
  await userStore.addUser(user.value, password.value);
  alert('Inscription réussie');
}
</script>

<style scoped>
</style>