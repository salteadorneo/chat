<script lang="ts">
	import { page } from '$app/stores';

	import { getConversations, initialize } from '../services/chat';

	import { onMount } from 'svelte';

	import CreateRoom from '../components/CreateRoom.svelte';
	
	import { user } from '../store';
	import { goto } from '$app/navigation';

	onMount(async () => {
		const localUser = localStorage.user ? JSON.parse(localStorage.user) : {};
		console.log(localUser)
		user.set(localUser);
		
		if (!$user || $user?.token == null) goto('/?ref=' + $page.params.room);

		if ($user) initialize({ accessToken: $user.token});

		const paginator = await getConversations({});
		if (paginator.items[0]) goto('/' + paginator.items[0].channelState.uniqueName);
	});
</script>

<h1>Hola {$user?.name}</h1>
<CreateRoom />