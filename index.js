
import TelegramBot from 'node-telegram-bot-api';
import connectDb from './config/database.js';
import { botCommands } from './controller/bot-commands.js';
import { getAllTradeNow } from './helper/get-list-trade-now.js';
const token = '7859913357:AAHoi3g1xc4Om7b_cZFbyGw11f0bNi4uKzs'.trim();
export const bot = new TelegramBot(token, { polling: true });
//ketnoidatabase
// connectDb()

// botCommands(bot)


console.log(await getAllTradeNow(110169204));








