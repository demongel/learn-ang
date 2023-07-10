import { Component } from '@angular/core';
import { of, map, filter, from, range, fromEvent, timer, interval, defer, tap, mergeMap, throwError, retry, concat, merge, zip, concatMap, switchMap, exhaustMap, take, share } from 'rxjs';

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

  testMap() {
    of(1, 2, 3).pipe(map(x => 10 * x)) // 将1映射成10，2映射成20，3映射成30
      .subscribe(item => console.log("普通 map " + item))

    of(1, 2, 3)
      .pipe(
        map(x => 10 * x),
        map(x => x + 1)
      ) // 两个map操作符串联在一起，按照顺序执行
      .subscribe(item => console.log("串联 map " + item))
  }

  testTap() {
    of(1).pipe(
      tap(val => console.log(`map执行前: ${val}`)),
      map(val => val + 10),
      tap(val => console.log(`map执行后: ${val}`))
    ).subscribe(item => console.log(item))
  }

  testFilter() {
    of(1, 2, 3, 4, 5).pipe(
      filter(val => val > 3)
    ).subscribe(item => console.log(item))
  }

  testRetry() {
    interval(1000).pipe(
      mergeMap(val => {
        if (val > 2) {
          return throwError(() => new Error("发生问题")); // 模拟发生错误
        }
        return of(val);
      }),
      retry(2) // 如果有错误时，重新执行两次
    ).subscribe({
      next: (item) => console.log(item),
      error: (err) => console.log(err),
      complete: () => console.log('执行完成'),
    }
    )
  }

  testCMZ() {
    const nums = of(1, 2, 3)
    // const nums = range(1,1000)
    const uppers = of('A', 'B', 'C')
    const lowers = of('a', 'b', 'c', 'd')

    concat(nums, uppers, lowers)
      .subscribe(item => console.log("concat =  " + item))

    merge(nums, uppers, lowers)
      .subscribe(item => console.log("merge =  " + item))

    zip(nums, uppers, lowers)
      .subscribe(item => console.log("zip =  " + item))

  }

  // 高阶映射操作符
  // 定义可观察对象变量名时，后面接一个$，表示的是可观察对象变量。
  testConcatMap() {
    const obs1$ = zip( // 使用zip操作符模拟每隔1s发射一个值
      of('A', 'B', 'C'),
      timer(1000, 1000),
      (x, y) => x // 第一个参数x指of操作符的item值，第二个参数是timer操作符的item值，这里仅输出of操作符的item值
    )

    const obs2$ = of(1, 2, 3)

    // 旧的写法
    // obs1$.pipe(concatMap(() => obs2$, (x, y) => '' + x + y)).subscribe(item => console.log(item))

    // x 时 obs1 的值， y 是 obs2 的值
    obs1$.pipe(concatMap(
      x => obs2$.pipe(map(y => 'concatMap  = ' + x + y))
    )
    ).subscribe(item => console.log(item))
  }

  testMergeMap() {
    const obs1$ = of('A', 'B', 'C');
    const obs2$ = zip( // 使用zip操作符模拟立即发出数字1，然后每隔1s发射数字2和3
      of(1, 2, 3),
      timer(0, 1000),
      (x, y) => x
    )

    // obs1$.pipe(mergeMap(x => obs2$, (x, y) => '' + x + y, 2)
    // 最后一个参数是并发数，如果是1 ，那么 会打印 A1 A2 A3 .。。

    obs1$.pipe(mergeMap(x => obs2$.pipe(map(y => "merge map " + x + y)), 2)
    ).subscribe(item => console.log(item))
  }

  testSwitchMap() {
    const obs1$ = timer(0, 5000); // 先立即发出值，然后每5s发出值
    const obs2$ = interval(2000); // 每隔2s发出值

    // 每次 out 发射一个新的值，inner 就会创建一个新的订阅，同时取消之前的订阅
    // 这里的 outerValue 和 outerIndex 都是来自 source Observable 的。
    // outerValue 就是 source 发出的值，它是从 0 开始递增的数字。
    // outerIndex 就是 source 发出的次数，它也是从 0 开始递增的数字。你可以把它们想象成一个数组，
    // 每当 source 发出一个值，就相当于访问数组的一个元素，outerValue 就是元素的值，outerIndex 就是元素的索引
    obs1$.pipe(switchMap((outerValue, outerIndex) => obs2$
      .pipe(map((innerValue, innerIndex) => ({
        outerValue,
        innerValue,
        outerIndex,
        innerIndex
      })
      )))
    ).subscribe(item => console.log(item))
  }

  // 每次点击按钮 会创建多个订阅
  // 可以点击一次后 点击页面其他位置 进行测试
  testExhaustMap() {
    const clicks$ = fromEvent(document, 'click');
    const nums$ = of(1, 2, 3, 4, 5)
    clicks$.pipe(
      // 每次会等待 内部的订阅完成 才会 响应外部的新事件， 否则会忽略外部的新事件
      exhaustMap(ev => interval(1000).pipe(take(3)))
    ).subscribe(item => console.log(item));
  }

  testColdFlow() {
    let obs$ = interval(1000).pipe(take(4));

    // 对于每一个订阅来说 每次的结果都是一样的
    obs$.subscribe(data => { console.log("1st subscriber:" + data) });
    obs$.subscribe(data => { console.log("2nd subscriber:" + data) });

    setTimeout(() => {
      obs$.subscribe(data => { console.log("3rd subscriber:" + data) });
    }, 1000); // 延迟1s
  }

  testHotFlow() {

    // share操作符的作用是将原始的可观察对象共享给一个新的可观察对象。
    // 只要至少有一个订阅，该可观察对象便会被预定并发出数据。
    let obs$ = interval(1000).pipe(take(5), share());

    // 对于每一个订阅来说 每次的结果都是一样的
    obs$.subscribe(data => { console.log("1st subscriber:" + data) });

    // 2nd 会从 2 开始打印
    setTimeout(() => {
      obs$.subscribe(data => { console.log("2nd subscriber:" + data) });
    }, 2000); // 延迟1s
  }
}
