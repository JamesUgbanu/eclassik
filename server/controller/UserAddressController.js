import { queryController, client } from '../helpers/db';

class UserAddressController {
  /**
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */
  static create(request, response) {
    const {
      user_id, first_name, last_name, email,
      address, state, phone
    } = request.body;
    const query = {
      text:
        // eslint-disable-next-line max-len
        `INSERT INTO users(user_id, first_name, last_name, email, address, state, phone) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      values: [
        user_id, first_name, last_name, email, address, state, phone
      ]
    };
    queryController.dbQuery(response, query, 'user address created successfully', 'address not found');
  }

  /**
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */
  static getAll(request, response) {
    const query = 'SELECT * FROM users';
    queryController.dbQuery(response, query, 'user addresses retrieved successfully', 'address not found');
  }

  /**
   * @param {Object} request
   * @param {Object} response
   * @return {Object} json
   */
  static getById(request, response) {
    const query = {
      text: 'SELECT * FROM users WHERE user_id = $1',
      values: [request.params.id]
    };
    queryController.dbQuery(response, query, 'shipping address retrieved', 'address not found');
  }

  /**
  * @param {Object} request
  * @param {Object} response
  * @return {Object} json
  */
  static removeById(request, response) {
    const query = {
      text: 'DELETE FROM users WHERE user_id = $1',
      values: [request.params.id]
    };
    queryController.dbQuery(response, query, 'user address removed successfully', 'address not found');
  }

  /**
* @param {Object} request
* @param {Object} response
* @return {Object} json
*/
  static updateAddress(request, response) {
    const { id } = request.params;
    const findquery = {
      text: 'SELECT * FROM users WHERE user_id = $1',
      values: [id]
    };
    client.query(findquery, (err, result) => {
      if (err) {
        return queryController.serverError(response, err);
      }
      if (result.rowCount === 0) {
        return queryController.notFoundError(response, 'address not found');
      }
      const { rows } = result;
      const updatequery = {
        text: `UPDATE users SET first_name = $1, last_name = $2, email = $3, address = $4, state = $5,
         phone = $6 WHERE user_id = $7 RETURNING *`,
        values: [
          request.body.first_name || rows[0].first_name, request.body.last_name || rows[0].last_name,
          request.body.email || rows[0].email, request.body.address || rows[0].address,
          request.body.state || rows[0].state, request.body.phone || rows[0].phone, id
        ]
      };
      client.query(updatequery).then((res) => {
        queryController.getSuccess(response, 200, res, 'user address updated successfully');
      });
    });
  }
}

export default UserAddressController;