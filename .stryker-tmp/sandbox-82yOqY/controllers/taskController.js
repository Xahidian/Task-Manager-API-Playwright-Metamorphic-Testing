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
const moment = require('moment'); // ✅ Stronger date validation
const {
  log
} = require('../coverageLogger');
console.log(stryMutAct_9fa48("0") ? "" : (stryCov_9fa48("0"), "✅ taskController loaded"));

// Create a new task
exports.createTask = async (req, res) => {
  if (stryMutAct_9fa48("1")) {
    {}
  } else {
    stryCov_9fa48("1");
    // log('createTask');
    try {
      if (stryMutAct_9fa48("2")) {
        {}
      } else {
        stryCov_9fa48("2");
        const {
          title,
          dueDate,
          priority
        } = req.body;
        if (stryMutAct_9fa48("5") ? (!title || typeof title !== "string") && title.trim().length === 0 : stryMutAct_9fa48("4") ? false : stryMutAct_9fa48("3") ? true : (stryCov_9fa48("3", "4", "5"), (stryMutAct_9fa48("7") ? !title && typeof title !== "string" : stryMutAct_9fa48("6") ? false : (stryCov_9fa48("6", "7"), (stryMutAct_9fa48("8") ? title : (stryCov_9fa48("8"), !title)) || (stryMutAct_9fa48("10") ? typeof title === "string" : stryMutAct_9fa48("9") ? false : (stryCov_9fa48("9", "10"), typeof title !== (stryMutAct_9fa48("11") ? "" : (stryCov_9fa48("11"), "string")))))) || (stryMutAct_9fa48("13") ? title.trim().length !== 0 : stryMutAct_9fa48("12") ? false : (stryCov_9fa48("12", "13"), (stryMutAct_9fa48("14") ? title.length : (stryCov_9fa48("14"), title.trim().length)) === 0)))) {
          if (stryMutAct_9fa48("15")) {
            {}
          } else {
            stryCov_9fa48("15");
            return res.status(400).json(stryMutAct_9fa48("16") ? {} : (stryCov_9fa48("16"), {
              error: stryMutAct_9fa48("17") ? "" : (stryCov_9fa48("17"), "Title is required and must be a non-empty string.")
            }));
          }
        }

        //  Injected Fault 1: Case-insensitive duplicate check before creating the task.
        const existingTask = await Task.findOne(stryMutAct_9fa48("18") ? {} : (stryCov_9fa48("18"), {
          title: new RegExp(stryMutAct_9fa48("19") ? `` : (stryCov_9fa48("19"), `^${stryMutAct_9fa48("20") ? title : (stryCov_9fa48("20"), title.trim())}$`), stryMutAct_9fa48("21") ? "" : (stryCov_9fa48("21"), 'i'))
        }));
        if (stryMutAct_9fa48("23") ? false : stryMutAct_9fa48("22") ? true : (stryCov_9fa48("22", "23"), existingTask)) {
          if (stryMutAct_9fa48("24")) {
            {}
          } else {
            stryCov_9fa48("24");
            return res.status(400).json(stryMutAct_9fa48("25") ? {} : (stryCov_9fa48("25"), {
              error: stryMutAct_9fa48("26") ? "" : (stryCov_9fa48("26"), "A task with this title already exists.")
            }));
          }
        }
        if (stryMutAct_9fa48("29") ? dueDate || !moment(dueDate, moment.ISO_8601, true).isValid() : stryMutAct_9fa48("28") ? false : stryMutAct_9fa48("27") ? true : (stryCov_9fa48("27", "28", "29"), dueDate && (stryMutAct_9fa48("30") ? moment(dueDate, moment.ISO_8601, true).isValid() : (stryCov_9fa48("30"), !moment(dueDate, moment.ISO_8601, stryMutAct_9fa48("31") ? false : (stryCov_9fa48("31"), true)).isValid())))) {
          if (stryMutAct_9fa48("32")) {
            {}
          } else {
            stryCov_9fa48("32");
            console.log(stryMutAct_9fa48("33") ? "" : (stryCov_9fa48("33"), "❌ Invalid dueDate rejected:"), dueDate);
            return res.status(400).json(stryMutAct_9fa48("34") ? {} : (stryCov_9fa48("34"), {
              error: stryMutAct_9fa48("35") ? "" : (stryCov_9fa48("35"), "Invalid due date format. Must be in ISO 8601 format.")
            }));
          }
        }
        const allowedPriorities = new Set(stryMutAct_9fa48("36") ? [] : (stryCov_9fa48("36"), [stryMutAct_9fa48("37") ? "" : (stryCov_9fa48("37"), "Low"), stryMutAct_9fa48("38") ? "" : (stryCov_9fa48("38"), "Medium"), stryMutAct_9fa48("39") ? "" : (stryCov_9fa48("39"), "High")]));
        if (stryMutAct_9fa48("42") ? priority || !allowedPriorities.has(priority) : stryMutAct_9fa48("41") ? false : stryMutAct_9fa48("40") ? true : (stryCov_9fa48("40", "41", "42"), priority && (stryMutAct_9fa48("43") ? allowedPriorities.has(priority) : (stryCov_9fa48("43"), !allowedPriorities.has(priority))))) {
          if (stryMutAct_9fa48("44")) {
            {}
          } else {
            stryCov_9fa48("44");
            return res.status(400).json(stryMutAct_9fa48("45") ? {} : (stryCov_9fa48("45"), {
              error: stryMutAct_9fa48("46") ? "" : (stryCov_9fa48("46"), "Invalid priority value. Must be 'Low', 'Medium', or 'High'.")
            }));
          }
        }
        const task = await Task.create(stryMutAct_9fa48("47") ? {} : (stryCov_9fa48("47"), {
          ...req.body,
          title: stryMutAct_9fa48("48") ? title : (stryCov_9fa48("48"), title.trim())
        }));
        res.status(201).json(task);
      }
    } catch (error) {
      if (stryMutAct_9fa48("49")) {
        {}
      } else {
        stryCov_9fa48("49");
        console.error(stryMutAct_9fa48("50") ? "" : (stryCov_9fa48("50"), "Error creating task:"), stryMutAct_9fa48("53") ? error.message && error : stryMutAct_9fa48("52") ? false : stryMutAct_9fa48("51") ? true : (stryCov_9fa48("51", "52", "53"), error.message || error));
        res.status(500).json(stryMutAct_9fa48("54") ? {} : (stryCov_9fa48("54"), {
          error: stryMutAct_9fa48("55") ? "" : (stryCov_9fa48("55"), "Internal Server Error")
        }));
      }
    }
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  if (stryMutAct_9fa48("56")) {
    {}
  } else {
    stryCov_9fa48("56");
    //  log('getTasks');
    try {
      if (stryMutAct_9fa48("57")) {
        {}
      } else {
        stryCov_9fa48("57");
        const tasks = await (stryMutAct_9fa48("58") ? Task.find().lean() : (stryCov_9fa48("58"), Task.find().sort(stryMutAct_9fa48("59") ? {} : (stryCov_9fa48("59"), {
          createdAt: 1
        })).lean()));
        res.status(200).json(tasks);
      }
    } catch (error) {
      if (stryMutAct_9fa48("60")) {
        {}
      } else {
        stryCov_9fa48("60");
        console.error(stryMutAct_9fa48("61") ? "" : (stryCov_9fa48("61"), "Error fetching tasks:"), stryMutAct_9fa48("64") ? error.message && error : stryMutAct_9fa48("63") ? false : stryMutAct_9fa48("62") ? true : (stryCov_9fa48("62", "63", "64"), error.message || error));
        res.status(500).json(stryMutAct_9fa48("65") ? {} : (stryCov_9fa48("65"), {
          error: stryMutAct_9fa48("66") ? "" : (stryCov_9fa48("66"), "Internal Server Error")
        }));
      }
    }
  }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
  if (stryMutAct_9fa48("67")) {
    {}
  } else {
    stryCov_9fa48("67");
    // log('getTaskById');
    try {
      if (stryMutAct_9fa48("68")) {
        {}
      } else {
        stryCov_9fa48("68");
        console.log(stryMutAct_9fa48("69") ? "" : (stryCov_9fa48("69"), "Fetching Task with ID:"), req.params.id);
        if (stryMutAct_9fa48("72") ? false : stryMutAct_9fa48("71") ? true : stryMutAct_9fa48("70") ? mongoose.Types.ObjectId.isValid(req.params.id) : (stryCov_9fa48("70", "71", "72"), !mongoose.Types.ObjectId.isValid(req.params.id))) {
          if (stryMutAct_9fa48("73")) {
            {}
          } else {
            stryCov_9fa48("73");
            console.log(stryMutAct_9fa48("74") ? "" : (stryCov_9fa48("74"), "🚨 Received Invalid ID:"), req.params.id);
            return res.status(400).json(stryMutAct_9fa48("75") ? {} : (stryCov_9fa48("75"), {
              error: stryMutAct_9fa48("76") ? "" : (stryCov_9fa48("76"), "Invalid task ID format.")
            }));
          }
        }
        const task = await Task.findById(req.params.id);
        if (stryMutAct_9fa48("79") ? false : stryMutAct_9fa48("78") ? true : stryMutAct_9fa48("77") ? task : (stryCov_9fa48("77", "78", "79"), !task)) {
          if (stryMutAct_9fa48("80")) {
            {}
          } else {
            stryCov_9fa48("80");
            console.log(stryMutAct_9fa48("81") ? "" : (stryCov_9fa48("81"), "Task Not Found:"), req.params.id);
            return res.status(404).json(stryMutAct_9fa48("82") ? {} : (stryCov_9fa48("82"), {
              error: stryMutAct_9fa48("83") ? "" : (stryCov_9fa48("83"), "Task not found.")
            }));
          }
        }
        console.log(stryMutAct_9fa48("84") ? "" : (stryCov_9fa48("84"), "Task Found:"), task);
        res.status(200).json(task);
      }
    } catch (error) {
      if (stryMutAct_9fa48("85")) {
        {}
      } else {
        stryCov_9fa48("85");
        console.error(stryMutAct_9fa48("86") ? "" : (stryCov_9fa48("86"), "Error in getTaskById:"), stryMutAct_9fa48("89") ? error.message && error : stryMutAct_9fa48("88") ? false : stryMutAct_9fa48("87") ? true : (stryCov_9fa48("87", "88", "89"), error.message || error));
        res.status(500).json(stryMutAct_9fa48("90") ? {} : (stryCov_9fa48("90"), {
          error: stryMutAct_9fa48("91") ? "" : (stryCov_9fa48("91"), "Internal Server Error")
        }));
      }
    }
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  if (stryMutAct_9fa48("92")) {
    {}
  } else {
    stryCov_9fa48("92");
    // log('updateTask');
    try {
      if (stryMutAct_9fa48("93")) {
        {}
      } else {
        stryCov_9fa48("93");
        if (stryMutAct_9fa48("96") ? false : stryMutAct_9fa48("95") ? true : stryMutAct_9fa48("94") ? mongoose.Types.ObjectId.isValid(req.params.id) : (stryCov_9fa48("94", "95", "96"), !mongoose.Types.ObjectId.isValid(req.params.id))) {
          if (stryMutAct_9fa48("97")) {
            {}
          } else {
            stryCov_9fa48("97");
            console.log(stryMutAct_9fa48("98") ? "" : (stryCov_9fa48("98"), "🚨 Received Invalid ID:"), req.params.id);
            return res.status(400).json(stryMutAct_9fa48("99") ? {} : (stryCov_9fa48("99"), {
              error: stryMutAct_9fa48("100") ? "" : (stryCov_9fa48("100"), "Invalid task ID format.")
            }));
          }
        }
        const task = await Task.findById(req.params.id);
        if (stryMutAct_9fa48("103") ? false : stryMutAct_9fa48("102") ? true : stryMutAct_9fa48("101") ? task : (stryCov_9fa48("101", "102", "103"), !task)) {
          if (stryMutAct_9fa48("104")) {
            {}
          } else {
            stryCov_9fa48("104");
            return res.status(404).json(stryMutAct_9fa48("105") ? {} : (stryCov_9fa48("105"), {
              error: stryMutAct_9fa48("106") ? "" : (stryCov_9fa48("106"), "Task not found.")
            }));
          }
        }
        const {
          priority,
          dueDate
        } = req.body;
        const allowedPriorities = new Set(stryMutAct_9fa48("107") ? [] : (stryCov_9fa48("107"), [stryMutAct_9fa48("108") ? "" : (stryCov_9fa48("108"), "Low"), stryMutAct_9fa48("109") ? "" : (stryCov_9fa48("109"), "Medium"), stryMutAct_9fa48("110") ? "" : (stryCov_9fa48("110"), "High")]));
        if (stryMutAct_9fa48("113") ? priority || !allowedPriorities.has(priority) : stryMutAct_9fa48("112") ? false : stryMutAct_9fa48("111") ? true : (stryCov_9fa48("111", "112", "113"), priority && (stryMutAct_9fa48("114") ? allowedPriorities.has(priority) : (stryCov_9fa48("114"), !allowedPriorities.has(priority))))) {
          if (stryMutAct_9fa48("115")) {
            {}
          } else {
            stryCov_9fa48("115");
            return res.status(400).json(stryMutAct_9fa48("116") ? {} : (stryCov_9fa48("116"), {
              error: stryMutAct_9fa48("117") ? "" : (stryCov_9fa48("117"), "Invalid priority value. Must be 'Low', 'Medium', or 'High'.")
            }));
          }
        }
        if (stryMutAct_9fa48("120") ? dueDate || !moment(dueDate, moment.ISO_8601, true).isValid() : stryMutAct_9fa48("119") ? false : stryMutAct_9fa48("118") ? true : (stryCov_9fa48("118", "119", "120"), dueDate && (stryMutAct_9fa48("121") ? moment(dueDate, moment.ISO_8601, true).isValid() : (stryCov_9fa48("121"), !moment(dueDate, moment.ISO_8601, stryMutAct_9fa48("122") ? false : (stryCov_9fa48("122"), true)).isValid())))) {
          if (stryMutAct_9fa48("123")) {
            {}
          } else {
            stryCov_9fa48("123");
            return res.status(400).json(stryMutAct_9fa48("124") ? {} : (stryCov_9fa48("124"), {
              error: stryMutAct_9fa48("125") ? "" : (stryCov_9fa48("125"), "Invalid due date format. Must be in ISO 8601 format.")
            }));
          }
        }
        if (stryMutAct_9fa48("127") ? false : stryMutAct_9fa48("126") ? true : (stryCov_9fa48("126", "127"), req.body.title)) {
          if (stryMutAct_9fa48("128")) {
            {}
          } else {
            stryCov_9fa48("128");
            req.body.title = stryMutAct_9fa48("129") ? req.body.title : (stryCov_9fa48("129"), req.body.title.trim());
          }
        }
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, stryMutAct_9fa48("130") ? {} : (stryCov_9fa48("130"), {
          new: stryMutAct_9fa48("131") ? false : (stryCov_9fa48("131"), true)
        }));
        if (stryMutAct_9fa48("134") ? false : stryMutAct_9fa48("133") ? true : stryMutAct_9fa48("132") ? updatedTask : (stryCov_9fa48("132", "133", "134"), !updatedTask)) {
          if (stryMutAct_9fa48("135")) {
            {}
          } else {
            stryCov_9fa48("135");
            return res.status(500).json(stryMutAct_9fa48("136") ? {} : (stryCov_9fa48("136"), {
              error: stryMutAct_9fa48("137") ? "" : (stryCov_9fa48("137"), "Task update failed.")
            }));
          }
        }
        res.status(200).json(updatedTask);
      }
    } catch (error) {
      if (stryMutAct_9fa48("138")) {
        {}
      } else {
        stryCov_9fa48("138");
        // console.error("Error updating task:", error.message || error);
        res.status(500).json(stryMutAct_9fa48("139") ? {} : (stryCov_9fa48("139"), {
          error: stryMutAct_9fa48("140") ? "" : (stryCov_9fa48("140"), "Internal Server Error")
        }));
      }
    }
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  if (stryMutAct_9fa48("141")) {
    {}
  } else {
    stryCov_9fa48("141");
    //   log('deleteTask');
    try {
      if (stryMutAct_9fa48("142")) {
        {}
      } else {
        stryCov_9fa48("142");
        if (stryMutAct_9fa48("145") ? false : stryMutAct_9fa48("144") ? true : stryMutAct_9fa48("143") ? mongoose.Types.ObjectId.isValid(req.params.id) : (stryCov_9fa48("143", "144", "145"), !mongoose.Types.ObjectId.isValid(req.params.id))) {
          if (stryMutAct_9fa48("146")) {
            {}
          } else {
            stryCov_9fa48("146");
            // console.log("🚨 Received Invalid ID:", req.params.id);
            return res.status(400).json(stryMutAct_9fa48("147") ? {} : (stryCov_9fa48("147"), {
              error: stryMutAct_9fa48("148") ? "" : (stryCov_9fa48("148"), "Invalid task ID format.")
            }));
          }
        }
        const task = await Task.findById(req.params.id);
        if (stryMutAct_9fa48("151") ? false : stryMutAct_9fa48("150") ? true : stryMutAct_9fa48("149") ? task : (stryCov_9fa48("149", "150", "151"), !task)) {
          if (stryMutAct_9fa48("152")) {
            {}
          } else {
            stryCov_9fa48("152");
            return res.status(404).json(stryMutAct_9fa48("153") ? {} : (stryCov_9fa48("153"), {
              error: stryMutAct_9fa48("154") ? "" : (stryCov_9fa48("154"), "Task not found.")
            }));
          }
        }
        await Task.findByIdAndDelete(req.params.id);
        res.status(204).send();
        //console.log("🔥 deleteTask logic hit");
      }
    } catch (error) {
      if (stryMutAct_9fa48("155")) {
        {}
      } else {
        stryCov_9fa48("155");
        //console.error("Error deleting task:", error.message || error);
        res.status(500).json(stryMutAct_9fa48("156") ? {} : (stryCov_9fa48("156"), {
          error: stryMutAct_9fa48("157") ? "" : (stryCov_9fa48("157"), "Internal Server Error")
        }));
      }
    }
  }
};

// Delete all tasks
exports.deleteAllTasks = async (req, res) => {
  if (stryMutAct_9fa48("158")) {
    {}
  } else {
    stryCov_9fa48("158");
    // log('deleteAllTasks');
    try {
      if (stryMutAct_9fa48("159")) {
        {}
      } else {
        stryCov_9fa48("159");
        //console.log("Deleting all tasks...");
        await Task.deleteMany({});
        res.status(204).send();
        //console.log("🔥 deleteAllTasks logic hit");
      }
    } catch (error) {
      if (stryMutAct_9fa48("160")) {
        {}
      } else {
        stryCov_9fa48("160");
        //console.error("Error deleting all tasks:", error.message || error);
        res.status(500).json(stryMutAct_9fa48("161") ? {} : (stryCov_9fa48("161"), {
          error: stryMutAct_9fa48("162") ? "" : (stryCov_9fa48("162"), "Internal Server Error")
        }));
      }
    }
  }
};