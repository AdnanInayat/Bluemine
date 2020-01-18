import multer from 'multer';
import { BodyParser, Request, RequestBody } from '@loopback/rest';

export class MultipartFormDataBodyParser implements BodyParser {
    name = 'multipart/form-data';

    supports(mediaType: string) {
        return mediaType.startsWith('multipart/form-data');
    }

    async parse(request: Request): Promise<RequestBody> {
        const storage = multer.memoryStorage();
        const upload = multer({ storage });
        return new Promise<RequestBody>((resolve, reject) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            upload.any()(request, {} as any, err => {
                if (err) reject(err);
                else {
                    resolve({
                        value: {
                            files: request.files,
                            fields: request.body,
                        },
                    });
                }
            });
        });
    }
}
