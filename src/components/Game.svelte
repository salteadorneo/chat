<script lang="ts">
	import { activeConversation } from "../store";

	export let action
</script>

<section>
	<h3>El juego de Alice</h3>
	<p>Un chat donde pondrás a prueba tus conocimientos.<br /><br />El último en acertar, será eliminado.</p>
	<button on:click={action} disabled={$activeConversation.participants.size <= 1}>Empezar</button>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		width: 100%;
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
		border: 1px solid var(--primary);
		border-bottom: 0;
		padding: 25px;
		background: var(--background);
		text-align: center;
	}

	button {
		margin: 0 auto;
	}

	button[disabled] {
		opacity: .3;
	}

	p {
		font-size: 12px;
		margin: 0 0 20px;
	}
</style>