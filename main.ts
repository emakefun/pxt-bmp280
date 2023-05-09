/**
 * makecode BMP280 digital pressure sensor Package.
 * From microbit/micropython Chinese community.
 * http://www.micropython.org.cn
 */

enum BMP280_I2C_ADDRESS {
    //% block="0x76"
    ADDR_0x76 = 0x76,
    //% block="0x77"
    ADDR_0x77 = 0x77
}
/**
 * BMP280 block
 */
//% weight=100 color=#70c0f0 icon="\uf042" block="BMP280"
namespace BMP280 {
    let BMP280_I2C_ADDR = BMP280_I2C_ADDRESS.ADDR_0x76
    let dig_T1 = 0
    let dig_T2 = 0
    let dig_T3 = 0
    let dig_P1 = 0
    let dig_P2 = 0
    let dig_P3 = 0
    let dig_P4 = 0
    let dig_P5 = 0
    let dig_P6 = 0
    let dig_P7 = 0
    let dig_P8 = 0
    let dig_P9 = 0
    let T = 0
    let P = 0

    function setreg(reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = dat;
        pins.i2cWriteBuffer(BMP280_I2C_ADDR, buf);
    }

    function getreg(reg: number): number {
        pins.i2cWriteNumber(BMP280_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(BMP280_I2C_ADDR, NumberFormat.UInt8BE);
    }

    function getUInt16LE(reg: number): number {
        pins.i2cWriteNumber(BMP280_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(BMP280_I2C_ADDR, NumberFormat.UInt16LE);
    }

    function getInt16LE(reg: number): number {
        pins.i2cWriteNumber(BMP280_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(BMP280_I2C_ADDR, NumberFormat.Int16LE);
    }

    function get(): void {
        let adc_T = (getreg(0xFA) << 12) + (getreg(0xFB) << 4) + (getreg(0xFC) >> 4)
        let var1 = (((adc_T >> 3) - (dig_T1 << 1)) * dig_T2) >> 11
        let var2 = (((((adc_T >> 4) - dig_T1) * ((adc_T >> 4) - dig_T1)) >> 12) * dig_T3) >> 14
        let t = var1 + var2
        T = Math.idiv(((t * 5 + 128) >> 8), 100)
        var1 = (t >> 1) - 64000
        var2 = (((var1 >> 2) * (var1 >> 2)) >> 11) * dig_P6
        var2 = var2 + ((var1 * dig_P5) << 1)
        var2 = (var2 >> 2) + (dig_P4 << 16)
        var1 = (((dig_P3 * ((var1 >> 2) * (var1 >> 2)) >> 13) >> 3) + (((dig_P2) * var1) >> 1)) >> 18
        var1 = ((32768 + var1) * dig_P1) >> 15
        if (var1 == 0)
            return; // avoid exception caused by division by zero
        let adc_P = (getreg(0xF7) << 12) + (getreg(0xF8) << 4) + (getreg(0xF9) >> 4)
        let _p = ((1048576 - adc_P) - (var2 >> 12)) * 3125
        _p = Math.idiv(_p, var1) * 2;
        var1 = (dig_P9 * (((_p >> 3) * (_p >> 3)) >> 13)) >> 12
        var2 = (((_p >> 2)) * dig_P8) >> 13
        P = _p + ((var1 + var2 + dig_P7) >> 4)
    }

    /**
     * get pressure
     */
    //% blockId="BMP280_GET_PRESSURE" block="get pressure"
    //% weight=86 blockGap=8
    export function em_pressure(): number {
        get();
        return P;
    }

    /**
     * get temperature
     */
    //% blockId="BMP280_GET_TEMPERATURE" block="get temperature"
    //% weight=87 blockGap=8
    export function em_temperature(): number {
        get();
        return T;
    }

    /**
     * initBmp280
     */
    //% blockId="BMP280_init" block="init"
    //% weight=89 blockGap=8
    export function em_initBmp280() {
        dig_T1 = getUInt16LE(0x88)
        dig_T2 = getInt16LE(0x8A)
        dig_T3 = getInt16LE(0x8C)
        dig_P1 = getUInt16LE(0x8E)
        dig_P2 = getInt16LE(0x90)
        dig_P3 = getInt16LE(0x92)
        dig_P4 = getInt16LE(0x94)
        dig_P5 = getInt16LE(0x96)
        dig_P6 = getInt16LE(0x98)
        dig_P7 = getInt16LE(0x9A)
        dig_P8 = getInt16LE(0x9C)
        dig_P9 = getInt16LE(0x9E)
        setreg(0xF4, 0x57)
        setreg(0xF5, 0x14)
        T = 0
        P = 0
    }

    /**
     * set I2C address
     */
    //% blockId="BMP280_SET_ADDRESS" block="set address %addr"
    //% weight=88 blockGap=8
    export function em_bmp280_Address(addr: BMP280_I2C_ADDRESS) {
        BMP280_I2C_ADDR = addr
    }
}
