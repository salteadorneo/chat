<script lang="ts">
	import { page } from '$app/stores';

	import { onMount } from 'svelte';

	import { initialize, getConversation, updateAttrConversation, deleteConversation } from '../services/chat';
	import { activeConversation, user } from '../store';

	import Conversation from '../components/Conversation.svelte';
	import ConversationInput from '../components/ConversationInput.svelte';
	import Participants from '../components/Participants.svelte';
	
	import type { Participant } from '@twilio/conversations';

	import { goto } from '$app/navigation';
		
	import Loading from '../components/Loading.svelte';
	import InviteParticipants from '../components/InviteParticipants.svelte';
	import Game from '../components/Game.svelte';
	import Questions from '../components/Questions.svelte';
	import Stats from '../components/Stats.svelte';

	onMount(async () => {
		const localUser = sessionStorage.user ? JSON.parse(sessionStorage.user) : {};
		user.set(localUser);
		
		// if (!$user || $user?.token == null) goto('/?ref=' + $page.params.room);

		if ($user) initialize({ accessToken: $user.token});

		const conversation = await refreshConversation({ room: $page.params.room });
		if (conversation) {

			$activeConversation.on('updated', (data: { conversation: Conversation, updateReasons: Array<[]> }) => {
				activeConversation.set(data.conversation)
			});

			$activeConversation.on('participantJoined', (participant: Participant) => {
				const invitations = $activeConversation.attributes.invitations || []
				if (invitations.includes(participant.identity)) {
					updateAttrConversation({
						room: $activeConversation.uniqueName,
						params: {
							...$activeConversation.attributes,
							invitations: invitations.filter(i => i != participant.identity)
						}
					});
				}
				activeConversation.set(participant.conversation)
			});

			$activeConversation.on('participantLeft', (participant: Participant) => {
				if (participant.identity == $user?.name) goto('/game-over');

				setTimeout(async () => {
					const conversation = await refreshConversation({ room: $page.params.room });

					// you're alone? You are the winner :)
					if (conversation && conversation.participants.size == 1) {
						goto('/win')
						deleteConversation({ room: $activeConversation.uniqueName });
						return
					}
				}, 500);
			});
		} else {
			goto('/');
		}
	});

	async function refreshConversation({ room }) {
		const conversation = await getConversation({ room });
		activeConversation.set(conversation);
		return conversation;
	}

	async function handleDelete(e) {
		e.preventDefault();
		await deleteConversation({ room: $activeConversation.uniqueName });
		goto('/');
	}
</script>

{#if $activeConversation?.uniqueName}

	{#if $activeConversation.attributes.loading}
		{#if $activeConversation.createdBy == $user?.name}

		<section>
			<h1>Hola {$user?.name}</h1>
			<Stats />
			<InviteParticipants />
			<Game />
		</section>
			
		{:else}
			<Loading waiting />
		{/if}
	{:else}
		<section>
			<!-- <button on:click={handleDelete}>Cerrar</button> -->

			<Participants size="small" />
			
			<h1>El juego de Alice</h1>

			<Questions />
			
			<Conversation />
			<ConversationInput disabled={$activeConversation.attributes.winners?.includes($user?.name)} />
		</section>
	{/if}
{/if}

<style>
	section {
		display: flex;
		flex-direction: column;
		height: 100vh;
		padding: 20px 0 0;
	}
</style>