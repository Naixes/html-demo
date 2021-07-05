//Bad
class UserSettings {
    constructor(user) {
        this.user = user;
    }

    changeSettings(settings) {
        if (this.verifyCredentials()) {
            // ...
        }
    }

    verifyCredentials() {
        // ...
    }
}
//Good:
class UserAuth {
    constructor(user) {
        this.user = user;
    }
    verifyCredentials() {
        // ...
    }
}

class UserSetting {
    constructor(user) {
        this.user = user;
        this.auth = new UserAuth(this.user);
    }
    changeSettings(settings) {
        if (this.auth.verifyCredentials()) {
            // ...
        }
    }
}