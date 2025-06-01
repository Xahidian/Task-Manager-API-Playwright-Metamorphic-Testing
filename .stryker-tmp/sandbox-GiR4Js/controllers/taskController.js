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

// console.log("✅ taskController loaded");

// Create a new task
exports.createTask = async (req, res) => {
  if (stryMutAct_9fa48("0")) {
    {}
  } else {
    stryCov_9fa48("0");
    // log('createTask');
    try {
      if (stryMutAct_9fa48("1")) {
        {}
      } else {
        stryCov_9fa48("1");
        const {
          title,
          dueDate,
          priority
        } = req.body;
        if (stryMutAct_9fa48("4") ? (!title || typeof title !== "string") && title.trim().length === 0 : stryMutAct_9fa48("3") ? false : stryMutAct_9fa48("2") ? true : (stryCov_9fa48("2", "3", "4"), (stryMutAct_9fa48("6") ? !title && typeof title !== "string" : stryMutAct_9fa48("5") ? false : (stryCov_9fa48("5", "6"), (stryMutAct_9fa48("7") ? title : (stryCov_9fa48("7"), !title)) || (stryMutAct_9fa48("9") ? typeof title === "string" : stryMutAct_9fa48("8") ? false : (stryCov_9fa48("8", "9"), typeof title !== (stryMutAct_9fa48("10") ? "" : (stryCov_9fa48("10"), "string")))))) || (stryMutAct_9fa48("12") ? title.trim().length !== 0 : stryMutAct_9fa48("11") ? false : (stryCov_9fa48("11", "12"), (stryMutAct_9fa48("13") ? title.length : (stryCov_9fa48("13"), title.trim().length)) === 0)))) {
          if (stryMutAct_9fa48("14")) {
            {}
          } else {
            stryCov_9fa48("14");
            return res.status(400).json(stryMutAct_9fa48("15") ? {} : (stryCov_9fa48("15"), {
              error: stryMutAct_9fa48("16") ? "" : (stryCov_9fa48("16"), "Title is required and must be a non-empty string.")
            }));
          }
        }

        //  Injected Fault 1: Case-insensitive duplicate check before creating the task.
        const existingTask = await Task.findOne(stryMutAct_9fa48("17") ? {} : (stryCov_9fa48("17"), {
          title: new RegExp(stryMutAct_9fa48("18") ? `` : (stryCov_9fa48("18"), `^${stryMutAct_9fa48("19") ? title : (stryCov_9fa48("19"), title.trim())}$`), stryMutAct_9fa48("20") ? "" : (stryCov_9fa48("20"), 'i'))
        }));
        if (stryMutAct_9fa48("22") ? false : stryMutAct_9fa48("21") ? true : (stryCov_9fa48("21", "22"), existingTask)) {
          if (stryMutAct_9fa48("23")) {
            {}
          } else {
            stryCov_9fa48("23");
            return res.status(400).json(stryMutAct_9fa48("24") ? {} : (stryCov_9fa48("24"), {
              error: stryMutAct_9fa48("25") ? "" : (stryCov_9fa48("25"), "A task with this title already exists.")
            }));
          }
        }
        if (stryMutAct_9fa48("28") ? dueDate || !moment(dueDate, moment.ISO_8601, true).isValid() : stryMutAct_9fa48("27") ? false : stryMutAct_9fa48("26") ? true : (stryCov_9fa48("26", "27", "28"), dueDate && (stryMutAct_9fa48("29") ? moment(dueDate, moment.ISO_8601, true).isValid() : (stryCov_9fa48("29"), !moment(dueDate, moment.ISO_8601, stryMutAct_9fa48("30") ? false : (stryCov_9fa48("30"), true)).isValid())))) {
          if (stryMutAct_9fa48("31")) {
            {}
          } else {
            stryCov_9fa48("31");
            //  console.log("❌ Invalid dueDate rejected:", dueDate);
            return res.status(400).json(stryMutAct_9fa48("32") ? {} : (stryCov_9fa48("32"), {
              error: stryMutAct_9fa48("33") ? "" : (stryCov_9fa48("33"), "Invalid due date format. Must be in ISO 8601 format.")
            }));
          }
        }
        const allowedPriorities = new Set(stryMutAct_9fa48("34") ? [] : (stryCov_9fa48("34"), [stryMutAct_9fa48("35") ? "" : (stryCov_9fa48("35"), "Low"), stryMutAct_9fa48("36") ? "" : (stryCov_9fa48("36"), "Medium"), stryMutAct_9fa48("37") ? "" : (stryCov_9fa48("37"), "High")]));
        if (stryMutAct_9fa48("40") ? priority || !allowedPriorities.has(priority) : stryMutAct_9fa48("39") ? false : stryMutAct_9fa48("38") ? true : (stryCov_9fa48("38", "39", "40"), priority && (stryMutAct_9fa48("41") ? allowedPriorities.has(priority) : (stryCov_9fa48("41"), !allowedPriorities.has(priority))))) {
          if (stryMutAct_9fa48("42")) {
            {}
          } else {
            stryCov_9fa48("42");
            return res.status(400).json(stryMutAct_9fa48("43") ? {} : (stryCov_9fa48("43"), {
              error: stryMutAct_9fa48("44") ? "" : (stryCov_9fa48("44"), "Invalid priority value. Must be 'Low', 'Medium', or 'High'.")
            }));
          }
        }
        const task = await Task.create(stryMutAct_9fa48("45") ? {} : (stryCov_9fa48("45"), {
          ...req.body,
          title: stryMutAct_9fa48("46") ? title : (stryCov_9fa48("46"), title.trim())
        }));
        res.status(201).json(task);
      }
    } catch (error) {
      if (stryMutAct_9fa48("47")) {
        {}
      } else {
        stryCov_9fa48("47");
        console.error(stryMutAct_9fa48("48") ? "" : (stryCov_9fa48("48"), "Error creating task:"), stryMutAct_9fa48("51") ? error.message && error : stryMutAct_9fa48("50") ? false : stryMutAct_9fa48("49") ? true : (stryCov_9fa48("49", "50", "51"), error.message || error));
        res.status(500).json(stryMutAct_9fa48("52") ? {} : (stryCov_9fa48("52"), {
          error: stryMutAct_9fa48("53") ? "" : (stryCov_9fa48("53"), "Internal Server Error")
        }));
      }
    }
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  if (stryMutAct_9fa48("54")) {
    {}
  } else {
    stryCov_9fa48("54");
    //  log('getTasks');
    try {
      if (stryMutAct_9fa48("55")) {
        {}
      } else {
        stryCov_9fa48("55");
        const tasks = await (stryMutAct_9fa48("56") ? Task.find().lean() : (stryCov_9fa48("56"), Task.find().sort(stryMutAct_9fa48("57") ? {} : (stryCov_9fa48("57"), {
          createdAt: 1
        })).lean()));
        res.status(200).json(tasks);
      }
    } catch (error) {
      if (stryMutAct_9fa48("58")) {
        {}
      } else {
        stryCov_9fa48("58");
        console.error(stryMutAct_9fa48("59") ? "" : (stryCov_9fa48("59"), "Error fetching tasks:"), stryMutAct_9fa48("62") ? error.message && error : stryMutAct_9fa48("61") ? false : stryMutAct_9fa48("60") ? true : (stryCov_9fa48("60", "61", "62"), error.message || error));
        res.status(500).json(stryMutAct_9fa48("63") ? {} : (stryCov_9fa48("63"), {
          error: stryMutAct_9fa48("64") ? "" : (stryCov_9fa48("64"), "Internal Server Error")
        }));
      }
    }
  }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
  if (stryMutAct_9fa48("65")) {
    {}
  } else {
    stryCov_9fa48("65");
    // log('getTaskById');
    try {
      if (stryMutAct_9fa48("66")) {
        {}
      } else {
        stryCov_9fa48("66");
        console.log(stryMutAct_9fa48("67") ? "" : (stryCov_9fa48("67"), "Fetching Task with ID:"), req.params.id);
        if (stryMutAct_9fa48("70") ? false : stryMutAct_9fa48("69") ? true : stryMutAct_9fa48("68") ? mongoose.Types.ObjectId.isValid(req.params.id) : (stryCov_9fa48("68", "69", "70"), !mongoose.Types.ObjectId.isValid(req.params.id))) {
          if (stryMutAct_9fa48("71")) {
            {}
          } else {
            stryCov_9fa48("71");
            // console.log("🚨 Received Invalid ID:", req.params.id);
            return res.status(400).json(stryMutAct_9fa48("72") ? {} : (stryCov_9fa48("72"), {
              error: stryMutAct_9fa48("73") ? "" : (stryCov_9fa48("73"), "Invalid task ID format.")
            }));
          }
        }
        const task = await Task.findById(req.params.id);
        if (stryMutAct_9fa48("76") ? false : stryMutAct_9fa48("75") ? true : stryMutAct_9fa48("74") ? task : (stryCov_9fa48("74", "75", "76"), !task)) {
          if (stryMutAct_9fa48("77")) {
            {}
          } else {
            stryCov_9fa48("77");
            console.log(stryMutAct_9fa48("78") ? "" : (stryCov_9fa48("78"), "Task Not Found:"), req.params.id);
            return res.status(404).json(stryMutAct_9fa48("79") ? {} : (stryCov_9fa48("79"), {
              error: stryMutAct_9fa48("80") ? "" : (stryCov_9fa48("80"), "Task not found.")
            }));
          }
        }

        // console.log("Task Found:", task);
        res.status(200).json(task);
      }
    } catch (error) {
      if (stryMutAct_9fa48("81")) {
        {}
      } else {
        stryCov_9fa48("81");
        console.error(stryMutAct_9fa48("82") ? "" : (stryCov_9fa48("82"), "Error in getTaskById:"), stryMutAct_9fa48("85") ? error.message && error : stryMutAct_9fa48("84") ? false : stryMutAct_9fa48("83") ? true : (stryCov_9fa48("83", "84", "85"), error.message || error));
        res.status(500).json(stryMutAct_9fa48("86") ? {} : (stryCov_9fa48("86"), {
          error: stryMutAct_9fa48("87") ? "" : (stryCov_9fa48("87"), "Internal Server Error")
        }));
      }
    }
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  if (stryMutAct_9fa48("88")) {
    {}
  } else {
    stryCov_9fa48("88");
    // log('updateTask');
    try {
      if (stryMutAct_9fa48("89")) {
        {}
      } else {
        stryCov_9fa48("89");
        if (stryMutAct_9fa48("92") ? false : stryMutAct_9fa48("91") ? true : stryMutAct_9fa48("90") ? mongoose.Types.ObjectId.isValid(req.params.id) : (stryCov_9fa48("90", "91", "92"), !mongoose.Types.ObjectId.isValid(req.params.id))) {
          if (stryMutAct_9fa48("93")) {
            {}
          } else {
            stryCov_9fa48("93");
            //  console.log("🚨 Received Invalid ID:", req.params.id);
            return res.status(400).json(stryMutAct_9fa48("94") ? {} : (stryCov_9fa48("94"), {
              error: stryMutAct_9fa48("95") ? "" : (stryCov_9fa48("95"), "Invalid task ID format.")
            }));
          }
        }
        const task = await Task.findById(req.params.id);
        if (stryMutAct_9fa48("98") ? false : stryMutAct_9fa48("97") ? true : stryMutAct_9fa48("96") ? task : (stryCov_9fa48("96", "97", "98"), !task)) {
          if (stryMutAct_9fa48("99")) {
            {}
          } else {
            stryCov_9fa48("99");
            return res.status(404).json(stryMutAct_9fa48("100") ? {} : (stryCov_9fa48("100"), {
              error: stryMutAct_9fa48("101") ? "" : (stryCov_9fa48("101"), "Task not found.")
            }));
          }
        }
        const {
          priority,
          dueDate
        } = req.body;
        const allowedPriorities = new Set(stryMutAct_9fa48("102") ? [] : (stryCov_9fa48("102"), [stryMutAct_9fa48("103") ? "" : (stryCov_9fa48("103"), "Low"), stryMutAct_9fa48("104") ? "" : (stryCov_9fa48("104"), "Medium"), stryMutAct_9fa48("105") ? "" : (stryCov_9fa48("105"), "High")]));
        if (stryMutAct_9fa48("108") ? priority || !allowedPriorities.has(priority) : stryMutAct_9fa48("107") ? false : stryMutAct_9fa48("106") ? true : (stryCov_9fa48("106", "107", "108"), priority && (stryMutAct_9fa48("109") ? allowedPriorities.has(priority) : (stryCov_9fa48("109"), !allowedPriorities.has(priority))))) {
          if (stryMutAct_9fa48("110")) {
            {}
          } else {
            stryCov_9fa48("110");
            return res.status(400).json(stryMutAct_9fa48("111") ? {} : (stryCov_9fa48("111"), {
              error: stryMutAct_9fa48("112") ? "" : (stryCov_9fa48("112"), "Invalid priority value. Must be 'Low', 'Medium', or 'High'.")
            }));
          }
        }
        if (stryMutAct_9fa48("115") ? dueDate || !moment(dueDate, moment.ISO_8601, true).isValid() : stryMutAct_9fa48("114") ? false : stryMutAct_9fa48("113") ? true : (stryCov_9fa48("113", "114", "115"), dueDate && (stryMutAct_9fa48("116") ? moment(dueDate, moment.ISO_8601, true).isValid() : (stryCov_9fa48("116"), !moment(dueDate, moment.ISO_8601, stryMutAct_9fa48("117") ? false : (stryCov_9fa48("117"), true)).isValid())))) {
          if (stryMutAct_9fa48("118")) {
            {}
          } else {
            stryCov_9fa48("118");
            return res.status(400).json(stryMutAct_9fa48("119") ? {} : (stryCov_9fa48("119"), {
              error: stryMutAct_9fa48("120") ? "" : (stryCov_9fa48("120"), "Invalid due date format. Must be in ISO 8601 format.")
            }));
          }
        }
        if (stryMutAct_9fa48("122") ? false : stryMutAct_9fa48("121") ? true : (stryCov_9fa48("121", "122"), req.body.title)) {
          if (stryMutAct_9fa48("123")) {
            {}
          } else {
            stryCov_9fa48("123");
            req.body.title = stryMutAct_9fa48("124") ? req.body.title : (stryCov_9fa48("124"), req.body.title.trim());
          }
        }
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, stryMutAct_9fa48("125") ? {} : (stryCov_9fa48("125"), {
          new: stryMutAct_9fa48("126") ? false : (stryCov_9fa48("126"), true)
        }));
        if (stryMutAct_9fa48("129") ? false : stryMutAct_9fa48("128") ? true : stryMutAct_9fa48("127") ? updatedTask : (stryCov_9fa48("127", "128", "129"), !updatedTask)) {
          if (stryMutAct_9fa48("130")) {
            {}
          } else {
            stryCov_9fa48("130");
            return res.status(500).json(stryMutAct_9fa48("131") ? {} : (stryCov_9fa48("131"), {
              error: stryMutAct_9fa48("132") ? "" : (stryCov_9fa48("132"), "Task update failed.")
            }));
          }
        }
        res.status(200).json(updatedTask);
      }
    } catch (error) {
      if (stryMutAct_9fa48("133")) {
        {}
      } else {
        stryCov_9fa48("133");
        console.error(stryMutAct_9fa48("134") ? "" : (stryCov_9fa48("134"), "Error updating task:"), stryMutAct_9fa48("137") ? error.message && error : stryMutAct_9fa48("136") ? false : stryMutAct_9fa48("135") ? true : (stryCov_9fa48("135", "136", "137"), error.message || error));
        res.status(500).json(stryMutAct_9fa48("138") ? {} : (stryCov_9fa48("138"), {
          error: stryMutAct_9fa48("139") ? "" : (stryCov_9fa48("139"), "Internal Server Error")
        }));
      }
    }
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  if (stryMutAct_9fa48("140")) {
    {}
  } else {
    stryCov_9fa48("140");
    //   log('deleteTask');
    try {
      if (stryMutAct_9fa48("141")) {
        {}
      } else {
        stryCov_9fa48("141");
        if (stryMutAct_9fa48("144") ? false : stryMutAct_9fa48("143") ? true : stryMutAct_9fa48("142") ? mongoose.Types.ObjectId.isValid(req.params.id) : (stryCov_9fa48("142", "143", "144"), !mongoose.Types.ObjectId.isValid(req.params.id))) {
          if (stryMutAct_9fa48("145")) {
            {}
          } else {
            stryCov_9fa48("145");
            // console.log("🚨 Received Invalid ID:", req.params.id);
            return res.status(400).json(stryMutAct_9fa48("146") ? {} : (stryCov_9fa48("146"), {
              error: stryMutAct_9fa48("147") ? "" : (stryCov_9fa48("147"), "Invalid task ID format.")
            }));
          }
        }
        const task = await Task.findById(req.params.id);
        if (stryMutAct_9fa48("150") ? false : stryMutAct_9fa48("149") ? true : stryMutAct_9fa48("148") ? task : (stryCov_9fa48("148", "149", "150"), !task)) {
          if (stryMutAct_9fa48("151")) {
            {}
          } else {
            stryCov_9fa48("151");
            return res.status(404).json(stryMutAct_9fa48("152") ? {} : (stryCov_9fa48("152"), {
              error: stryMutAct_9fa48("153") ? "" : (stryCov_9fa48("153"), "Task not found.")
            }));
          }
        }
        await Task.findByIdAndDelete(req.params.id);
        res.status(204).send();
        // console.log("🔥 deleteTask logic hit");
      }
    } catch (error) {
      if (stryMutAct_9fa48("154")) {
        {}
      } else {
        stryCov_9fa48("154");
        console.error(stryMutAct_9fa48("155") ? "" : (stryCov_9fa48("155"), "Error deleting task:"), stryMutAct_9fa48("158") ? error.message && error : stryMutAct_9fa48("157") ? false : stryMutAct_9fa48("156") ? true : (stryCov_9fa48("156", "157", "158"), error.message || error));
        res.status(500).json(stryMutAct_9fa48("159") ? {} : (stryCov_9fa48("159"), {
          error: stryMutAct_9fa48("160") ? "" : (stryCov_9fa48("160"), "Internal Server Error")
        }));
      }
    }
  }
};

// Delete all tasks
exports.deleteAllTasks = async (req, res) => {
  if (stryMutAct_9fa48("161")) {
    {}
  } else {
    stryCov_9fa48("161");
    // log('deleteAllTasks');
    try {
      if (stryMutAct_9fa48("162")) {
        {}
      } else {
        stryCov_9fa48("162");
        //console.log("Deleting all tasks...");
        await Task.deleteMany({});
        res.status(204).send();
        // console.log("🔥 deleteAllTasks logic hit");
      }
    } catch (error) {
      if (stryMutAct_9fa48("163")) {
        {}
      } else {
        stryCov_9fa48("163");
        console.error(stryMutAct_9fa48("164") ? "" : (stryCov_9fa48("164"), "Error deleting all tasks:"), stryMutAct_9fa48("167") ? error.message && error : stryMutAct_9fa48("166") ? false : stryMutAct_9fa48("165") ? true : (stryCov_9fa48("165", "166", "167"), error.message || error));
        res.status(500).json(stryMutAct_9fa48("168") ? {} : (stryCov_9fa48("168"), {
          error: stryMutAct_9fa48("169") ? "" : (stryCov_9fa48("169"), "Internal Server Error")
        }));
      }
    }
  }
};