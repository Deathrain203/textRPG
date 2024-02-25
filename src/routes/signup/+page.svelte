<script>
    import Form from "svelte-easy-auth-form";
</script>
<div>
<Form formType = "Sign Up" formMessage = "null" logo = "null" />
</div>

<span>
    <a href = "/signin">Need to <u>sign in?</u></a>
    </span>

<style>
    span{
    position: absolute;
    top:75%;
    left:40%;
    
    width: 20%;
    text-align: center;
}
a{
    font-size:1.2em;
}
    div{
       width: 100%;
       height:100%;
     
       align-items: center;
       display:flex;
       align-items: center;
       justify-content: center;

}  
</style>