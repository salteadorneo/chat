<script lang="ts">
	import { activeConversation } from '../store';

	function handleAddParticipant() {
		$activeConversation.add('mox')
	}
</script>

<div>
	{$activeConversation.participants.size} participante/s
	(<button on:click={handleAddParticipant}>Añadir</button>)
</div>
