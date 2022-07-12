<script lang="ts">
	import { activeConversation } from '../store';

	let message = '';

	function handleMessage(e) {
		if (e) e.preventDefault();
		message = message.trim()
		if (!message) return
		$activeConversation.sendMessage(message);
		message = '';
	}

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') handleMessage(null);
	};
</script>

<svelte:window on:keydown={handleKeyDown} />

<footer>
	<form on:submit={handleMessage}>
		<input
			type="text"
			bind:value={message}
			placeholder="Escribe un mensaje aquí"
		/>
		<button>Enviar</button>
	</form>
</footer>

<style>
	footer {
		position: relative;
		left: -5%;
		width: 99vw;
		
		background: var(--background);
		padding: 10px;
		text-align: center;
		border-top: 1px solid var(--primary);
	}

	form {
		display: flex;
	}

	input[type=text] {
		width: 100%;
		border: 1px solid var(--primary);
		border-radius: 12px;
		padding: 6px 20px;
		background: var(--background);
		appearance: none;
		outline: none;
		color: var(--primary);
	}
</style>