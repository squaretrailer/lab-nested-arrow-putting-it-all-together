function createLoginTracker(userInfo) {
    let attemptNumber = 0;      // Counts consecutive attempts (resets on success)
    let isLocked = false;
    const MAX_ATTEMPTS = 3;

    return (passwordAttempt) => {
        // If already locked, reject immediately
        if (isLocked) {
            return "Account locked due to too many failed login attempts";
        }

        // Increase the attempt counter
        attemptNumber++;

        // Check password
        if (passwordAttempt === userInfo.password) {
            // Successful login: reset counter and unlock
            attemptNumber = 0;
            isLocked = false;
            return "Login successful";
        } else {
            // Failed login: lock if this was the MAX_ATTEMPTS-th failure
            if (attemptNumber === MAX_ATTEMPTS) {
                isLocked = true;
            }
            // Return the failure message with the current attempt number
            return `Attempt ${attemptNumber}: Login failed`;
        }
    };
}



module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};
