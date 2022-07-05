<script lang="ts">
	import '../app.css';
	
	import { onMount } from 'svelte';

	import { user } from '../store';

	onMount(async () => {
		const localUser = JSON.parse(localStorage.user) ?? {};
		user.set(localUser);
	});
</script>

<svelte:head>
	<title>Alice</title>
	<meta name="description" content="El chat secreto!" />
</svelte:head>

<main class="max-w-6xl m-auto px-4 relative">
	<slot />
</main>
