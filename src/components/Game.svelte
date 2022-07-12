<script lang="ts">
	import { activeConversation } from "../store";
	import { updateAttrConversation } from "../services/chat";

	function handleStart() {
		updateAttrConversation({ room: $activeConversation.uniqueName, params: { ...$activeConversation.attributes, loading: !$activeConversation.attributes.loading } });
	}
</script>

<div>
	<!-- <strong>El juego de Alice</strong> -->
	<section>
		<h3>Reglas del juego</h3>
		<p>But I must explain to you how all this mistaken
			idea of denouncing pleasure and praising pain
			of the system, and expound the ateachings of
			the great explor</p>
		<button on:click={handleStart}>Empezar</button>
	</section>
</div>

<style>
	section {
		display: flex;
		flex-direction: column;
		width: 90%;
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
		position: fixed;
		bottom: 0;
		border: 1px solid var(--primary);
		border-bottom: 0;
		padding: 25px;
		background: var(--background);
	}

	button {
		margin: 0 auto;
	}

	p {
		font-size: 12px;
		margin: 0 0 20px;
	}
</style>