<script>
	import { createEventDispatcher } from "svelte";
	import ContextMenu from "./ContextMenu.svelte";
	const dispatch = createEventDispatcher();

	export let mail;
	export let isActive = false;

	let showContextMenu = false;
	let contextMenuXPos = 0;
	let contextMenuYPos = 0;
	let avatarText = mail.senderName.substring(0, 2).toUpperCase();

	function handleRightClick(event) {
		// event.preventDefault();
		showContextMenu = true;
		contextMenuXPos = event.clientX;
		contextMenuYPos = event.clientY;
		document.body.addEventListener("click", handleContextMenuClose);
	}

	function handleContextMenuClose() {
		showContextMenu = false;
		document.body.removeEventListener("click", handleContextMenuClose);
	}

	function handleClick() {
		isActive = !isActive;
		dispatch("mail-item-click");
	}
</script>

<div
	on:contextmenu|stopPropagation={handleRightClick}
	class="mail-item"
	class:active={isActive}
	on:click={handleClick}
>
	<div class="mail-item__avatar">
		{avatarText}
	</div>
	<div class="mail-item__details">
		<div class="mail-item__header">
			<div class="mail-item__sender-name">{mail.senderName}</div>
			<div class="mail-item__icons">
				<div class="mail-item__icons--important">
					<img
						src={mail.isImportant
							? "./assets/important.svg"
							: "./assets/not-important.svg"}
						alt=""
					/>
				</div>
				{#if mail.hasAttachment}
					<div class="mail-item__icons--attachment">
						<img src="./assets/attachment.svg" alt="" />
					</div>
				{/if}
			</div>
			<div class="mail-item__date">{mail.date.substring(0, 6)}</div>
		</div>
		<div class="mail-item__subject">
			{mail.subject.substring(0, 35) + "..."}
		</div>
		<div class="mail-item__body">
			{mail.body.substring(0, 40) + "..."}
		</div>
	</div>
</div>
{#if showContextMenu}
	<ContextMenu xPos={contextMenuXPos} yPos={contextMenuYPos} />
{/if}

<style lang="scss">
	.mail-item {
		cursor: pointer;
		border-radius: 2rem;
		padding: 2rem;
		height: 12rem;
		width: 97%;
		display: flex;
		align-items: center;
		transition: box-shadow, background-color ease-in-out 100ms;

		&:hover {
			background-color: $color-white;
		}

		&__avatar {
			height: 60%;
			aspect-ratio: 1/1;
			background-color: $color-primary-light;
			border-radius: 5rem;
			display: flex;
			align-items: center;
			justify-content: center;
			color: $color-secondary-2;
			font-size: 1.5rem;
		}

		&__details {
			margin-left: 2rem;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			flex-basis: 100%;
		}

		&__header {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			width: auto;
		}

		&__sender-name {
			font-size: 1.6rem;
			font-weight: 500;
		}

		&__icons {
			margin-left: 1rem;
			display: flex;
			gap: 1rem;
			align-items: center;

			img {
				height: 2.2rem;
			}
		}

		&__date {
			font-size: 1.3rem;
			letter-spacing: 0.1em;
			margin-left: auto;
		}

		&__subject {
			font-size: 1.4rem;
			font-weight: 500;
		}

		&__body {
			font-size: 1.3rem;
		}
	}

	.active {
		background-color: $color-white;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.13);
	}
</style>
