/*
 * Pressure.h
 *
 *  Created on: 23 de out de 2016
 *      Author: Felipe
 */

#ifndef SRC_PRESSURE_H_
#define SRC_PRESSURE_H_

void PInitialization(void);

uint16_t PReadCommand();
uint16_t PReadValue();
uint16_t PRead();

uint16_t PSOC();

#endif /* SRC_PRESSURE_H_ */
