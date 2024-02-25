<script>
  export let data;
</script>

<svelte:head><title>Choose Your Adventure</title></svelte:head>

<form method="POST">
  <div class="adventureDiv">
    <h1>Choose Your Adventure</h1>
    <span>
      <input id="fantasy" name="type" type="radio" value="fantasy" />
      <label for="fantasy">Fantasy</label>
    </span>

    <span>
      <input id="urban" name="type" type="radio" value="urban" />
      <label for="urban">Urban Fantasy</label>
    </span>
    <span>
      <input id="cyber" name="type" type="radio" value="cyberpunk" />
      <label for="cyber">CyberPunk</label>
    </span>
  </div>

  <button type="submit">Make A Room</button>
</form>
<div class="roomListDiv">
  <h2>Head Back To The Fight</h2>
  <div class="roomList">
    {#each data.convo as convo}
      <a href="/{convo.type}/{convo._id}">{convo.name}</a>
    {/each}
  </div>
</div>

<style>
  :global(body) {
    justify-content: space-between;
    align-items: center;
  }
  input {
    background-color: transparent;
    border: none;

    outline: none;
    cursor: pointer;
    font-size: 2em;
  }

  label {
    font-size: 1.2em;
  }
  form {
    width: 30%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
    border: 1px solid gray;
    border-radius: 20px;
    margin-left: 17em;
  }
  .adventureDiv {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  button {
    width: 200px;
    height: 30px;
    font-size: 1em;
    border: none;
    background-color: black;
    color: white;
    border-radius: 10px;
  }
  .roomListDiv {
    width: 40%;
    height: 95%;
    display: flex;
    border: 1px solid gray;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h2 {
    font-size: 2em;
    font-weight: 400;
  }

  .roomList {
    display: flex;
    flex-direction: column;

    width: 80%;
    height: 80%;
  }
  a {
    cursor: pointer;
    font-size: 1.4em;
  }
</style>
