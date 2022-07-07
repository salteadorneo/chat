<script lang="ts">
	import CreateRoom from '../components/CreateRoom.svelte';
	
	import { user } from '../store';
</script>

<h1>Hola {$user?.name}</h1>
<CreateRoom />