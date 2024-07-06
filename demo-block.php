<?php
/**
 * Plugin Name:       Bestseller Block
 * Description:       Custom block to display the best-selling book in a selected genre.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           2.1.0
 * Author:            Abhyan Morkel
 * Author URI:        https://abhyan.pixentstudio.in/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       bestseller-block
 *
 * @package           bestseller-block
 */

function create_block_bestseller_block_init() {
    register_block_type(__DIR__ . '/build');
}
add_action('init', 'create_block_bestseller_block_init');

// function fetch_books_from_api() {
//     $response = wp_remote_get('https://freetestapi.com/api/v1/books');

//     if (is_wp_error($response)) {
//         return new WP_Error('api_error', 'Failed to fetch data', array('status' => 500));
//     }

//     $body = wp_remote_retrieve_body($response);
//     $data = json_decode($body, true);

//     return $data;
// }

// function register_books_api_endpoint() {
//     error_log('Registering books API endpoint'); // Debugging output

//     register_rest_route('bestseller/v1', '/books', array(
//         'methods' => 'GET',
//         'callback' => 'fetch_books_from_api',
//     ));
// }
// add_action('rest_api_init', 'register_books_api_endpoint');

?>