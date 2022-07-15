<script lang="ts">
	import { goto } from '$app/navigation';

	import { user } from '../store';

	import { onMount } from 'svelte';

	import { initialize } from '../services/chat';
	import { getAccessToken } from '../services/user'

	import Loading from '../components/Loading.svelte'

	let anonymousName = '';

	onMount(async () => {
		const localUser = sessionStorage.user ? JSON.parse(sessionStorage.user) : {};
		user.set(localUser);
		
		if (!$user || $user?.token == null) return

		if ($user) initialize({ accessToken: $user.token});

		goto(`/lobby`)
	});

	async function handleAnonymousLogin(e: SubmitEvent) {
		e.preventDefault();

		anonymousName = anonymousName.toLowerCase().trim()

		const accessToken = await getAccessToken({ token: `anonymous_${anonymousName}` });
		user.set({
			name: anonymousName,
			token: accessToken,
		});
		sessionStorage.user = JSON.stringify($user)

		if ($user) initialize({ accessToken: $user.token});

		goto(`/lobby`)
	}
</script>

{#if $user && !$user?.token}
	<section>
		<h1>Bienvenido a <br />El juego de Alice</h1>
		<form on:submit={handleAnonymousLogin}>
			<input
				bind:value={anonymousName}
				type="text"
				placeholder="Introduce tu nick"
			/>
		</form>
	</section>
{:else}
	<Loading />
{/if}

<style>
	section {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
		text-align: center;
		animation: fadeIn .5s ease-in forwards;
	}

	h1 {
		margin-bottom: 30px;
	}

	input[type=text] {
		width: 80%;
		border: 1px solid var(--primary);
		border-radius: 12px;
		padding: 6px 20px;
		background: var(--background);
		appearance: none;
		outline: none;
		color: var(--primary);
		text-align: center;
		font-size: 20px;
	}
	
	input[type=text]:not(:placeholder-shown) {
		text-transform: lowercase;
	}
</style>