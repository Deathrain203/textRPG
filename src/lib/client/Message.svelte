<script lang="ts">
  export let sender: string;

  export let content: string;
  const scrollIntoView = (node: any) => {
    node.scrollIntoView();
  };
</script>

<div class="message" use:scrollIntoView>
  <p class="sender">{sender}</p>
  <p class="content">{content}</p>
</div>

<style>
  .message {
    display: flex;
    flex-direction: column;
  }
  .content {
    margin-top: -2px;
    line-height: 30px;
    white-space: pre-wrap;
  }
</style>
