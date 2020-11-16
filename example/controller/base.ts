export default class BaseController {
  success(data: any) {
    return { code: 0, data, message: '' };
  }
  error(message: string) {
    return { code: 1, data: null, message };
  }
}
