<script lang="ts">
	import RoomSelect from '../components/RoomSelect.svelte';
	import UserHeader from '../components/UserHeader.svelte';

	import { user } from '../store';
</script>

<h1>Quiero ser anfitrión</h1>
<UserHeader />
{#if $user}<RoomSelect />{/if}