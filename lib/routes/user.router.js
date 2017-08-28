import express from 'express';
import User from '../models/user.model';
// import { error as ERROR } from '../config/message';

const router = new express.Router();

router.post('/', (req, res) => {
  new User(req.body).save()
    .then(n => res.json(n))
    .catch(err => res.json({ errors: err.errors }));
});

module.exports = router;
