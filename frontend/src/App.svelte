<script>
  import { onMount } from "svelte";
  let posts = [];
  let title = "";
  let content = "";
  async function fetchPosts() {
    posts = await (await fetch("http://localhost:3000/posts")).json();
  }

  async function createPost() {
    await fetch("http://localhost:3000/posts", {
      method: "post",
	  body: JSON.stringify({ title, content }),
	  headers: {
		  'Content-Type': 'application/json'
	  }
	});
	title = ''
	content = ''
    fetchPosts();
  }

  async function deletePost(post) {
    await fetch(`http://localhost:3000/posts/${post.id}`, { method: "delete" });
    fetchPosts();
  }

  onMount(fetchPosts);
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  form {
	  display: flex;
	  flex-direction: column;
	  max-width: 50%;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
	form {
		max-width: 100%;
	}
  }
</style>

<main>
  <form on:submit|preventDefault={createPost}>
    <input type="text" bind:value={title} />
	<textarea bind:value={content} cols="30" rows="10" />
	<button type="submit">Create a new post</button>
  </form>
  {#each posts as post}
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <button on:click={() => deletePost(post)}>Delete</button>
    </div>
  {/each}
</main>
