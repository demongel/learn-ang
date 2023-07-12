import { Pipe, PipeTransform } from '@angular/core';

// 名称
@Pipe({
  name: 'orderby'
})
export class OrderbyPipe implements PipeTransform {

  /**
   * 
   * @param value transform()方法中的第一个参数是模板中传递的表达式值，示例是变量fruits的值；
   * @param args 参数是附加在orderby管道上的参数；transform()方法通过判断附加在orderby管道上的参数，决定是升序还是降序排列。
   * @returns 处理后的结果
   */
  transform(value: Array<unknown>, ...args: unknown[]): Array<unknown> {
    if (args.length == 0 || args[0] === 'asc') {
      return value.sort();
    } else if (args[0] === 'desc') {
      return value.sort().reverse();
    }
    return value;
  }
}

