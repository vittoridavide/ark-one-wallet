import { BarkError } from '@secondts/bark-react-native';

export function getBarkErrorMessage(error: unknown): string {
  if (BarkError.instanceOf(error)) {
    return error.inner?.errorMessage ?? error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}
