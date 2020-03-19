# dCloud Webex Contact Center v3 Toolbox UI
This is the website UI code for the dCloud Webex Contact Center v3 Toolbox. It allows users to configure the Brand demo website (mm-brand.cxdemo.net).

## Installation
```sh
git clone https://github.com/ccondry/webex-v3prod-toolbox-ui.git
cd webex-v3prod-toolbox-ui
npm install
```

## Build/Run in Development
```sh
npm run dev
```

## Build/Run in Production
Copy files to your www/html folder (or wherever you have your web server pointing to).
```sh
npm run build
cp webex-v3prod-toolbox-ui/dist/* /var/www/html/
```
