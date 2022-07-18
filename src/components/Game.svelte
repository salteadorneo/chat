<script lang="ts">
	import { activeConversation } from "../store";
	import { updateAttrConversation } from "../services/chat";

	import questionsData from "../data/questions.json"

	function handleStart() {
		let questions = []
		for (let i = 0; i < $activeConversation.participants.size - 1; i++)
			questions.push(questionsData[Math.floor(Math.random() * questionsData.length)])

		updateAttrConversation({ 
			room: $activeConversation.uniqueName, 
			params: { 
				...$activeConversation.attributes, 
				loading: !$activeConversation.attributes.loading,
				questions
			}
		});
	}
</script>

<div>
	<section>
		<h3>El juego de Alice</h3>
		<p>Un chat donde pondrás a prueba tus conocimientos con tus invitados.<br /><br />El último en contestar, será eliminado.</p>
		<button on:click={handleStart} disabled={$activeConversation.participants.size <= 1}>Empezar</button>
	</section>
</div>

<style>
	section {
		display: flex;
		flex-direction: column;
		width: 100%;
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
		/* position: fixed;
		bottom: 0; */
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