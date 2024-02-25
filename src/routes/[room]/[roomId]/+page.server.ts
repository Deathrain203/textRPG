import type { PageServerLoad, Actions } from "./$types";
import OpenAI from "openai";
import { OPENAI_API_KEY } from "$env/static/private";
import { redirect } from "@sveltejs/kit";
import { User } from "$lib/server/auth";
import { Convo } from "$lib/server/schemas";
import uploadB2 from "easy-svelte-backblaze-image";
import { BACKBLAZE_ID, BACKBLAZE_KEY } from "$env/static/private";

export const load: PageServerLoad = async (event) => {
  const session = event.locals.session;
  if (!session) {
    redirect(302, "/signin");
  }

  const newSender = event.url.pathname.replace(event.params.roomId, "");
  const newSenderSecond = newSender.replace("/", "");
  const newSenderFr = newSenderSecond.replace("/", "");

  //This fetch will give the ID to the socket server
  const response = await fetch("http://localhost:3000/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session: session,
      params: event.params.roomId,
      type: event.params.room,
      sender: event.params.room,
    }),
  });
  //This fetch gets the pfp
  const convo = await Convo.findById(event.params.roomId);

  return {
    params: event.params,
    pfp: convo?.pfp,
  };
};

export const actions: Actions = {
  default: async (event) => {
    const session = event.locals.session;
    const data = await event.request.formData();
    const file = data.get("file");
    const imageLink = await uploadB2(file, BACKBLAZE_KEY, BACKBLAZE_ID);
    const currentConvo: any = await Convo.findById(event.params.roomId);
    currentConvo.pfp = imageLink;
    await currentConvo.save();
    return {
      message: "succeeded",
    };
  },
};
