<script lang="ts">
	import { updateAttrConversation } from '../services/chat';

	import { activeConversation, user } from '../store';

	import Hearts from '../assets/Hearts.svg';
	import Spades from '../assets/Spades.svg';
	import Clubs from '../assets/Clubs.svg';
	import Diamonds from '../assets/Diamonds.svg';

	const ICONS = [Hearts, Spades, Clubs, Diamonds];

	import Clipboard from '../assets/Clipboard.svg';
	import Share from '../assets/Share.svg';

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
		if (!participant || participant == '' || participant == $user?.name) return
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

	let copied = false
	function handleCopyLink(participant) {
		const url = `${window.location.origin}/inv/${$activeConversation.uniqueName}/${participant}`;
		navigator.clipboard.writeText(url);
		copied = participant
		setTimeout(() => {
			copied = false
		}, 3000);
	}

	function handleShareLink(participant) {
		const url = `${window.location.origin}/inv/${$activeConversation.uniqueName}/${participant}`;
		window.open(`https://api.whatsapp.com/send?text=${url}`)
	}
</script>

<section>
	<h3>Jugadores (4 máx.)</h3>
	<p>Envía enlaces privados a cada jugador</p>

	{#each Array.from($activeConversation.participants) as participant, i}
		<div class="participant">
			<span><img src={ICONS[i]} alt="" /></span>
			{participant[1].identity}
			{#if createdBy != participant[1].identity}
				<div class="actions">
					<button on:click={() => handleCopyLink(participant[1].identity)}>
						<img src={Clipboard} alt="Copy" /> {copied == participant[1].identity ? 'Copiado' : 'Copiar'}
					</button>
					<button on:click={() => handleShareLink(participant[1].identity)}>
						<img src={Share} alt="Share" /> Compartir
					</button>
				</div>
			{/if}
		</div>
	{/each}
	{#each $activeConversation.attributes.invitations||[] as participant, i}
		<div class="participant noregister">
			<span><img src={ICONS[i]} alt="" /></span>
			{participant}
			<div class="actions">
				<button on:click={() => handleCopyLink(participant)}>
					<img src={Clipboard} alt="Copy" /> {copied == participant ? 'Copiado' : 'Copiar'}
				</button>
				<button on:click={() => handleShareLink(participant)}>
					<img src={Share} alt="Share" /> Compartir
				</button>
			</div>
		</div>
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
	.participant .actions button {
		/* display: inline-flex;
		justify-content: center;
		align-items: center; */
		padding: 0 10px;
		/* width: 22px; */
		height: 22px;
		background: var(--primary);
		color: #f7f7f7;
		margin: 0 0 0 5px;
	}
	.participant .actions button img {
		height: 14px;
		vertical-align: middle;
	}

	.noregister span {
		opacity: .5;
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