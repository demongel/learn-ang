import { Component } from '@angular/core';
import { of, map, filter, from, range, fromEvent, timer, interval, defer } from 'rxjs';

@Component({
  selector: 'app-rx',
  templateUrl: './rx.component.html',
  styleUrls: ['./rx.component.css']
})
export class RxComponent {

  testRx9() {

    let obs = of(Math.random());
    // 在 订阅时 随机数已经生成好了  所以两次打印相同
    obs.subscribe(item => console.log("1st subscriber:" + item));
    obs.subscribe(item => console.log("2st subscriber:" + item));


    let obs2 = defer(() => of(Math.random()))
    // 先订阅在运行 of 创建器 ，所以每次都是新的数据
    obs2.subscribe(item => console.log("defer 1st subscriber:" + item));
    obs2.subscribe(item => console.log("defer 2st subscriber:" + item));
  }

  testRx8() {
    //  defer 可以实现动态的创建，而普通的创建是静态的.
    //  defer 可以根据订阅时的条件或状态来返回不同的 Observable，
    // 而普通的创建只能返回固定的 Observable
    const subscription = defer(() =>
      Math.random() > 0.5
        ? fromEvent(document, 'click') // 如果随机数大于0.5，就创建这个数据流
        : interval(1000)) // 如果随机数小于0.5，就创建这个数据流
      .subscribe(item => {
        console.log(item)
      })

    setTimeout(() => {
      subscription.unsubscribe(); // 取消订阅，停止输出
    }, 1000);
  }

  testRx7() {
    // 只接收一个参数 表示首次和后续的间隔
    const subscription = interval(500)
      .subscribe(item => {
        console.log("item = " + item);
        if (item > 10) {
          subscription.unsubscribe()
        }
      })
  }

  testRx6() {
    // 首次等待3s ，然后每个 1s 发送一次数据 
    const subscription = timer(3000, 1000)
      .subscribe(item => {
        console.log("item = " + item);
        if (item > 10) {
          subscription.unsubscribe()
        }
      })
  }

  testRx5() {
    const subscribe = fromEvent(document, 'click')
      .subscribe(val => {
        console.log(val.target)
        // 是个无尽流 每次订阅后移除， 否则每次事件都会 +1 
        subscribe.unsubscribe()
      }); // 输出MouseEvent对象的target属性的信息
  }

  // 不同的创建器
  testRx4() {
    of(1, 2, 3) // 创建3个数字的数据流
      .subscribe({
        next: (next) => console.log('next:', next), // 接收正常值
        error: (error) => console.log('error:', error), // 当有异常发生时
        complete: () => console.log('the end'), // 表示数据接收完毕时
      }
      );

    of([1, 2, 3]) // 创建一个数组的数据流 这里指挥发送一次， 发送整个数组
      .subscribe(item => console.log("of " + item))


    from([10, 20, 30]) // 将数组作为值的序列发出
      .subscribe(item => console.log("from " + item)) // 输出: 10 20 30

    range(1, 10) // 依次发出1～10
      .subscribe(item => console.log("range " + item)) // 输出: 1 2 3 4 5 6 7 8 9 10
  }

  testRx3() {
    // recommended 
    of([1, 2, 3]).subscribe((v) => console.info(v));
    // also recommended
    // 推荐在 subscribe 时 提供具体的名称
    of([1, 2, 3]).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }

  testRx2() {
    of(3, 4, 5).pipe(
      filter((item: number) => item % 2 === 1), // 对数据进行过滤，返回想要的数据
      map((item: number) => item * 3), // 把每个源值传递给转化函数以获得相应的输出值
    ).subscribe(
      item => console.log(item), // 接收正常值
      err => console.log('error:', err), // 当有异常发生时
      () => console.log('the end') // 表示数据接收完毕时
    );
  }

  testRx() {
    // 步骤1：创建一个观察者对象
    // next / error / complete 字段名是固定的，否则无法正常运行
    const observer = {
      next: (item: number) => console.log(item), // 步骤2：接收正常值
      error: (err: Error) => console.error('error:' + err), // 步骤3：表示当有异常发生时
      complete: () => console.log('the end') // 步骤4：表示数据接收完毕时
    };
    // 使用 of 创建器 创建可观察对象 
    const observable = of(3, 4, 5); // 步骤5：创建一个可观察对象

    const subscription = observable.pipe( // 步骤6：使用操作符

      filter((item: number) => item % 2 === 1), // 步骤7：对数据进行过滤，返回想要的数据

      map((item: number) => item * 3), // 步骤8：把每个源值传递给转化函数以获得相应的输出值

    ).subscribe(observer); // 步骤9：订阅可观察对象

    subscription.unsubscribe(); // 步骤10：取消订阅可观察对象
  }

}
