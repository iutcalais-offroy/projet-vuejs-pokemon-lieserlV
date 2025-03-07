import { defineStore } from "pinia";
import { ref } from "vue";
import jwt from "jsonwebtoken";
let currentId = 0; // Initialize a simple incrementing id

export const useUserStore = defineStore('user', () => {
    const users = ref<{ id: number, username: string, password: string }[]>([]);

    async function addUser(username: string, password: string): Promise<void> {
        const id = currentId++; // Increment the id for each new user
        users.value.push({ id, username, password });
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
            const token = jwt.sign({
            return token;
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