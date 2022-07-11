<script lang="ts">
	import type { Participant } from '@twilio/conversations';
	
	import { removeParticipantConversation } from '../services/chat';

	export let add = false

	import { activeConversation } from '../store';

	let participant = ''
	let participants = [...$activeConversation.participants]
	participants.forEach(async participant => {
		const participantUser = await participant[1].getUser()
		console.log(participant[1], participantUser)
	})

	$activeConversation.on('participantJoined', (participant: Participant) => {
		participants = [...$activeConversation.participants]
	});

	$activeConversation.on('participantLeft', (participant: Participant) => {
		participants = [...$activeConversation.participants]
	});

	async function handleAddParticipant(e) {
		e.preventDefault();
		let newParticipant = await $activeConversation.add(participant)
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

	{#if add}
		<form on:submit={handleAddParticipant}>
			<input type="text" placeholder="Nombre" bind:value={participant} autofocus />
		</form>
		(<button on:click={handleAddParticipant}>Añadir</button>)
	{/if}
</div>

<style>
	.participant {
		display: inline-block;
		color: white;
		background: gray;
		border-radius: 50%;
	}
</style>