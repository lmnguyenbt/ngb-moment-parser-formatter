import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import * as moment from 'moment';
import { isNumber, padNumber, toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

export abstract class NgbDateMmAdapter extends NgbDateAdapter<string> {
	/**
	 * Converts user-model date into an NgbDateStruct for internal use in the library
	 * @param  {any}     value any value that end user uses as the date model, ie: NgbDateStruct, Date, "yyyy-mm-dd"
	 * @return {NgbDateStruct}
	 */
	abstract fromModel(value: string): NgbDateStruct;

	/**
	 * Converts internal date value NgbDateStruct to user-model date
	 * The returned type is suposed to be of the same type as fromModel() input-value param
	 * @param  {NgbDateStruct} date internal NgbDateStruct date representation
	 * @return {any}
	 */
	abstract toModel(date: NgbDateStruct): string;
}

@Injectable()
export class NgbDateMomentAdapter extends NgbDateMmAdapter {
	constructor( private momentFormat: string ) {
		super();
	}

	/**
	 * Converts a NgbDateStruct value into NgbDateStruct value
	 * @param  {NgbDateStruct} value
	 * @return {NgbDateStruct}
	 */
	/*fromModel(date: NgbDateStruct): NgbDateStruct {
		return date ? {year: date.year, month: date.month, day: date.day || 1} : null;
	}*/
	fromModel(date: string): NgbDateStruct  {
		if ( date ) {
			const d = moment(new Date(date)).format(this.momentFormat);
			const dateParts = d.trim().split( '/' || '-' );

			return {
				year: isNumber(dateParts[0]),
				month: isNumber(dateParts[1]),
				day: isNumber(dateParts[2])
			};
		}

		return null;
	}

	/**
	 * Converts a NgbDateStruct value into NgbDateStruct value
	 * @param  {NgbDateStruct} value
	 * @return {NgbDateStruct}
	 */
	/*toModel(date: NgbDateStruct): NgbDateStruct {
		return date ? {year: date.year, month: date.month, day: date.day || 1} : null;
	}*/
	toModel(date: NgbDateStruct): string {
		if ( date ) {
			return moment([date.year, date.month - 1, date.day]).format(this.momentFormat);
		}

		return null;
	}
}
