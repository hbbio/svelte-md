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

  const debouncer = (delay = 750) => {
    let timer;
    return (cb, v) => {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        cb(v);
      }, delay);
    };
  };
  const debounce = debouncer(20);

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

{#each Object.entries($items) as [id, md] (id)}
  <EditRich {id} {md} {td} on:input={(ev) => updateItem(id, ev.detail)} />
{/each}

<ol>
  {#each Object.entries($items) as [id, md] (id)}
    <EditMark {id} {md} on:input={(ev) => updateItem(id, ev.detail)} />
  {/each}
</ol>
