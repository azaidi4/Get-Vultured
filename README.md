# Vulture API

![Vulture](./vulture.png)

Vulture is the product of many frustrating moments when **someone** swoops in taking that shift which would otherwise fit your schedule perfectly.
  
## The Works

Vulture uses [Microsoft Graph](https://docs.microsoft.com/en-us/graph/webhooks?toc=.%2Fref%2Ftoc.json&view=graph-rest-beta) to listen for notifications regarding dropped shifts in your email. It uses [pupeteer](https://pptr.dev/) to pick them up. A sample email body such as this would do the works:

```
SUBJECT:  Hours Changed - Ahmad Zaidi
BODY:     8:00 am - 9:00 am AVAILABLE on SUN, 05/05/2019
          9:00 am - 10:00 am AVAILABLE on SUN, 05/05/2019
```
 

> Note that Vulture only parses emails if **someone else** drops shifts and the person dropping them **isn't you**.  
> Since Vulture uses puppeteer to mock a user picking up shifts. This will **NOT** work for your place of employment.

 
 ## Usage
 
 1. Sign in with your **work** email.
 2. That all!! Vulture will automatically pick up shifts when someone drops them.
 3. To stop Vulture, press the big **red** button, you know which one...
 
 ## Acknowledgements
 
Vulture uses Microsoft's nodejs-webhooks-rest-example to receive notifications, you can find their starter template [here](https://github.com/microsoftgraph/nodejs-webhooks-rest-sample). 
The web app is styled using [mui-css](https://www.muicss.com/) and the Vulture logo was obtained from [flaticon](https://www.flaticon.com/free-icon/vulture_141724). 
