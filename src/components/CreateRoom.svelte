<script lang="ts">
	import { goto } from '$app/navigation';

	import { initialize, createConversation } from '../services/chat';
	import { activeConversation, user } from '../store';
	
	let room = Math.random().toString(36).substring(2)

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		if (!$user || $user?.token == null) return;

		initialize({ accessToken: $user.token });

		const conversation = await createConversation({ room });
		if (conversation) {
			activeConversation.set(conversation);
			goto(`/${room}`);
		}
	}
</script>

<div class="flex flex-col max-w-md mx-auto mt-10">
	<form on:submit={handleSubmit}>
		<button
			type="submit"
			class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mt-2"
			>Empezar nuevo juego</button
		>
	</form>
</div>
