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
import { login, register } from '../components/User.component.vue';

const user = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');


const tabs = ref();

function setActiveTab(name: string) {
  if (tabs.value) {
    tabs.value.setActiveName(name);
  }
}
</script>

<style scoped>
</style>