exports.adalConfiguration = {
  authority: 'https://login.microsoftonline.com/common',
  clientID: '199bd2e4-865b-4df0-bea1-a80f3285dc70',
  clientSecret: 'process.env.CLIENT_SECRET',
  redirectUri: 'https://get-vultured.herokuapp.com/'
};

exports.subscriptionConfiguration = {
  changeType: 'Created',
  notificationUrl: 'https://get-vultured.herokuapp.com/listen',
  resource: 'me/mailFolders(\'Inbox\')/messages',
  clientState: process.env.CLIENT_STATE
};
