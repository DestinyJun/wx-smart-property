import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {environment} from '../environments/environment';
import {GlobalService} from './common/services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  public current_url: any = null;
  public wxCode: any = null;

  constructor(
    private router: Router,
    private globalSrv: GlobalService,
    private getrouter: ActivatedRoute
  ) {}
  ngOnInit(): void {
    console.log(environment.env);
    // 判断是否是ios，微信认证登陆时用到

    if (!(this.globalSrv.wxSessionGetObject('ios_url'))) {
      this.globalSrv.wxSessionSetObject('ios_url', window.location.href);
    }
    // 判断是否是微信客户端
    if (window.navigator.userAgent.indexOf('MicroMessenger') === -1) {
      // this.router.navigate(['/error']);
      // return;
    }
    // 路由事件
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          // console.log(document.referrer);
          this.current_url = event.url;
        }
      }
    );
    // 监控手机横竖屏
    window.addEventListener('orientationchange', () => {
      if (window.screen.orientation.angle === 90 || window.screen.orientation.angle === -90 || window.screen.orientation.angle === 270) {
          this.router.navigate(['/error'], {
            queryParams: {
              msg: '为保证浏览效果，请竖屏访问！',
              btn: null,
              url: null
            }
          });
          return;
      }
      if (window.screen.orientation.angle === 0 || window.screen.orientation.angle === 180 || window.screen.orientation.angle === 360) {
        window.history.back();
        return;
      }
    });
  }
}

