<script>
  export let title = "";
  export let id = "";
  import { push } from "svelte-spa-router";
  function navigateTo() {
    push("/course/" + id);
  }
</script>

<div
  on:click={navigateTo}
  class="p-5 hover:bg-white  hover:text-black hover:border-none transition-all  cursor-pointer rounded-lg border"
>
  {title}
</div>
