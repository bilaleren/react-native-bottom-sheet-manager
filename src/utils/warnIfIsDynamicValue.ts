function warnIfIsDynamicValue(a: unknown, b: unknown, paramName: string): void {
  if (a !== b) {
    console.warn(
      `The "${paramName}" parameter cannot be provided a dynamic value.`
    );
  }
}

export default warnIfIsDynamicValue;
