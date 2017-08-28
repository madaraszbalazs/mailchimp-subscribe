import express from 'express';
import User from '../models/user.model';
import mailchimp from '../utils/mailchimp';

const router = new express.Router();

router.post('/', async (req, res) => {
  const newUser = new User(req.body);
  newUser.validate((err) => {
    if (err) { return res.json({ errors: err.errors }); }
    return mailchimp.add(newUser).then((mc) => {
      newUser.mailchimp_id = mc.id;
      newUser.save().then(user => res.json(user))
        .catch((err2) => { res.json({ errors: err2.errors }); });
    }).catch((error) => { res.json({ errors: error.detail }); });
  });
});

module.exports = router;
