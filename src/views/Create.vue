<template>
    <div class="max-w-screen-md mx-auto px-4 py-10">
        <div v-if="error_Msg || status_Msg" class="shadow-lg mb-10 p-4 bg-light-grey rounded-md">
            <p class="text-at-light-green">{{ status_Msg }}</p>
            <p class="text-red-500">{{ error_Msg }}</p>
        </div>

        <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
            <form @submit.prevent="create_workout_supa" class="flex flex-col gab-y-5 w-full">
                <h1 class="text-2xl text-at-light-green">record workout </h1>
                <div class="flex flex-col">
                    <label for="work_Name" class="mb-1 text-at-light-green">Workout Name</label>
                    <input type="text" required class="p-2 text-grey-500 focus:outline-none" id="work_Name" v-model="work_Name">
                </div>

                <div class="flex flex-col">
                    <label for="work_Type" class="mb-1 text-at-light-green">Workout Name</label>
                    <select id="work_Type" class="p-2 text-grey-500 focus:outline-none" required v-model="work_Type" @change="workout_change">
                    <option value="select-workout">Select Workout</option>
                    <option value="strength">Strength training</option>
                    <option value="cardio">Cardio</option>
                    </select>
                </div>

<!-- strength -->

                <div v-if="work_Type === 'strength'" class="flex flex-col gap-y-4">
                <div class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row" v-for="(item , index) in exercise" :key="index">
                    <div class="flex flex-col md:w-1/3">
                        <label for="exo_Name" class="mb-1 text-sm text-at-light-green">Exercise</label>
                        <input type="text" required class="p-2 w-full text-grey-500 focus:outline-none" v-model="item.exercise">
                    </div>
                    <div class="flex flex-col flex-1">
                        <label for="sets" class="mb-1 text-sm text-at-light-green">Sets</label>
                        <input type="text" required class="p-2 w-full text-grey-500 focus:outline-none" v-model="item.sets">
                    </div>
                    <div class="flex flex-col flex-1">
                        <label for="reps" class="mb-1 text-sm text-at-light-green">Reps</label>
                        <input type="text" required class="p-2 w-full text-grey-500 focus:outline-none" v-model="item.reps">
                    </div>
                    <div class="flex flex-col flex-1">
                        <label for="weight" class="mb-1 text-sm text-at-light-green">Weight</label>
                        <input type="text" required class="p-2 w-full text-grey-500 focus:outline-none" v-model="item.weight">
                    </div>
                    <img src="@/assets/images/trash-light-green.png" alt="" class="h-4 w-auto absolute -left-5 cursor-pointer" @click="delete_exo(item.id)">
                    
                </div>
                <button type="button" @click="add_exercise"
                class="mt-6 py-2 px-6 rounded-xl self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green">Add Exercise
            </button>
                </div>

<!-- cardio -->
                <div v-if="work_Type === 'cardio'" class="flex flex-col gap-y-4">
                <div class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row" v-for="(item , index) in exercise" :key="index">
                    <div class="flex flex-col md:w-1/3">
                        <label for="cardio-type" class="mb-1 text-sm text-at-light-green">Type</label>
                        <select name="" id="cardio-type" class="p-2 w-full text-grey-500 focus:outline-none" v-model="item.cardioType">
                            <option value="#">select Type </option>
                            <option value="run">Run</option>
                            <option value="walk">Walk</option>
                        </select>
                    </div>
                    <div class="flex flex-col flex-1">
                        <label for="distance" class="mb-1 text-sm text-at-light-green">Distance</label>
                        <input type="text" required class="p-2 w-full text-grey-500 focus:outline-none" v-model="item.distance">
                    </div>
                    <div class="flex flex-col flex-1">
                        <label for="duration" class="mb-1 text-sm text-at-light-green">Duration</label>
                        <input type="text" required class="p-2 w-full text-grey-500 focus:outline-none" v-model="item.duration">
                    </div>
                    <div class="flex flex-col flex-1">
                        <label for="pace" class="mb-1 text-sm text-at-light-green">pace</label>
                        <input type="text" required class="p-2 w-full text-grey-500 focus:outline-none" v-model="item.pace">
                    </div>
                    <img src="@/assets/images/trash-light-green.png" alt="" class="h-4 w-auto absolute -left-5 cursor-pointer" @click="delete_exo(item.id)">
                    
                </div>
                <button type="button"
                class="mt-6 py-2 px-6 rounded-xl self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green" @click="add_exercise">Add Exercise
            </button>
                </div>
                <button type="submit"
                class="mt-6 py-2 px-6 rounded-xl self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green">Record Workout
            </button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import {uid} from 'uid' ;
import { supabase } from '../supabase/supabase'

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name :'Create',
    setup () {
    //create data 
        const work_Name =ref("") ;
        const work_Type = ref("select-workout");
        const exercise = ref([]);
        const status_Msg = ref(null);
        const error_Msg = ref(null);

    //add exercise
    const add_exercise = () => {
        if(work_Type.value === "strength"){
            exercise.value.push({
                id:uid(),
                exercise:"",
                sets:"",
                reps:"",
                weight:"",
            });
            return
        }
        exercise.value.push({
            id:uid(),
            cardioType:"",
            distance:"",
            duration:"",
            pace:"",
        })
    }
    //delete exercise 
    const delete_exo = (id) => {
        if(exercise.value.length > 1){
            exercise.value = exercise.value.filter((exo) => exo.id !== id);
            return;
        }
        error_Msg.value = "Error can not remove , need to at least have one exercise";
        setTimeout(() => {
            error_Msg.value = "";
        },5000)
    } 
    //changing of workout type 
    const workout_change = () => {
        exercise.value = [];
        add_exercise();
    }
    ///create workout
    const create_workout_supa = async () => {
        try{
            const{error} = await supabase.from('workouts').insert([{
                workout_name :work_Name.value ,
                workout_type :work_Type.value ,
                exercises : exercise.value,
            }]);
            if(error)throw error;
            work_Name.value = null;
            work_Type.value = "select-workout";
            exercise.value = [];
            status_Msg.value = "your exercises have been added successfully ";
            setTimeout(()=>{
                status_Msg.value = null;
            },5000)
        }catch(error){
            error_Msg.value = `Error: ${error.message}`
            setTimeout(( ) => {
                error_Msg.value = null;
            },5000)
        }
    } 
    return {work_Name,work_Type,error_Msg,exercise,status_Msg, add_exercise, workout_change,delete_exo, create_workout_supa}
    }
}
</script>

