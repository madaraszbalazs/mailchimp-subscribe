import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../lib/server';
import User from '../lib/models/user.model';

const expect = chai.expect;

chai.use(chaiHttp);

describe('USER:', () => {
  beforeEach(async () => {
    await User.remove({});
  });

  describe('- Subscribe a user:', () => {
    it('Should get back the new user, if every parameter is valid.', async () => {
      const newUser = new User({ name: 'Test User', email: 'test@user.com' });
      const result = await chai.request(server).post('/api/user').send(newUser);
      expect(result.body.name).to.equal('Test User');
      expect(result.body.email).to.equal('test@user.com');
      expect(await User.count({})).to.equal(1);
    });

    it('Should get back an error, if name parameter is empty.', async () => {
      const newUser = new User({ email: 'test@user.com' });
      const result = await chai.request(server).post('/api/user').send(newUser);
      expect(result.body.errors.name.message).to.equal('Path `name` is required.');
      expect(await User.count({})).to.equal(0);
    });

    it('Should get back an error, if email parameter is not valid.', async () => {
      const email = 'testuser.com';
      const newUser = new User({ name: 'Test User', email });
      const result = await chai.request(server).post('/api/user').send(newUser);
      expect(result.body.errors.email.message).to.equal(`${email} is not a valid email address!`);
      expect(await User.count({})).to.equal(0);
    });
  });
});
