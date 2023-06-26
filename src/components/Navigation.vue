<template>
    <header class="bg-at-light-green text-white">
        <nav class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
            <div class="flex items-center gap-x-4 ">
                <img class="w-10 " src="../assets/images/dumbbell-light.png" alt="">
                <h1 class="text-lg"> Mr.tracker</h1>
            </div>
            <ul class="flex flex-1 justify-end gap-x-10 ">
                <router-link :to="{ name: 'home' }">Home</router-link>
                <router-link v-if="user" :to="{ name: 'Create' }">Create</router-link>
                <router-link v-if="!user" :to="{ name: 'Login' }">Login</router-link>
                <li v-if="user" @click="logout" class="cursor-pointer">Logout</li>
            </ul>
        </nav>
    </header>
</template>

<script>
import store from '../store/store'
import { computed } from 'vue';
import{supabase} from'../supabase/supabase'
import { useRouter } from 'vue-router';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'Navigation',
    setup() {
        //get user from store
        const user = computed(() => store.state.user);
        // setup ref to router 
        const router = useRouter();
        //logout function 
        const logout = async () => {
            await supabase.auth.signOut();
            router.push({name:'Home'});
        }
        return {logout,user}
    }
}
</script>

