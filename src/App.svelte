<script>
  import Turndown from "turndown";
  import { writable } from "svelte/store";

  let td = new Turndown();

  import EditRich from "./EditRich.svelte";
  import EditMark from "./EditMark.svelte";

  const id = "test";
  const md = writable(`# Hello

   How do you do?

   **Today**
   
   See \`ya\``);
  $: console.log($md);

  const updateItem = (id, content) => {
    console.log("updating", id, content);
    md.set(content);
  };
</script>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 100px;
  }

  .box1 {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 3;
  }

  .box2 {
    grid-column-start: 2;
    grid-row-start: 3;
    grid-row-end: 5;
  }

  .box3 {
    grid-column-start: 3;
    grid-row-start: 3;
    grid-row-end: 5;
  }
</style>

<div class="wrapper">
  <div class="box1">
    <EditRich {id} md={$md} {td} on:input={(ev) => updateItem(id, ev.detail)} />
    <button on:click={() => md.update((i) => i + '\n\n# Title\n\n')}>Add Section</button>
  </div>

  <div class="box2">
    <ol>
      <EditMark {id} md={$md} on:input={(ev) => updateItem(id, ev.detail)} />
    </ol>
  </div>

  <div class="box3">
    <ol>
      <EditMark {id} md={$md} on:input={(ev) => updateItem(id, ev.detail)} />
    </ol>
  </div>
</div>
