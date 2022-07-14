<script lang="ts">
	import type { JSONValue } from '@twilio/conversations';
	import { removeParticipantConversation, updateAttrConversation } from '../services/chat';

	import { onMount, afterUpdate } from 'svelte';
	import { activeConversation, user } from '../store';
	import Message from './Message.svelte';

	import config from '../data/config.json'
	
	let div: HTMLDivElement;
	let messages: Array<{ body: string; author: string; attributes: JSONValue }> = [];

	onMount(async () => {
		const paginator = await $activeConversation.getMessages();
		messages = paginator.items;

		messages = messages.map(message => checkMessage(message))

		$activeConversation.on('messageAdded', (message: { body: string; author: string; attributes: JSONValue }) => {
			messages = [...messages, checkMessage(message)];

			if (isCorrect(message) && message.author == $user?.name) {
				addParticipantToWinners(message.author)
			}
		});
	});

	function isCorrect(message: { body: string; author: string; attributes: JSONValue }) {
		const correct = $activeConversation.attributes.questions ? $activeConversation.attributes.questions[0].a : 'no-question'
		if (message.body.toLowerCase() == correct.toLowerCase()) return true
		return false
	}

	async function addParticipantToWinners(participant: string) {
		const winners = new Set($activeConversation.attributes.winners || [])
		const conversation = await updateAttrConversation({ 
			room: $activeConversation.uniqueName, 
			params: {
				...$activeConversation.attributes,
				winners: Array.from(winners.add(participant))
			}
		})
		if (conversation) {
			const winners = conversation.attributes?.winners || []
			const participants = conversation.participants || []
			
			const participantsNoWinners = Array.from(participants).filter(p => !winners.includes(p[1].identity))
			if (participantsNoWinners.length == 1) {
				const loser = participantsNoWinners[0]

				await $activeConversation.sendMessage(loser[1].identity + ' será eliminado en {timer} segundos...', { label: true, anonymous: true })

				updateAttrConversation({ 
					room: $activeConversation.uniqueName, 
					params: {
						...$activeConversation.attributes,
						winners: []
					}
				});
				
				setTimeout(() => {
					removeParticipantConversation({ room: conversation.uniqueName, participant: loser[1].identity });
				}, config.seconds_timer_delete_participant * 1000);
			}
		}
	}

	function checkMessage(message: { body: string; author: string; attributes: JSONValue }) {
		if (isCorrect(message)) {
			return { body: 'ACIERTO', author: message.author, attributes: { label: true } }
		}
		return message
	}

	afterUpdate(() => {
		div.scrollTo(0, div.scrollHeight);
	});
</script>

<div bind:this={div} class="messages">
	{#each messages as message}
		<Message {message} />
	{/each}
</div>

<style>
	.messages {
		padding: 20px 0 5px;
		height: 100%;
		overflow: auto;
	}
</style>