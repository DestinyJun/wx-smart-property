import {Injectable} from '@angular/core';
import {HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {GlobalService} from './global.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public clonedRequest: any;
  constructor(
    private globalSrv: GlobalService,
    private router: Router
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // return this.prod_http(req, next);
    if (environment.production) {
      return this.prod_http(req, next);
    } else {
      return this.debug_http(req, next);

    }
  }
  public debug_http(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === environment.dev_test_url + `/wx/login` || req.url === environment.dev_test_url + `/gettoken`) {
      this.clonedRequest = req.clone({
        url:  req.url,
        // url: 'http://192.168.1.88' + req.url,
        headers: req.headers
          .set('Content-type', 'application/json; charset=UTF-8')
        // .set('token', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODY4NTQ4ODA4NCIsImV4cCI6MTU1OTcwNTczMX0.viyBP5R4uuo5FivuM6lH1JZDUo_vKRSB1tu7W3XqKqK5d-_GlhnqBDJJ01qbrkVaL_9gywRvLLXbLiXrw3NP5Q')
      });
    } else if (req.url === environment.dev_test_url + `/wx/indexuploadphoto`) {
      this.clonedRequest = req.clone({
        url:  req.url,
        headers: req.headers
          // .set('APPKEY', environment.dev_test_appkey)
          .set('APPKEY', this.globalSrv.wxSessionGetObject('appkey'))
          // .set('APPKEY', environment.dev_test_appkey)
      });

    } else {
      this.clonedRequest = req.clone({
        url:  req.url,
        headers: req.headers
          .set('Content-type', 'application/json; charset=UTF-8')
          // .set('APPKEY', environment.dev_test_appkey)
          .set('APPKEY', this.globalSrv.wxSessionGetObject('appkey'))
      });
    }
    return next.handle(this.clonedRequest).pipe(
      mergeMap((event: any) => {
        if (event.status === 200) {
          // if (event.body.code === '1000') {
              return of(event);
          // } else {
          //   this.router.navigate(['/error'], {
          //     queryParams: {
          //       msg: event.body.msg,
          //       status: event.body.code,
          //       btn: '请重试'
          //     }
          //   });
          // }
        }
        return EMPTY;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 0) {
          // console.log(err);
          this.router.navigate(['/error'], {
            queryParams: {
              msg: '连接服务器失败，请检查网络！',
              url: null,
              btn: '请重试'
            }
          });
        } else if (err.status === 400) {
          this.router.navigate(['/error'], {
            queryParams: {
              msg: '连接服务器失败，请检查网络！',
              url: null,
              btn: '请重试'
            }
          });
        }
        return EMPTY;
      })
    );
  }
  public prod_http(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === environment.dev_test_url + `/wx/login` || req.url === environment.dev_test_url + `/gettoken`) {
      this.clonedRequest = req.clone({
        url:  req.url,
        // url: 'http://192.168.1.88' + req.url,
        headers: req.headers
          .set('Content-type', 'application/json; charset=UTF-8')
      });
    } else if (req.url === environment.dev_test_url + `/wx/indexuploadphoto`) {
      this.clonedRequest = req.clone({
        url:  req.url,
        headers: req.headers
          .set('APPKEY', this.globalSrv.wxSessionGetObject('appkey'))
      });

    } else {
      this.clonedRequest = req.clone({
        url:  req.url,
        headers: req.headers
          .set('Content-type', 'application/json; charset=UTF-8')
          .set('APPKEY', this.globalSrv.wxSessionGetObject('appkey'))
      });
    }
    return next.handle(this.clonedRequest).pipe(
      mergeMap((event: any) => {
        if (event.status === 200) {
          // if (event.body.code === '1000') {
            return of(event);
          // } else {
          //   this.router.navigate(['/error'], {
          //     queryParams: {
          //       msg: event.body.msg,
          //       status: event.body.code,
          //       btn: '请重试'
          //     }
          //   });
          // }
        }
        return EMPTY;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 0) {
          // console.log(err);
          this.router.navigate(['/error'], {
            queryParams: {
              msg: '连接服务器失败，请检查网络！',
              url: null,
              btn: '请重试'
            }
          });
        }
        return EMPTY;
      })
    );
    // if (this.globalSrv.wxSessionGetObject('token')) {
    //   this.clonedRequest = req.clone({
    //     url: environment.dev_test_url + req.url,
    //     headers: req.headers
    //       .set('Content-type', 'application/json; charset=UTF-8')
    //       .set('APPKEY', this.globalSrv.wxSessionGetObject('appkey'))
    //   });
    //   return next.handle(this.clonedRequest).pipe(
    //     mergeMap((event: any, ) => {
    //       if (event) {
    //         return of(event);
    //       }
    //     }),
    //     catchError((err: HttpErrorResponse) => {
    //       if (err.status === 0) {
    //         this.router.navigate(['/error']);
    //       }
    //       return Observable.create(observer => observer.next(err));
    //     })
    //   );
    // }
    // this.clonedRequest = req.clone({
    //   url: environment.dev_test_url + req.url,
    //   headers: req.headers
    //     .set('Content-type', 'application/json; charset=UTF-8')
    // });
    return next.handle(this.clonedRequest).pipe(
      mergeMap((event: any) => {
        if (event.status === 200) {
          return of(event);
        }
        return EMPTY;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 0) {
          this.router.navigate(['/error'], {
            queryParams: {
              msg: '连接服务器失败，请检查网络！',
              url: null,
              btn: '请重试',
            }});
        }
        if (err.status === 403) {
          this.router.navigate(['/error'], {
            queryParams: {
              msg: 'token认证失败，请重新登陆！',
              url: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbacad0ba65a80a3d&redirect_uri=http://1785s28l17.iask.in/moyaoView&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`,
              btn: '点击登陆'
            }});
        }
        if (err.status === 400) {
          return of(err);
        }
        if (err.status === 500) {
          this.router.navigate(['/error'], {
            queryParams: {
              msg: '服务器处理失败！请联系管理员',
              url: null,
              btn: '请重试',
            }});
        }
      })
    );
  }
}
