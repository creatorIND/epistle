<div class="loader-wrapper">
	<div class="loader" />
</div>

<style lang="scss">
	.loader-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		// background-color: rgba(
		// 	0,
		// 	0,
		// 	0,
		// 	0.6
		// ); /* Adjust the overlay color and transparency */
		// backdrop-filter: blur(10px);
		z-index: 9999; /* Optional: Adjust the z-index as needed */
	}
	.loader {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		display: inline-block;
		border-top: 4px solid $color-primary;
		border-right: 4px solid transparent;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}
	.loader::after {
		content: "";
		box-sizing: border-box;
		position: absolute;
		left: 0;
		top: 0;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		border-left: 4px solid $color-black;
		border-bottom: 4px solid transparent;
		animation: rotation 0.5s linear infinite reverse;
	}
	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
