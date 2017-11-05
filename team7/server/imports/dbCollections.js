import { Mongo } from 'meteor/mongo';

export const dbQuestions = new Mongo.Collection('Questions');
