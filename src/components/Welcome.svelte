<script lang="ts">
	import Hearts from '../assets/Hearts.svg';
	import Clubs from '../assets/Clubs.svg';
	import Spades from '../assets/Spades.svg';
	import Diamonds from '../assets/Diamonds.svg';

	export let handleClick

	function handleStart() {
		handleClick()
	}
</script>

<section>
	<h2>Bienvenido a<br />El juego de Alice</h2>
	<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga voluptates in modi enim fugiat ipsam repellat, laborum et veniam nobis, perferendis, odio recusandae porro illum amet totam voluptatem quaerat possimus?</p>
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
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
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

	button {
	}
</style>