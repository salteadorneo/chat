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
		
	import Loading from '../components/Loading.svelte';
	import InviteParticipants from '../components/InviteParticipants.svelte';
	import Game from '../components/Game.svelte';
	import Question from '../components/Question.svelte';

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

		if (!conversation) {
			if (gameover) goto('/game-over');
			else if (win) goto('/win');
			else goto('/nuevo-juego');
		}

		activeConversation.set(conversation);
		return conversation;
	}

	let win = false
	async function handleDelete(e) {
		e.preventDefault();
		
		win = true

		await deleteConversation({ room: $activeConversation.uniqueName });

		goto('/win');
	}

	let gameover = false
	async function handleRemoveMe(e) {
		e.preventDefault();

		gameover = true

		await leaveConversation({ room: $activeConversation.uniqueName });
	}
</script>

{#if $activeConversation?.uniqueName}

	{#if $activeConversation.attributes.loading}
		{#if $activeConversation.createdBy == $user?.name}

			<h1>Hola {$user?.name}</h1>
			<InviteParticipants />
			<Game />
			
		{:else}
			<Loading />
		{/if}
	{:else}
		<section class="fullheight">
			<Participants size="small" />
			
			<h1>El juego de Alice</h1>

			<Question />
			
			<Conversation />

			<ConversationInput />

			<button on:click={handleRemoveMe}>remove me</button>
			<button on:click={handleDelete}>Cerrar</button>
		</section>
	{/if}
{/if}

<style>
	.fullheight {
		display: flex;
		flex-direction: column;
		height: 100vh;
		padding: 20px 0 0;
	}
</style>