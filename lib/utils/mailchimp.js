/* eslint func-names: 0 */
import Mailchimp from 'mailchimp-api-v3';
import config from '../config/config';
import User from '../models/user.model';

const mailchimp = new Mailchimp(config.mailchimp_api_key);

exports.add = function (user) {
  return new Promise((resolve, reject) => {
    mailchimp.post(`/lists/${config.mailchimp_list_id}/members/`, {
      email_address: user.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: user.name,
      },
    }).then((results) => {
      resolve(results);
    }).catch((err) => {
      reject(err);
    });
  });
};

exports.delete = function (user) {
  return new Promise((resolve, reject) => {
    mailchimp.delete(`/lists/${config.mailchimp_list_id}/members/${user.mailchimp_id}`)
      .then((results) => {
        resolve(results);
      }).catch((err) => {
        reject(err);
      });
  });
};

exports.deleteAll = function () {
  return new Promise((resolve, reject) => {
    const promArr = [];
    User.find({}).then((users) => {
      if (users.length > 0) {
        users.forEach((user) => {
          promArr.push(this.delete(user));
        });
      }
      Promise.all(promArr).then(() => {
        resolve();
      }).catch((err) => { reject(err); });
    });
  });
};
