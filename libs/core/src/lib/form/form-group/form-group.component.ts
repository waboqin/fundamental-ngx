import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

/**
 * Represents a form group element.
 *
 * ```html
 * <fd-form-group>
 *     <div fd-form-item [isCheck]="true">
 *         <input fd-form-control type="radio" checked>
 *         <fd-form-label>Option One</fd-form-label>
 *     </div>
 * </fd-form-group>
 * ```
 */
@Component({
    selector: 'fd-form-group',
    templateUrl: './form-group.component.html',
    styleUrls: ['./form-group.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FormGroupComponent {

    /** @hidden */
    @HostBinding('class.fd-form__group')
    fdFormGroupClass: boolean = true;
}
