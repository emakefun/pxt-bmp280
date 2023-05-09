// tests go here; this will not be compiled when this package is used as an extension.
BMP280.em_initBmp280()
BMP280.em_bmp280_Address(BMP280_I2C_ADDRESS.ADDR_0x76)
basic.forever(function () {
    basic.showString("" + (BMP280.em_pressure()))
    basic.showString("" + (BMP280.em_temperature()))
})
