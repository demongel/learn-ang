
1. Provider 
```ts
type Provider = TypeProvider | ValueProvider | ClassProvider | ConstructorProvider | 
ExistingProvider | FactoryProvider | any[];
```

##### 配置方法
1. 在服务本身的@Injectable()装饰器中。
- 在服务本身的@Injectable()装饰器中仅有一个元数据的providedIn属性，用户可以用它来选择不同的注入器，配置提供商的属性为默认值。其实对服务来说，提供商就是它自己。因此，Angular默认通过调用该服务类的new运算符来创建服务实例。


2. 在模块类的@NgModule()装饰器中。
3. 在组件类的@Component()装饰器中。
- 在@NgModule()装饰器和@Component()装饰器的元数据中都提供了providers属性，用户可以通过该属性来配置提供商。

- 当使用@NgModule()装饰器中的providers属性配置提供商时，该服务实例对该NgModule类中的所有组件是可见的，该NgModule类中的所有组件都可以注入它。

- 当使用@Component()装饰器中的providers属性配置提供商时，该服务实例只对声明它的组件及其子组件可见，它会为该组件的每一个新实例提供该服务的一个新实例。

##### 不同的Provider
1. TypeProvider
- TypeProvider称为类型提供商，类型提供商用于告诉注入器使用指定的类来创建服务实例，本质上是通过调用类的new运算符来创建服务实例。这也是我们用得最多的一种提供商。

```ts
providers: [ LogService ] // LogService是一个由@Injectable()装饰器声明的类
```
- 在上面的代码中，配置的依赖项是一个LogService类的服务实例，而该类的类型LogService是该依赖的token值。

2. ValueProvider
```ts
export declare interface ValueProvider extends ValueSansProvider {
    /**
     * An injection token. Typically an instance of `Type` or `InjectionToken`, but can be `any`.
     */
    provide: any;
    /**
     * When true, injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     */
    multi?: boolean
}
```
- 其中的provide属性接收3种类型的token值：Type 、InjectionToken对象实例及其他任何对象实例。

- 当provide属性的token值为类和对象实例时，参考下面的代码片段。

```ts
const JAVA_BOOK = new Book('Learning Java', 'Java');
providers: [
  {provide: String, useValue: 'Hello'},  // 注入的依赖为字符串值，String类作为该依赖的token值
  {provide: 'name', useValue: 'Hello'},  // 注入的依赖为字符串值，字符串对象实例name作为该依赖的token值
  {provide: Book, useValue: JAVA_BOOK}  // 注入的依赖为Book对象实例，Book对象实例作为该依赖的token值
]
```

- InjectionToken类用来创建InjectionToken对象实例，该类的定义如下。
```ts
class InjectionToken<T> { //接收一个泛型（T）对象
   constructor(
     _desc: string,  // 一个描述（_desc）参数
     options?: { providedIn?: Type<any> | "root" | "platform" | "any"; factory: () => T; }
   )
   protected _desc: string
   toString(): string
}
```
- InjectionToken类接收一个泛型对象和一个描述参数。当provide属性为InjectionToken对象实例时，useValue属性接收的类型取决于InjectionToken类中的泛型对象类型
```ts
const HELLO_MESSAGE = new InjectionToken<string>('Hello!'); // 创建一个字符串类型的可注入对象
providers: [{
  provide: HELLO_MESSAGE,
  useValue: 'Hello World!' // 接收一个字符串，与InjectionToken类的泛型对象string对应
}]
```

- Angular中的接口其实是TypeScript的功能，而JavaScript没有接口，所以当TypeScript转译成JavaScript时，接口也就消失了。因此，InjectionToken类常用于封装接口类型的对象实例，代码如下。
```ts
interface Conﬁg { // Conﬁg是一个接口
  apiEndPoint: string;
  timeout: number;
}
const conﬁgValue: Conﬁg = { // 定义一个接口类型实例
  apiEndPoint: 'def.com',
  timeout: 5000
};
// 定义一个InjectionToken类对象实例，实际是封装Conﬁg接口
const conﬁgToken = new InjectionToken<Conﬁg>('demo token');
providers: [{
  provide: conﬁgToken, useValue: conﬁgValue // 使用conﬁgToken作为依赖的token值
}]
```

3. ClassProvider
- ClassProvider称为类提供商，ClassProvider与ValueProvider类似，它的provide属性接收值与ValueProvider提供商相同，不同的是useClass属性接收一个类，或者该类的子类。
```ts
providers: [{
  provide: LogService,
  useClass: LogService
}]
```
- 在上面的代码中，依赖项的值是一个LogService类的实例，而该类的类型LogService是该依赖的token值

4. ConstructorProvider
- ConstructorProvider可以理解为等同TypeProvider，它仅有provide属性，且接收一个类。
```ts
providers: [{
  provide: LogService
}]
```
- 在上面的代码中，依赖项的值是一个LogService类的实例，而该类的类型LogService是该依赖的token值。

- ConstructorProvider 和 TypeProvider 是 Angular 中两种不同的 provider 类型，它们都可以用来配置注入器，让它根据一个 token 返回一个实例。它们的区别在于：

- ConstructorProvider 的 provide 属性必须是一个类类型（Type<any>），而 TypeProvider 可以是任何类型的 token（any）。
- ConstructorProvider 的 useClass 属性被省略了，因为它默认就是 provide 属性的值，也就是说，它总是使用 provide 指定的类来创建实例。而 TypeProvider 的 useClass 属性可以指定一个不同的类来创建实例。
- ConstructorProvider 的 deps 属性可以指定一个依赖项数组，用来传递给构造函数。而 TypeProvider 的 deps 属性被省略了，因为它默认就是 useClass 指定的类的构造函数参数。

5. ExistingProvider
- ExistingProvider用于创建别名提供商。假设老的组件依赖于OldLogger类。OldLogger类和NewLogger类的接口相同，但是由于某种原因，我们没法修改老的组件来使用NewLogger类，这时可以使用useExisting为OldLogger类指定一个别名NewLogger。

```ts
[ NewLogger, {
  provide: OldLogger,
  useExisting: NewLogger
}]
```
- 上述配置中，使用NewLogger作为OldLogger类的别名。

6. FactoryProvider
- 有时候可能需要动态创建依赖值，创建时需要的信息要等运行期间才能获取。这时可以使用FactoryProvider。FactoryProvider使用useFactory属性来配置该注入器。useFactory属性接收一个函数。

```ts
providers: [{
   provide: LogService,
   useFactory: () => new LogService()
}]
```
- 在上面的代码中，依赖项的值是useFactory属性中的函数返回的对象实例，LogService类是该依赖的token值。



