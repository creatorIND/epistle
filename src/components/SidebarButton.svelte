<script>
	import { createEventDispatcher } from "svelte";
	import { Switch } from "@svelteuidev/core";
	export let iconURL;
	export let text;
	// export let id;
	// export let data = {
	// 	name: "",
	// 	iconURL: "",
	// 	id: "",
	// };
	export let hover = true;
	export let showToggle = false;
	export let isActive = false;

	const dispatch = createEventDispatcher();

	async function handleClick() {
		isActive = !isActive;
		dispatch("sidebar-button-click");
	}
</script>

<div
	class="sidebar-button"
	class:hover
	class:active={isActive}
	class:cursor-default={showToggle}
	on:click={handleClick}
>
	<div class="sidebar-button--icon">
		<img src={iconURL} alt="icon" />
	</div>
	<div class="sidebar-button--text" class:margin-right-auto={showToggle}>
		{text}
	</div>
	{#if showToggle}
		<Switch size="md" color="#02c39a" />
	{/if}
</div>

<style lang="scss">
	.sidebar-button {
		cursor: pointer;
		height: 4.5rem;
		border-radius: 1.5rem;
		display: flex;
		align-items: center;
		gap: 3rem;
		transition: all 0.2s ease-out;

		&--icon {
			margin-left: 2rem;
			img {
				height: 3rem;
			}
		}

		&--text {
			font-size: 1.6rem;
			font-weight: 500;
		}
	}

	.active {
		background-color: rgba($color-primary, 0.1);
		border-right: 2px solid $color-primary;
	}

	.hover:hover {
		background-color: $color-gray-light;
	}

	.margin-right-auto {
		margin-right: auto;
	}

	.cursor-default {
		cursor: default;
	}
</style>
