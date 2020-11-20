<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let id;
  export let md;
  let text;
</script>

<li>
  <small>{id}</small>
  <pre
    contenteditable="true"
    bind:textContent={text}
    on:input={(ev) => dispatch('input', text)}>{md}</pre>
</li>
