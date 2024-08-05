const httpErrorMap: { [key: string]: number } = {
  anyrequired: 400,
  numbermin: 422,
  stringmin: 401,
  stringbase: 422,
  numberbase: 422,
  stringemail: 401,
};

const joiStatusHTTP = (status: string): number => httpErrorMap[status.split('.').join('')] || 400;

export default joiStatusHTTP;
