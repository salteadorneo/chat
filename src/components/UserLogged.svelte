<script lang="ts">
	import { user } from "../store";
</script>

<section>
	<span>Bienvenido <strong>{$user?.name}</strong></span>
</section>

<style>
	section {
		position: fixed;
		top: 20px;
		left: 0;
		text-align: center;
		width: 100%;
	}
</style>