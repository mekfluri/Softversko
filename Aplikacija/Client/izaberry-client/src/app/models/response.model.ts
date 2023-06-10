class MessageResponse {
    isError: boolean = false;
    message: string | null = null;

    constructor(isError?: boolean, message?: string){
        this.isError = isError || false;
        this.message = message || null;
    }

    showResponse() {
        setTimeout(() => {
            this.message = null;
            this.isError = false;
        }, 2000);
    }
}

export { MessageResponse }