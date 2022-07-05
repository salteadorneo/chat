<script lang="ts">
	import Logo from '../components/Logo.svelte';

	import '../app.css';
	
	import { onMount } from 'svelte';

	import { user } from '../store';

	onMount(async () => {
		const localUser = JSON.parse(localStorage.user) ?? {};
		console.log(localUser)
		user.set(localUser);
	});
</script>

<main class="max-w-6xl m-auto px-4 relative">
	<Logo />
	<slot />
</main>
