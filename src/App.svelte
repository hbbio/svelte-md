<script>
  import Turndown from "turndown";
  import { writable } from "svelte/store";

  let td = new Turndown();

  import EditRich from "./EditRich.svelte";
  import EditMark from "./EditMark.svelte";

  const id = "test";
  const items = writable(`# Hello

   How do you do?

   **Today**
   
   See \`ya\``);
  $: console.log($items);

  const updateItem = (id, md) => {
    console.log("updating", id, md);
    items.set(md);
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
    <EditRich
      {id}
      md={$items}
      {td}
      on:input={(ev) => updateItem(id, ev.detail)} />
  </div>

  <div class="box2">
    <ol>
      <EditMark {id} md={$items} on:input={(ev) => updateItem(id, ev.detail)} />
    </ol>
  </div>

  <div class="box3">
    <ol>
      <EditMark {id} md={$items} on:input={(ev) => updateItem(id, ev.detail)} />
    </ol>
  </div>
</div>
