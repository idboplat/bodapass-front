export const onTelChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  callback: (value: string) => void,
  maxLength: number,
) => {
  const value = e.target.value.replace(/[^0-9]/g, "");
  value.length <= maxLength && callback(value);
};

export const onNoSpaceChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  callback: (value: string) => void,
) => {
  const value = e.target.value.replace(/\s/g, ""); // 모든 공백 제거
  callback(value);
};
