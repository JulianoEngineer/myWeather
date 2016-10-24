/*
 * Light.c
 *
 *  Created on: 23 de out de 2016
 *      Author: Felipe
 */


#include "board.h"

#include "Light.h"


#define SENSORS_I2C          I2C0 // I2C1
#define IOX_INT_PORT        2
#define IOX_INT_PIN         2
#define IOX_INT_GPIO_PORT   5
#define IOX_INT_GPIO_PIN    2
#define IOX_MODE_FUNC    SCU_MODE_FUNC4

#define BH1750_ADDR_WRITE				   0x46	   /* BH1750 Address */
#define BH1750_ADDR_READ				   0x47	   /* BH1750 Address */
#define BH1750_START_CONVERSION	   0x10    /* Start Conversion Command */

#define PININT_INDEX   0	/* PININT index used for GPIO mapping */
#define PININT_IRQ_HANDLER  GPIO0_IRQHandler	/* GPIO interrupt IRQ function name */
#define PININT_NVIC_NAME    PIN_INT0_IRQn	/* GPIO interrupt NVIC interrupt name */


void LInitialization(void)
{
	Board_I2C_Init(SENSORS_I2C);

	/* Initialize I2C */
	Chip_I2C_Init(SENSORS_I2C);
	Chip_I2C_SetClockRate(SENSORS_I2C, 400000);
	Chip_I2C_SetMasterEventHandler(SENSORS_I2C, Chip_I2C_EventHandler);
	NVIC_SetPriority(PININT_NVIC_NAME, 1);
	NVIC_EnableIRQ(SENSORS_I2C == I2C0 ? I2C0_IRQn : I2C1_IRQn);

	iox_init();
}


uint16_t LSOC()
{
	//	const int y = 18;
	uint8_t buf[32] = {0};
	int32_t val;
	int dc; //, df;
	I2C_XFER_T xfer =
	{
			BH1750_ADDR_WRITE >> 1,
			0,
			1,
			0,
			0,
	};
	xfer.txBuff = xfer.rxBuff = &buf[0];
	buf[0] = BH1750_START_CONVERSION;
	Chip_I2C_MasterTransfer(SENSORS_I2C, &xfer);
	if (xfer.status != I2C_STATUS_DONE)
		return 0;
	//	val = (buf[0] << 16) | (buf[1] << 8) | buf[2];
	//	DEBUGOUT("VAL = %d\r\n", val);
	//	val = (val >> 5);
	//	dc = (val * 1000) / 8;
	//	df = ((dc * 9) / 500) + 320;
	//	snprintf((char *) buf, 31, "TMP[C]: %d.%03d", dc / 1000, abs(dc) % 1000);
	//	LCD_FillRect(3, y, LCD_X_RES - 3, y + 8, 0);
	//	LCD_PutStrXY(3, y, (char *)buf);
	//	snprintf((char *) buf, 31, "TMP[F]: %d.%01d%", df / 10, abs(df) % 10);
	//	LCD_FillRect(3, y + 8 + 2, LCD_X_RES - 3, y + 16 + 2, 0);
	//	LCD_PutStrXY(3, y + 8 + 2, (char *)buf);

	return dc;
}

uint16_t LReadCommand()
{
	//	const int y = 18;
	uint8_t buf[32] = {0};
	int32_t val;
	int dc; //, df;
	I2C_XFER_T xfer =
	{
			BH1750_ADDR_READ >> 1,
			0,
			0,
			0,
			2,
	};
	xfer.txBuff = xfer.rxBuff = &buf[0];
	//	buf[0] = 0xF4;
	//	buf[1] = 0x34;
	//	buf[2] = 0xEF;
	Chip_I2C_MasterTransfer(SENSORS_I2C, &xfer);
	if (xfer.status != I2C_STATUS_DONE)
		return 0;
	val = (buf[0] << 8) | buf[1];
	DEBUGOUT("VAL = %d\r\n", val);
	val = (val >> 5);
	dc = (val * 1000) / 8;
	//	df = ((dc * 9) / 500) + 320;
	//	snprintf((char *) buf, 31, "TMP[C]: %d.%03d", dc / 1000, abs(dc) % 1000);
	//	LCD_FillRect(3, y, LCD_X_RES - 3, y + 8, 0);
	//	LCD_PutStrXY(3, y, (char *)buf);
	//	snprintf((char *) buf, 31, "TMP[F]: %d.%01d%", df / 10, abs(df) % 10);
	//	LCD_FillRect(3, y + 8 + 2, LCD_X_RES - 3, y + 16 + 2, 0);
	//	LCD_PutStrXY(3, y + 8 + 2, (char *)buf);

	return dc;
}

uint16_t LRead()
{
	int j;
	LSOC();
	for(j=0; j < 10000; j++); //TODO: Delay of 180ms;

	uint16_t light = LReadCommand();
	return light;
}

