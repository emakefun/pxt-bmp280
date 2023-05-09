
> Open this page at [bmp280](https://test-doc-zh-cn.readthedocs.io/projects/emakefun/zh_CN/latest/sensors/sensors/atmospheric_pressure_sensor/)

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/emakefun/pxt-bmp280** and import

## Edit this project 

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/emakefun/pxt-bmp280** and click import

## Blocks preview

This image shows the blocks code from the last commit in master.
This image may take a few minutes to refresh.

![A rendered view of the blocks](https://github.com/emakefun/pxt-bmp280/raw/master/.github/makecode/blocks.png)

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
## Example [Click to view](https://makecode.microbit.org/_4h2bHVd8L25z)
```
    BMP280.em_initBmp280()
    BMP280.em_bmp280_Address(BMP280_I2C_ADDRESS.ADDR_0x76)
    basic.forever(function () {
        basic.showString("" + (BMP280.em_pressure()))
        basic.showString("" + (BMP280.em_temperature()))
    })
```