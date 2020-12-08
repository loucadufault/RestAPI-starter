import { v4 as uuidv4 } from 'uuid';
import http from 'http';

const DEFAULT_STATUS =  500;
const DEFAULT_TITLE = 'Internal Server Error';
const DEFAULT_DETAIL = '';
const DEFAULT_CODE = 'ERR_INTERNAL_SERVER';

class HttpError extends Error {
    constructor({status=DEFAULT_STATUS, detail=DEFAULT_DETAIL, code}) {
        super();
        this.id = uuidv4();
        this.status = status;
        this.title = http.STATUS_CODES[status] || DEFAULT_TITLE;
        this.detail = detail;
        this.code = code;  
    }

    toJSON() {
        const {id, status, title, detail, code} = this;
        return {
            id,
            status,
            title,
            detail, 
            code
        };
    }
}

export default HttpError;