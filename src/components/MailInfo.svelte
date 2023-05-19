<script>
	import Button from "./Button.svelte";
	import { fade, fly } from "svelte/transition";

	let visible = true;

	export let selectedMail;
	let iconHeight = "2rem";
</script>

<div class="mail-info">
	{#if selectedMail && visible}
		<div class="mail-info__wrapper">
			<div class="mail-info__options">
				<div class="mail-info__date">
					{selectedMail.date}
				</div>
				<div class="mail-info__buttons">
					<Button {iconHeight} iconURL={"./assets/reply.svg"} />
					<Button {iconHeight} iconURL={"./assets/reply-all.svg"} />
					<Button {iconHeight} iconURL={"./assets/important.svg"} />
					<Button {iconHeight} iconURL={"./assets/archive.svg"} />
					<Button {iconHeight} iconURL={"./assets/spam.svg"} />
					<Button {iconHeight} iconURL={"./assets/bin.svg"} />
				</div>
			</div>
			<div class="mail-info__subject">
				{selectedMail.subject}
			</div>
			<div class="mail-info__body">
				{selectedMail.body}
			</div>
			<div class="mail-info__attachments" />
			<div class="mail-info__reply-box" />
			<div class="mail-info__reply-action" />
		</div>
	{:else}
		<div class="no-selection">
			<img
				class="no-selection__img"
				src="./assets/email-illustration.svg"
				alt="A man checking his mails"
			/>
		</div>
	{/if}
</div>

<style lang="scss">
	.mail-info {
		width: 100%;
		height: 100%;
		border-radius: 2rem 0 0 2rem;
		padding: 4rem;
		background-color: $color-white;

		&__options {
			transition: all ease-in 2s;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 3rem;
		}

		&__date {
			font-size: 1.6rem;
			letter-spacing: 0.1em;
		}

		&__buttons {
			display: flex;
			gap: 0.5rem;
		}

		&__subject {
			font-family: "Merriweather Sans", sans-serif;
			font-size: 2rem;
			margin-bottom: 3rem;
		}

		&__body {
			font-size: 1.6rem;
			line-height: 3.1rem;
			text-align: justify;
			padding-right: 14rem;
		}
	}

	.no-selection {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		// transition: all ease 2s;

		&__img {
			width: 60%;
			height: auto;
		}
	}
</style>
