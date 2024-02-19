import mongoose from "mongoose";
export const Message = mongoose.model(
	"Message",
	new mongoose.Schema(
		{
			_id: {
				type: String,
				required: true
			},
			sender:{
				type: String,
				required: true,
				unique: true,
				
			},
			recipient: {
				type: String,
				required: true,
			},
			content:{
                type: String, 
                required: true,
            }
		
		
			
			

		
		} as const,
		{ _id: false }
	)
);


