// New email every run, so "register" never fails with "email already exist"
function randomEmail() {
  return `ayan_${Date.now()}@test.com`;
}

const user = {
  name: 'Ayan',
  password: 'Test@123',
  day: '10',
  month: '5',
  year: '1998',
  firstName: 'Ayan',
  lastName: 'Zulfeqar',
  company: 'QA Ltd',
  address: 'Main Road 1',
  address2: 'Satellite Town',
  country: 'India',
  state: 'Punjab',
  city: 'Gujranwala',
  zipcode: '52250',
  mobile: '03001234567',
};

module.exports = { randomEmail, user };
