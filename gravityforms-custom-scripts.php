<?php
/**
 * Plugin Name: Gravity Forms Custom Scripts
 * Description: Adds custom JavaScript and Salesforce GDPR logic for Gravity Forms.
 * Version: 1.0
 * Author: Christian Nanas
 */

if (!defined('ABSPATH')) exit;

add_action('plugins_loaded', function () {
    if (!class_exists('GFForms')) return;

    add_filter('gform_salesforce_field_value', function ($value, $form, $entry, $field_map) {
        if ($form['id'] == 1 && $field_map['custom_key'] === 'GDPR_Opt_In__c') {
            return (strtolower($value) === 'true' || $value === '1');
        }
        return $value;
    }, 10, 4);
});

add_action('gform_enqueue_scripts_1', function () {
    wp_enqueue_script(
        'gf-custom-js',
        plugin_dir_url(__FILE__) . 'js/gravityforms-custom.js',
        array(),
        '1.0',
        true
    );
});
