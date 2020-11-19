<script>
  import { onMount, createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import marked from "marked";
  import Hoverable from "./Hoverable.svelte";

  export let item;
  let html;
  onMount(() => {
    console.log("mounting", item);
    html = marked(item.md);
  });
</script>

<style>
  .component {
    width: 50%;
    padding: 0.2em;
    border: 1px solid blue;
    margin: 0.15em 0;
  }
</style>

<Hoverable let:hovering={hover}>
  <div class="component">
    {#if hover}
      <button on:click={() => document.execCommand('formatBlock', false, 'h1')}>
        h1
      </button>
      <button on:click={() => document.execCommand('formatBlock', false, 'h2')}>
        h2
      </button>
      <button on:click={() => document.execCommand('formatBlock', false, 'p')}>
        p
      </button>
      <button on:click={() => document.execCommand('bold')}> b </button>
      <button on:click={() => document.execCommand('italic')}> i </button>
    {/if}
    <div
      contenteditable="true"
      bind:innerHTML={html}
      on:input={() => dispatch('input', html)} />
  </div>
</Hoverable>
