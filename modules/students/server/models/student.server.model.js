'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Student Schema
 */
var StudentSchema = new Schema({
  LastName: {type: String, required: true} ,
  FirstName: { type: String, required: true },
  MAT251CalcI:{ type: String},
  MAT252CalcII:{ type: String},
  MAT320DiscreteMath:{ type: String},
  CPS210CompSciI:{ type: String},
  CPS310CompSciII:{ type: String},
  CPS315CompSciIII:{ type: String},
  CPS352OOP:{ type: String},
  CPS330AssemblyArch:{ type: String},
  CPS415DiscContAlgorithms:{ type: String},
  CPS340OpSys:{ type: String},
  CPS425LangProcessing:{ type: String},
  CPS493Elect1:{ type: String},
  CPS493Projects:{ type: String},
  EGC230DigLogic:{ type: String},
  EGC208DigLogicLab:{ type: String},
  ScienceI:{ type: String},
  ScienceII:{ type: String},
  MAT251CalcIComment:{ type: String},
  MAT252CalcIIComment:{ type: String},
  MAT320DiscreteMathComment:{ type: String},
  CPS210CompSciIComment:{ type: String},
  CPS310CompSciIIComment:{ type: String},
  CPS315CompSciIIIComment:{ type: String},
  CPS352OOPComment:{ type: String},
  CPS330AssemblyArchComment:{ type: String},
  CPS415DiscContAlgorithmsComment:{ type: String},
  CPS340OpSysComment:{ type: String},
  CPS425LangProcessingComment:{ type: String},
  CPS493Elect1Comment:{ type: String},
  CPS493ProjectsComment:{ type: String},
  EGC230DigLogicComment:{ type: String},
  EGC208DigLogicLabComment:{ type: String},
  ScienceIComment:{ type: String},
  ScienceIIComment:{ type: String}
});

mongoose.model('Student', StudentSchema);
