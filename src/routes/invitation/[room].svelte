<script lang="ts">
	import { onMount } from 'svelte';

	import UserHeader from '../../components/UserHeader.svelte';
	
	import { page } from '$app/stores';

	onMount(async () => {
		console.log($page.params.room)
	});
</script>

<h1>Me han invitado</h1>
<UserHeader />