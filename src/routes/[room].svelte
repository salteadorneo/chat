<script lang="ts">
	import { page } from '$app/stores';

	import { onMount } from 'svelte';

	import { initialize, getConversation, updateAttrConversation, deleteConversation, removeParticipantConversation, leaveConversation } from '../services/chat';
	import { activeConversation, user } from '../store';

	import Conversation from '../components/Conversation.svelte';
	import ConversationInput from '../components/ConversationInput.svelte';
	import Participants from '../components/Participants.svelte';
	
	import type { Participant } from '@twilio/conversations';

	import { goto } from '$app/navigation';

	onMount(async () => {
		const localUser = localStorage.user ? JSON.parse(localStorage.user) : {};
		user.set(localUser);
		
		// if (!$user || $user?.token == null) goto('/?ref=' + $page.params.room);

		if ($user) initialize({ accessToken: $user.token});

		const conversation = await refreshConversation({ room: $page.params.room });
		if (conversation) {

			$activeConversation.on('updated', (data: { conversation: Conversation, updateReasons: Array<[]> }) => {
				activeConversation.set(data.conversation)
			});

			$activeConversation.on('participantJoined', (participant: Participant) => {
				activeConversation.set(participant.conversation)
			});

			$activeConversation.on('participantLeft', (participant: Participant) => {
				setTimeout(() => {
					refreshConversation({ room: $page.params.room });
				}, 500);
			});

			// if ($activeConversation.createdBy == $user?.name)
			// 	await updateAttrConversation({ room: $page.params.room, accessToken: $user.token, params: { loading: true } });
		} else {
			goto('/nuevo-juego');
		}
	});

	async function refreshConversation({ room }) {
		const conversation = await getConversation({ room });

		if (!conversation) goto('/nuevo-juego');

		activeConversation.set(conversation);
		return conversation;
	}
	
	async function handleStart(e) {
		e.preventDefault();

		if (!$user || $user?.token == null) return;

		let conversation = await updateAttrConversation({ room: $activeConversation.uniqueName, params: { loading: !$activeConversation.attributes.loading } });
		
		if (conversation) activeConversation.set(conversation);
	}

	async function handleDelete(e) {
		e.preventDefault();

		await deleteConversation({ room: $activeConversation.uniqueName });
		
		goto('/nuevo-juego');
	}

	async function handleRemoveMe(e) {
		e.preventDefault();

		await leaveConversation({ room: $activeConversation.uniqueName });
		
		goto('/nuevo-juego');
	}
</script>

{#if $activeConversation?.uniqueName}
	{#if $activeConversation.attributes.loading}
		{#if $activeConversation.createdBy == $user?.name}
			<Participants add />
			<br />
			http://localhost:3000/inv/{$activeConversation.uniqueName}
			<br />
			<button on:click={handleStart}>Empezar</button>
		{:else}
			Loading...
		{/if}
	{:else}
		<div class="max-w-6xl mx-auto py-2 relative">
			<h2 class="text-3xl">
				{$activeConversation.uniqueName}
			</h2>
			<Participants />
			<Conversation />
			<ConversationInput />
			<button on:click={handleRemoveMe}>remove me</button>
			<button on:click={handleDelete}>Cerrar</button>
		</div>
	{/if}
{/if}
