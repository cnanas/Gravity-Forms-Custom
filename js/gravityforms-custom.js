/**
 * Initializes custom logic for Gravity Forms, including dynamic state field handling
 * and consent checkbox management.
 */
function gravityFormsCustomInit() {
    // ------------------------------------
    // List of Country/State field pairs by form, used to toggle state input type
    // ------------------------------------
    const fieldMappings = [
        { country: '#input_1_8_6', state: '#input_1_8_4', label: '#input_1_8_4_label' },
        { country: '#input_4_4_6', state: '#input_4_4_4', label: '#input_4_4_4_label' }
    ];

    // Array of US states for populating the dropdown
    const usStates = [
        "", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
        "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
        "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
        "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
        "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
        "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
        "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ];

    /**
     * Creates a dropdown element for state selection.
     * @param {string} stateId - The ID for the dropdown element.
     * @param {string} name - The name attribute for the dropdown.
     * @param {string} selectedValue - The value to be selected by default.
     * @returns {HTMLElement} The created dropdown element.
     */
    function createDropdown(stateId, name, selectedValue = "") {
        const select = document.createElement('select');
        select.id = stateId;
        select.name = name;
        select.className = 'ginput_full large';
        select.setAttribute('aria-required', 'true');
        select.setAttribute('autocomplete', 'address-level1');

        usStates.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.text = state;
            if (state === selectedValue) option.selected = true;
            select.appendChild(option);
        });

        return select;
    }

    /**
     * Toggles the state field between a text input and a dropdown based on the selected country.
     * @param {Object} mapping - The mapping object containing selectors for country and state fields.
     */
    function toggleStateField(mapping) {
        const country = document.querySelector(mapping.country);
        const stateField = document.querySelector(mapping.state);
        const label = document.querySelector(mapping.label);
        const parent = stateField?.parentNode;

        // Debugging output
        console.log('GravityFormsCustom:');
        console.log('  Mapping:', mapping);
        console.log('  Country field:', country);
        console.log('  Country value:', country ? country.value : 'N/A');
        console.log('  State field:', stateField);
        console.log('  State tagName:', stateField ? stateField.tagName : 'N/A');

        if (!country || !stateField || !parent) return;

        if (country.value === 'United States') {
            if (stateField.tagName.toLowerCase() !== 'select') {
                const newDropdown = createDropdown(stateField.id, stateField.name, stateField.value);
                parent.replaceChild(newDropdown, stateField);
                parent.appendChild(label);
            }
        } else {
            if (stateField.tagName.toLowerCase() === 'select') {
                const newInput = document.createElement('input');
                newInput.type = 'text';
                newInput.id = stateField.id;
                newInput.name = stateField.name;
                newInput.className = 'ginput_full large';
                newInput.setAttribute('aria-required', 'true');
                newInput.setAttribute('autocomplete', 'address-level1');
                newInput.value = stateField.value;
                parent.replaceChild(newInput, stateField);
                parent.appendChild(label);
            }
        }
    }

    // Initialize field mappings and add event listeners for country change
    fieldMappings.forEach(mapping => {
        const countryEl = document.querySelector(mapping.country);
        if (countryEl) {
            countryEl.addEventListener('change', () => toggleStateField(mapping));
            toggleStateField(mapping); // run on load
        }
    });

    // ------------------------------------
    // Consent Checkbox Fix: Ensures the hidden consent value is set based on the checkbox state for Form 1
    // ------------------------------------
    if (typeof gform !== "undefined" && typeof gform.addFilter === "function") {
        gform.addFilter('gform_pre_submission', function (formId) {
            if (formId !== 1) return true;

            const consentCheckbox = document.querySelector('#input_1_43_1');
            const hiddenConsentValue = document.querySelector('input[name="input_43.3"]');

            if (consentCheckbox && hiddenConsentValue) {
                hiddenConsentValue.value = consentCheckbox.checked ? "true" : "";
            }

            return true;
        });
    }
}

// Run initialization on DOMContentLoaded to ensure the DOM is fully loaded
document.addEventListener('DOMContentLoaded', gravityFormsCustomInit);

// Also run initialization on Gravity Forms AJAX render to handle dynamic form loading
if (typeof jQuery !== "undefined") {
    jQuery(document).on('gform_post_render', gravityFormsCustomInit);
}