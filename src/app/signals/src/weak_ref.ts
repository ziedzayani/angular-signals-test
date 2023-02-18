/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

// TODO(jteplitz602): Load WorkerGlobalScope from lib.webworker.d.ts file #3492
declare var WorkerGlobalScope: any;
// CommonJS / Node have global context exposed as "global" variable.
// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
// the global "global" var for now.
declare var global: any;

// Always use __globalThis if available, which is the spec-defined global variable across all
// environments, then fallback to __global first, because in Node tests both __global and
// __window may be defined and _global should be __global in that case. Note: Typeof/Instanceof
// checks are considered side-effects in Terser. We explicitly mark this as side-effect free:
// https://github.com/terser/terser/issues/250.
const _global: any = (/* @__PURE__ */ (
    () => (typeof globalThis !== 'undefined' && globalThis) ||
        (typeof global !== 'undefined' && global) || (typeof window !== 'undefined' && window) ||
        (typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
         self instanceof WorkerGlobalScope && self))());

/**
 * Attention: whenever providing a new value, be sure to add an
 * entry into the corresponding `....externs.js` file,
 * so that closure won't use that global for its purposes.
 */
export {_global as global};





/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

//import {global} from '@angular/core';

// `WeakRef` is not always defined in every TS environment where Angular is compiled. Instead,
// alias it as a local export by reading it off of the global context.

export interface WeakRef<T extends object> {
  deref(): T|undefined;
}

export interface WeakRefCtor {
  new<T extends object>(value: T): WeakRef<T>;
}

// tslint:disable-next-line: no-toplevel-property-access
export const WeakRef: WeakRefCtor = _global['WeakRef'];
