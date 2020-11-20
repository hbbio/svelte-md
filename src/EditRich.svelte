<script>
  import { onMount, createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import marked from "marked";

  /**
   * turndown service
   */
  export let td;
  /**
   * editor id
   */
  export let id;
  /**
   * markdown content
   */
  export let md;
  let html;
  onMount(() => {
    console.log("mounting", id);
    html = marked(md);
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

<div class="component">
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
  <div
    contenteditable="true"
    bind:innerHTML={html}
    on:input={() => dispatch('input', td.turndown(html))} />
</div>
