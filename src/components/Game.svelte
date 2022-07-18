<script lang="ts">
	import { activeConversation } from "../store";

	export let action
</script>

<section>
	{#if $activeConversation.participants.size <= 1}
		<p>Debes esperar a que algún jugador acepte tu invitación.</p>
	{/if}
	{#if $activeConversation.attributes.invitations?.length >= 1}
		<p>Algunos invitados todavía no han entrado.</p>
	{/if}
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