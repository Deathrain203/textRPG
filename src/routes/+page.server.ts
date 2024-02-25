import { redirect } from "@sveltejs/kit";
import { generateId } from "lucia";
import type { PageServerLoad, Actions } from "./$types";
import { User } from "$lib/server/auth";
import { Convo } from "$lib/server/schemas";

export const load: PageServerLoad = async (event) => {
  const session = event.locals.session;

  if (!session) {
    redirect(302, "/signin");
  }

  //find user's conversations
  const convoList = await Convo.find({ createdBy: session.userId });

  return {
    convo: JSON.parse(JSON.stringify(convoList)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const session = event.locals.session;
    const data = await event.request.formData();
    const roomType = data.get("type");
    if (!roomType) {
      return {
        message: "Please select a category",
      };
    }

    if (!session) {
      redirect(302, "/signin");
    }
    const newRoom = generateId(15);
    const currentUser = await User.findById(session.userId);
    currentUser?.rooms.push(newRoom);
    await currentUser?.save();

    redirect(302, `/${roomType}/${newRoom}`);
  },
};
