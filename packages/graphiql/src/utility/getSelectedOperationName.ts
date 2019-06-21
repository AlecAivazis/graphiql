/**
 *  Copyright (c) 2019 GraphQL Contributors.
 *
 *  This source code is licensed under the MIT license found in the
 *  LICENSE file in the root directory of this source tree.
 */
import { OperationDefinitionNode } from 'graphql';
import { Maybe } from '../types';
/**
 * Provided optional previous operations and selected name, and a next list of
 * operations, determine what the next selected operation should be.
 */
export default function getSelectedOperationName(
  prevOperations: OperationDefinitionNode[],
  prevSelectedOperationName: string,
  operations: OperationDefinitionNode[],
): Maybe<string> {
  // If there are not enough operations to bother with, return nothing.
  if (!operations || operations.length < 1) {
    return null;
  }

  // If a previous selection still exists, continue to use it.
  const names = operations.map(op => op.name && op.name.value);
  if (
    prevSelectedOperationName &&
    names.indexOf(prevSelectedOperationName) !== -1
  ) {
    return prevSelectedOperationName;
  }

  // If a previous selection was the Nth operation, use the same Nth.
  if (prevSelectedOperationName && prevOperations) {
    const prevNames = prevOperations.map(op => op.name && op.name.value);
    const prevIndex = prevNames.indexOf(prevSelectedOperationName);
    if (prevIndex !== -1 && prevIndex < names.length) {
      return names[prevIndex] || null;
    }
  }

  // Use the first operation.
  return names[0] || null;
}