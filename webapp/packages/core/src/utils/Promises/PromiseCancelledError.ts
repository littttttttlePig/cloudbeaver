/*
 * cloudbeaver - Cloud Database Manager
 * Copyright (C) 2020 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */


export class PromiseCancelledError extends Error {
  constructor(public reason?: Error) {
    super(reason?.message);
  }
}

export function isPromiseCancelledError(error: any): error is PromiseCancelledError {
  return error instanceof PromiseCancelledError;
}
