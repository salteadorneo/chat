<script lang="ts">
	import { goto } from '$app/navigation';

	import { activeConversation, user } from '../store';

	import { onMount } from 'svelte';

	import { createConversation, getConversations, initialize } from '../services/chat';

	import Loading from '../components/Loading.svelte'

	import questions from '../data/questions.json'

	onMount(async () => {
		const localUser = sessionStorage.user ? JSON.parse(sessionStorage.user) : {};
		user.set(localUser);
		
		if (!$user || $user?.token == null) return

		if ($user) initialize({ accessToken: $user.token});

		checkRoom()
	});

	async function checkRoom() {
		const paginator = await getConversations({});
		if (paginator && paginator.items[0]) {
			goto('/' + paginator.items[0].channelState.uniqueName)
		} else {
			setTimeout(checkRoom, 2000);
		}
	}

	async function handleCreateRoom(e: Event) {
		e.preventDefault()
		
		const newRoom = Math.random().toString(36).substring(2)
		const conversation = await createConversation({ 
			room: newRoom, 
			attributes: { 
				loading: true, 
				questions: [
					questions[Math.floor(Math.random() * questions.length)]
				] 
			} 
		});
		if (conversation) {
			activeConversation.set(conversation);
			goto(`/${newRoom}`)
		}
	}
</script>

<Loading />
<footer>
	<p>Esperando invitación...</p>
	<button on:click={handleCreateRoom}>Empezar nuevo juego</button>
</footer>

<style>
	footer {
		position: fixed;
		left: 0;
		bottom: 30px;
		width: 100%;
		text-align: center;
	}
</style>