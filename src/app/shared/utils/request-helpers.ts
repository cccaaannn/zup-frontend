export class RequestHelpers {
    static isXXX(status: number | string, starts: string) {
        if((status + "").startsWith(starts)) {
            return true;
        }
        return false;
    }
    
    static is2XX(status: number | string) {
        return this.isXXX(status, "2");
    }
    
    static is4XX(status: number | string) {
        return this.isXXX(status, "4");
    }
    
    static is5XX(status: number | string) {
        return this.isXXX(status, "5");
    }
}
