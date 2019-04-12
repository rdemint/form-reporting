import { HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { finalize, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
	ok: string; 

	intercept(req: HttpRequest<any>, next: HttpHandler){
		return next.handle(req)
			.pipe(
				tap(
					event => this.ok = "success",
					error => {
						//console.log(error.error["non_field_errors"]);
						// could use the above to pass into the form
						// as the error message is from custom validator on backend
					}
					),
				finalize( ()=> {
					// you could pass something to some service here
					// finalize is always run when response is received
				}
				)
			)
	}
}