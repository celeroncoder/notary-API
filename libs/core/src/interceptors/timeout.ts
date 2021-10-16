import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    RequestTimeoutException,
} from "@nestjs/common";
import {
    catchError,
    Observable,
    throwError,
    timeout,
    TimeoutError,
} from "rxjs";

const BASE_TIMEOUT: number = 30 * 1000;

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> {
        return next.handle().pipe(
            timeout(BASE_TIMEOUT),
            catchError((error) => {
                if (error instanceof TimeoutError) {
                    return throwError(new RequestTimeoutException());
                }

                return throwError(error);
            }),
        );
    }
}
