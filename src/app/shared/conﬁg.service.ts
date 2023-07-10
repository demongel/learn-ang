import { Inject, Injectable } from '@angular/core';
import { conﬁgToken, Conﬁg } from './conﬁg';

@Injectable({
  providedIn: 'root'
})
export class ConﬁgService {

  // 注入Conﬁg接口对象
  // 注入一个 Config 对象， 这个对象会在 provider 中通过 conﬁgToken 找到
  constructor(@Inject(conﬁgToken) private conﬁg: Conﬁg) {
    console.log('new instance is created');
  }
  getValue() {
    return this.conﬁg;
  }
}


