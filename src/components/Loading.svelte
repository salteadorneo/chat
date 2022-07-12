<script lang="ts">
	import Participants from "./Participants.svelte";
</script>

<div>
	Cargando
	<footer>
		<p>Esperando a los jugadores</p>
		<Participants />
	</footer>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}
	footer {
		position: fixed;
		left: 0;
		bottom: 30px;
		width: 100%;
		text-align: center;
	}
</style>