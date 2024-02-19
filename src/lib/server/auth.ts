import { MONGO_URI } from "$env/static/private";
import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import mongoose from "mongoose";

await mongoose.connect(MONGO_URI)

export const User = mongoose.model(
	"User",
	new mongoose.Schema(
		{
			_id: {
				type: String,
				required: true
			},
			username:{
				type: String,
				required: true,
				unique: true,
				
			},
			password: {
				type: String,
				required: true,
			},
			pfp:{
				type: String,
				required: true,
				default: "https://f005.backblazeb2.com/file/Twice-Typescript/1ba91456a866afec775a19851b336b46.webp"
				
			},
		
		
			
			

		
		} as const,
		{ _id: false }
	)
);




export const Session = mongoose.model(
	"Session",
	new mongoose.Schema(
		{
			_id: {
				type: String,
				required: true
			},
			user_id: {
				type: String,
				required: true
			},
			expires_at: {
				type: Date,
				required: true
			}
		} as const,
		{ _id: false }
	)
);

const adapter = new MongodbAdapter(
    mongoose.connection.collection('sessions'),
    mongoose.connection.collection("users")

)

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: !dev,

        }
    }

  
})

declare module 'lucia'{
    interface Register {
        Lucia: typeof lucia
    }
}
