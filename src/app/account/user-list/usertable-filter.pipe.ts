import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "usertableFilter"
})
export class UserTableFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.email.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }
        return array;
    }
}