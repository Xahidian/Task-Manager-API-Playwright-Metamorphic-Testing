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
    log(stryMutAct_9fa48("2") ? "" : (stryCov_9fa48("2"), 'createTask'));
    try {
      if (stryMutAct_9fa48("3")) {
        {}
      } else {
        stryCov_9fa48("3");
        const {
          title,
          dueDate,
          priority
        } = req.body;
        if (stryMutAct_9fa48("6") ? (!title || typeof title !== "string") && title.trim().length === 0 : stryMutAct_9fa48("5") ? false : stryMutAct_9fa48("4") ? true : (stryCov_9fa48("4", "5", "6"), (stryMutAct_9fa48("8") ? !title && typeof title !== "string" : stryMutAct_9fa48("7") ? false : (stryCov_9fa48("7", "8"), (stryMutAct_9fa48("9") ? title : (stryCov_9fa48("9"), !title)) || (stryMutAct_9fa48("11") ? typeof title === "string" : stryMutAct_9fa48("10") ? false : (stryCov_9fa48("10", "11"), typeof title !== (stryMutAct_9fa48("12") ? "" : (stryCov_9fa48("12"), "string")))))) || (stryMutAct_9fa48("14") ? title.trim().length !== 0 : stryMutAct_9fa48("13") ? false : (stryCov_9fa48("13", "14"), (stryMutAct_9fa48("15") ? title.length : (stryCov_9fa48("15"), title.trim().length)) === 0)))) {
          if (stryMutAct_9fa48("16")) {
            {}
          } else {
            stryCov_9fa48("16");
            return res.status(400).json(stryMutAct_9fa48("17") ? {} : (stryCov_9fa48("17"), {
              error: stryMutAct_9fa48("18") ? "" : (stryCov_9fa48("18"), "Title is required and must be a non-empty string.")
            }));
          }
        }

        //  Injected Fault 1: Case-insensitive duplicate check before creating the task.
        const existingTask = await Task.findOne(stryMutAct_9fa48("19") ? {} : (stryCov_9fa48("19"), {
          title: new RegExp(stryMutAct_9fa48("20") ? `` : (stryCov_9fa48("20"), `^${stryMutAct_9fa48("21") ? title : (stryCov_9fa48("21"), title.trim())}$`), stryMutAct_9fa48("22") ? "" : (stryCov_9fa48("22"), 'i'))
        }));
        if (stryMutAct_9fa48("24") ? false : stryMutAct_9fa48("23") ? true : (stryCov_9fa48("23", "24"), existingTask)) {
          if (stryMutAct_9fa48("25")) {
            {}
          } else {
            stryCov_9fa48("25");
            return res.status(400).json(stryMutAct_9fa48("26") ? {} : (stryCov_9fa48("26"), {
              error: stryMutAct_9fa48("27") ? "" : (stryCov_9fa48("27"), "A task with this title already exists.")
            }));
          }
        }
        if (stryMutAct_9fa48("30") ? dueDate || !moment(dueDate, moment.ISO_8601, true).isValid() : stryMutAct_9fa48("29") ? false : stryMutAct_9fa48("28") ? true : (stryCov_9fa48("28", "29", "30"), dueDate && (stryMutAct_9fa48("31") ? moment(dueDate, moment.ISO_8601, true).isValid() : (stryCov_9fa48("31"), !moment(dueDate, moment.ISO_8601, stryMutAct_9fa48("32") ? false : (stryCov_9fa48("32"), true)).isValid())))) {
          if (stryMutAct_9fa48("33")) {
            {}
          } else {
            stryCov_9fa48("33");
            console.log(stryMutAct_9fa48("34") ? "" : (stryCov_9fa48("34"), "❌ Invalid dueDate rejected:"), dueDate);
            return res.status(400).json(stryMutAct_9fa48("35") ? {} : (stryCov_9fa48("35"), {
              error: stryMutAct_9fa48("36") ? "" : (stryCov_9fa48("36"), "Invalid due date format. Must be in ISO 8601 format.")
            }));
          }
        }
        const allowedPriorities = new Set(stryMutAct_9fa48("37") ? [] : (stryCov_9fa48("37"), [stryMutAct_9fa48("38") ? "" : (stryCov_9fa48("38"), "Low"), stryMutAct_9fa48("39") ? "" : (stryCov_9fa48("39"), "Medium"), stryMutAct_9fa48("40") ? "" : (stryCov_9fa48("40"), "High")]));
        if (stryMutAct_9fa48("43") ? priority || !allowedPriorities.has(priority) : stryMutAct_9fa48("42") ? false : stryMutAct_9fa48("41") ? true : (stryCov_9fa48("41", "42", "43"), priority && (stryMutAct_9fa48("44") ? allowedPriorities.has(priority) : (stryCov_9fa48("44"), !allowedPriorities.has(priority))))) {
          if (stryMutAct_9fa48("45")) {
            {}
          } else {
            stryCov_9fa48("45");
            return res.status(400).json(stryMutAct_9fa48("46") ? {} : (stryCov_9fa48("46"), {
              error: stryMutAct_9fa48("47") ? "" : (stryCov_9fa48("47"), "Invalid priority value. Must be 'Low', 'Medium', or 'High'.")
            }));
          }
        }
        const task = await Task.create(stryMutAct_9fa48("48") ? {} : (stryCov_9fa48("48"), {
          ...req.body,
          title: stryMutAct_9fa48("49") ? title : (stryCov_9fa48("49"), title.trim())
        }));
        res.status(201).json(task);
      }
    } catch (error) {
      if (stryMutAct_9fa48("50")) {
        {}
      } else {
        stryCov_9fa48("50");
        console.error(stryMutAct_9fa48("51") ? "" : (stryCov_9fa48("51"), "Error creating task:"), stryMutAct_9fa48("54") ? error.message && error : stryMutAct_9fa48("53") ? false : stryMutAct_9fa48("52") ? true : (stryCov_9fa48("52", "53", "54"), error.message || error));
        res.status(500).json(stryMutAct_9fa48("55") ? {} : (stryCov_9fa48("55"), {
          error: stryMutAct_9fa48("56") ? "" : (stryCov_9fa48("56"), "Internal Server Error")
        }));
      }
    }
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  if (stryMutAct_9fa48("57")) {
    {}
  } else {
    stryCov_9fa48("57");
    log(stryMutAct_9fa48("58") ? "" : (stryCov_9fa48("58"), 'getTasks'));
    try {
      if (stryMutAct_9fa48("59")) {
        {}
      } else {
        stryCov_9fa48("59");
        const tasks = await (stryMutAct_9fa48("60") ? Task.find().lean() : (stryCov_9fa48("60"), Task.find().sort(stryMutAct_9fa48("61") ? {} : (stryCov_9fa48("61"), {
          createdAt: 1
        })).lean()));
        res.status(200).json(tasks);
      }
    } catch (error) {
      if (stryMutAct_9fa48("62")) {
        {}
      } else {
        stryCov_9fa48("62");
        console.error(stryMutAct_9fa48("63") ? "" : (stryCov_9fa48("63"), "Error fetching tasks:"), stryMutAct_9fa48("66") ? error.message && error : stryMutAct_9fa48("65") ? false : stryMutAct_9fa48("64") ? true : (stryCov_9fa48("64", "65", "66"), error.message || error));
        res.status(500).json(stryMutAct_9fa48("67") ? {} : (stryCov_9fa48("67"), {
          error: stryMutAct_9fa48("68") ? "" : (stryCov_9fa48("68"), "Internal Server Error")
        }));
      }
    }
  }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
  if (stryMutAct_9fa48("69")) {
    {}
  } else {
    stryCov_9fa48("69");
    log(stryMutAct_9fa48("70") ? "" : (stryCov_9fa48("70"), 'getTaskById'));
    try {
      if (stryMutAct_9fa48("71")) {
        {}
      } else {
        stryCov_9fa48("71");
        console.log(stryMutAct_9fa48("72") ? "" : (stryCov_9fa48("72"), "Fetching Task with ID:"), req.params.id);
        if (stryMutAct_9fa48("75") ? false : stryMutAct_9fa48("74") ? true : stryMutAct_9fa48("73") ? mongoose.Types.ObjectId.isValid(req.params.id) : (stryCov_9fa48("73", "74", "75"), !mongoose.Types.ObjectId.isValid(req.params.id))) {
          if (stryMutAct_9fa48("76")) {
            {}
          } else {
            stryCov_9fa48("76");
            console.log(stryMutAct_9fa48("77") ? "" : (stryCov_9fa48("77"), "🚨 Received Invalid ID:"), req.params.id);
            return res.status(400).json(stryMutAct_9fa48("78") ? {} : (stryCov_9fa48("78"), {
              error: stryMutAct_9fa48("79") ? "" : (stryCov_9fa48("79"), "Invalid task ID format.")
            }));
          }
        }
        const task = await Task.findById(req.params.id);
        if (stryMutAct_9fa48("82") ? false : stryMutAct_9fa48("81") ? true : stryMutAct_9fa48("80") ? task : (stryCov_9fa48("80", "81", "82"), !task)) {
          if (stryMutAct_9fa48("83")) {
            {}
          } else {
            stryCov_9fa48("83");
            console.log(stryMutAct_9fa48("84") ? "" : (stryCov_9fa48("84"), "Task Not Found:"), req.params.id);
            return res.status(404).json(stryMutAct_9fa48("85") ? {} : (stryCov_9fa48("85"), {
              error: stryMutAct_9fa48("86") ? "" : (stryCov_9fa48("86"), "Task not found.")
            }));
          }
        }
        console.log(stryMutAct_9fa48("87") ? "" : (stryCov_9fa48("87"), "Task Found:"), task);
        res.status(200).json(task);
      }
    } catch (error) {
      if (stryMutAct_9fa48("88")) {
        {}
      } else {
        stryCov_9fa48("88");
        console.error(stryMutAct_9fa48("89") ? "" : (stryCov_9fa48("89"), "Error in getTaskById:"), stryMutAct_9fa48("92") ? error.message && error : stryMutAct_9fa48("91") ? false : stryMutAct_9fa48("90") ? true : (stryCov_9fa48("90", "91", "92"), error.message || error));
        res.status(500).json(stryMutAct_9fa48("93") ? {} : (stryCov_9fa48("93"), {
          error: stryMutAct_9fa48("94") ? "" : (stryCov_9fa48("94"), "Internal Server Error")
        }));
      }
    }
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  if (stryMutAct_9fa48("95")) {
    {}
  } else {
    stryCov_9fa48("95");
    log(stryMutAct_9fa48("96") ? "" : (stryCov_9fa48("96"), 'updateTask'));
    try {
      if (stryMutAct_9fa48("97")) {
        {}
      } else {
        stryCov_9fa48("97");
        if (stryMutAct_9fa48("100") ? false : stryMutAct_9fa48("99") ? true : stryMutAct_9fa48("98") ? mongoose.Types.ObjectId.isValid(req.params.id) : (stryCov_9fa48("98", "99", "100"), !mongoose.Types.ObjectId.isValid(req.params.id))) {
          if (stryMutAct_9fa48("101")) {
            {}
          } else {
            stryCov_9fa48("101");
            console.log(stryMutAct_9fa48("102") ? "" : (stryCov_9fa48("102"), "🚨 Received Invalid ID:"), req.params.id);
            return res.status(400).json(stryMutAct_9fa48("103") ? {} : (stryCov_9fa48("103"), {
              error: stryMutAct_9fa48("104") ? "" : (stryCov_9fa48("104"), "Invalid task ID format.")
            }));
          }
        }
        const task = await Task.findById(req.params.id);
        if (stryMutAct_9fa48("107") ? false : stryMutAct_9fa48("106") ? true : stryMutAct_9fa48("105") ? task : (stryCov_9fa48("105", "106", "107"), !task)) {
          if (stryMutAct_9fa48("108")) {
            {}
          } else {
            stryCov_9fa48("108");
            return res.status(404).json(stryMutAct_9fa48("109") ? {} : (stryCov_9fa48("109"), {
              error: stryMutAct_9fa48("110") ? "" : (stryCov_9fa48("110"), "Task not found.")
            }));
          }
        }
        const {
          priority,
          dueDate
        } = req.body;
        const allowedPriorities = new Set(stryMutAct_9fa48("111") ? [] : (stryCov_9fa48("111"), [stryMutAct_9fa48("112") ? "" : (stryCov_9fa48("112"), "Low"), stryMutAct_9fa48("113") ? "" : (stryCov_9fa48("113"), "Medium"), stryMutAct_9fa48("114") ? "" : (stryCov_9fa48("114"), "High")]));
        if (stryMutAct_9fa48("117") ? priority || !allowedPriorities.has(priority) : stryMutAct_9fa48("116") ? false : stryMutAct_9fa48("115") ? true : (stryCov_9fa48("115", "116", "117"), priority && (stryMutAct_9fa48("118") ? allowedPriorities.has(priority) : (stryCov_9fa48("118"), !allowedPriorities.has(priority))))) {
          if (stryMutAct_9fa48("119")) {
            {}
          } else {
            stryCov_9fa48("119");
            return res.status(400).json(stryMutAct_9fa48("120") ? {} : (stryCov_9fa48("120"), {
              error: stryMutAct_9fa48("121") ? "" : (stryCov_9fa48("121"), "Invalid priority value. Must be 'Low', 'Medium', or 'High'.")
            }));
          }
        }
        if (stryMutAct_9fa48("124") ? dueDate || !moment(dueDate, moment.ISO_8601, true).isValid() : stryMutAct_9fa48("123") ? false : stryMutAct_9fa48("122") ? true : (stryCov_9fa48("122", "123", "124"), dueDate && (stryMutAct_9fa48("125") ? moment(dueDate, moment.ISO_8601, true).isValid() : (stryCov_9fa48("125"), !moment(dueDate, moment.ISO_8601, stryMutAct_9fa48("126") ? false : (stryCov_9fa48("126"), true)).isValid())))) {
          if (stryMutAct_9fa48("127")) {
            {}
          } else {
            stryCov_9fa48("127");
            return res.status(400).json(stryMutAct_9fa48("128") ? {} : (stryCov_9fa48("128"), {
              error: stryMutAct_9fa48("129") ? "" : (stryCov_9fa48("129"), "Invalid due date format. Must be in ISO 8601 format.")
            }));
          }
        }
        if (stryMutAct_9fa48("131") ? false : stryMutAct_9fa48("130") ? true : (stryCov_9fa48("130", "131"), req.body.title)) {
          if (stryMutAct_9fa48("132")) {
            {}
          } else {
            stryCov_9fa48("132");
            req.body.title = stryMutAct_9fa48("133") ? req.body.title : (stryCov_9fa48("133"), req.body.title.trim());
          }
        }
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, stryMutAct_9fa48("134") ? {} : (stryCov_9fa48("134"), {
          new: stryMutAct_9fa48("135") ? false : (stryCov_9fa48("135"), true)
        }));
        if (stryMutAct_9fa48("138") ? false : stryMutAct_9fa48("137") ? true : stryMutAct_9fa48("136") ? updatedTask : (stryCov_9fa48("136", "137", "138"), !updatedTask)) {
          if (stryMutAct_9fa48("139")) {
            {}
          } else {
            stryCov_9fa48("139");
            return res.status(500).json(stryMutAct_9fa48("140") ? {} : (stryCov_9fa48("140"), {
              error: stryMutAct_9fa48("141") ? "" : (stryCov_9fa48("141"), "Task update failed.")
            }));
          }
        }
        res.status(200).json(updatedTask);
      }
    } catch (error) {
      if (stryMutAct_9fa48("142")) {
        {}
      } else {
        stryCov_9fa48("142");
        console.error(stryMutAct_9fa48("143") ? "" : (stryCov_9fa48("143"), "Error updating task:"), stryMutAct_9fa48("146") ? error.message && error : stryMutAct_9fa48("145") ? false : stryMutAct_9fa48("144") ? true : (stryCov_9fa48("144", "145", "146"), error.message || error));
        res.status(500).json(stryMutAct_9fa48("147") ? {} : (stryCov_9fa48("147"), {
          error: stryMutAct_9fa48("148") ? "" : (stryCov_9fa48("148"), "Internal Server Error")
        }));
      }
    }
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  if (stryMutAct_9fa48("149")) {
    {}
  } else {
    stryCov_9fa48("149");
    log(stryMutAct_9fa48("150") ? "" : (stryCov_9fa48("150"), 'deleteTask'));
    try {
      if (stryMutAct_9fa48("151")) {
        {}
      } else {
        stryCov_9fa48("151");
        if (stryMutAct_9fa48("154") ? false : stryMutAct_9fa48("153") ? true : stryMutAct_9fa48("152") ? mongoose.Types.ObjectId.isValid(req.params.id) : (stryCov_9fa48("152", "153", "154"), !mongoose.Types.ObjectId.isValid(req.params.id))) {
          if (stryMutAct_9fa48("155")) {
            {}
          } else {
            stryCov_9fa48("155");
            console.log(stryMutAct_9fa48("156") ? "" : (stryCov_9fa48("156"), "🚨 Received Invalid ID:"), req.params.id);
            return res.status(400).json(stryMutAct_9fa48("157") ? {} : (stryCov_9fa48("157"), {
              error: stryMutAct_9fa48("158") ? "" : (stryCov_9fa48("158"), "Invalid task ID format.")
            }));
          }
        }
        const task = await Task.findById(req.params.id);
        if (stryMutAct_9fa48("161") ? false : stryMutAct_9fa48("160") ? true : stryMutAct_9fa48("159") ? task : (stryCov_9fa48("159", "160", "161"), !task)) {
          if (stryMutAct_9fa48("162")) {
            {}
          } else {
            stryCov_9fa48("162");
            return res.status(404).json(stryMutAct_9fa48("163") ? {} : (stryCov_9fa48("163"), {
              error: stryMutAct_9fa48("164") ? "" : (stryCov_9fa48("164"), "Task not found.")
            }));
          }
        }
        await Task.findByIdAndDelete(req.params.id);
        res.status(204).send();
        console.log(stryMutAct_9fa48("165") ? "" : (stryCov_9fa48("165"), "🔥 deleteTask logic hit"));
      }
    } catch (error) {
      if (stryMutAct_9fa48("166")) {
        {}
      } else {
        stryCov_9fa48("166");
        console.error(stryMutAct_9fa48("167") ? "" : (stryCov_9fa48("167"), "Error deleting task:"), stryMutAct_9fa48("170") ? error.message && error : stryMutAct_9fa48("169") ? false : stryMutAct_9fa48("168") ? true : (stryCov_9fa48("168", "169", "170"), error.message || error));
        res.status(500).json(stryMutAct_9fa48("171") ? {} : (stryCov_9fa48("171"), {
          error: stryMutAct_9fa48("172") ? "" : (stryCov_9fa48("172"), "Internal Server Error")
        }));
      }
    }
  }
};

