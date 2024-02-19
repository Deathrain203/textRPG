import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { User } from "$lib/server/auth";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { lucia } from "$lib/server/auth";












export const actions : Actions = {
    default: async (event) =>{
        const sessionCheck = event.locals.session
        if(sessionCheck){
          
            
        }
        let formData : any = await event.request.formData();

        let password : string = formData.get("password")
        let username: String = formData.get("username").toLowerCase();
        let hashedPassword : String = await new Argon2id().hash(password)
        let userId = generateId(15)

        if(username.includes(" ") || password.includes(" ")){
            return {
                message: "Username and password can't contain spaces"
            }}


        const userCheck = await User.find({username: username})
        if(userCheck[0]){
            return {
                message: "User already exists"
            }
        }
        const newUser = await User.create({
            username: username,
            password: hashedPassword,
            _id: userId
        })

        const session = await lucia.createSession(userId, {})
            const sessionCookie = lucia.createSessionCookie(session.id);
            event.cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes
            });
            redirect(302, '/')
        
    }
}
