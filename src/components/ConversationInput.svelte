<script lang="ts">
	import { activeConversation } from '../store';

	import Send from '../assets/Send.svg'

	export let disabled = false

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

<footer class={disabled ? 'disabled' : ''}>
	<form on:submit={handleMessage}>
		<input
			type="text"
			bind:value={message}
			placeholder="Escribe un mensaje aquí"
			disabled={disabled}
			autocomplete="off"
		/>
		<span on:click={handleMessage}><img src={Send} alt="Send" /></span>
	</form>
</footer>

<style>
	footer {
		position: relative;
		left: -5%;
		width: 99vw;
		
		background: var(--background);
		padding: 8px 10px;
		text-align: center;
		border-top: 1px solid var(--primary);
	}

	.disabled {
		opacity: .5;
	}

	form {
		display: flex;
		align-items: center;
	}

	input[type=text] {
		width: 100%;
		border: 1px solid var(--primary);
		border-radius: 12px;
		padding: 8px 20px;
		background: var(--background);
		appearance: none;
		outline: none;
		color: var(--primary);
		margin: 0 10px 0 0;
	}
	
	img {
		height: 20px;
	}
</style>