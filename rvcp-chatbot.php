<?php
/**
 * Plugin Name: RVCP Chatbot
 * Description: Premium conversational chatbot for RV College of Physiotherapy, helping visitors inquire about admissions, HOD directories, hostel fees, and programs. Includes a configuration settings dashboard.
 * Version: 1.0.0
 * Author: RVCP Developer
 * License: GPL-2.0+
 * Text Domain: rvcp-chatbot
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define Constants
define( 'RVCP_CHATBOT_VERSION', '1.0.0' );
define( 'RVCP_CHATBOT_DIR_PATH', plugin_dir_path( __FILE__ ) );
define( 'RVCP_CHATBOT_DIR_URL', plugin_dir_url( __FILE__ ) );

/**
 * Register Settings Page in WordPress Admin Dashboard
 */
function rvcp_chatbot_add_admin_menu() {
	add_menu_page(
		__( 'RVCP Chatbot Settings', 'rvcp-chatbot' ),
		__( 'RVCP Chatbot', 'rvcp-chatbot' ),
		'manage_options',
		'rvcp-chatbot',
		'rvcp_chatbot_settings_page',
		'dashicons-format-chat',
		100
	);

	add_submenu_page(
		'rvcp-chatbot',
		__( 'Settings', 'rvcp-chatbot' ),
		__( 'Settings', 'rvcp-chatbot' ),
		'manage_options',
		'rvcp-chatbot',
		'rvcp_chatbot_settings_page'
	);

	add_submenu_page(
		'rvcp-chatbot',
		__( 'Analytics Dashboard', 'rvcp-chatbot' ),
		__( '📊 Analytics Dashboard', 'rvcp-chatbot' ),
		'manage_options',
		'rvcp-chatbot-dashboard',
		'rvcp_chatbot_dashboard_page'
	);
}
add_action( 'admin_menu', 'rvcp_chatbot_add_admin_menu' );

/**
 * Register settings and sanitization
 */
function rvcp_chatbot_register_settings() {
	register_setting( 'rvcp_chatbot_options_group', 'rvcp_chatbot_enabled', 'sanitize_text_field' );
	register_setting( 'rvcp_chatbot_options_group', 'rvcp_chatbot_title', 'sanitize_text_field' );
	register_setting( 'rvcp_chatbot_options_group', 'rvcp_chatbot_status_text', 'sanitize_text_field' );
	register_setting( 'rvcp_chatbot_options_group', 'rvcp_chatbot_welcome_text', 'sanitize_textarea_field' );
	register_setting( 'rvcp_chatbot_options_group', 'rvcp_chatbot_sheets_url', 'esc_url_raw' );
	register_setting( 'rvcp_chatbot_options_group', 'rvcp_chatbot_vercel_url', 'esc_url_raw' );
	register_setting( 'rvcp_chatbot_options_group', 'rvcp_chatbot_logo_url', 'esc_url_raw' );
}
add_action( 'admin_init', 'rvcp_chatbot_register_settings' );

/**
 * Settings Page HTML Rendering
 */
