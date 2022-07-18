<script lang="ts">
	import { updateAttrConversation } from '../services/chat';

	import { activeConversation, user } from '../store';
	
	import Participant from '../components/Participant.svelte';
	
	const pendingInvitations = () => {
		if ($activeConversation.attributes.invitations) {
			$activeConversation.attributes.invitations.forEach(invitation => {
				if (![...$activeConversation.participants].includes(invitation)) {
					try {
						$activeConversation.add(invitation)
					} catch (e) {
						console.log(e)
					}
				}
			})
		}
	}
	let intervalInvitations
	$: {
		clearInterval(intervalInvitations)
		intervalInvitations = setInterval(pendingInvitations, 4000)
	}
	
	let participant = ''
	async function handleAddParticipant(e) {
		e.preventDefault();
		let participant2 = participant.toLowerCase().trim()
		participant2 += '-' + $activeConversation.uniqueName
		if (!participant2 || participant2 == '' || participant2 == $user?.name) return
		try {
			await $activeConversation.add(participant2)
		} catch (e) {
			const invitations = $activeConversation.attributes.invitations || []
			let conversation = await updateAttrConversation({ 
				room: $activeConversation.uniqueName, 
				params: {
					...$activeConversation.attributes,
					invitations: invitations.concat([participant2])
				}
			});
			if (conversation) activeConversation.set(conversation);
		}
		participant = ''
	}
</script>

<section>
	<h3>Jugadores (4 máx.)</h3>
	<p>Envía enlaces privados a cada jugador</p>

	{#each Array.from($activeConversation.participants) as participant, i}
		<Participant participant={participant[1].identity} />
	{/each}
	{#each ($activeConversation.attributes.invitations || []) as participant, i}
		<Participant participant={participant} invite />
	{/each}

	{#if ($activeConversation.participants.size + ($activeConversation.attributes.invitations||[]).length) <= 3}
		<form on:submit={handleAddParticipant}>
			<button>+</button>
			<input type="text" placeholder="Introduce nombre de nuevo jugador" bind:value={participant} />
		</form>
	{/if}
</section>

<style>
	section {
		height: 100%;
		margin: 0 0 40px;
	}

	h3 {
		margin: 0 0 1em;
	}

	p {
		font-size: 12px;
		width: 100%;
		margin: 0 0 2em;
	}

	form {
		display: flex;
		align-items: center;
		width: 100%;
	}
	input[type=text] {
		width: 70%;
		background: transparent;
		appearance: none;
		border: none;
		outline: none;
		color: #f7f7f7;
		padding: 8px 10px;
	}
	input[type=text]:not(:placeholder-shown) {
		text-transform: lowercase;
	}
	form button {
		border-radius: 50%;
		padding: 0;
		width: 28px;
		line-height: 26px;
		font-size: 20px;
	}
</style>