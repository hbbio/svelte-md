<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let id;
  export let md;
</script>

<li>
  <small>{id}</small>
  <pre
    contenteditable="true"
    on:keyup={(ev) => dispatch('input', ev.currentTarget.textContent)}>{md}</pre>
</li>
