import {Component, Input} from "angular2/src/core/metadata";

@Component({
    selector: 'spinner',
    templateUrl: 'app/spinner.component.html'
})
export class SpinnerComponent {
    @Input() visible = true;

}