<script>
	import { onMount } from "svelte";
	import { blur, draw, slide } from "svelte/transition";

	export let xPos = 0;
	export let yPos = 0;
	// export let menuItems = [];

	function handleClick() {}

	// onMount(() => {
	// 	function handleOutsideClick(event) {
	// 		const contextMenu = document.querySelector(".context-menu");
	// 		if (contextMenu && !contextMenu.contains(event.target)) {
	// 			dispatchEvent(new CustomEvent("clickOutside"));
	// 		}
	// 	}

	// 	window.addEventListener("click", handleOutsideClick);

	// 	return () => {
	// 		window.removeEventListener("click", handleOutsideClick);
	// 	};
	// });
</script>

<div
	transition:slide
	style="top: {yPos}px; left: {xPos}px;"
	on:click={handleClick}
	class="context-menu"
>
	<ul class="context-menu__list">
		<!-- {#each menuItems as menuItem}
        <li class="context-menu__item">{menuItem}</li>
        {/each} -->
		<li class="context-menu__item">Mark as Read</li>
		<li class="context-menu__item">Mark as Important</li>
		<li class="context-menu__item">Archive</li>
		<li class="context-menu__item">Report Spam</li>
		<li class="context-menu__item">Move to Bin</li>
	</ul>
</div>

<style lang="scss">
	.context-menu {
		position: absolute;
		z-index: 100;
		background-color: $color-white;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.13);
		border-bottom: 2px solid rgba($color-primary, 0.5);
		border-radius: 2rem;

		&__list {
			width: 100%;
			height: 100%;
			padding: 2rem 0;
			list-style: none;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
		}

		&__item {
			width: 100%;
			padding: 1rem 2rem;
			font-size: 1.6rem;
			letter-spacing: 0.02em;
			cursor: pointer;

			&:hover {
				background-color: $color-gray-light;
			}
		}
	}
</style>
