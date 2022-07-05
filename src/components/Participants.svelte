<script lang="ts">
	import { activeConversation } from '../store';

	let participant = ''

	async function handleAddParticipant(e) {
		e.preventDefault();
		let newParticipant = await $activeConversation.add(participant)
		participant = ''
	}
</script>

<div>
	{$activeConversation.participants.size} participante/s

	<form on:submit={handleAddParticipant}>
		<input type="text" placeholder="Nombre" bind:value={participant} />
	</form>

	(<button on:click={handleAddParticipant}>Añadir</button>)
</div>
