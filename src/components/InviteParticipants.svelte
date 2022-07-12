<script lang="ts">
	import { removeParticipantConversation, updateAttrConversation } from '../services/chat';

	import { activeConversation } from '../store';

	import Hearts from '../assets/Hearts.svg';
	import Spades from '../assets/Spades.svg';
	import Clubs from '../assets/Clubs.svg';
	import Diamonds from '../assets/Diamonds.svg';

	const ICONS = [Hearts, Spades, Clubs, Diamonds];

	let participant = ''

	async function handleAddParticipant(e) {
		e.preventDefault();
		participant = participant.trim()
		if (!participant || participant == '') return
		try {
			await $activeConversation.add(participant)
		} catch (e) {
			let conversation = await updateAttrConversation({ 
				room: $activeConversation.uniqueName, 
				params: {
					loading: true,
					invitations: ($activeConversation.attributes.invitations||[]).concat([participant])
				}
			});
			if (conversation) activeConversation.set(conversation);
		}
		participant = ''
	}

	async function handleRemoveParticipant(participant) {
		await removeParticipantConversation({ room: $activeConversation.uniqueName, participant: participant });
	}

	function handleShareLink(participant) {
		const url = `${window.location.origin}/inv/${$activeConversation.uniqueName}/${participant}`;
		navigator.clipboard.writeText(url);
	}
</script>

<div>
	<h3>Jugadores</h3>

	{#each [...$activeConversation.participants] as participant, i}
		<div class="participant"><span><img src={ICONS[i]} alt="" /></span> {participant[1].identity} <div class="actions"><button on:click={() => handleShareLink(participant[1].identity)}>S</button><button on:click={() => handleRemoveParticipant(participant[0])}>E</button></div></div>
	{/each}
	{#each $activeConversation.attributes.invitations||[] as participant, i}
		<div class="participant"><span><img src={ICONS[i]} alt="" /></span> {participant} <div class="actions"><button on:click={() => handleShareLink(participant)}>S</button></div></div>
	{/each}

	<form on:submit={handleAddParticipant}>
		<input type="text" placeholder="Añadir jugador" bind:value={participant} autofocus />
		<button>+</button>
	</form>
</div>

<style>
	.participant {
		display: flex;
		align-items: center;
		margin: 0 0 15px;
	}
	.participant span {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		border: 1px solid var(--primary);
		margin: 0 10px 0 0;
	}
	.participant span img {
		max-height: 50%;
	}
	.participant .actions {
		margin-left: auto;
	}
	.participant button {
		padding: 0;
		width: 22px;
		height: 22px;
		background: var(--primary);
		color: #f7f7f7;
	}

	form {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		width: 100%;
	}
	input[type=text] {
		width: 70%;
		background: transparent;
		appearance: none;
		border: none;
		border-bottom: 1px solid var(--primary);
		outline: none;
		color: var(--primary);
		padding: 8px 10px;
	}
	form button {
		border-radius: 50%;
		padding: 2px 0 0;
		width: 30px;
		line-height: 26px;
		font-size: 20px;
	}
</style>