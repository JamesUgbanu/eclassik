import { queryController, client } from '../helpers/db';
import removeAuth0fromUserId from '../helpers/helpers';
import today from '../helpers/today';

class OrderController {
  /**
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */

  static create(request, response) {
    const {
      total_prize, item
    } = request.body;

    const userId = removeAuth0fromUserId(request.user.sub);

    const query = {
      text:
        // eslint-disable-next-line max-len
        `INSERT INTO orders(customer_id, total_prize, item) 
        VALUES ($1, $2, $3) RETURNING *`,
      values: [
        userId, total_prize, item
      ]
    };
    queryController.dbQuery(response, query, 'order created successfully', 'order not found');
  }

  /**
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */
  static getAll(request, response) {
    const query = 'SELECT * FROM orders';
    queryController.dbQuery(response, query, 'orders retrieved successfully', 'order not found');
  }

  /**
   * @param {Object} request
   * @param {Object} response
   * @return {Object} json
   */
  static getById(request, response) {
    const query = {
      text: 'SELECT * FROM orders WHERE order_id = $1',
      values: [request.params.id]
    };
    queryController.dbQuery(response, query, 'orders retrieved successfully', 'order not found');
  }

  /**
   * @param {Object} request
   * @param {Object} response
   * @return {Object} json
   */
  static getUserOrder(request, response) {
    const userId = removeAuth0fromUserId(request.user.sub);

    const query = {
      text: 'SELECT * FROM orders WHERE customer_id = $1',
      values: [userId]
    };
    queryController.dbQuery(response, query, 'orders retrieved successfully', 'order not found');
  }

  /**
* @param {Object} request
* @param {Object} response
* @return {Object} json
*/
  static updateOrder(request, response) {
    const { id } = request.params;
    const updated_on = today();
    const findquery = {
      text: 'SELECT * FROM orders WHERE order_id = $1',
      values: [id]
    };
    client.query(findquery, (err, result) => {
      if (err) {
        return queryController.serverError(response, err);
      }
      if (result.rowCount === 0) {
        return queryController.notFoundError(response, 'order not found');
      }
      const { rows } = result;
      const updatequery = {
        text: `UPDATE orders SET status = $1, updated_on = $2 WHERE order_id = $3 RETURNING *`,
        values: [
          request.body.status || rows[0].status, updated_on, id,
        ]
      };
      client.query(updatequery).then((res) => {
        queryController.getSuccess(response, 200, res, 'order updated successfully');
      });
    });
  }
}

export default OrderController;
