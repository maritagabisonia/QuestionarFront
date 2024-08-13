import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { SignUp } from '../../Models/SignUp';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast'; 



@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FloatLabelModule,InputTextModule,FormsModule,ButtonModule,ReactiveFormsModule,PasswordModule,ToastModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  providers: [ MessageService]

})
export class SignUpComponent {
  SignUpForm:FormGroup;
  SignUp: SignUp= new SignUp()


  constructor(private fb: FormBuilder,public userService:UserService,private router: Router,private messageService: MessageService){
    this.SignUpForm = this.fb.group({
      firstName: ['', this.validateFirstName],
      username:  ['', Validators.required],
      password:  ['', this.validatePassword],
      roleid: [1, Validators.required],
  });
  }
  
  validateFirstName(control: AbstractControl): ValidationErrors | null {
    return control.value.length < 3 || control.value.length > 7 ? { wrongUserName: { value: control.value } } : null;

  }
  validatePassword(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
  
    if (password.length < 8) {
      return { shortPassword: { value: password } };
    }
  
    if (!/[A-Z]/.test(password)) {
      return { missingUppercase: { value: password } };
    }
  
    if (!/[a-z]/.test(password)) {
      return { missingLowercase: { value: password } };
    }
  
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return { missingSpecialCharacter: { value: password } };
    }
  
    return null;  // Password is valid
  }


  signUp(): void {
    Object.assign(this.SignUp, this.SignUpForm.value);
    this.userService.registerUser(this.SignUp).subscribe({
      next: res => {
        console.log("res")
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      error: err => {
        console.error('Error during login:', err);
      }
    });
  }
}
