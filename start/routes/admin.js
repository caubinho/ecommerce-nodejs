'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

  /**
   * Categories resources route
   */

   Route.resource('categories', 'CategoryController').apiOnly()

   /**
   * Product resources route
   */

  Route.resource('products', 'ProductController').apiOnly()

  /**
   * Coupon resources route
   */

  Route.resource('coupons', 'CouponController').apiOnly()

  /**
   * Order resources route
   */

  Route.resource('orders', 'OrderController').apiOnly()

  /**
   * Image resources route
   */

  Route.resource('images', 'ImageController').apiOnly()

  /**
   * User resources route
   */

  Route.resource('users', 'UserController').apiOnly()



}).prefix('v1/admin').namespace('Admin')
