/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

const router = require('express').Router();
const { login } = require('../controllers/authController');


/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Admin login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token
 */
router.post('/login', login);

module.exports = router;