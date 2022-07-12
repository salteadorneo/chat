<script lang="ts">
	import { onMount } from 'svelte';
	
	import { goto } from '$app/navigation';

	import { createConversation, getConversations } from '../services/chat';
	import { activeConversation, user } from '../store';

	let rooms:Array<{ uniqueName: string, status: string, createdBy: string }> = []
	let room = '';

	onMount(async () => {
		if (!$user || $user?.token == null) return;

		const paginator = await getConversations({});
		rooms = paginator.items
	});

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		if (!$user || $user?.token == null) return;

		const conversation = await createConversation({ room });

		if (conversation) {
			activeConversation.set(conversation);
			goto(`/${room}`);
		}
	}
</script>

<div>
	{#each rooms as room}
		<a href={room.uniqueName}>{room.uniqueName}</a>
	{/each}
	<form on:submit={handleSubmit}>
		<label for="room-select">
			Introduce la sala del chat a la que quieres entrar
		</label>
		<input
			id="room-select"
			bind:value={room}
			type="text"
		/>
		<button
			type="submit"
			>¡Entrar!</button
		>
	</form>
</div>
