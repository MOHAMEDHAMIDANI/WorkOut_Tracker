<template>
  <div v-if="appReady" class="min-h-full box-border">
      <Navigation />
  <router-view />
  </div>
</template>
<script>
import Navigation from './components/Navigation.vue'
import store  from './store/store'
import {ref } from 'vue'
import { supabase } from './supabase/supabase'
export default {
  components: {
      Navigation,
  },
  setup () {
    //create data / vars
    const appReady = ref(null);
    //check to see if user is already logged in
    const user =supabase.auth.getUser();
    //if user doest exist i need to make my app ready
    if(!user){
      appReady.value = true;
    }
    // runs when there is a auth state change
    //if user is logged in this will fire
    supabase.auth.onAuthStateChange((_, session) =>{
      store.methods.setUser(session);
      appReady.value =true;
    })
    return {appReady};
  }
}
</script>




