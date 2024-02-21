import { FormControl, FormGroup } from '@angular/forms';

export interface UserForm {
  email: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}
