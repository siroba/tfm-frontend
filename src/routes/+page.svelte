<script lang="ts">
	import '../app.scss';
	import { t } from '$lib/i18n';
</script>

<div class="container-fluid min-vh-100 d-flex flex-column">
	<!-- Hero Section -->
	<main class="flex-grow-1 d-flex align-items-center">
		<div class="container">
			<div class="row align-items-center g-5">
				<div class="col-lg-6">
					<div class="hero-content">
						<h2 class="display-3 fw-bold mb-4 lh-1 subtitle-chocolate">
							{$t('main-page-subtitle')}
						</h2>
						<p class="lead text-white-75 mb-4 fs-5">
							{$t('main-page-text')}
						</p>
						<a
							href="upload"
							class="btn btn-light btn-lg px-4 py-3 fw-semibold text-primary d-inline-flex align-items-center shadow-lg hover-lift"
						>
							{$t('main-page-button')}
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								class="ms-2"
							>
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
						</a>
					</div>
				</div>

				<div class="col-lg-6">
					<div class="d-flex justify-content-center">
						<div class="card shadow-lg border-0 floating-card" style="max-width: 400px;">
							<div class="card-header bg-light border-bottom">
								<div class="d-flex gap-2">
									<div class="rounded-circle bg-danger" style="width: 12px; height: 12px;"></div>
									<div class="rounded-circle bg-warning" style="width: 12px; height: 12px;"></div>
									<div class="rounded-circle bg-success" style="width: 12px; height: 12px;"></div>
								</div>
							</div>
							<div class="card-body">
								<div class="chat-bubble user-bubble bg-primary text-white p-3 rounded-3 mb-3 ms-4">
									<small>{$t('chat-question')}</small>
								</div>
								<div class="chat-bubble ai-bubble bg-light text-dark p-3 rounded-3 me-4">
									<small>{$t('chat-answer')}</small>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>

<style>
	.subtitle-chocolate {
		color: chocolate;
	}
</style>
