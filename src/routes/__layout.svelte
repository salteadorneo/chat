<script lang="ts">
	import '../app.css';
	
	import { onMount } from 'svelte';

	import { initialize } from '../services/chat';

	import { user } from '../store';
	
	import { goto } from '$app/navigation';

	onMount(() => {
		const localUser = localStorage.user ? JSON.parse(localStorage.user) : {};
		user.set(localUser);

		if (!$user || $user?.token == null) return;

		// if ($user) initialize({ accessToken: $user.token});

		// goto(`/nuevo-juego`);
	});
</script>

<svelte:head>
	<title>Alice</title>
	<meta name="description" content="El chat secreto!" />
</svelte:head>

<main>
	<slot />
</main>