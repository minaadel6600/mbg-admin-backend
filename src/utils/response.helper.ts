/**
 * @description This file contain all helper functions for response
 * @description It will handle all responses for success and failed response from server to client
 * @author {Deo Sbrn}
 */

import { Response } from 'express';
import logger from './logger'; 
import IRequest from '../interfaces/i-request';

/**
 * @description Make success response
 * @param {Response} res - Express response object
 * @param {number} status - Status code
 * @param {string} message - Message response
 * @param {object | any} data - Data response
 * @returns {Response} - Express response object
 */
export function resSuccess(req:IRequest,res: Response, status: number, message: string, data?: object | any): Response {
    let userId, msg, url, statusCode;
    userId =  " (user) : " + (req.user) ? req?.user?._id : "";
    msg = " (msg): " + message;
    url = "(url): " + req.url;
    statusCode = " (status): "+ status;

    logger.info(url + statusCode + userId + msg) 
    return res.status(status).type('application/json').json({ success: true, message, ...data });
}

/**
 * @description Make failed response
 * @param {Response} res - Express response object
 * @param {number} status - Status code
 * @param {string} message - Message response
 * @param {object | any} error - Error response
 * @returns {Response} - Express response object
 */
export function resFailed(res: Response, status: number, message: string, error?: object | any): Response {
    return res.status(status).type('application/json').json({ success: false, message, error });
}
