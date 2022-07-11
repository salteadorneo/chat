<script lang="ts">
	import { onMount } from 'svelte';

	import UserHeader from '../../components/UserHeader.svelte';
	
	import { page } from '$app/stores';

	import { initialize, joinConversation } from '../../services/chat';
	import { user } from '../../store';
import { goto } from '$app/navigation';

	onMount(async () => {
		const localUser = localStorage.user ? JSON.parse(localStorage.user) : {};
		console.log(localUser)
		user.set(localUser);
		
		if (!$user || $user?.token == null) goto('/?ref=' + $page.params.room);

		if ($user) initialize({ accessToken: $user.token});

		const conversation = await joinConversation({ room: $page.params.room });
		if (conversation) goto('/' + $page.params.room);
		// else goto('/nuevo-juego');

	});
</script>

<h1>Me han invitado</h1>
<UserHeader />