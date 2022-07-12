<script lang="ts">
	import GameOver from '../assets/GameOver.svg'
</script>

<section>
	<img src={GameOver} alt="" />
	<h2>¡Eliminado!</h2>
	<p>No has podido superar el juego.</p>
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