<script lang="ts">
	import Hearts from '../assets/Hearts.svg';
	import Clubs from '../assets/Clubs.svg';
	import Spades from '../assets/Spades.svg';
	import Diamonds from '../assets/Diamonds.svg';
</script>

<div class="loading">
	<div class="spinner">
		<img src={Hearts} alt="" />
		<img src={Clubs} alt="" />
		<img src={Spades} alt="" />
		<img src={Diamonds} alt="" />
	</div>
</div>

<style>
	.loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		opacity: 0;
		animation: fadeIn .5s ease-in-out forwards;
	}

	.spinner {
		width: 60px;
	}

	.spinner img {
		margin: .5em 0;
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%, 100% { transform: scale(.9); }
		70% { transform: scale(1); }
	}
</style>