<script lang="ts">
	import { onMount } from 'svelte';

	import UserHeader from '../../components/UserHeader.svelte';
	
	import { page } from '$app/stores';

	import { getConversation, initialize, joinConversation } from '../../services/chat';
	import { user } from '../../store';
	import { goto } from '$app/navigation';

	onMount(async () => {
		const localUser = localStorage.user ? JSON.parse(localStorage.user) : {};
		console.log(localUser)
		user.set(localUser)
		
		if (!$user || $user?.token == null) goto('/?ref=' + $page.params.room);

		if ($user) initialize({ accessToken: $user.token});

		try {
			const conversation = await getConversation({ room: $page.params.room });
			if (conversation) goto('/' + conversation.channelState.uniqueName);
			else getConversationTimeout()
		} catch (e) {
			console.log(e)
		}
		// else goto('/nuevo-juego');

	});

	async function getConversationTimeout() {
		return setTimeout(async () => {
			const conversation = await getConversation({ room: $page.params.room });
			if (conversation) goto('/' + conversation.channelState.uniqueName);
			else getConversationTimeout()
		}, 2000);
	}
</script>

<h1>Me han invitado</h1>
{#if !user}<UserHeader />{/if}