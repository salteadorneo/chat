<script lang="ts">
	import Hearts from '../assets/Hearts.svg';
	import Clubs from '../assets/Clubs.svg';
	import Spades from '../assets/Spades.svg';
	import Diamonds from '../assets/Diamonds.svg';
	
	export let handleClick: Function
	function handleStart() {
		handleClick()
	}
</script>

<section>
	<h2>El juego de Alice</h2>
	<p>Se lanzarán preguntas que deberás resolver lo más rápido posible. Si eres el último, quedarás eliminado y expulsado del juego.</p>
	<div class="icons">
		<img src={Hearts} alt="" />
		<img src={Clubs} alt="" />
		<img src={Spades} alt="" />
		<img src={Diamonds} alt="" />
	</div>
	<button on:click={handleStart}>¡Qué empieze el juego!</button>
</section>

<style>
	section {
		position: fixed;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 80%;
		max-width: 400px;
		height: 100vh;
		opacity: 0;
		animation: fadeIn .5s ease-in-out forwards;
	}

	h2 {
		color: var(--primary);
		width: 100%;
		margin: 0 0 1em;
	}

	p {
		font-size: 14px;
		margin: 0 0 1em;
	}

	.icons {
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 50%;
		margin: 1em 0 2em;
	}

	img {
		height: 20px;
	}
</style>