import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../lib/server';
import User from '../lib/models/user.model';
import mailchimp from '../lib/utils/mailchimp';

const expect = chai.expect;

chai.use(chaiHttp);

describe('USER:', () => {
  const email = 'teszt7@gmail.com';

  beforeEach(async () => {
    await mailchimp.deleteAll();
    await User.remove({});
  });

  describe('- Subscribe a user:', () => {
    it('Should get back the new user, if every parameter is valid.', async () => {
      const newUser = new User({ name: 'Test User', email });
      const result = await chai.request(server).post('/api/user').send(newUser);
      console.log(result.body);
      expect(result.body.name).to.equal('Test User');
      expect(result.body.email).to.equal(email);
      expect(await User.count({})).to.equal(1);
    });

    it('Should get back an error, if email parameter is empty.', async () => {
      const newUser = new User({ name: 'Test User' });
      const result = await chai.request(server).post('/api/user').send(newUser);
      expect(result.body.errors.email.message).to.equal('Path `email` is required.');
      expect(await User.count({})).to.equal(0);
    });

    it('Should get back an error, if email parameter is not valid.', async () => {
      const invalidEmail = 'testuser.com';
      const newUser = new User({ name: 'Test User', email: invalidEmail });
      const result = await chai.request(server).post('/api/user').send(newUser);
      expect(result.body.errors.email.message).to.equal(`${invalidEmail} is not a valid email address!`);
      expect(await User.count({})).to.equal(0);
    });

    it('Should get back an error, if email is already exist.', async () => {
      const newUser = new User({ name: 'Test User', email });
      const result1 = await chai.request(server).post('/api/user').send(newUser);
      expect(result1.body.name).to.equal('Test User');
      const result2 = await chai.request(server).post('/api/user').send(newUser);
      expect(result2.body.errors).to.equal(`${newUser.email} is already a list member. Use PUT to insert or update list members.`);
      expect(await User.count({})).to.equal(1);
    });
  });
});
