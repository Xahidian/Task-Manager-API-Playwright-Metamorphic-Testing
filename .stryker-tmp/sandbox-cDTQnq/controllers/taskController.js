// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
const mongoose = require('mongoose');
const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
  if (stryMutAct_9fa48("0")) {
    {}
  } else {
    stryCov_9fa48("0");
    try {
      if (stryMutAct_9fa48("1")) {
        {}
      } else {
        stryCov_9fa48("1");
        const {
          title,
          dueDate
        } = req.body;

        // ✅ Validate title
        if (stryMutAct_9fa48("4") ? !title && typeof title !== "string" : stryMutAct_9fa48("3") ? false : stryMutAct_9fa48("2") ? true : (stryCov_9fa48("2", "3", "4"), (stryMutAct_9fa48("5") ? title : (stryCov_9fa48("5"), !title)) || (stryMutAct_9fa48("7") ? typeof title === "string" : stryMutAct_9fa48("6") ? false : (stryCov_9fa48("6", "7"), typeof title !== (stryMutAct_9fa48("8") ? "" : (stryCov_9fa48("8"), "string")))))) {
          if (stryMutAct_9fa48("9")) {
            {}
          } else {
            stryCov_9fa48("9");
            return res.status(400).json(stryMutAct_9fa48("10") ? {} : (stryCov_9fa48("10"), {
              error: stryMutAct_9fa48("11") ? "" : (stryCov_9fa48("11"), "Title is required and must be a string")
            }));
          }
        }

        // ✅ Validate dueDate format
        if (stryMutAct_9fa48("14") ? dueDate || isNaN(Date.parse(dueDate)) : stryMutAct_9fa48("13") ? false : stryMutAct_9fa48("12") ? true : (stryCov_9fa48("12", "13", "14"), dueDate && isNaN(Date.parse(dueDate)))) {
          if (stryMutAct_9fa48("15")) {
            {}
          } else {
            stryCov_9fa48("15");
            return res.status(400).json(stryMutAct_9fa48("16") ? {} : (stryCov_9fa48("16"), {
              error: stryMutAct_9fa48("17") ? "" : (stryCov_9fa48("17"), "Invalid due date format")
            }));
          }
        }
        const task = await Task.create(req.body);
        res.status(201).json(task);
      }
    } catch (error) {
      if (stryMutAct_9fa48("18")) {
        {}
      } else {
        stryCov_9fa48("18");
        console.error(stryMutAct_9fa48("19") ? "" : (stryCov_9fa48("19"), "Error creating task:"), error);
        res.status(500).json(stryMutAct_9fa48("20") ? {} : (stryCov_9fa48("20"), {
          error: stryMutAct_9fa48("21") ? "" : (stryCov_9fa48("21"), "Internal Server Error")
        }));
      }
    }
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  if (stryMutAct_9fa48("22")) {
    {}
  } else {
    stryCov_9fa48("22");
    try {
      if (stryMutAct_9fa48("23")) {
        {}
      } else {
        stryCov_9fa48("23");
        const tasks = await Task.find().lean(); // Improves MongoDB query performance
        res.status(200).json(tasks);
      }
    } catch (error) {
      if (stryMutAct_9fa48("24")) {
        {}
      } else {
        stryCov_9fa48("24");
        res.status(500).json(stryMutAct_9fa48("25") ? {} : (stryCov_9fa48("25"), {
          error: error.message
        }));
      }
    }
  }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
  if (stryMutAct_9fa48("26")) {
    {}
  } else {
    stryCov_9fa48("26");
    try {
      if (stryMutAct_9fa48("27")) {
        {}
      } else {
        stryCov_9fa48("27");
        console.log(stryMutAct_9fa48("28") ? "" : (stryCov_9fa48("28"), "Fetching Task with ID:"), req.params.id);
        if (stryMutAct_9fa48("31") ? false : stryMutAct_9fa48("30") ? true : stryMutAct_9fa48("29") ? mongoose.Types.ObjectId.isValid(req.params.id) : (stryCov_9fa48("29", "30", "31"), !mongoose.Types.ObjectId.isValid(req.params.id))) {
          if (stryMutAct_9fa48("32")) {
            {}
          } else {
            stryCov_9fa48("32");
            return res.status(400).json(stryMutAct_9fa48("33") ? {} : (stryCov_9fa48("33"), {
              error: stryMutAct_9fa48("34") ? "" : (stryCov_9fa48("34"), "Invalid task ID format")
            }));
          }
        }
        const task = await Task.findById(req.params.id);
        if (stryMutAct_9fa48("37") ? false : stryMutAct_9fa48("36") ? true : stryMutAct_9fa48("35") ? task : (stryCov_9fa48("35", "36", "37"), !task)) {
          if (stryMutAct_9fa48("38")) {
            {}
          } else {
            stryCov_9fa48("38");
            console.log(stryMutAct_9fa48("39") ? "" : (stryCov_9fa48("39"), "Task Not Found:"), req.params.id);
            return res.status(404).json(stryMutAct_9fa48("40") ? {} : (stryCov_9fa48("40"), {
              error: stryMutAct_9fa48("41") ? "" : (stryCov_9fa48("41"), "Task not found")
            }));
          }
        }
        console.log(stryMutAct_9fa48("42") ? "" : (stryCov_9fa48("42"), "Task Found:"), task);
        res.status(200).json(task);
      }
    } catch (error) {
      if (stryMutAct_9fa48("43")) {
        {}
      } else {
        stryCov_9fa48("43");
        console.error(stryMutAct_9fa48("44") ? "" : (stryCov_9fa48("44"), "Error in getTaskById:"), error);
        res.status(500).json(stryMutAct_9fa48("45") ? {} : (stryCov_9fa48("45"), {
          error: stryMutAct_9fa48("46") ? "" : (stryCov_9fa48("46"), "Internal Server Error")
        }));
      }
    }
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  if (stryMutAct_9fa48("47")) {
    {}
  } else {
    stryCov_9fa48("47");
    try {
      if (stryMutAct_9fa48("48")) {
        {}
      } else {
        stryCov_9fa48("48");
        if (stryMutAct_9fa48("51") ? false : stryMutAct_9fa48("50") ? true : stryMutAct_9fa48("49") ? mongoose.Types.ObjectId.isValid(req.params.id) : (stryCov_9fa48("49", "50", "51"), !mongoose.Types.ObjectId.isValid(req.params.id))) {
          if (stryMutAct_9fa48("52")) {
            {}
          } else {
            stryCov_9fa48("52");
            return res.status(400).json(stryMutAct_9fa48("53") ? {} : (stryCov_9fa48("53"), {
              error: stryMutAct_9fa48("54") ? "" : (stryCov_9fa48("54"), "Invalid task ID format")
            }));
          }
        }
        const task = await Task.findById(req.params.id);
        if (stryMutAct_9fa48("57") ? false : stryMutAct_9fa48("56") ? true : stryMutAct_9fa48("55") ? task : (stryCov_9fa48("55", "56", "57"), !task)) {
          if (stryMutAct_9fa48("58")) {
            {}
          } else {
            stryCov_9fa48("58");
            return res.status(404).json(stryMutAct_9fa48("59") ? {} : (stryCov_9fa48("59"), {
              error: stryMutAct_9fa48("60") ? "" : (stryCov_9fa48("60"), "Task not found")
            }));
          }
        }
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, stryMutAct_9fa48("61") ? {} : (stryCov_9fa48("61"), {
          new: stryMutAct_9fa48("62") ? false : (stryCov_9fa48("62"), true)
        }));
        if (stryMutAct_9fa48("65") ? false : stryMutAct_9fa48("64") ? true : stryMutAct_9fa48("63") ? updatedTask : (stryCov_9fa48("63", "64", "65"), !updatedTask)) {
          if (stryMutAct_9fa48("66")) {
            {}
          } else {
            stryCov_9fa48("66");
            return res.status(500).json(stryMutAct_9fa48("67") ? {} : (stryCov_9fa48("67"), {
              error: stryMutAct_9fa48("68") ? "" : (stryCov_9fa48("68"), "Task update failed")
            }));
          }
        }
        res.status(200).json(updatedTask);
      }
    } catch (error) {
      if (stryMutAct_9fa48("69")) {
        {}
      } else {
        stryCov_9fa48("69");
        console.error(stryMutAct_9fa48("70") ? "" : (stryCov_9fa48("70"), "Error updating task:"), error);
        res.status(500).json(stryMutAct_9fa48("71") ? {} : (stryCov_9fa48("71"), {
          error: error.message
        }));
      }
    }
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  if (stryMutAct_9fa48("72")) {
    {}
  } else {
    stryCov_9fa48("72");
    try {
      if (stryMutAct_9fa48("73")) {
        {}
      } else {
        stryCov_9fa48("73");
        if (stryMutAct_9fa48("76") ? false : stryMutAct_9fa48("75") ? true : stryMutAct_9fa48("74") ? mongoose.Types.ObjectId.isValid(req.params.id) : (stryCov_9fa48("74", "75", "76"), !mongoose.Types.ObjectId.isValid(req.params.id))) {
          if (stryMutAct_9fa48("77")) {
            {}
          } else {
            stryCov_9fa48("77");
            return res.status(400).json(stryMutAct_9fa48("78") ? {} : (stryCov_9fa48("78"), {
              error: stryMutAct_9fa48("79") ? "" : (stryCov_9fa48("79"), "Invalid task ID format")
            }));
          }
        }
        const task = await Task.findById(req.params.id);
        if (stryMutAct_9fa48("82") ? false : stryMutAct_9fa48("81") ? true : stryMutAct_9fa48("80") ? task : (stryCov_9fa48("80", "81", "82"), !task)) {
          if (stryMutAct_9fa48("83")) {
            {}
          } else {
            stryCov_9fa48("83");
            return res.status(404).json(stryMutAct_9fa48("84") ? {} : (stryCov_9fa48("84"), {
              error: stryMutAct_9fa48("85") ? "" : (stryCov_9fa48("85"), "Task not found")
            }));
          }
        }
        await Task.findByIdAndDelete(req.params.id);
        res.status(204).send();
      }
    } catch (error) {
      if (stryMutAct_9fa48("86")) {
        {}
      } else {
        stryCov_9fa48("86");
        console.error(stryMutAct_9fa48("87") ? "" : (stryCov_9fa48("87"), "Error deleting task:"), error);
        res.status(500).json(stryMutAct_9fa48("88") ? {} : (stryCov_9fa48("88"), {
          error: error.message
        }));
      }
    }
  }
};