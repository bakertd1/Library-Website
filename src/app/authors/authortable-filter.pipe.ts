import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "authorTableFilter"
})
export class AuthorTableFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.firstName.toLowerCase().indexOf(query.toLowerCase()) > -1 
                                        || row.lastName.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }
        return array;
    }
}