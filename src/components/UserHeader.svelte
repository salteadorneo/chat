<script lang="ts">
	import { onMount } from 'svelte';

	import { user } from '../store';
	import { page } from '$app/stores';
	
	import { goto } from '$app/navigation';

	import { getAccessToken } from '../services/user';

	let anonymousName = '';

	const refRoom = $page.params.room ?? $page.url.searchParams.get('ref')

	onMount(async () => {
		if (user) {
			// if (refRoom) goto('/' + refRoom);
			// else goto(`/nuevo-juego`);
		}
	});

	async function handleAnonymousLogin(e: SubmitEvent) {
		e.preventDefault();
		const accessToken = await getAccessToken({ token: `anonymous_${anonymousName}` });
		user.set({
			name: anonymousName,
			avatar: `https://i.pravatar.cc/150?u=${anonymousName}`,
			email: 'a@a.com',
			token: accessToken,
			userName: anonymousName
		});
		localStorage.user = JSON.stringify($user);

		if (refRoom) goto('/' + refRoom);
		else goto(`/nuevo-juego`);
	}
</script>

<header>
	<form on:submit={handleAnonymousLogin}>
		<input
			bind:value={anonymousName}
			type="text"
			placeholder="Apodo"
		/>
	</form>
</header>
