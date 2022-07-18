<script lang="ts">
	import { page } from '$app/stores';

	import { onMount } from 'svelte';

	import { initialize, getConversation, updateAttrConversation, deleteConversation, removeParticipantConversation } from '../services/chat';
	import { activeConversation, user } from '../store';

	import Conversation from '../components/Room/Conversation.svelte';
	import ConversationInput from '../components/Room/ConversationInput.svelte';
	import Participants from '../components/Participants.svelte';
	
	import type { Participant } from '@twilio/conversations';

	import { goto } from '$app/navigation';
		
	import Loading from '../components/Loading.svelte';
	import InviteParticipants from '../components/InviteParticipants.svelte';
	import Game from '../components/Game.svelte';
	import Questions from '../components/Questions.svelte';
	import Stats from '../components/Stats.svelte';
	import Welcome from '../components/Welcome.svelte';

	import config from '../data/config.json';
	import questionsData from "../data/questions.json"

	onMount(async () => {
		const localUser = sessionStorage.user ? JSON.parse(sessionStorage.user) : {};
		user.set(localUser);
		
		if (!$user || $user?.token == null) goto('/');

		if ($user) initialize({ accessToken: $user.token});

		const conversation = await refreshConversation({ room: $page.params.room });
		if (conversation) {
			welcome = $activeConversation.lastMessage == undefined

			if ($activeConversation.attributes.loser) {
				removeParticipantLoser()
			}

			$activeConversation.on('updated', async (data: { conversation: Conversation, updateReasons: Array<[]> }) => {
				activeConversation.set(data.conversation)

				const loser = $activeConversation.attributes.loser
				const participants = Array.from($activeConversation.participants)
				const loserIsParticipant = participants.filter(p => loser == p[1].identity)
				if (loser && loserIsParticipant.length) {
					removeParticipantLoser()
				}
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

	function removeParticipantLoser() {
		setTimeout(() => {
			removeParticipantConversation({ 
				room: $activeConversation.uniqueName,
				participant: $activeConversation.attributes.loser
			});
		}, config.seconds_timer_delete_participant * 1000);
	}

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

	let welcome = true
	function handleClick() {
		welcome = false
	}

	function startGame() {
		let questions = []
		for (let i = 0; i < $activeConversation.participants.size - 1; i++)
			questions.push(questionsData[Math.floor(Math.random() * questionsData.length)])

		updateAttrConversation({ 
			room: $activeConversation.uniqueName, 
			params: { 
				...$activeConversation.attributes, 
				loading: !$activeConversation.attributes.loading,
				questions
			}
		});
	}
</script>

{#if $activeConversation?.uniqueName}

	{#if $activeConversation.attributes.loading}
		{#if $activeConversation.createdBy == $user?.name}

		<section>
			<h1>Hola {$user?.name}</h1>
			<Stats />
			<InviteParticipants />
			<Game action={startGame} />
		</section>
			
		{:else}
			<Loading />
			<footer>	
				<p>Esperando a los jugadores</p>
				<Participants />
			</footer>
		{/if}
	{:else}
		<section>
		{#if welcome}
			<Welcome handleClick={handleClick} />
		{:else}
			<Participants size="small" />
			
			<h1 on:dblclick={handleDelete}>El juego de Alice</h1>

			<Questions data={$activeConversation.attributes.questions[$activeConversation.participants.size - 2]} />
			
			<Conversation />
			<ConversationInput disabled={$activeConversation.attributes.winners?.includes($user?.name)} />
		{/if}
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

	footer {
		position: fixed;
		left: 0;
		bottom: 30px;
		width: 100%;
		text-align: center;
	}
</style>