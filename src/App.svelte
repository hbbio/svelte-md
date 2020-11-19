<script>
  import TurndownService from "turndown";
  let td = new TurndownService();

  import Component from "./Component.svelte";
  let items = [
    { id: 1, md: "# Hello" },
    { id: 2, md: "How do you do?" },
    { id: 3, md: "**Today**" },
    { id: 4, md: "See `ya`" },
  ];
</script>

{#each items as item (item.id)}
  <Component
    {item}
    on:input={(ev) => (items = [...items.map((x) =>
          x.id === item.id ? { id: item.id, md: td.turndown(ev.detail) } : x
        )])} />
{/each}

<ol>
  {#each items as item (item.id)}
    <li>
      <pre>{item.md}</pre>
    </li>
  {/each}
</ol>
