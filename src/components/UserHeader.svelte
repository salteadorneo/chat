<script lang="ts">
	import { onMount } from 'svelte';

	import { user } from '../store';
	
	import { goto } from '$app/navigation';

	import { getAccessToken } from '../services/user';

	let anonymousName = '';

	onMount(async () => {
		if ($user) goto(`/nuevo-juego`);
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

		goto(`/nuevo-juego`);
	}
</script>

<header class="flex justify-center items-center gap-x-4">
	<form on:submit={handleAnonymousLogin}>
		<input
			class="border-2 p-2"
			bind:value={anonymousName}
			type="text"
			placeholder="Apodo"
		/>
	</form>
</header>
