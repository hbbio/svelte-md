<script>
  import Turndown from "turndown";
  import produce from "immer";
  import { writable } from "svelte/store";

  let td = new Turndown();

  import EditRich from "./EditRich.svelte";
  import EditMark from "./EditMark.svelte";
  const items = writable({
    a: "# Hello",
    b: "How do you do?",
    c: "**Today**",
    d: "See `ya`",
  });
  $: console.log($items);

  // const debouncer = (delay = 750) => {
  //   let timer;
  //   return (cb, v) => {
  //     clearTimeout(timer);
  //     timer = window.setTimeout(() => {
  //       cb(v);
  //     }, delay);
  //   };
  // };
  // const debounce = debouncer(20);

  const updateItem = (id, md) => {
    // debounce(
    //   () =>
    console.log("updating", id, md);
    items.set(
      // NOT OK { ...$items, id: md }
      produce($items, (items) => {
        items[id] = md;
      })
    );
    //   {}
    // );
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
    {#each Object.entries($items) as [id, md] (id)}
      <EditRich {id} {md} {td} on:input={(ev) => updateItem(id, ev.detail)} />
    {/each}
  </div>

  <div class="box2">
    <ol>
      {#each Object.entries($items) as [id, md] (id)}
        <EditMark {id} {md} on:input={(ev) => updateItem(id, ev.detail)} />
      {/each}
    </ol>
  </div>

  <div class="box3">
    <ol>
      {#each Object.entries($items) as [id, md] (id)}
        <EditMark {id} {md} on:input={(ev) => updateItem(id, ev.detail)} />
      {/each}
    </ol>
  </div>
</div>
