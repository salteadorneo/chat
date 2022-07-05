<script lang="ts">
	import { user } from '../store';

	import { getAccessToken } from '../services/user';

	import LoggedUserHeader from './LoggedUserHeader.svelte';

	let anonymousName = '';
	let showAnonymousInput = false;

	async function handleAnonymousLogin(e: SubmitEvent) {
		e.preventDefault();
		console.log(anonymousName);
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

	function handleToggleAnonymous() {
		showAnonymousInput = !showAnonymousInput;
	}
</script>

<header class="flex justify-center items-center gap-x-4">
	{#if $user}
		<LoggedUserHeader />
	{:else if showAnonymousInput}
		<form on:submit={handleAnonymousLogin}>
			<input
				class="border-2 p-2"
				bind:value={anonymousName}
				type="text"
				placeholder="Indica tu nombre anónimo"
			/>
		</form>
	{:else}
		<button on:click={handleToggleAnonymous} class="py-2 flex items-center gap-1 hover:underline">
			Entrar como anónimo
		</button>
	{/if}
</header>
