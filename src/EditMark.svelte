<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let id;
  export let md;
  let text;
  // let elt;
  // // using:
  // //  bind:this={elt}
  // // and:
  // //  elt.innerText
  // // instead of text does not work.
</script>

<li>
  <small>{id}</small>
  <pre
    contenteditable="true"
    bind:textContent={text}
    on:input={(ev) => dispatch('input', text)}>{md}</pre>
</li>
