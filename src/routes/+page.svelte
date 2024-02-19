<script lang="ts">
    import Sidebar from "$lib/client/Sidebar.svelte";
</script>

<Sidebar />

<div class = "textArea">
    
    <div class = "textContent">
        

    </div>
<div class= "textBox">
    <textarea></textarea>
    <span id = "upload" class="material-symbols-outlined">
        upload_2
        </span>


</div>
</div>


<style>
    .textArea{
        height:100%;
        width:80%;
        
        padding-left:20%;
        display:flex;
        flex-direction: column;
        align-items: center;
    }

    .textContent{
        height:92%;
       
    }
    
.material-symbols-outlined {
    position:relative;
    right:50px;
    font-size:2em;
  font-variation-settings:
  'FILL' 0,
  'wght' 200,
  'GRAD' 0,
  'opsz' 24
}

    textarea{
       display:flex;
       align-items: center;
       
        outline:none;
border-radius: 20px;
       width:80%;
       resize: none;
    padding-top:12px;
    font-size:1em;
    height:30px;
    padding-left:1em;
    font-family: "Roboto";
    
    
    }
    .textBox{
        width:80%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
   
</style>