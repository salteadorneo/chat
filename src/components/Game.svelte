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
	<!-- <strong>El juego de Alice</strong> -->
	<section>
		<h3>Reglas del juego</h3>
		<p>But I must explain to you how all this mistaken
			idea of denouncing pleasure and praising pain
			of the system, and expound the ateachings of
			the great explor</p>
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