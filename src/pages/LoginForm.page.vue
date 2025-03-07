<template>
  <n-card>
    <n-text>Connexion / Inscription <br><br></n-text>
    <n-tabs type="line" ref="tabs">
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
          <n-text>Pas de compte ? <a @click="() => setActiveTab('register')">S'inscrire</a></n-text>
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
          <n-text>Déjà un compte ? <a @click="setActiveTab('login')">Se connecter</a></n-text>
        </n-form>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NButton, NCard, NText, NInput } from 'naive-ui';
import { router } from '../router';

const user = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');

async function login() {
  // Appel à l'API pour vérifier les identifiants
  try {
    const response = await fetch('https://pokemon-api-seyrinian-production.up.railway.app/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.value,
        password: password.value
      })
    });
    const data = await response.json();
    if (response.ok) {
      const token = data.token;
      localStorage.setItem('token', token);
      alert('Connexion réussie');
      router.push('/deck-builder');
    } else {
      alert('Nom d\'utilisateur ou mot de passe incorrect');
    }
  } catch (e) {
    alert('Erreur lors de la connexion : ' + e);
  }
}

async function register() {
  if (password.value !== confirmPassword.value) {
    alert('Les mots de passe ne correspondent pas');
    return;
  }
  // Appel à l'API pour créer un nouvel utilisateur
  try {
    const response = await fetch('https://pokemon-api-seyrinian-production.up.railway.app/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.value,
        password: password.value
      })
    });
    const data = await response.json();
    if (response.ok) {
      alert('Inscription réussie');
    } else {
      alert('Erreur lors de l\'inscription');
    }
  } catch (e) {
    alert('Erreur lors de l\'inscription : ' + e);
  }
}
const tabs = ref();

function setActiveTab(name: string) {
  if (tabs.value) {
    tabs.value.setActiveName(name);
  }
}
</script>

<style scoped>
</style>