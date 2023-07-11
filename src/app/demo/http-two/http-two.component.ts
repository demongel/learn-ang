import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hero } from 'src/app/shared/hero';
import { HeroService } from 'src/app/shared/hero.service';

@Component({
  selector: 'app-http-two',
  templateUrl: './http-two.component.html',
  styleUrls: ['./http-two.component.css']
})
export class HttpTwoComponent {

  title = '测试 增删改查';
  heroes: Hero[];
  formGroup: FormGroup;

  constructor(private heroService: HeroService, private fb: FormBuilder) { };

  ngOnInit() {
    this.getHeroes();

    // 创建包含 id  和 name 的表单
    this.formGroup = this.fb.group({ // 初始化表单
      id: this.fb.control('', Validators.required),
      name: this.fb.control('', Validators.required)
    });
  }

  getHeroes() {
    // 获取已有数据
    this.heroService.getHeroes().subscribe(
      data => this.heroes = data
    )
  }

  updateHero(hero: Hero) {
    this.heroService.updateHero(hero).subscribe((data) => {
      console.log("Hero updated: ", data);
      this.getHeroes();
    })
  }

  deleteHero(id: number) {
    this.heroService.deleteHero(id).subscribe((data) => {
      console.log("Hero deleted: ", data);
      this.getHeroes();
    })
  }

  onSubmit() {
    const hero = this.formGroup.value;
    hero.id = Number(hero.id); // 页面返回的是字符型ID，需要转换为数值
    this.heroService.addHero(hero).subscribe(
      hero => {
        if (hero) {
          this.getHeroes();
        } else {
          alert('发生了错误！')
        }
        this.formGroup.reset();
      }
    );
  }

}
