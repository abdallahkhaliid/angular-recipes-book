import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.includes('firebaseio.com')) {
    return next(req);
  }

  const token = getValidToken();
  if (!token) {
    return next(req);
  }

  return next(req.clone({ setParams: { auth: token } }));
};

function getValidToken(): string | null {
  const stored = localStorage.getItem('userData');
  if (!stored) {
    return null;
  }

  try {
    const { _token, _tokenExpirationDate } = JSON.parse(stored);
    if (!_token || !_tokenExpirationDate || new Date(_tokenExpirationDate) <= new Date()) {
      return null;
    }
    return _token;
  } catch {
    return null;
  }
}
