import { catchError, MonoTypeOperatorFunction, retry, timeout } from 'rxjs';
import { RETRY_ATTEMPTS, TIMEOUT_MS } from '../core/constants/const';
import { handleError } from './error-handler';

export function defaultHttpPipe<T>(): [
  MonoTypeOperatorFunction<T>,
  MonoTypeOperatorFunction<T>,
  MonoTypeOperatorFunction<T>,
] {
  return [timeout(TIMEOUT_MS), retry(RETRY_ATTEMPTS), catchError(handleError)];
}