// Delete all tasks
exports.deleteAllTasks = async (req, res) => {
  if (stryMutAct_9fa48("173")) {
    {}
  } else {
    stryCov_9fa48("173");
    log(stryMutAct_9fa48("174") ? "" : (stryCov_9fa48("174"), 'deleteAllTasks'));
    try {
      if (stryMutAct_9fa48("175")) {
        {}
      } else {
        stryCov_9fa48("175");
        console.log(stryMutAct_9fa48("176") ? "" : (stryCov_9fa48("176"), "Deleting all tasks..."));
        await Task.deleteMany({});
        res.status(204).send();
        console.log(stryMutAct_9fa48("177") ? "" : (stryCov_9fa48("177"), "🔥 deleteAllTasks logic hit"));
      }
    } catch (error) {
      if (stryMutAct_9fa48("178")) {
        {}
      } else {
        stryCov_9fa48("178");
        console.error(stryMutAct_9fa48("179") ? "" : (stryCov_9fa48("179"), "Error deleting all tasks:"), stryMutAct_9fa48("182") ? error.message && error : stryMutAct_9fa48("181") ? false : stryMutAct_9fa48("180") ? true : (stryCov_9fa48("180", "181", "182"), error.message || error));
        res.status(500).json(stryMutAct_9fa48("183") ? {} : (stryCov_9fa48("183"), {
          error: stryMutAct_9fa48("184") ? "" : (stryCov_9fa48("184"), "Internal Server Error")
        }));
      }
    }
  }
};