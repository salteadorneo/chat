<script lang="ts">
	import Participants from "./Participants.svelte";

	import Hearts from '../assets/Hearts.svg';
	import Clubs from '../assets/Clubs.svg';
	import Spades from '../assets/Spades.svg';
	import Diamonds from '../assets/Diamonds.svg';

	export let waiting
</script>

<div class="loading">
	<div class="spinner">
		<img src={Hearts} alt="" />
		<img src={Clubs} alt="" />
		<img src={Spades} alt="" />
		<img src={Diamonds} alt="" />
	</div>
	{#if waiting}
		<footer>
			<p>Esperando a los jugadores</p>
			<Participants />
		</footer>
	{/if}
</div>

<style>
	.loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		opacity: 0;
		animation: fadeIn .5s ease-in-out forwards;
	}

	.spinner {
		width: 60px;
		height: 50vh;
	}

	.spinner img {
		margin: 0 0 1em;
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%, 100% { transform: scale(.9); }
		70% { transform: scale(1); }
	}

	footer {
		position: fixed;
		left: 0;
		bottom: 30px;
		width: 100%;
		text-align: center;
	}
</style>