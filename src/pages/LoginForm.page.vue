<template>
  <n-card>
    <n-text>Connexion / Inscription <br><br></n-text>
    <n-tabs type="line" v-model:value="activeTab">
      <n-tab-pane name="login" tab="Se connecter">
        <n-form @submit.prevent="handleLogin">
          <n-form-item label="Adresse email">
            <n-input v-model:value="user" placeholder="Adresse email" />
          </n-form-item>
          <n-form-item label="Mot de passe">
            <n-input type="password" v-model:value="password" placeholder="Mot de passe" />
          </n-form-item>
          <n-form-item>
            <n-button type="primary" htmlType="submit" @click="handleLogin">Connexion</n-button>
          </n-form-item>
          <n-text>Pas de compte ? <a @click="() => setActiveTab('register')">S'inscrire</a></n-text>
        </n-form>
      </n-tab-pane>
      <n-tab-pane name="register" tab="S'inscrire">
        <n-form @submit.prevent="handleRegister">
          <n-form-item label="Adresse email">
            <n-input v-model:value="user" placeholder="Adresse email" />
          </n-form-item>
          <n-form-item label="Mot de passe">
            <n-input type="password" v-model:value="password" placeholder="Mot de passe" />
          </n-form-item>
          <n-form-item label="Confirmer le mot de passe">
            <n-input type="password" v-model:value="confirmPassword" placeholder="Confirmer le mot de passe" />
          </n-form-item>
          <n-form-item>
            <n-button type="primary" htmlType="submit" @click="handleRegister">S'inscrire</n-button>
          </n-form-item>
          <n-text>Déjà un compte ? <a @click="setActiveTab('login')">Se connecter</a></n-text>
        </n-form>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>



<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { NButton, NCard, NText, NInput } from 'naive-ui';

import { login, register } from '../services/auth.service';

const user = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');
const activeTab = ref('login');
const router = useRouter();

function setActiveTab(name: string) {
  activeTab.value = name;
}

async function handleLogin() {
  try {
    const success = await login(user.value, password.value);
    if (success) {
      router.push('/deck-builder');
    } else {
      console.log('Erreur lors de la connexion');
    }
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
  }
}

async function handleRegister() {
  try {
    const success = await register(user.value, password.value, confirmPassword.value);
    if (success) {
      setActiveTab('login');
    } else {
      console.log('Erreur lors de l\'inscription');
    }
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
  }
}
</script>

<style scoped></style>