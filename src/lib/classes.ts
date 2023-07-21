/*
 * Copyright (c) DD360 and its affiliates.
 */

export function composeClasses(
  ...classes: (string | undefined | null | boolean)[]
) {
  return classes.filter(Boolean).join(' ').trim()
}
