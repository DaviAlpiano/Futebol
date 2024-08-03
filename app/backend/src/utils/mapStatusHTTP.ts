export type HttpStatus =
  | 'successful'
  | 'created'
  | 'noContent'
  | 'badRequest'
  | 'unauthorized'
  | 'notFound'
  | 'conflict'
  | 'invalidValue';

const httpErrorMap: Record<HttpStatus, number> = {
  successful: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  conflict: 409,
  invalidValue: 422,
};

const mapStatusHTTP = (status: HttpStatus): number => httpErrorMap[status] || 500;

export default mapStatusHTTP;
