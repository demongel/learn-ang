import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

/**
 * 自定义了一个UsernameValidator类，里面包含一个静态的方法，
 * 该方法接收一个AbstractControl类的参数，表示当前绑定控件的模型实例。
 * 判断该模型实例的值中是否有空格，
 * 如果有空格，返回ValidationErrors类的对象，否则返回null。
 */
export class UsernameValidator {
    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf(' ') >= 0) {
            return { cannotContainSpace: true }
        }
        return null;
    }
}



