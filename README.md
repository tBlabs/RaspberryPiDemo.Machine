# Setup

## Software
- This code works with Raspberry Pi 3 with Jessie Lite OS
- Install `node 8.2.1` and `npm 5.3`
  - `curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash`
  - `source ~/.bashrc`
  - `nvm install stable`
  - `sudo npm i npm -g`
  - Test the installation with `node -v` and `npm -v`
- Install `mpc` and `mpd` (`sudo apt-get install mpc mpd`)
- Clone this repo to Raspberry Pi machine (`git clone https://github.com/tBlabs/RaspberryPiDemo.Machine`) 
- Create manually `.env` file in there with entry `HOST={url of server side}` (copy link directly from browser address bar)
- Run `npm i` to install `node_modules`
- Execute main script (machine.js) without sudo permissions (GPIO will not start with `sudo`) or add entry `./startup.sh` to `.bashrc` file

## Hardware
- Connect led to GPIO 17
- Connect speakers to audio output


# Raspberry Pi setup
- Download `Jessie Lite` from https://www.raspberrypi.org/downloads/raspbian/
- Burn OS image with `Etcher` https://www.raspberrypi.org/documentation/installation/installing-images/README.md
- Put SD card to Raspberry and power on
- Login with `pi` and `raspberry` password
- Open config with `sudo raspi-config`
- In `Boot Options` select `Desktop / CLI` and then `Console Autologin`
- In `Interfacing Options` enable SSH if you gonna use it
- `Change User Password` and `Hostname` to `pi` if you like
- Switch to "normal keyboard layout" with `sudo nano /etc/default/keyboard` and change `XKBLAYOUT="gb"` on `XKBLAYOUT="us"`. Exit nano with `Ctrl+X` and then `Y` and then `Enter` (`^X` = `Ctrl+X`)
- Reboot with `sudo reboot`
- Enable wifi by adding entry to `/etc/wpa_supplicant/wpa_supplicant.conf` at the end: `network={<new line><tab>ssid="<network name>"<new line><tab>psk="<password>"<new line>}`
- Reboot again
- Test internet connection with `ping www.wp.pl`. Interrupt with `Ctrl+C`
- Now Raspberry is ready to action :)

### Enable SSH

#### Raspberry
- In command line write `hostname -I` to obtain Raspberry IP
- Enable SSH (if you didn't already): `sudo raspi-config` > `Interfacing Options` > enable SSH 

#### Ubuntu
- Use obtained IP with command `ssh pi@<raspberry IP>`
- Enter password `pi`
- You can now control your Raspberry from your terminal
- Exit with `exit` command
