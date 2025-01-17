export const required = (value) => value.trim() !== "";

export const length =
  ({ min, max }) =>
  (value) => {
    const trimmedValue = value.trim();
    return (
      (min ? trimmedValue.length >= min : true) &&
      (max ? trimmedValue.length <= max : true)
    );
  };

export const email = (value) =>
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
    value
  );
