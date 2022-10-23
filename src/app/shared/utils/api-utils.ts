export class ApiUtils {

    static UnguardedApiPaths = {
        ACCOUNT: "/account/",
        AUTH: "/auth/"
    }

    static isUnguardedApiPath(path: string) {
        for (let key in this.UnguardedApiPaths) {
            if (path.includes(this.UnguardedApiPaths[key as keyof typeof this.UnguardedApiPaths])) {
                return true;
            }
        }
        return false;
    }

}
