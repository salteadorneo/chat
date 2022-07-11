<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import { user } from '../store';

	import { onMount } from 'svelte';

	import { getConversations, initialize } from '../services/chat';

	import CreateRoom from '../components/CreateRoom.svelte';

	onMount(async () => {
		const localUser = localStorage.user ? JSON.parse(localStorage.user) : {};
		user.set(localUser);
		
		if (!$user || $user?.token == null) goto('/');

		if ($user) initialize({ accessToken: $user.token});

		const paginator = await getConversations({});
		if (paginator && paginator.items[0]) goto('/' + paginator.items[0].channelState.uniqueName);
	});
</script>

<h1>Hola {$user?.name}</h1>
<CreateRoom />