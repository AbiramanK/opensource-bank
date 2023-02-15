export const convertFormDataEntryValueToString = (
  value: FormDataEntryValue | null
): string => {
  if (typeof value === "string") {
    return value?.toString()?.trim();
  }

  return "";
};
