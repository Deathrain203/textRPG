<script lang="ts">
  import { enhance } from "$app/forms";

  export let inventory: string;
  export let hp: string;
  export let xp: string;
  export let CharacterPic: any;

  let imageFile: any;
  let imagePreview: any;

  function previewImage() {
    const fr = new FileReader();

    if (imageFile) {
      fr.readAsDataURL(imageFile[0]);
      fr.onload = function (e) {
        if (this.result) {
          imagePreview = this.result;
        }
      };
    }
  }
</script>

<nav>
    {#if !inventory}
<div></div>

{:else}
  <div class="profile">
    <p class="portrait">Character Portrait</p>

    <form method="POST" enctype="multipart/form-data">
      <div class="image">
        <label for="file"
          ><img
            class="pfp"
            src={imagePreview ? imagePreview : CharacterPic}
            alt="pfp"
          /></label
        >
        <input
          accept="image/*"
          id="file"
          name="file"
          type="file"
          bind:files={imageFile}
          on:change={previewImage}
        />
        <!--DO NOT USE ON:INPUT, USE ON CHANGE-->
        {#if imagePreview}
          <button type="submit">Update</button>
        {/if}
      </div>
    </form>
    <div class="statDiv">
      <p>{inventory}</p>
      <p>{xp}</p>
      <p>{hp}</p>
    </div>
  </div>
  {/if}
</nav>

<style>
  nav {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 18%;
    height: 100%;
    box-shadow: 1px 0px 4px gray;
    background-color: #171717;
    color: white;
    padding-left: 2em;
  }
  .profile {
    display: flex;
    flex-direction: column;
  }
  .pfp {
    width: 180px;
  }
  .statDiv {
    margin-top: 8em;
  }
  .portrait {
    margin-top: 5em;
  }
  input {
    visibility: hidden;
  }

  .image {
    display: flex;
    flex-direction: column;
  }
  button {
    width: 150px;
    height: 30px;
    font-size: 1em;
    background-color: #525252;
    border: none;
    color: white;
    border-radius: 10px;
  }
</style>
