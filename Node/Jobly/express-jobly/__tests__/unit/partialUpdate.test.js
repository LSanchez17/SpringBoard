const sqlForPartialUpdate = require('../../helpers/partialUpdate');

describe("partialUpdate()", () => {
  it("should generate a proper partial update query with just 1 field", () => {
    // FIXME: write real tests!
    let {query, values} = sqlForPartialUpdate(
      'users',
      {firstName: 'Test',
       phone: 1234567
      },
      'username',
      1
    )
    
    expect(query).toEqual('UPDATE users SET firstName=$1, phone=$2 WHERE username=$3 RETURNING *');
    expect(values).toEqual(['Test', 1234567, 1]);
  });
});
