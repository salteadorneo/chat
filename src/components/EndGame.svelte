<script lang="ts">
    import Win from '../assets/Win.svg'
    import GameOver from '../assets/GameOver.svg'

    export let win = false
</script>

<section>
    {#if win}
        <img src={Win} alt="" />
        <h2>¡Has ganado!</h2>
    {:else}
        <img src={GameOver} alt="" />
        <h2>¡Eliminado!</h2>
    {/if}
</section>
<a href="/">Volver a sala de espera</a>

<style>
	section {
		display: grid;
		justify-items: center;
		width: 90%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	img {
        height: 35vh;
		margin: 0 0 20px;
	}

    p {
        margin: 0;
    }

    a {
        position: absolute;
        left: 50%;
        bottom: 30px;
        transform: translateX(-50%);
        text-decoration: none;
        border: 1px solid var(--primary);
        background: var(--background);
        appearance: none;
        border-radius: 12px;
        color: var(--primary);
        font-size: 10px;
        text-transform: uppercase;
        padding: 7px 28px;
    }
</style>