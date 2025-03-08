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

        // Validate title
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

        // Validate dueDate format
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

        // Check if task with the same title exists
        const existingTask = await Task.findOne(stryMutAct_9fa48("18") ? {} : (stryCov_9fa48("18"), {
          title
        }));
        if (stryMutAct_9fa48("20") ? false : stryMutAct_9fa48("19") ? true : (stryCov_9fa48("19", "20"), existingTask)) {
          if (stryMutAct_9fa48("21")) {
            {}
          } else {
            stryCov_9fa48("21");
            return res.status(400).json(stryMutAct_9fa48("22") ? {} : (stryCov_9fa48("22"), {
              error: stryMutAct_9fa48("23") ? "" : (stryCov_9fa48("23"), "A task with this title already exists")
            }));
          }
        }

        // Create new task
        const task = await Task.create(req.body);
        res.status(201).json(task);
      }
    } catch (error) {
      if (stryMutAct_9fa48("24")) {
        {}
      } else {
        stryCov_9fa48("24");
        console.error(stryMutAct_9fa48("25") ? "" : (stryCov_9fa48("25"), "Error creating task:"), error);
        res.status(500).json(stryMutAct_9fa48("26") ? {} : (stryCov_9fa48("26"), {
          error: stryMutAct_9fa48("27") ? "" : (stryCov_9fa48("27"), "Internal Server Error")
        }));
      }
    }
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  if (stryMutAct_9fa48("28")) {
    {}
  } else {
    stryCov_9fa48("28");
    try {
      if (stryMutAct_9fa48("29")) {
        {}
      } else {
        stryCov_9fa48("29");
        const tasks = await (stryMutAct_9fa48("30") ? Task.find().lean() : (stryCov_9fa48("30"), Task.find().sort(stryMutAct_9fa48("31") ? {} : (stryCov_9fa48("31"), {
          createdAt: 1
        })).lean())); // Ensure consistent order
        res.status(200).json(tasks);
      }
    } catch (error) {
      if (stryMutAct_9fa48("32")) {
        {}
      } else {
        stryCov_9fa48("32");
        res.status(500).json(stryMutAct_9fa48("33") ? {} : (stryCov_9fa48("33"), {
          error: error.message
        }));
      }
    }
  }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
  if (stryMutAct_9fa48("34")) {
    {}
  } else {
    stryCov_9fa48("34");
    try {
      if (stryMutAct_9fa48("35")) {
        {}
      } else {
        stryCov_9fa48("35");
        console.log(stryMutAct_9fa48("36") ? "" : (stryCov_9fa48("36"), "Fetching Task with ID:"), req.params.id);
        if (stryMutAct_9fa48("39") ? false : stryMutAct_9fa48("38") ? true : stryMutAct_9fa48("37") ? mongoose.Types.ObjectId.isValid(req.params.id) : (stryCov_9fa48("37", "38", "39"), !mongoose.Types.ObjectId.isValid(req.params.id))) {
          if (stryMutAct_9fa48("40")) {
            {}
          } else {
            stryCov_9fa48("40");
            return res.status(400).json(stryMutAct_9fa48("41") ? {} : (stryCov_9fa48("41"), {
              error: stryMutAct_9fa48("42") ? "" : (stryCov_9fa48("42"), "Invalid task ID format")
            }));
          }
        }
        const task = await Task.findById(req.params.id);
        if (stryMutAct_9fa48("45") ? false : stryMutAct_9fa48("44") ? true : stryMutAct_9fa48("43") ? task : (stryCov_9fa48("43", "44", "45"), !task)) {
          if (stryMutAct_9fa48("46")) {
            {}
          } else {
            stryCov_9fa48("46");
            console.log(stryMutAct_9fa48("47") ? "" : (stryCov_9fa48("47"), "Task Not Found:"), req.params.id);
            return res.status(404).json(stryMutAct_9fa48("48") ? {} : (stryCov_9fa48("48"), {
              error: stryMutAct_9fa48("49") ? "" : (stryCov_9fa48("49"), "Task not found")
            }));
          }
        }
        console.log(stryMutAct_9fa48("50") ? "" : (stryCov_9fa48("50"), "Task Found:"), task);
        res.status(200).json(task);
      }
    } catch (error) {
      if (stryMutAct_9fa48("51")) {
        {}
      } else {
        stryCov_9fa48("51");
        console.error(stryMutAct_9fa48("52") ? "" : (stryCov_9fa48("52"), "Error in getTaskById:"), error);
        res.status(500).json(stryMutAct_9fa48("53") ? {} : (stryCov_9fa48("53"), {
          error: stryMutAct_9fa48("54") ? "" : (stryCov_9fa48("54"), "Internal Server Error")
        }));
      }
    }
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  if (stryMutAct_9fa48("55")) {
    {}
  } else {
    stryCov_9fa48("55");
    try {
      if (stryMutAct_9fa48("56")) {
        {}
      } else {
        stryCov_9fa48("56");
        if (stryMutAct_9fa48("59") ? false : stryMutAct_9fa48("58") ? true : stryMutAct_9fa48("57") ? mongoose.Types.ObjectId.isValid(req.params.id) : (stryCov_9fa48("57", "58", "59"), !mongoose.Types.ObjectId.isValid(req.params.id))) {
          if (stryMutAct_9fa48("60")) {
            {}
          } else {
            stryCov_9fa48("60");
            return res.status(400).json(stryMutAct_9fa48("61") ? {} : (stryCov_9fa48("61"), {
              error: stryMutAct_9fa48("62") ? "" : (stryCov_9fa48("62"), "Invalid task ID format")
            }));
          }
        }
        const task = await Task.findById(req.params.id);
        if (stryMutAct_9fa48("65") ? false : stryMutAct_9fa48("64") ? true : stryMutAct_9fa48("63") ? task : (stryCov_9fa48("63", "64", "65"), !task)) {
          if (stryMutAct_9fa48("66")) {
            {}
          } else {
            stryCov_9fa48("66");
            return res.status(404).json(stryMutAct_9fa48("67") ? {} : (stryCov_9fa48("67"), {
              error: stryMutAct_9fa48("68") ? "" : (stryCov_9fa48("68"), "Task not found")
            }));
          }
        }
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, stryMutAct_9fa48("69") ? {} : (stryCov_9fa48("69"), {
          new: stryMutAct_9fa48("70") ? false : (stryCov_9fa48("70"), true)
        }));
        if (stryMutAct_9fa48("73") ? false : stryMutAct_9fa48("72") ? true : stryMutAct_9fa48("71") ? updatedTask : (stryCov_9fa48("71", "72", "73"), !updatedTask)) {
          if (stryMutAct_9fa48("74")) {
            {}
          } else {
            stryCov_9fa48("74");
            return res.status(500).json(stryMutAct_9fa48("75") ? {} : (stryCov_9fa48("75"), {
              error: stryMutAct_9fa48("76") ? "" : (stryCov_9fa48("76"), "Task update failed")
            }));
          }
        }
        res.status(200).json(updatedTask);
      }
    } catch (error) {
      if (stryMutAct_9fa48("77")) {
        {}
      } else {
        stryCov_9fa48("77");
        console.error(stryMutAct_9fa48("78") ? "" : (stryCov_9fa48("78"), "Error updating task:"), error);
        res.status(500).json(stryMutAct_9fa48("79") ? {} : (stryCov_9fa48("79"), {
          error: error.message
        }));
      }
    }
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  if (stryMutAct_9fa48("80")) {
    {}
  } else {
    stryCov_9fa48("80");
    try {
      if (stryMutAct_9fa48("81")) {
        {}
      } else {
        stryCov_9fa48("81");
        if (stryMutAct_9fa48("84") ? false : stryMutAct_9fa48("83") ? true : stryMutAct_9fa48("82") ? mongoose.Types.ObjectId.isValid(req.params.id) : (stryCov_9fa48("82", "83", "84"), !mongoose.Types.ObjectId.isValid(req.params.id))) {
          if (stryMutAct_9fa48("85")) {
            {}
          } else {
            stryCov_9fa48("85");
            return res.status(400).json(stryMutAct_9fa48("86") ? {} : (stryCov_9fa48("86"), {
              error: stryMutAct_9fa48("87") ? "" : (stryCov_9fa48("87"), "Invalid task ID format")
            }));
          }
        }
        const task = await Task.findById(req.params.id);
        if (stryMutAct_9fa48("90") ? false : stryMutAct_9fa48("89") ? true : stryMutAct_9fa48("88") ? task : (stryCov_9fa48("88", "89", "90"), !task)) {
          if (stryMutAct_9fa48("91")) {
            {}
          } else {
            stryCov_9fa48("91");
            return res.status(404).json(stryMutAct_9fa48("92") ? {} : (stryCov_9fa48("92"), {
              error: stryMutAct_9fa48("93") ? "" : (stryCov_9fa48("93"), "Task not found")
            }));
          }
        }
        await Task.findByIdAndDelete(req.params.id);
        res.status(204).send();
      }
    } catch (error) {
      if (stryMutAct_9fa48("94")) {
        {}
      } else {
        stryCov_9fa48("94");
        console.error(stryMutAct_9fa48("95") ? "" : (stryCov_9fa48("95"), "Error deleting task:"), error);
        res.status(500).json(stryMutAct_9fa48("96") ? {} : (stryCov_9fa48("96"), {
          error: error.message
        }));
      }
    }
  }
};
exports.deleteAllTasks = async (req, res) => {
  if (stryMutAct_9fa48("97")) {
    {}
  } else {
    stryCov_9fa48("97");
    try {
      if (stryMutAct_9fa48("98")) {
        {}
      } else {
        stryCov_9fa48("98");
        await Task.deleteMany({}); // Clears all tasks
        res.status(204).send();
      }
    } catch (error) {
      if (stryMutAct_9fa48("99")) {
        {}
      } else {
        stryCov_9fa48("99");
        console.error(stryMutAct_9fa48("100") ? "" : (stryCov_9fa48("100"), "Error deleting all tasks:"), error);
        res.status(500).json(stryMutAct_9fa48("101") ? {} : (stryCov_9fa48("101"), {
          error: error.message
        }));
      }
    }
  }
};