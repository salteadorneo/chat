<script lang="ts">
	import '../app.css';
	
	import { onMount } from 'svelte';

	import { user } from '../store';

	onMount(() => {
		const localUser = sessionStorage.user ? JSON.parse(sessionStorage.user) : {};
		user.set(localUser);
	});
</script>

<svelte:head>
	<title>El juego de Alice</title>
	<meta name="description" content="El juego de Alice" />
</svelte:head>

<main>
	<slot />
</main>