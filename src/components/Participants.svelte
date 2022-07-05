<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { activeConversation } from '../store';

	function handleAddParticipant() {
		// activeConversation.add('mox');
	}
</script>

<div>
	{$activeConversation.participants.size} participante
	<button on:click={handleAddParticipant}>Añadir</button>
</div>