function rvcp_chatbot_settings_page() {
	?>
	<div class="wrap">
		<h1><?php echo esc_html( __( 'RVCP Chatbot Settings Dashboard', 'rvcp-chatbot' ) ); ?></h1>
		<p><?php echo esc_html( __( 'Manage and customize your RV College of Physiotherapy Chatbot frontend display, behaviors, and integrations.', 'rvcp-chatbot' ) ); ?></p>
		
		<hr />

		<form method="post" action="options.php" style="max-width: 800px; background: #ffffff; padding: 25px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 20px;">
			<?php settings_fields( 'rvcp_chatbot_options_group' ); ?>
			<?php do_settings_sections( 'rvcp_chatbot_options_group' ); ?>

			<table class="form-table" style="width: 100%;">
				
				<!-- Enabled / Disabled Option -->
				<tr valign="top">
					<th scope="row" style="width: 200px; font-weight: bold;"><?php _e( 'Enable Chatbot', 'rvcp-chatbot' ); ?></th>
					<td>
						<label class="switch">
							<input type="checkbox" name="rvcp_chatbot_enabled" value="1" <?php checked( '1', get_option( 'rvcp_chatbot_enabled', '1' ) ); ?> />
							<span><?php _e( 'Display the chatbot on the website frontend.', 'rvcp-chatbot' ); ?></span>
						</label>
					</td>
				</tr>

				<!-- Chatbot Header Title -->
				<tr valign="top">
					<th scope="row" style="font-weight: bold;"><?php _e( 'Chatbot Header Title', 'rvcp-chatbot' ); ?></th>
					<td>
						<input type="text" name="rvcp_chatbot_title" value="<?php echo esc_attr( get_option( 'rvcp_chatbot_title', 'RV College of Physiotherapy' ) ); ?>" class="regular-text" style="width: 100%; max-width: 450px;" required />
						<p class="description"><?php _e( 'Header title shown at the top of the chatbot container.', 'rvcp-chatbot' ); ?></p>
					</td>
				</tr>

				<!-- Chatbot Status Text -->
				<tr valign="top">
					<th scope="row" style="font-weight: bold;"><?php _e( 'Status Message', 'rvcp-chatbot' ); ?></th>
					<td>
						<input type="text" name="rvcp_chatbot_status_text" value="<?php echo esc_attr( get_option( 'rvcp_chatbot_status_text', 'Online — Ready to help' ) ); ?>" class="regular-text" style="width: 100%; max-width: 450px;" required />
						<p class="description"><?php _e( 'Sub-heading status text under the title (e.g., Online — Ready to help).', 'rvcp-chatbot' ); ?></p>
					</td>
				</tr>

				<!-- Welcome Tooltip Text -->
				<tr valign="top">
					<th scope="row" style="font-weight: bold;"><?php _e( 'Welcome Prompt Text', 'rvcp-chatbot' ); ?></th>
					<td>
						<textarea name="rvcp_chatbot_welcome_text" rows="3" class="large-text" style="width: 100%; max-width: 450px;" required><?php echo esc_textarea( get_option( 'rvcp_chatbot_welcome_text', 'Hi there! Need help with admissions at RVCP? Chat with us!' ) ); ?></textarea>
						<p class="description"><?php _e( 'The tooltip teaser message displayed above the toggle launcher button.', 'rvcp-chatbot' ); ?></p>
					</td>
				</tr>

				<!-- Google Sheets API URL -->
				<tr valign="top">
					<th scope="row" style="font-weight: bold;"><?php _e( 'Google Sheets Web App URL', 'rvcp-chatbot' ); ?></th>
					<td>
						<input type="url" name="rvcp_chatbot_sheets_url" value="<?php echo esc_url( get_option( 'rvcp_chatbot_sheets_url', '' ) ); ?>" class="regular-text" style="width: 100%; max-width: 450px;" />
						<p class="description"><?php _e( 'Optional Google Apps Script endpoint URL where lead form submissions are forwarded.', 'rvcp-chatbot' ); ?></p>
					</td>
				</tr>

				<!-- Backend Tracking / Vercel API URL -->
				<tr valign="top">
					<th scope="row" style="font-weight: bold;"><?php _e( 'Tracking Backend / Vercel URL', 'rvcp-chatbot' ); ?></th>
					<td>
						<input type="url" name="rvcp_chatbot_vercel_url" value="<?php echo esc_url( get_option( 'rvcp_chatbot_vercel_url', '' ) ); ?>" class="regular-text" style="width: 100%; max-width: 450px;" placeholder="e.g. https://your-rvcp-dashboard.vercel.app" />
						<p class="description"><?php _e( 'Backend URL for telemetry and lead tracking dashboard (without trailing /api).', 'rvcp-chatbot' ); ?></p>
					</td>
				</tr>

				<!-- Custom Logo URL -->
				<tr valign="top">
					<th scope="row" style="font-weight: bold;"><?php _e( 'Custom Logo Image URL', 'rvcp-chatbot' ); ?></th>
					<td>
						<input type="url" name="rvcp_chatbot_logo_url" id="rvcp_chatbot_logo_url" value="<?php echo esc_url( get_option( 'rvcp_chatbot_logo_url', RVCP_CHATBOT_DIR_URL . 'logo.png' ) ); ?>" class="regular-text" style="width: 100%; max-width: 450px;" />
						<p class="description"><?php _e( 'URL of the logo image shown inside the chatbot header and bot messages. Leave default to use RVEI Logo.', 'rvcp-chatbot' ); ?></p>
					</td>
				</tr>

			</table>

			<?php submit_button( __( 'Save Chatbot Settings', 'rvcp-chatbot' ), 'primary', 'submit', true, array( 'style' => 'margin-top: 20px;' ) ); ?>
		</form>
	</div>
	<?php
}

