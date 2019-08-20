import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import * as moment from 'moment';
import { isNumber, padNumber, toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

export abstract class NgbDateMmParserFormatter extends NgbDateParserFormatter {
	abstract parse( value: string ): NgbDateStruct;

	abstract format( date: NgbDateStruct ): string;
}

@Injectable()
export class NgbDateMomentParserFormatter extends NgbDateMmParserFormatter {
	constructor( private momentFormat: string ) {
		super();
	}

	parse( value: string ): NgbDateStruct {
		if ( value ) {
			// Solution 1
			const d = moment( value ).format( this.momentFormat );
			const dateParts = d.trim().split( '/' || '-' );

			if ( dateParts.length === 1 && isNumber( dateParts[0] ) ) {
				return {
					year: toInteger( dateParts[0] ),
					month: null,
					day: null
				};

				//return new NgbDate(toInteger(dateParts[0]), null, null);
			} else if ( dateParts.length === 2 && isNumber( dateParts[0] && isNumber( dateParts[1] ) ) ) {
				return {
					year: toInteger( dateParts[0] ),
					month: toInteger( dateParts[1] ),
					day: null
				};

				//return new NgbDate(toInteger(dateParts[0]), toInteger(dateParts[1]) - 1, null);
			} else if ( dateParts.length === 3 && isNumber( dateParts[0] && isNumber( dateParts[1] ) && isNumber( dateParts[2] ) ) ) {
				return {
					year: toInteger( dateParts[0] ),
					month: toInteger( dateParts[1] ),
					day: toInteger( dateParts[2] )
				};

				//return new NgbDate(toInteger(dateParts[0]), toInteger(dateParts[1]) - 1, toInteger(dateParts[2]));
			}

			// Solution 2
			/*const d2 = moment( value, this.momentFormat );
			return d2.isValid() ? {
				year: d2.year(),
				month: d2.month() + 1,
				day: d2.day()
			} : null;*/
		}

		return null;
	}

	format( date: NgbDateStruct ): string {
		if ( date ) {
			// Solution 1
			return `${isNumber(date.day) ? padNumber(date.day) : ''}/
				${isNumber(date.month) ? padNumber(date.month) : ''}/
				${isNumber(date.year) ? padNumber(date.year) : ''
			}`;

			// Solution 2
			/*const d2 = moment( {
				year: date.year,
				month: date.month - 1,
				day: date.day
			} );

			return d2.isValid() ? d2.format( this.momentFormat ) : '';*/
		}

		return '';
	}
}

/**
 * And in a module, you include the provider using a factory to indicate the date format as a parameter
 *
 *  @NgModule({
        ---
		providers: [
		{
            provide: NgbDateAdapter,
            useFactory: () => { return new NgbDateMomentAdapter("DD/MM/YYYY") }
        }
        {
            provide: NgbDateParserFormatter,
            useFactory: () => { return new NgbDateMomentParserFormatter("DD/MM/YYYY") }
        }
        ]
        ---
	})
 */
