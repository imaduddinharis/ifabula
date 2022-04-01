/**
 * @api {get} /products/ Request Product List
 * @apiVersion 2.0.0
 * @apiName GET Product
 * @apiGroup User
 *
 * @apiSuccess (200) {number} id Product ID.
 * @apiSuccess (200) {String} product_name Product Name.
 * @apiSuccess (200) {number} product_price Product Price
 * @apiSuccess (200) {String} product_description Product Description
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * [
 *  {
 *      "id": 1,
 *      "product_name": "Random Product 1",
 *      "product_price": 20000,
 *      "product_description": "Random Product Description 1"
 *  }
 * ]
 *
 * @apiError - -
 * @apiErrorExample Error-Response:
 * -
 *
 */
