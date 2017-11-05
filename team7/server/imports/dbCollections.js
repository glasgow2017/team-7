import { Mongo } from 'meteor/mongo';

export const dbQuestions = new Mongo.Collection('Questions');
export const dbResponses = new Mongo.Collection('dbResponses');
