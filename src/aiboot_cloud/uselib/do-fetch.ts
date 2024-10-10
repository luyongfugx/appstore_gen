const doFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit,
  onAuthRequired?: Function,
  onPaymentRequired?: Function,
  onError?: Function
) => {
  const response = await fetch(input, init);

  //if ok
  if (response.ok) {
    return response;
  } else if (response.status == 401) {
    if (onAuthRequired) {
      onAuthRequired(response);
      return response;
    } else {
      return response;
    }
  } else if (response.status == 402) {
    if (onPaymentRequired) {
      onPaymentRequired(response);
      return response;
    } else {
      return response;
    }
  } else {
    if (onError) {
      onError(response);
    }
    return response;
  }
};
export default doFetch;
