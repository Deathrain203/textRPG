<script lang="ts">
  import Sidebar from "$lib/client/Sidebar.svelte";

  import { io, Socket } from "socket.io-client";
  import Message from "$lib/client/Message.svelte";

  export let data;

  let messageContent: string;
  let ioError: string;
  let messages: any[] = [];
  let checkActive: boolean = false;
  let inventory: string;
  let xp: string;
  let hp: string;
  let contentType: string;
  let loader: boolean;
  let characterPort : string
  const socket = io("https://rpg-express.onrender.com/");

  socket.on("connect", () => {
    console.log("Connected Socket");
  });
  socket.on("error", (item) => {
    ioError = item.message;
  });

  if (data.params.room === "fantasy") {
    contentType =
      "You will now act as the dungeon master for a new tabletop RPG campaign with a fantasy setting. You will always include 3 fields at the start of the message, these fields are HP, inventory, and XP. It is a fantasy setting, you can choose the setting and the plot. You must never refer to yourself as an AI or in first person, just narrate the story. At the end, you will give four choices to the player as the next course of actions, the 4th choice will aways be 'custom action'. With that, let the story begin.";
  } else if (data.params.room === "urban") {
    contentType =
      "You will now act as the dungeon master for a new tabletop RPG campaign with an urban fantasy setting. You will always include 3 fields at the start of the message, these fields are HP, inventory, and XP. It is an URBAN FANTASY setting, you can choose the setting and the plot. You must never refer to yourself as an AI or in first person, just narrate the story. At the end, you will give four choices to the player as the next course of actions, the 4th choice will aways be 'custom action'. With that, let the story begin. ";
  } else if (data.params.room === "cyberpunk") {
    contentType =
      "You will now act as the dungeon master for a new tabletop RPG campaign with a cyberpunk setting. You will always include 3 fields at the start of the message, these fields are HP, inventory, and XP. It is a cyberpunk setting, you can choose the setting and the plot. You must never refer to yourself as an AI or in first person, just narrate the story. At the end, you will give four choices to the player as the next course of actions, the 4th choice will aways be 'custom action'. With that, let the story begin. ";
  }

  socket.on("messageList", (item) => {
    if (item[0]) {
      checkActive = true;
      messages = item;
    }
  });

  socket.on("initMessage", (item) => {
    messages.push(item);
    messages = messages;
    loader = true;
    characterPort = item.pfp
  });
  socket.on("initGPTMessage", (item) => {
    messages.push(item);
    messages = messages;
    loader = false;
  });

  socket.on("stats", (item) => {
    inventory = item.inventory;
    xp = item.xp;
    hp = item.hp;
  });

  async function sendMessage() {
    if (messageContent && messageContent !== "") {
      socket.emit("userMessage", {
        content: messageContent,
        model: data.params,
      });
      loader = true;

      messageContent = "";
    }
  }

  async function initializeAdventure() {
    if (!ioError && !checkActive) {
      socket.emit("systemMessage", {
        content: contentType,
        model: data.params,
      });
      checkActive = true;
    }
  }
</script>

<Sidebar {inventory} {xp} {hp} CharacterPic={data.pfp ? data.pfp : characterPort} />

<div class="textArea">
  <div class="textContent">
    {#if ioError}
      <p>{ioError}</p>
    {/if}
    <div class="contentBox">
      {#if !ioError}
        {#each messages as message}
          <Message
            sender={message.sender === data.params.roomId
              ? data.params.room
              : message.sender}
            content={message.content}
          />
        {/each}
      {/if}
    </div>
  </div>

  <div class="textBox">
    {#if checkActive && !ioError && !loader}
      <textarea bind:value={messageContent}></textarea>
      <button class="send" type="submit" on:click={sendMessage}>
        <span id="upload" class="material-symbols-outlined"> upload_2 </span>
      </button>
    {:else if checkActive && !ioError && loader}
      <textarea readonly>AI is thinking...</textarea>
      <button class="send" type="submit" on:click={sendMessage}>
        <span id="upload" class="material-symbols-outlined"> upload_2 </span>
      </button>
    {:else if !checkActive && !ioError}
      <button class="start" on:click={initializeAdventure}
        >Start The Adventure</button
      >
    {/if}
  </div>
</div>

<style>
  .textArea {
    height: 100%;
    width: 80%;

    padding-left: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .textContent {
    height: 92%;
    display: flex;
    justify-content: center;
  }

  .material-symbols-outlined {
    font-variation-settings:
      "FILL" 0,
      "wght" 200,
      "GRAD" 0,
      "opsz" 24;
  }

  textarea {
    display: flex;
    align-items: center;

    outline: none;
    border-radius: 15px;
    width: 80%;
    resize: none;
    padding-top: 12px;
    font-size: 1em;
    height: 30px;
    padding-left: 1em;
    font-family: "Roboto";
  }
  .textBox {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .send {
    position: relative;
    right: 50px;
    font-size: 2em;
    width: 40px;
    height: 40px;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .start {
    width: 250px;
    height: 60px;
    border-radius: 10px;
    border: 2px solid gray;
    background-color: white;
    cursor: pointer;
    margin-top: -20px;
    font-size: 1.1em;
  }

  .contentBox {
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 90%;
    overflow: auto;
    padding-top: 30px;
    margin-left: 200px;
  }
</style>
