# Gravity Forms Custom Scripts

## 1. Overview
The Gravity Forms Custom Scripts plugin enhances Gravity Forms by adding custom JavaScript functionality and Salesforce GDPR logic. It dynamically manages form fields based on user input and ensures GDPR consent data is correctly handled for Salesforce integration.

## 2. Purpose
- To toggle the "State" field input type between a dropdown of US states or a free text input based on the selected country.
- To manage GDPR consent checkbox behavior for form submissions, ensuring proper data is sent to Salesforce.
- To enqueue and run custom JavaScript that supports these behaviors seamlessly within Gravity Forms.

## 3. Installation
1. Upload the `gravityforms-custom-scripts` folder to the `/wp-content/plugins/` directory of your WordPress installation.
2. Activate the plugin through the WordPress Admin Dashboard under **Plugins**.
3. Ensure Gravity Forms plugin is installed and active, as this plugin depends on it.

## 4. Configuration & Usage
- The plugin automatically targets specific form fields by their IDs:
  - Country and State fields for forms with IDs 1 and 4 are dynamically linked.
  - The "State" field switches between a dropdown of US states or a text input depending on the selected country.
- For Form ID 1, the GDPR consent checkbox (`#input_1_43_1`) is monitored, and its value is synchronized with a hidden input (`input[name="input_43.3"]`) before form submission.
- No additional configuration is required; the plugin works out-of-the-box for the specified forms and fields.

## 5. How It Works
- On page load and after any AJAX form render, the plugin initializes:
  - It attaches event listeners to country fields to toggle the state field input type.
  - It applies a filter to convert the GDPR opt-in field value to a boolean for Salesforce integration.
  - It synchronizes the consent checkbox state with a hidden field before submission.

## 6. Extending or Modifying
- To add support for additional forms or fields, update the `fieldMappings` array in `js/gravityforms-custom.js` with the appropriate selectors.
- Modify the Salesforce GDPR logic in `gravityforms-custom-scripts.php` if your Salesforce field keys or form IDs differ.

## 7. Troubleshooting
- Ensure Gravity Forms is active; otherwise, the plugin will not run.
- Verify the form and field IDs match those in the plugin code.
- Check browser console for any JavaScript errors related to the plugin.

## 8. Author & Support
- Author: Christian Nanas
- For support, contact the author or refer to the WordPress plugin repository if applicable.

---

This SOP provides clear instructions for installation, usage, and maintenance of the Gravity Forms Custom Scripts plugin.
# Gravity Forms Custom Scripts - Styling Updates

This plugin includes custom styles for Gravity Forms buttons to enhance the user interface and maintain consistent branding.

## Button Styling Details

### Previous Button (Secondary Button)
- Font size: 13px
- Style: Secondary button with white background
- Border: 2px solid #17479e (blue)
- Text color: #17479e (blue)
- Full width with padding and rounded corners
- Hover state: Light gray background (#f5f7fa), dark blue text (#111c4e), and border color changes to #111c4e

### Submit Button (Primary Button)
- Font size: 16px
- Background color: #17379e (primary blue)
- Text color: white (#fff)
- No border
- Full width with padding and rounded corners
- Hover state: Darker blue background (#111c4e), white text

### Next Button (Primary Button)
- Matches the Submit button styling exactly:
  - Font size: 16px
  - Background color: #17379e
  - Text color: white (#fff)
  - No border
  - Full width with padding and rounded corners
  - Hover state: Darker blue background (#111c4e), white text

## CSS Classes Targeted
- Previous button: `.gform_previous_button` with `.gform-theme-button--secondary`
- Submit button: `.gform_button.button.gform-button--width-full`
- Next button: `.gform_next_button.gform-theme-button.button`

These styles ensure consistent button appearance across Gravity Forms navigation and submission controls.

## How to Customize
Modify the CSS in `css/gravityforms-custom.css` to adjust colors, font sizes, or other styles as needed.