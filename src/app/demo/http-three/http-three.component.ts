import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hero } from 'src/app/shared/hero';
import { OwnService } from 'src/app/shared/own.service';

@Component({
  selector: 'app-http-three',
  templateUrl: './http-three.component.html',
  styleUrls: ['./http-three.component.css']
})
export class HttpThreeComponent {
  title = "测试json-server"
  heroes: Hero[];
  formGroup: FormGroup;

  constructor(private ownService: OwnService, private fb: FormBuilder) { };

  ngOnInit() {
    // 创建包含 id  和 name 的表单
    this.formGroup = this.fb.group({ // 初始化表单
      id: this.fb.control('', Validators.required),
      name: this.fb.control('', Validators.required)
    });

    this.getDatas()
  }


  getDatas() {
    this.ownService.getHeroes().subscribe(
      data => {
        this.heroes = data
        console.log(data)
      }
    )
  }

  updateHero(hero: Hero) {
    this.ownService.updateHero(hero).subscribe((data) => {
      console.log("Hero updated: ", data);
      this.getDatas();
    })
  }

  deleteHero(id: number) {
    this.ownService.deleteHero(id).subscribe((data) => {
      console.log("Hero deleted: ", data);
      this.getDatas();
    })
  }


  onSubmit(id: string) {
    const hero = this.formGroup.value;
    hero.id = Number(hero.id); // 页面返回的是字符型ID，需要转换为数值

    let hero$;
    if (id === 'add') {
      hero$ = this.ownService.addHero(hero)
    } else if (id === 'update') {
      hero$ = this.ownService.updateHero(hero)
    }
    hero$?.subscribe(
      hero => {
        if (hero) {
          console.log(JSON.stringify(hero));
          this.getDatas()
        } else {
          console.log("发生了错误");
        }
        this.formGroup.reset();
      }
    );

  }


}
