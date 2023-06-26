<template>
    <div v-if="data_loaded" class=" mt-10 container px-4">
        <!-- no data to show  -->
        <div v-if="data.length === 0" class="w-full flex flex-col items-center">
            <h1 class="text-2xl text-at-light-green"> looks empty here :') </h1>
            <router-link
                class="mt-6 py-2 px-6 rounded-sm  text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
                :to="{ name: 'Create' }">Create some exercises</router-link>
        </div>
        <!-- there is data to show  -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <router-link class="flex flex-col items-center bg-light-grey p-8 shadow-md cursor-pointer"
                v-for="(workout, index) in data" :key="index" :to="{name:'Vue-workout',params:{id : workout.id}}">
                <!-- cardio img -->
                <img v-if="workout.workout_type === 'cardio'" src="@/assets/images/running-light-green.png"
                    class="w-auto h-24" alt="">

                <!-- strength img -->
                <img v-else src="@/assets/images/dumbbell-light-green.png" class="w-auto h-24" alt="">
                <p class="mt-3 py-2 px-3 text-white bg-at-light-green shadow-md rounded-lg ">{{ workout.workout_type }}</p>
                <h1 class="mt-8 mb-0 text-center text-xl text-at-light-green">{{ workout.workout_name }}</h1>
            </router-link>
        </div>
        </div>
</template>

<script>
import { ref } from 'vue'
import { supabase } from '../supabase/supabase'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'home',
    setup() {
        const data = ref([]);
        const data_loaded = ref(null);
        const get_data = async () => {
            try {
                const { data: workouts, error } = await supabase.from("workouts").select("*");
                if (error) throw error;
                data.value = workouts;
                data_loaded.value = true;
            } catch (error) {
                console.warn(error.message);
            }
        }
        get_data();
        return { data, data_loaded }
    }
}
</script>

<style lang="scss" scoped></style>