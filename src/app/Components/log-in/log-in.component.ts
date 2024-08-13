import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { LogIn } from '../../Models/LogIn';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';




@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FloatLabelModule,InputTextModule,FormsModule,ButtonModule,ReactiveFormsModule,PasswordModule,ProgressSpinnerModule,NgIf,ToastModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
  providers: [ MessageService]

})
export class LogInComponent {
  LogInForm:FormGroup;
  UserLogIn:LogIn= new LogIn();
  LoginTry: number = 3;
  isFormLocked: boolean = false;


  constructor( private messageService: MessageService,private fb: FormBuilder,public userService:UserService,private router: Router){
    this.LogInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
  });
  }
  ngOnInit(): void {
    const lockState = localStorage.getItem('isFormLocked');
    if (lockState === 'true') {
      this.isFormLocked = true;
    }
    if (this.isFormLocked) {
      const lockTime = Number(localStorage.getItem('lockTime'));
      const currentTime = new Date().getTime();
      const remainingTime = lockTime - currentTime;

      if (remainingTime > 0) {
        setTimeout(() => {
          this.unlockForm();
        }, remainingTime);
      } else {
        this.unlockForm();
      }
    }
  }

  login(): void {
    
    this.checkLoginTries()
    console.log(this.LoginTry)
    Object.assign(this.UserLogIn, this.LogInForm.value);
    this.userService.LogIn(this.UserLogIn).subscribe({
      next: res => {
        this.LoginTry = 3;
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/admin']);  
      },
      error: err => {
        console.error('Error during login:', err);
        this.messageService.add({severity:'error', summary: 'რაღაც გეშლება.', detail:  `დაგრჩა  ${this.LoginTry-1} ცდა`});

        this.LoginTry --;
      }
    });
  }

  checkLoginTries(){
    if(this.LoginTry<=1){
      this.lockFormForOneMinute();
    }
  }
  lockFormForOneMinute(): void {
    this.isFormLocked = true;
    localStorage.setItem('isFormLocked', 'true');
    const lockTime = new Date().getTime() + 60000; 
    localStorage.setItem('lockTime', lockTime.toString());
    this.messageService.add({severity:'info', summary: 'თქვენ ამოწურეთ 3 ცდა.', detail: ' თავიდან ცდას შეძლებთ 1 წუთში'});


    setTimeout(() => {
      this.unlockForm()
    }, 60000); 
  }
  unlockForm(): void {
    this.isFormLocked = false;
    localStorage.removeItem('isFormLocked');
    localStorage.removeItem('lockTime');

  }
}