/**
 * Analytics Dashboard Page HTML Rendering in WP Admin
 */
function rvcp_chatbot_dashboard_page() {
	$vercel_url = esc_url( get_option( 'rvcp_chatbot_vercel_url', '' ) );
	$dash_target = !empty( $vercel_url ) ? untrailingslashit( $vercel_url ) . '/dashboard' : 'http://localhost:3000/dashboard';
	?>
	<div class="wrap" style="max-width: 1400px; margin-top: 15px;">
		<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px;">
			<div>
				<h1 style="margin-bottom: 4px;"><?php echo esc_html( __( 'RVCP Chatbot Analytics & Tracking Dashboard', 'rvcp-chatbot' ) ); ?></h1>
				<p style="color: #64748b; margin: 0;"><?php _e( 'End-to-end tracking for visitor sessions, candidate interactions, admission leads, and conversion analytics.', 'rvcp-chatbot' ); ?></p>
			</div>
			<div>
				<a href="<?php echo esc_url( $dash_target ); ?>" target="_blank" class="button button-primary" style="height: 38px; line-height: 36px; padding: 0 16px;">
					<?php _e( '🚀 Open Full Command Center ↗', 'rvcp-chatbot' ); ?>
				</a>
			</div>
		</div>

		<div style="background: #030712; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2); border: 1px solid #1f2937;">
			<iframe 
				src="<?php echo esc_url( $dash_target ); ?>" 
				style="width: 100%; height: 820px; border: none; display: block;" 
				title="<?php esc_attr_e( 'RVCP Dashboard Frame', 'rvcp-chatbot' ); ?>">
			</iframe>
		</div>
	</div>
	<?php
}

/**
 * Enqueue styles and scripts for the frontend site
 */
function rvcp_chatbot_enqueue_assets() {
	// Only load if the chatbot is enabled
	if ( get_option( 'rvcp_chatbot_enabled', '1' ) !== '1' ) {
		return;
	}

	// Enqueue main stylesheet
	wp_enqueue_style(
		'rvcp-chatbot-style',
		RVCP_CHATBOT_DIR_URL . 'style.css',
		array(),
		RVCP_CHATBOT_VERSION
	);

	// Enqueue Chatbot Data (KB definitions)
	wp_enqueue_script(
		'rvcp-chatbot-data',
		RVCP_CHATBOT_DIR_URL . 'chatbot-data.js',
		array(),
		RVCP_CHATBOT_VERSION,
		true
	);

	// Enqueue Chatbot Core Engine
	wp_enqueue_script(
		'rvcp-chatbot-script',
		RVCP_CHATBOT_DIR_URL . 'script.js',
		array( 'rvcp-chatbot-data' ),
		RVCP_CHATBOT_VERSION,
		true
	);

	// Localize script to pass WordPress admin values to frontend Javascript
	wp_localize_script(
		'rvcp-chatbot-script',
		'rvcpChatbotSettings',
		array(
			'logoUrl'         => esc_url( get_option( 'rvcp_chatbot_logo_url', RVCP_CHATBOT_DIR_URL . 'logo.png' ) ),
			'title'           => esc_html( get_option( 'rvcp_chatbot_title', 'RV College of Physiotherapy' ) ),
			'statusText'      => esc_html( get_option( 'rvcp_chatbot_status_text', 'Online — Ready to help' ) ),
			'welcomeText'     => esc_html( get_option( 'rvcp_chatbot_welcome_text', 'Hi there! Need help with admissions at RVCP? Chat with us!' ) ),
			'googleSheetsUrl' => esc_url_raw( get_option( 'rvcp_chatbot_sheets_url', '' ) ),
			'vercelUrl'       => esc_url_raw( get_option( 'rvcp_chatbot_vercel_url', '' ) )
		)
	);
}
add_action( 'wp_enqueue_scripts', 'rvcp_chatbot_enqueue_assets' );

