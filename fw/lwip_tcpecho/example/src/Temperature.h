/*
 * Temperature.h
 *
 *  Created on: 24 de set de 2016
 *      Author: Athens
 */

#ifndef SRC_TEMPERATURE_H_
#define SRC_TEMPERATURE_H_


void TSInitialization(void);
uint16_t TSRead();

uint16_t PRead1();
uint16_t PRead2();

uint16_t PSOC();


#endif /* SRC_TEMPERATURE_H_ */
