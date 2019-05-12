// require('dotenv').config()

import mongoose from 'mongoose';
const uri = process.env.DB_URI;
const SubscriptionSchema = new mongoose.Schema({
  userId: String,
  subscriptionId: String,
  accessToken: String,
  resource: String,
  clientState: String,
  changeType: String,
  notificationUrl: String,
  subscriptionExpirationDateTime: String
})

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

/**
 * Create MongoDB
 */
export function createDatabase() {
  return mongoose.connect(uri, { useNewUrlParser: true })
}

export function getSubscription(subscriptionId, callback) {
  Subscription.findOne({subscriptionId: subscriptionId}, callback)
}

export function saveSubscription(subscriptionData, callback) {
  Subscription.create({
    userId: subscriptionData.userId,
    subscriptionId: subscriptionData.id,
    accessToken: subscriptionData.accessToken,
    resource: subscriptionData.resource,
    clientState: subscriptionData.clientState,
    changeType: subscriptionData.changeType,
    notificationUrl: subscriptionData.notificationUrl,
    subscriptionExpirationDateTime: subscriptionData.expirationDateTime
  }, callback);  
}

export function deleteSubscription(subscriptionId) {
  Subscription.deleteOne({subscriptionId: subscriptionId}, function (err) {
    if (!err) console.log('Deleted Subscription ' + subscriptionId)
  });
}
