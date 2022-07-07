<script lang="ts">
	export let add = false

	import { activeConversation } from '../store';

	let participant = ''
	let participants = [...$activeConversation.participants]

	async function handleAddParticipant(e) {
		e.preventDefault();
		let newParticipant = await $activeConversation.add(participant)
		participant = ''
	}
</script>

<div>
	{#each participants as participant}
		<div class="participant">{participant[1].identity}</div>
	{/each}

	{#if add}
		<form on:submit={handleAddParticipant}>
			<input type="text" placeholder="Nombre" bind:value={participant} />
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