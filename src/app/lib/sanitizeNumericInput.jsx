function sanitizeNumericInput(input) {
    return input.replace(/[^0-9]/g, ''); 
}

export default sanitizeNumericInput;
