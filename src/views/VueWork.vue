<template>
    <div class="max-w-screen-sm mx-auto px-4 py-10">
        <!-- App Msg -->
        <div v-if="error_status || error_msg" class="mb-10 p-4 rounded-md shadow-md bg-light-grey">
            <p class="text-at-light-green">
                {{ error_status }}
            </p>
            <p class="text-red-500">
                {{ error_msg }}
            </p>
        </div>

        <div v-if="data_loaded">
            <!-- general workout info  -->
            <div class="flex flex-col items-center p-8 rounded-md shadow-md bg-light-grey relative">
                <!-- icon container -->
                <div v-if="user" class="flex absolute left-2 top-2 gap-x-2">
                    <!-- edit icon container  -->
                    <div class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-green shadow-lg"
                        @click="toggle_edit">
                        <img class="h-3.5 w-auto" src="@/assets/images/pencil-light.png" alt="" />
                    </div>
                    <!-- delete icon container  -->
                    <div 
                        class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-green shadow-lg">
                        <img @click="delete_workout" class="h-3.5 w-auto" src="@/assets/images/trash-light.png" alt="" />
                    </div>
                </div>

                <!-- strength image  -->
                <img class="h-24 w-auto" v-if="data.workout_type === 'cardio'" src="@/assets/images/running-light-green.png"
                    alt="" />
                <!-- cardio image  -->
                <img class="h-24 w-auto" v-if="data.workout_type === 'strength'"
                    src="@/assets/images/dumbbell-light-green.png" alt="" />

                <span class="mt-6 py-1.5 px-5 text-xs text-white bg-at-light-green rounded-lg shadow-md">
                    {{ data.workout_type}}</span>

                <!-- in case its edit mode  -->
                <div class="w-full mt-6">
                    <input v-if="edit" v-model="data.workout_name" type="text"
                        class="p-2 w-full text-gray-500 focus:outline-none" />
                    <!-- in case its not edit it will show the name  -->
                    <h1 v-else class="text-at-light-green text-2xl text-center">{{ data.workout_name }}</h1>
                </div>
            </div>

            <!-- exercises  -->
            <div class="mt-10 p-8 rounded-md flex flex-col item-center bg-light-grey shadow-md">

                <!-- strength training  -->
                <div v-if="data.workout_type === 'strength'" class="flex flex-col gap-y-4 w-full">
                    <div class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row" v-for="(item, index ) in data.exercises"
                        :key="index">
                        <div class="flex flex-2 flex-col md:w-1/3">
                            <label for="exercise-name" class="mb-1 text-sm text-at-light-green">
                                Exercise
                            </label>
                            <input id="exercise-name" type="text" v-if="edit"
                                class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.exercise">
                            <p v-else> {{ item.exercise }}</p>
                        </div>
                        <div class="flex flex-2 flex-col">
                            <label for="sets" class="mb-1 text-sm text-at-light-green">
                                sets
                            </label>
                            <input id="sets" type="text" v-if="edit" class="p-2 w-full text-gray-500 focus:outline-none"
                                v-model="item.sets">
                            <p v-else> {{ item.sets }}</p>
                        </div>
                        <div class="flex flex-2 flex-col">
                            <label for="exercise-name" class="mb-1 text-sm text-at-light-green">
                                reps
                            </label>
                            <input id="reps" type="text" v-if="edit" class="p-2 w-full text-gray-500 focus:outline-none"
                                v-model="item.reps">
                            <p v-else> {{ item.reps }}</p>
                        </div>
                        <div class="flex flex-2 flex-col">
                            <label for="exercise-name" class="mb-1 text-sm text-at-light-green">
                                weight
                            </label>
                            <input id="weight" type="text" v-if="edit" class="p-2 w-full text-gray-500 focus:outline-none"
                                v-model="item.weight">
                            <p v-else> {{ item.weight }}</p>
                        </div>
                        <img @click="delete_exo(item.id)" v-if="edit" src="@/assets/images/trash-light-green.png" alt=""
                            class="absolute h-4 w-auto -left-5 cursor-pointer">
                    </div>
                    <button @click="add_exercise" v-if="edit" type="button" class="py-2 px-6 rounded-sm self-start text-sm text-white
                                bg-at-light-green duration-200 border-solid border-2 border-transparent
                                hover:border-at-light-green hover:bg-white hover:text-at-light-green">
                        Add Exercise
                    </button>
                </div>
                <!-- cardio training  -->
                <div v-else class="flex flex-col gap-y-4 w-full">
                    <div class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row" v-for="(item, index ) in data.exercises"
                        :key="index">
                        <div class="flex flex-2 flex-col md:w-1/3">
                            <label for="cardio-type" class="mb-1 text-sm text-at-light-green">
                                type
                            </label>
                            <select id="cardio-type"  v-if="edit"
                                class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.cardioType">
                                <option value="#">select Type </option>
                                <option value="run">Run</option>
                                <option value="walk">Walk</option>
                            </select>
                            <p v-else> {{ item.cardioType }}</p>
                        </div>
                        <div class="flex flex-2 flex-col">
                            <label for="distance" class="mb-1 text-sm text-at-light-green">
                                distance
                            </label>
                            <input id="distance" type="text" v-if="edit" class="p-2 w-full text-gray-500 focus:outline-none"
                                v-model="item.distance">
                            <p v-else> {{ item.distance }}</p>
                        </div>
                        <div class="flex flex-2 flex-col">
                            <label for="duration" class="mb-1 text-sm text-at-light-green">
                                duration
                            </label>
                            <input id="duration" type="text" v-if="edit" class="p-2 w-full text-gray-500 focus:outline-none"
                                v-model="item.duration">
                            <p v-else> {{ item.duration }}</p>
                        </div>
                        <div class="flex flex-2 flex-col">
                            <label for="pace" class="mb-1 text-sm text-at-light-green">
                                pace
                            </label>
                            <input id="pace" type="text" v-if="edit" class="p-2 w-full text-gray-500 focus:outline-none"
                                v-model="item.pace">
                            <p v-else> {{ item.pace }}</p>
                        </div>
                        <img @click="delete_exo(item.id)" v-if="edit" src="@/assets/images/trash-light-green.png" alt=""
                            class="absolute h-4 w-auto -left-5 cursor-pointer">
                    </div>
                    <button @click="add_exercise" v-if="edit" type="button" class="py-2 px-6 rounded-sm self-start text-sm text-white
                                bg-at-light-green duration-200 border-solid border-2 border-transparent
                                hover:border-at-light-green hover:bg-white hover:text-at-light-green">
                        Add Exercise
                    </button>
                </div>
            </div>
            <button @click="update" v-if="edit" type="button" class="mt-10 py-2 px-6 rounded-sm self-start text-sm text-white
                                bg-at-light-green duration-200 border-solid border-2 border-transparent
                                hover:border-at-light-green hover:bg-white hover:text-at-light-green">
                Update
            </button>
        </div>
    </div>
