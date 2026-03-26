/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Ticket management APIs
 */

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ticketController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /api/v1/tickets/book/{seatNumber}:
 *   post:
 *     summary: Book a ticket
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: seatNumber
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ticket booked
 */
router.post('/book/:seatNumber', ctrl.book);

/**
 * @swagger
 * /api/v1/tickets/{seatNumber}:
 *   get:
 *     summary: Get ticket details
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: seatNumber
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ticket details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       404:
 *         description: Ticket not found
 */
router.get('/:seatNumber', ctrl.getOne);

/**
 * @swagger
 * /api/v1/tickets/open/all:
 *   get:
 *     summary: Get all open tickets
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: List of open tickets
 */
router.get('/open/all', ctrl.open);

/**
 * @swagger
 * /api/v1/tickets/closed/all:
 *   get:
 *     summary: Get all booked tickets
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: List of booked tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 */
router.get('/closed/all', ctrl.closed);

/**
 * @swagger
 * /api/v1/tickets/admin/reset:
 *   post:
 *     summary: Reset all tickets (Admin only)
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Reset successful
 */
router.post('/admin/reset', ctrl.reset);


/**
 * @swagger
 * /api/v1/tickets/{seatNumber}:
 *   put:
 *     summary: Update a ticket
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: seatNumber
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ticket updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       404:
 *         description: Ticket not found
 */
router.put("/:seatNumber", ctrl.update);


/**
 * @swagger
 * /api/v1/tickets/{seatNumber}:
 *   delete:
 *     summary: Delete a ticket
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: seatNumber
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ticket deleted
 *       404:
 *         description: Ticket not found
 */
router.delete("/:seatNumber", ctrl.delete);

module.exports = router;