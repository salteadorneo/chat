<script lang="ts">
	import Win from '../assets/Win.svg'
</script>

<section>
	<img src={Win} alt="" />
	<h2>¡Juego superado!</h2>
	<p>Has ganado esta carta.</p>
</section>

<style>
	section {
		display: grid;
		justify-items: center;
		width: 90%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	img {
		height: 35vh;
		margin: 0 0 20px;
	}
</style>