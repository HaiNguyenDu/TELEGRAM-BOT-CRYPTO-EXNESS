
import TelegramBot from 'node-telegram-bot-api';
import connectDb from './config/database.js';
import { botCommands } from './controller/bot-commands.js';

//on echo

const token = '8156108573:AAF7J4YlUS8pzfOiUS1NZU5od5OXXOOxxWI'.trim();
export const bot = new TelegramBot(token, { polling: true });


//ketnoidatabase
connectDb()
//goiham lenh cua bot
botCommands(bot)







