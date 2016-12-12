'use strict';

/**
 * Colstudent Schema
 */
var mongoose = require('mongoose'),
Schema = mongoose.Schema;
var ColstudentSchema = new Schema({
  LastName: {type: String, required: true} ,
  FirstName: {type: String, required: true} ,
  MAT251CalcI: { type: String},
  MAT252CalcII: { type: String},
  MAT320DiscreteMath: { type: String},
  CPS210CompSciI: { type: String},
  CPS310CompSciII: { type: String},
  CPS315CompSciIII: { type: String},
  CPS352OOP: { type: String},
  CPS330AssemblyArch: { type: String},
  CPS353SoftEng: { type: String},
  CPS415DiscContAlgorithms: { type: String},
  CPS340OpSys: { type: String},
  CPS425LangProcessing: { type: String},
  CPS493Elect1: { type: String},
  CPS493Projects: { type: String},
  EGC230DigLogic: { type: String},
  EGC208DigLogicLab: { type: String},
  SCIENCEI: { type: String},
  SCIENCEII: { type: String},
  SCIENCEICOMMENT: { type: String},
  SCIENCEIICOMMENT: { type: String},
  EGC208DigLogicLabCOMMENT: { type: String},
  EGC2230DigLogicCOMMENT: { type: String},
  CPS493ProjectsCOMMENT: { type: String},
  CPS493Elect1COMMENT: { type: String},
  CPS425LangProcessingCOMMENT: { type: String},
  CPS340OpSysCOMMENT:{ type: String},
  CPS415DiscContAlgorithmsCOMMENT: { type: String},
  CPS353SoftEngCOMMENT: { type: String},
  CPS330AssemblyArchCOMMENT: { type: String},
  CPS352OOPCOMMENT: { type: String},
  CPS315CompSciIIICOMMENT: { type: String},
  CPS310CompSciIICOMMENT: { type: String},
  CPS210CompSciICOMMENT: { type: String},
  MAT320DiscreteMathCOMMENT:{ type: String},
  MAT252CalcIICOMMENT:{ type: String},
  MAT251CalcICOMMENT:{ type: String}

  

});

/* Returns the student's full name with last name first
 * followed by first name
 * For instance, "Smith, John */
/**schema.virtual('wholeName').get(function() {
  return this.LastName +','+''+ this.FirstName;
});

*/


mongoose.model('Colstudent', ColstudentSchema);
