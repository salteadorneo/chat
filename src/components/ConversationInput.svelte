<script lang="ts">
	import { activeConversation } from '../store';

	let message = '';

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			$activeConversation.sendMessage(message);
			message = '';
		}
	};
</script>

<svelte:window on:keydown={handleKeyDown} />

<div>
	<input
		type="text"
		bind:value={message}
		placeholder="Escribe tu mensaje aquí"
	/>
</div>
