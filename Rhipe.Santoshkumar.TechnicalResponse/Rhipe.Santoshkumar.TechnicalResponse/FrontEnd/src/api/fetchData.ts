import config from '../common/config';
import { TriangleType, Payload } from '../common/interfaces';

enum httpMethod {
    'GET',
    'POST'
}
export class FetchData {

    postData(endpoint: string, payload: Payload): Promise<TriangleType> {
        return new Promise<TriangleType>((resolve, reject) => {
            let bodyContent = JSON.stringify(payload);
            this.fetchIt(httpMethod.POST, endpoint, bodyContent)
                .then((result: TriangleType) => resolve(result))
                .catch(reject);
        });
    }

    private getHttpOption(method: httpMethod, body?: string) {
        let headers = new Headers();
        let httpOptions: RequestInit;
        headers.append('Access-Control-Allow-Origin', 'origin');
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Accept', 'application/json');
        httpOptions = {
            headers: headers,
            mode: 'cors',
            cache: 'default',
            method: httpMethod[method]
        };
        if (body) { httpOptions.body = body; }
        return httpOptions;l
    }

    private async fetchIt(method: httpMethod, endPoint: string, body?: string) {
        try {
            let httpOptions = this.getHttpOption(method, body);
            let responce = await fetch(`${config.network.baseEndPointUrl}${endPoint}`, httpOptions);
            if (!responce.ok) {
                let err = await responce.json();
                return new Promise<any>((resolve, reject) => reject(err));
            }
            let result = await responce.json();
            return new Promise<any>((resolve) => resolve(result));
        } catch (err) {
            return new Promise<any>((resolve, reject) => reject(err));
        }
    }
}

export default new FetchData();
