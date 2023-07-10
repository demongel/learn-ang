import { InjectionToken } from '@angular/core';

// 创建一个接口
export interface Conﬁg {
    apiEndPoint: string;
    timeout: number;
}

// 创建一个 InjectionToken
export const conﬁgToken = new InjectionToken<Conﬁg>('demo token');