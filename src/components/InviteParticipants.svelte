<script lang="ts">
	import { removeParticipantConversation, updateAttrConversation } from '../services/chat';

	import { activeConversation } from '../store';

	import Hearts from '../assets/Hearts.svg';
	import Spades from '../assets/Spades.svg';
	import Clubs from '../assets/Clubs.svg';
	import Diamonds from '../assets/Diamonds.svg';

	const ICONS = [Hearts, Spades, Clubs, Diamonds];

	const createdBy = $activeConversation.createdBy

	let participant = ''

	const pendingInvitations = () => {
		if ($activeConversation.attributes.invitations) {
			$activeConversation.attributes.invitations.forEach(invitation => {
				if (![...$activeConversation.participants].includes(invitation)) {
					try {
						$activeConversation.add(invitation)
					} catch (e) {
						// console.log(e)
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

	async function handleAddParticipant(e) {
		e.preventDefault();
		participant = participant.toLowerCase().trim()
		if (!participant || participant == '') return
		try {
			await $activeConversation.add(participant)
		} catch (e) {
			const invitations = $activeConversation.attributes.invitations || []
			let conversation = await updateAttrConversation({ 
				room: $activeConversation.uniqueName, 
				params: {
					...$activeConversation.attributes,
					invitations: invitations.concat([participant])
				}
			});
			if (conversation) activeConversation.set(conversation);
		}
		participant = ''
	}

	async function handleRemoveParticipant(participant) {
		await removeParticipantConversation({ room: $activeConversation.uniqueName, participant: participant });
	}

	async function handleRemoveInvitate(participant) {
		const invitations = $activeConversation.attributes.invitations || []
		let conversation = await updateAttrConversation({ 
			room: $activeConversation.uniqueName, 
			params: {
				...$activeConversation.attributes,
				invitations: invitations.filter(p => p != participant)
			}
		});
		if (conversation) activeConversation.set(conversation);
	}

	function handleShareLink(participant) {
		const url = `${window.location.origin}/inv/${$activeConversation.uniqueName}/${participant}`;
		navigator.clipboard.writeText(url);
	}
</script>

<div>
	<h3>Jugadores</h3>

	{#each [...$activeConversation.participants] as participant, i}
		<div class="participant"><span><img src={ICONS[Math.floor(Math.random() * ICONS.length)]} alt="" /></span> {participant[1].identity} {#if createdBy != participant[1].identity}<div class="actions"><button on:click={() => handleShareLink(participant[1].identity)}>S</button><button on:click={() => handleRemoveParticipant(participant[0])}>E</button></div>{/if}</div>
	{/each}
	{#each $activeConversation.attributes.invitations||[] as participant, i}
		<div class="participant noregister"><span><img src={ICONS[Math.floor(Math.random() * ICONS.length)]} alt="" /></span> {participant}<div class="actions"><button on:click={() => handleShareLink(participant)}>S</button><button on:click={() => handleRemoveInvitate(participant)}>E</button></div></div>
	{/each}

	<form on:submit={handleAddParticipant}>
		<button>+</button>
		<input type="text" placeholder="Añadir jugador" bind:value={participant} />
	</form>
</div>

<style>
	.participant {
		display: flex;
		align-items: center;
		margin: 0 0 10px;
	}
	.participant span {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
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
		margin: 0 0 0 5px;
	}

	.noregister span {
		opacity: .5;
	}

	form {
		display: flex;
		align-items: center;
		/* justify-content: space-evenly; */
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
	form button {
		border-radius: 50%;
		padding: 2px 0 0;
		width: 28px;
		line-height: 24px;
		font-size: 20px;
	}
</style>