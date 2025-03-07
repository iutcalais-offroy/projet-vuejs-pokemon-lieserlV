import { ref } from 'vue';
import { router } from '../router';

export const async function login(email: string, password: string) {
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

export const async function register(email: string, password: string, confirmPassword: string) {
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