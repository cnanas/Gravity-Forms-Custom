document.addEventListener('DOMContentLoaded', function () {
    // ------------------------------------
    // List of Country/State field pairs by form
    // ------------------------------------
    const fieldMappings = [
        { country: '#input_1_8_6', state: '#input_1_8_4', label: '#input_1_8_4_label' },
        { country: '#input_4_4_6', state: '#input_4_4_4', label: '#input_4_4_4_label' }
    ];

    const usStates = [
        "", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
        "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
        "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
        "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
        "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
        "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
        "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ];

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

    function toggleStateField(mapping) {
        const country = document.querySelector(mapping.country);
        const stateField = document.querySelector(mapping.state);
        const label = document.querySelector(mapping.label);
        const parent = stateField?.parentNode;

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

    fieldMappings.forEach(mapping => {
        const countryEl = document.querySelector(mapping.country);
        if (countryEl) {
            countryEl.addEventListener('change', () => toggleStateField(mapping));
            toggleStateField(mapping); // run on load
        }
    });

    // ------------------------------------
    // Consent Checkbox Fix (sets "true") for Form 1
    // ------------------------------------
    gform.addFilter('gform_pre_submission', function (formId) {
        if (formId !== 1) return true;

        const consentCheckbox = document.querySelector('#input_1_43_1');
        const hiddenConsentValue = document.querySelector('input[name="input_43.3"]');

        if (consentCheckbox && hiddenConsentValue) {
            hiddenConsentValue.value = consentCheckbox.checked ? "true" : "";
        }

        return true;
    });
});