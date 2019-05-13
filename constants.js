// Uncomment for development
// require('dotenv').config();

exports.adalConfiguration = {
  authority: 'https://login.microsoftonline.com/common',
  clientID: '199bd2e4-865b-4df0-bea1-a80f3285dc70',
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: (process.env.NODE_ENV === 'production') ? 'https://get-vultured.herokuapp.com/callback' : 'http://localhost:3000/callback'
};
exports.subscriptionConfiguration = {
  changeType: 'Created',
  notificationUrl: (process.env.NODE_ENV === 'production') ? 'https://get-vultured.herokuapp.com/listen' : 'https://vorax.serveo.net/listen',
  resource: 'me/mailFolders(\'Inbox\')/messages',
  clientState: process.env.CLIENT_STATE
};

