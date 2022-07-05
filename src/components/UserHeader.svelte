<script lang="ts">
	import { user } from '../store';

	import { getAccessToken } from '../services/user';

	import LoggedUserHeader from './LoggedUserHeader.svelte';

	let anonymousName = '';

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
	}
</script>

<header class="flex justify-center items-center gap-x-4">
	{#if $user}
		<LoggedUserHeader />
	{:else}
		<form on:submit={handleAnonymousLogin}>
			<input
				class="border-2 p-2"
				bind:value={anonymousName}
				type="text"
				placeholder="Indica tu nombre anónimo"
			/>
		</form>
	{/if}
</header>
