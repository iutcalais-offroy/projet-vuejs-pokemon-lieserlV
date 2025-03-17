<template>
  <div>
    <h2>Login</h2>
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>

    <h2>Register</h2>
    <input v-model="registerEmail" type="email" placeholder="Email" />
    <input v-model="registerPassword" type="password" placeholder="Password" />
    <input v-model="confirmPassword" type="password" placeholder="Confirm Password" />
    <button @click="register">Register</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const registerEmail = ref('');
const registerPassword = ref('');
const confirmPassword = ref('');
const router = useRouter();

async function login() {
  try {
    const response = await fetch('https://pokemon-api-seyrinian-production.up.railway.app/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
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
      alert('Erreur lors de la connexion : ' + data.message);
    }
  } catch (e) {
    alert('Erreur lors de la connexion : ' + e);
  }
}

async function register() {
  if (registerPassword.value !== confirmPassword.value) {
    alert('Les mots de passe ne correspondent pas');
    return;
  }
  try {
    const response = await fetch('https://pokemon-api-seyrinian-production.up.railway.app/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: registerEmail.value,
        password: registerPassword.value
      })
    });
    const data = await response.json();
    if (response.ok) {
      alert('Inscription réussie');
    } else {
      alert('Erreur lors de l\'inscription : ' + data.message);
    }
  } catch (e) {
    alert('Erreur lors de l\'inscription : ' + e);
  }
}
</script>