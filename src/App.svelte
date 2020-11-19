<script>
  import TurndownService from "turndown";
  import produce from "immer";
  import { writable } from "svelte/store";

  let td = new TurndownService();

  import Component from "./Component.svelte";
  const items = writable({
    a: "# Hello",
    b: "How do you do?",
    c: "**Today**",
    d: "See `ya`",
  });
</script>

{#each Object.entries($items) as [id, md] (id)}
  <Component
    {id}
    {md}
    on:input={(ev) => items.set(produce($items, (items) => {
          items[id] = td.turndown(ev.detail);
        }))} />
  <!-- [...items.map((x) =>
          x.id === item.id ? { id: item.id, md: td.turndown(ev.detail) } : x
        )] -->
{/each}

<ol>
  {#each Object.entries($items) as [id, md] (id)}
    <li>
      <pre
        contenteditable="true"
        on:input={(ev) => items.set(produce($items, (items) => {
              console.log(ev.currentTarget, ev.currentTarget.innerText);
              items[id] = ev.currentTarget.innerText;
            }))}>{md}</pre>
    </li>
  {/each}
</ol>
