function createLoginTracker(userInfo) {
    let attemptCount = 0;        // Track number of failed attempts
    let isLocked = false;        // Flag to indicate if account is locked
    const MAX_ATTEMPTS = 3;      // Lock after 3 failed attempts

    return (passwordAttempt) => {
        // If account is already locked, prevent any further attempts
        if (isLocked) {
            return "Account locked due to too many failed login attempts";
        }

        // Increment attempt count for each login attempt
        attemptCount++;

        // Check password
        if (passwordAttempt === userInfo.password) {
            // Successful login: reset counter and ensure unlocked
            attemptCount = 0;
            isLocked = false;
            return "Login successful";
        } else {
            // Failed attempt: check if lock threshold reached
            if (attemptCount === MAX_ATTEMPTS) {
                isLocked = true;
                return "Account locked due to too many failed login attempts";
            }
            // Not locked yet, return the attempt number
            return `Login attempt ${attemptCount} failed.`;
        }
    };
}

console.log(createLoginTracker({ username: "user1", password: "pass123" })("wrongpass")); // Login attempt 1 failed.


module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};
