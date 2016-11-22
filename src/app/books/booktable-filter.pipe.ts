import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "booktableFilter"
})
export class BookTableFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.title.toLowerCase().indexOf(query.toLowerCase()) > -1 
                                        || row.author.firstName.toLowerCase().indexOf(query.toLowerCase()) > -1 
                                        || row.author.lastName.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }
        return array;
    }
}