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
