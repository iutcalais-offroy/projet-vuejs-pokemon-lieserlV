import { defineStore } from "pinia";
import { ref } from "vue";
let currentId = 0; // Initialize a simple incrementing id

export const useUserStore = defineStore('user', () => {
    const users = ref<{ id: number, username: string, password: string }[]>([]);

    async function addUser(username: string, password: string): Promise<void> {
        const id = currentId++; // Increment the id for each new user
        const token = jwt.sign({ userId: 123 }, 'secretKey', { expiresIn: '1h' });
        users.value.push({ id, username, password });
        localStorage.setItem('userToken', token); // Store the token in local storage
    }

    async function removeUser(username: string): Promise<void> {
        users.value = users.value.filter(user => user.username !== username);
    }

    async function getUser(username: string): Promise<{ id: number, username: string, password: string } | undefined> {
        return users.value.find(user => user.username === username);
    }

    async function verifyPassword(username: string, password: string): Promise<boolean> {
        const user = await getUser(username);
        if (user) {
            return user.password === password;
        }
        return false;
    }

    return {
        users,
        addUser,
        removeUser,
        getUser,
        verifyPassword
    };
});