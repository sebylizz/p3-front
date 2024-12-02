function validatePassword(password) {
    const rules = [
        { regex: /.{8,16}/, message: "Password must be 8-16 characters long." },
        { regex: /[A-Z]/, message: "Password must contain at least one uppercase letter." },
        { regex: /[a-z]/, message: "Password must contain at least one lowercase letter." },
        { regex: /\d/, message: "Password must contain at least one digit." },
        { regex: /[!@#$%^&*]/, message: "Password must contain at least one special character." },
        { regex: /^\S*$/, message: "Password must not contain whitespace." },
    ];

    const errors = rules
        .filter(rule => !rule.regex.test(password))
        .map(rule => rule.message);

    return { isValid: errors.length === 0, errors };
}

export default validatePassword;