/**
 * Inject Chatbot Markup into the Page Footer
 */
function rvcp_chatbot_render_footer_html() {
	// Only render if enabled
	if ( get_option( 'rvcp_chatbot_enabled', '1' ) !== '1' ) {
		return;
	}

	$logo_url    = esc_url( get_option( 'rvcp_chatbot_logo_url', RVCP_CHATBOT_DIR_URL . 'logo.png' ) );
	$title       = esc_html( get_option( 'rvcp_chatbot_title', 'RV College of Physiotherapy' ) );
	$status_text = esc_html( get_option( 'rvcp_chatbot_status_text', 'Online — Ready to help' ) );
	$welcome     = esc_html( get_option( 'rvcp_chatbot_welcome_text', 'Hi there! Need help with admissions at RVCP? Chat with us!' ) );
	?>
	<!-- Welcome Prompt Tooltip -->
	<div class="welcome-prompt hidden" id="welcomePrompt" role="alert">
		<div class="welcome-prompt-avatar" aria-hidden="true">👋</div>
		<div class="welcome-prompt-text">
			<strong><?php _e( 'Hi there!', 'rvcp-chatbot' ); ?></strong> <?php echo $welcome; ?>
		</div>
		<button class="welcome-prompt-close" id="welcomePromptClose" aria-label="<?php esc_attr_e( 'Dismiss prompt', 'rvcp-chatbot' ); ?>" type="button">✕</button>
	</div>

	<!-- Chat Toggle Button -->
	<button class="chat-toggle" id="chatToggle" aria-label="<?php esc_attr_e( 'Open chat', 'rvcp-chatbot' ); ?>" type="button">
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
		</svg>
		<span class="badge" aria-hidden="true">1</span>
	</button>

	<!-- Chat Window -->
	<div class="chat-container" id="chatContainer" role="dialog" aria-label="<?php esc_attr_e( 'RVCP Chatbot', 'rvcp-chatbot' ); ?>">

		<!-- Header -->
		<header class="chat-header">
			<div class="chat-logo" aria-hidden="true">
				<img src="<?php echo $logo_url; ?>" alt="<?php echo esc_attr( $title ); ?> Logo" style="width: 100%; height: 100%; object-fit: contain;">
			</div>
			<div class="chat-header-info">
				<div class="chat-header-title"><?php echo $title; ?></div>
				<div class="chat-header-status">
					<span class="status-dot" aria-hidden="true"></span>
					<?php echo $status_text; ?>
				</div>
			</div>
			<button class="chat-clear-btn" id="chatClearBtn" aria-label="<?php esc_attr_e( 'Clear chat', 'rvcp-chatbot' ); ?>" type="button" title="<?php esc_attr_e( 'Clear chat', 'rvcp-chatbot' ); ?>">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
			</button>
			<button class="chat-close-btn" id="chatCloseBtn" aria-label="<?php esc_attr_e( 'Close chat', 'rvcp-chatbot' ); ?>" type="button">✕</button>
		</header>

		<!-- Messages -->
		<div class="chat-messages" id="chatMessages" role="log" aria-live="polite" aria-label="<?php esc_attr_e( 'Chat messages', 'rvcp-chatbot' ); ?>">
			<!-- Messages will be dynamically inserted here -->
		</div>

		<!-- Input Area -->
		<div class="chat-input-area">
			<input
				type="text"
				class="chat-input"
				id="chatInput"
				placeholder="<?php esc_attr_e( 'Type a message or click a button...', 'rvcp-chatbot' ); ?>"
				autocomplete="off"
				aria-label="<?php esc_attr_e( 'Type your message', 'rvcp-chatbot' ); ?>"
			>
			<button class="chat-send-btn" id="chatSendBtn" aria-label="<?php esc_attr_e( 'Send message', 'rvcp-chatbot' ); ?>" type="button">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<line x1="22" y1="2" x2="11" y2="13"></line>
					<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
				</svg>
			</button>
		</div>

	</div>
	<?php
}
add_action( 'wp_footer', 'rvcp_chatbot_render_footer_html' );