</template>

<script>
import { supabase } from '../supabase/supabase'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import store from '../store/store'
import { uid } from 'uid';
export default {
    name: 'Vue-workout',
    setup() {
        const data = ref(null)
        const data_loaded = ref(null)
        const error_msg = ref(null)
        const error_status = ref(null)
        const route = useRoute()
        const router = useRouter()
        const user = computed(() => store.state.user)
        // get current id of route
        let current_id = route.params.id
        // get workout data
        const get_data = async () => {
            try {
                const { data: workouts, error } = await supabase
                    .from('workouts')
                    .select('*')
                    .eq('id', current_id)
                if (error) throw error
                data.value = workouts[0];
                data_loaded.value = true
            } catch (error) {
                error_msg.value = error.message
                setTimeout(() => {
                    error_msg.value = null
                }, 5000)
            }
        }
        get_data()
        // delete workout
        const delete_workout = async () => {
            try {
                const { error } = supabase.from("workouts").delete().eq('id', current_id);
                if (error) throw error
                router.push({ name: "home" });
            } catch (error) {
                error_msg.value = `Error: ${error.message}`;
                setTimeout(() => {
                    error_msg.value = null;
                }, 5000);
            }
        }
        // edit mode
        const edit = ref(null)
        const toggle_edit = () => {
            edit.value = !edit.value
        }
        // add exo
        const add_exercise = () => {
            if (data.value.work_Type === "strength") {
                data.value.exercises.push({
                    id: uid(),
                    exercise: "",
                    sets: "",
                    reps: "",
                    weight: "",
                });
                return
            }
            data.value.exercises.push({
                id: uid(),
                cardioType: "",
                distance: "",
                duration: "",
                pace: "",
            })
        }
        // delete exo
        const delete_exo = (id) => {
            if (data.value.exercises.length > 1) {
                data.value.exercises = data.value.exercises.filter((exo) => exo.id !== id);
                return;
            }
            error_msg.value = "Error can not remove , need to at least have one exercise";
            setTimeout(() => {
                error_msg.value = "";
            }, 5000)
        }
        // update workout
        const update = async () => {
            try {
                const { error } = await supabase
                    .from("workouts")
                    .update({
                        workout_name: data.value.workout_name,
                        exercises: data.value.exercises,
                    })
                    .eq('id', current_id);
                if (error) throw error;
                edit.value = false;
                error_status.value = "Success: Workout Updated!";
                setTimeout(() => {
                    error_status.value = null;
                }, 5000);
            } catch (error) {
                error_msg.value = `Error: ${error.message}`;
                setTimeout(() => {
                    error_msg.value = false;
                }, 5000);
            }
        };
        return { data, data_loaded, error_msg, error_status, edit, toggle_edit, user, delete_workout, add_exercise, delete_exo ,update }
    }
}
</script>
