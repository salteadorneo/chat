<script lang="ts">
	import type { Participant } from '@twilio/conversations';
	
	import { removeParticipantConversation, updateAttrConversation } from '../services/chat';

	export let add = false

	import { activeConversation } from '../store';

	let participant = ''
	let participants = [...$activeConversation.participants]
	participants.forEach(async participant => {
		const participantUser = await participant[1].getUser()
	})

	$activeConversation.on('participantJoined', (participant: Participant) => {
		participants = [...$activeConversation.participants]
	});

	$activeConversation.on('participantLeft', (participant: Participant) => {
		participants = [...$activeConversation.participants]
	});

	async function handleAddParticipant(e) {
		e.preventDefault();
		try {
			await $activeConversation.add(participant)
		} catch (e) {
			let conversation = await updateAttrConversation({ 
				room: $activeConversation.uniqueName, 
				params: {
					loading: true,
					invitations: ($activeConversation.attributes.invitations||[]).concat([participant])
				}
			});
			if (conversation) activeConversation.set(conversation);
		}
		participant = ''
	}

	async function handleRemoveParticipant(participant) {
		await removeParticipantConversation({ room: $activeConversation.uniqueName, participant: participant });
	}
</script>

<div>
	{#each participants as participant}
		<div class="participant" on:click={() => handleRemoveParticipant(participant[0])}>{participant[1].identity}</div>
	{/each}
	{#each $activeConversation.attributes.invitations||[] as participant}
		<div class="participant">{participant}</div>
	{/each}

	{#if add}
		<form on:submit={handleAddParticipant}>
			<input type="text" placeholder="Nombre" bind:value={participant} autofocus />
			<button>Añadir</button>
		</form>
	{/if}
</div>

<style>
	.participant {
		display: inline-block;
		color: white;
		background: gray;
		border-radius: 50%;
		padding: 10px;
	}
</style>