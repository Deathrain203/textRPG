import type { PageServerLoad, Actions } from "./$types";


const load :PageServerLoad = async (event) =>{

}

export const actions : Actions = {
    default: async () =>{
        console.log("Worked")
    }
}