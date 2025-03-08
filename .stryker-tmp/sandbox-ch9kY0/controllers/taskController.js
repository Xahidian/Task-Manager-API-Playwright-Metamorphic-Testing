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
          dueDate,
          priority
        } = req.body;

        // ✅ STRONG Title validation (prevents bypass)
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

        // ✅ Ensure title is case-insensitive but stored as provided
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

        // ✅ Strong Due Date validation using moment.js (ensures correct format)
        if (stryMutAct_9fa48("28") ? dueDate || !moment(dueDate, moment.ISO_8601, true).isValid() : stryMutAct_9fa48("27") ? false : stryMutAct_9fa48("26") ? true : (stryCov_9fa48("26", "27", "28"), dueDate && (stryMutAct_9fa48("29") ? moment(dueDate, moment.ISO_8601, true).isValid() : (stryCov_9fa48("29"), !moment(dueDate, moment.ISO_8601, stryMutAct_9fa48("30") ? false : (stryCov_9fa48("30"), true)).isValid())))) {
          if (stryMutAct_9fa48("31")) {
            {}
          } else {
            stryCov_9fa48("31");
            console.log(stryMutAct_9fa48("32") ? "" : (stryCov_9fa48("32"), "❌ Invalid dueDate rejected:"), dueDate); // Debugging
            return res.status(400).json(stryMutAct_9fa48("33") ? {} : (stryCov_9fa48("33"), {
              error: stryMutAct_9fa48("34") ? "" : (stryCov_9fa48("34"), "Invalid due date format. Must be in ISO 8601 format.")
            }));
          }
        }

        // ✅ Hardened Priority validation
        const allowedPriorities = new Set(stryMutAct_9fa48("35") ? [] : (stryCov_9fa48("35"), [stryMutAct_9fa48("36") ? "" : (stryCov_9fa48("36"), "Low"), stryMutAct_9fa48("37") ? "" : (stryCov_9fa48("37"), "Medium"), stryMutAct_9fa48("38") ? "" : (stryCov_9fa48("38"), "High")]));
        if (stryMutAct_9fa48("41") ? priority || !allowedPriorities.has(priority) : stryMutAct_9fa48("40") ? false : stryMutAct_9fa48("39") ? true : (stryCov_9fa48("39", "40", "41"), priority && (stryMutAct_9fa48("42") ? allowedPriorities.has(priority) : (stryCov_9fa48("42"), !allowedPriorities.has(priority))))) {
          if (stryMutAct_9fa48("43")) {
            {}
          } else {
            stryCov_9fa48("43");
            return res.status(400).json(stryMutAct_9fa48("44") ? {} : (stryCov_9fa48("44"), {
              error: stryMutAct_9fa48("45") ? "" : (stryCov_9fa48("45"), "Invalid priority value. Must be 'Low', 'Medium', or 'High'.")
            }));
          }
        }

        // ✅ Create task while preserving title case
        const task = await Task.create(stryMutAct_9fa48("46") ? {} : (stryCov_9fa48("46"), {
          ...req.body,
          title: stryMutAct_9fa48("47") ? title : (stryCov_9fa48("47"), title.trim())
        }));
        res.status(201).json(task);
      }
    } catch (error) {
      if (stryMutAct_9fa48("48")) {
        {}
      } else {
        stryCov_9fa48("48");
        console.error(stryMutAct_9fa48("49") ? "" : (stryCov_9fa48("49"), "Error creating task:"), stryMutAct_9fa48("52") ? error.message && error : stryMutAct_9fa48("51") ? false : stryMutAct_9fa48("50") ? true : (stryCov_9fa48("50", "51", "52"), error.message || error));
        res.status(500).json(stryMutAct_9fa48("53") ? {} : (stryCov_9fa48("53"), {
          error: stryMutAct_9fa48("54") ? "" : (stryCov_9fa48("54"), "Internal Server Error")
        }));
      }
    }
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  if (stryMutAct_9fa48("55")) {
    {}
  } else {
    stryCov_9fa48("55");
    try {
      if (stryMutAct_9fa48("56")) {
        {}
      } else {
        stryCov_9fa48("56");
        const tasks = await (stryMutAct_9fa48("57") ? Task.find().lean() : (stryCov_9fa48("57"), Task.find().sort(stryMutAct_9fa48("58") ? {} : (stryCov_9fa48("58"), {
          createdAt: 1
        })).lean()));
        res.status(200).json(tasks);
      }
    } catch (error) {
      if (stryMutAct_9fa48("59")) {
        {}
      } else {
        stryCov_9fa48("59");
        console.error(stryMutAct_9fa48("60") ? "" : (stryCov_9fa48("60"), "Error fetching tasks:"), stryMutAct_9fa48("63") ? error.message && error : stryMutAct_9fa48("62") ? false : stryMutAct_9fa48("61") ? true : (stryCov_9fa48("61", "62", "63"), error.message || error));
        res.status(500).json(stryMutAct_9fa48("64") ? {} : (stryCov_9fa48("64"), {
          error: stryMutAct_9fa48("65") ? "" : (stryCov_9fa48("65"), "Internal Server Error")
        }));
      }
    }
  }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
  if (stryMutAct_9fa48("66")) {
    {}
  } else {
    stryCov_9fa48("66");
    try {
      if (stryMutAct_9fa48("67")) {
        {}
      } else {
        stryCov_9fa48("67");
        console.log(stryMutAct_9fa48("68") ? "" : (stryCov_9fa48("68"), "Fetching Task with ID:"), req.params.id);
        if (stryMutAct_9fa48("71") ? false : stryMutAct_9fa48("70") ? true : stryMutAct_9fa48("69") ? mongoose.Types.ObjectId.isValid(req.params.id) : (stryCov_9fa48("69", "70", "71"), !mongoose.Types.ObjectId.isValid(req.params.id))) {
          if (stryMutAct_9fa48("72")) {
            {}
          } else {
            stryCov_9fa48("72");
            console.log(stryMutAct_9fa48("73") ? "" : (stryCov_9fa48("73"), "🚨 Received Invalid ID:"), req.params.id);
            return res.status(400).json(stryMutAct_9fa48("74") ? {} : (stryCov_9fa48("74"), {
              error: stryMutAct_9fa48("75") ? "" : (stryCov_9fa48("75"), "Invalid task ID format.")
            }));
          }
        }
        const task = await Task.findById(req.params.id);
        if (stryMutAct_9fa48("78") ? false : stryMutAct_9fa48("77") ? true : stryMutAct_9fa48("76") ? task : (stryCov_9fa48("76", "77", "78"), !task)) {
          if (stryMutAct_9fa48("79")) {
            {}
          } else {
            stryCov_9fa48("79");
            console.log(stryMutAct_9fa48("80") ? "" : (stryCov_9fa48("80"), "Task Not Found:"), req.params.id);
            return res.status(404).json(stryMutAct_9fa48("81") ? {} : (stryCov_9fa48("81"), {
              error: stryMutAct_9fa48("82") ? "" : (stryCov_9fa48("82"), "Task not found.")
            }));
          }
        }
        console.log(stryMutAct_9fa48("83") ? "" : (stryCov_9fa48("83"), "Task Found:"), task);
        res.status(200).json(task);
      }
    } catch (error) {
      if (stryMutAct_9fa48("84")) {
        {}
      } else {
        stryCov_9fa48("84");
        console.error(stryMutAct_9fa48("85") ? "" : (stryCov_9fa48("85"), "Error in getTaskById:"), stryMutAct_9fa48("88") ? error.message && error : stryMutAct_9fa48("87") ? false : stryMutAct_9fa48("86") ? true : (stryCov_9fa48("86", "87", "88"), error.message || error));
        res.status(500).json(stryMutAct_9fa48("89") ? {} : (stryCov_9fa48("89"), {
          error: stryMutAct_9fa48("90") ? "" : (stryCov_9fa48("90"), "Internal Server Error")
        }));
      }
    }
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  if (stryMutAct_9fa48("91")) {
    {}
  } else {
    stryCov_9fa48("91");
    try {
      if (stryMutAct_9fa48("92")) {
        {}
      } else {
        stryCov_9fa48("92");
        if (stryMutAct_9fa48("95") ? false : stryMutAct_9fa48("94") ? true : stryMutAct_9fa48("93") ? mongoose.Types.ObjectId.isValid(req.params.id) : (stryCov_9fa48("93", "94", "95"), !mongoose.Types.ObjectId.isValid(req.params.id))) {
          if (stryMutAct_9fa48("96")) {
            {}
          } else {
            stryCov_9fa48("96");
            console.log(stryMutAct_9fa48("97") ? "" : (stryCov_9fa48("97"), "🚨 Received Invalid ID:"), req.params.id);
            return res.status(400).json(stryMutAct_9fa48("98") ? {} : (stryCov_9fa48("98"), {
              error: stryMutAct_9fa48("99") ? "" : (stryCov_9fa48("99"), "Invalid task ID format.")
            }));
          }
        }
        const task = await Task.findById(req.params.id);
        if (stryMutAct_9fa48("102") ? false : stryMutAct_9fa48("101") ? true : stryMutAct_9fa48("100") ? task : (stryCov_9fa48("100", "101", "102"), !task)) {
          if (stryMutAct_9fa48("103")) {
            {}
          } else {
            stryCov_9fa48("103");
            return res.status(404).json(stryMutAct_9fa48("104") ? {} : (stryCov_9fa48("104"), {
              error: stryMutAct_9fa48("105") ? "" : (stryCov_9fa48("105"), "Task not found.")
            }));
          }
        }
        const {
          priority,
          dueDate
        } = req.body;
        const allowedPriorities = new Set(stryMutAct_9fa48("106") ? [] : (stryCov_9fa48("106"), [stryMutAct_9fa48("107") ? "" : (stryCov_9fa48("107"), "Low"), stryMutAct_9fa48("108") ? "" : (stryCov_9fa48("108"), "Medium"), stryMutAct_9fa48("109") ? "" : (stryCov_9fa48("109"), "High")]));
        if (stryMutAct_9fa48("112") ? priority || !allowedPriorities.has(priority) : stryMutAct_9fa48("111") ? false : stryMutAct_9fa48("110") ? true : (stryCov_9fa48("110", "111", "112"), priority && (stryMutAct_9fa48("113") ? allowedPriorities.has(priority) : (stryCov_9fa48("113"), !allowedPriorities.has(priority))))) {
          if (stryMutAct_9fa48("114")) {
            {}
          } else {
            stryCov_9fa48("114");
            return res.status(400).json(stryMutAct_9fa48("115") ? {} : (stryCov_9fa48("115"), {
              error: stryMutAct_9fa48("116") ? "" : (stryCov_9fa48("116"), "Invalid priority value. Must be 'Low', 'Medium', or 'High'.")
            }));
          }
        }
        if (stryMutAct_9fa48("119") ? dueDate || !moment(dueDate, moment.ISO_8601, true).isValid() : stryMutAct_9fa48("118") ? false : stryMutAct_9fa48("117") ? true : (stryCov_9fa48("117", "118", "119"), dueDate && (stryMutAct_9fa48("120") ? moment(dueDate, moment.ISO_8601, true).isValid() : (stryCov_9fa48("120"), !moment(dueDate, moment.ISO_8601, stryMutAct_9fa48("121") ? false : (stryCov_9fa48("121"), true)).isValid())))) {
          if (stryMutAct_9fa48("122")) {
            {}
          } else {
            stryCov_9fa48("122");
            return res.status(400).json(stryMutAct_9fa48("123") ? {} : (stryCov_9fa48("123"), {
              error: stryMutAct_9fa48("124") ? "" : (stryCov_9fa48("124"), "Invalid due date format. Must be in ISO 8601 format.")
            }));
          }
        }
        if (stryMutAct_9fa48("126") ? false : stryMutAct_9fa48("125") ? true : (stryCov_9fa48("125", "126"), req.body.title)) {
          if (stryMutAct_9fa48("127")) {
            {}
          } else {
            stryCov_9fa48("127");
            req.body.title = stryMutAct_9fa48("128") ? req.body.title : (stryCov_9fa48("128"), req.body.title.trim());
          }
        }
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, stryMutAct_9fa48("129") ? {} : (stryCov_9fa48("129"), {
          new: stryMutAct_9fa48("130") ? false : (stryCov_9fa48("130"), true)
        }));
        if (stryMutAct_9fa48("133") ? false : stryMutAct_9fa48("132") ? true : stryMutAct_9fa48("131") ? updatedTask : (stryCov_9fa48("131", "132", "133"), !updatedTask)) {
          if (stryMutAct_9fa48("134")) {
            {}
          } else {
            stryCov_9fa48("134");
            return res.status(500).json(stryMutAct_9fa48("135") ? {} : (stryCov_9fa48("135"), {
              error: stryMutAct_9fa48("136") ? "" : (stryCov_9fa48("136"), "Task update failed.")
            }));
          }
        }
        res.status(200).json(updatedTask);
      }
    } catch (error) {
      if (stryMutAct_9fa48("137")) {
        {}
      } else {
        stryCov_9fa48("137");
        console.error(stryMutAct_9fa48("138") ? "" : (stryCov_9fa48("138"), "Error updating task:"), stryMutAct_9fa48("141") ? error.message && error : stryMutAct_9fa48("140") ? false : stryMutAct_9fa48("139") ? true : (stryCov_9fa48("139", "140", "141"), error.message || error));
        res.status(500).json(stryMutAct_9fa48("142") ? {} : (stryCov_9fa48("142"), {
          error: stryMutAct_9fa48("143") ? "" : (stryCov_9fa48("143"), "Internal Server Error")
        }));
      }
    }
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  if (stryMutAct_9fa48("144")) {
    {}
  } else {
    stryCov_9fa48("144");
    try {
      if (stryMutAct_9fa48("145")) {
        {}
      } else {
        stryCov_9fa48("145");
        if (stryMutAct_9fa48("148") ? false : stryMutAct_9fa48("147") ? true : stryMutAct_9fa48("146") ? mongoose.Types.ObjectId.isValid(req.params.id) : (stryCov_9fa48("146", "147", "148"), !mongoose.Types.ObjectId.isValid(req.params.id))) {
          if (stryMutAct_9fa48("149")) {
            {}
          } else {
            stryCov_9fa48("149");
            console.log(stryMutAct_9fa48("150") ? "" : (stryCov_9fa48("150"), "🚨 Received Invalid ID:"), req.params.id);
            return res.status(400).json(stryMutAct_9fa48("151") ? {} : (stryCov_9fa48("151"), {
              error: stryMutAct_9fa48("152") ? "" : (stryCov_9fa48("152"), "Invalid task ID format.")
            }));
          }
        }
        const task = await Task.findById(req.params.id);
        if (stryMutAct_9fa48("155") ? false : stryMutAct_9fa48("154") ? true : stryMutAct_9fa48("153") ? task : (stryCov_9fa48("153", "154", "155"), !task)) {
          if (stryMutAct_9fa48("156")) {
            {}
          } else {
            stryCov_9fa48("156");
            return res.status(404).json(stryMutAct_9fa48("157") ? {} : (stryCov_9fa48("157"), {
              error: stryMutAct_9fa48("158") ? "" : (stryCov_9fa48("158"), "Task not found.")
            }));
          }
        }
        await Task.findByIdAndDelete(req.params.id);
        res.status(204).send();
      }
    } catch (error) {
      if (stryMutAct_9fa48("159")) {
        {}
      } else {
        stryCov_9fa48("159");
        console.error(stryMutAct_9fa48("160") ? "" : (stryCov_9fa48("160"), "Error deleting task:"), stryMutAct_9fa48("163") ? error.message && error : stryMutAct_9fa48("162") ? false : stryMutAct_9fa48("161") ? true : (stryCov_9fa48("161", "162", "163"), error.message || error));
        res.status(500).json(stryMutAct_9fa48("164") ? {} : (stryCov_9fa48("164"), {
          error: stryMutAct_9fa48("165") ? "" : (stryCov_9fa48("165"), "Internal Server Error")
        }));
      }
    }
  }
};

// Delete all tasks
exports.deleteAllTasks = async (req, res) => {
  if (stryMutAct_9fa48("166")) {
    {}
  } else {
    stryCov_9fa48("166");
    try {
      if (stryMutAct_9fa48("167")) {
        {}
      } else {
        stryCov_9fa48("167");
        console.log(stryMutAct_9fa48("168") ? "" : (stryCov_9fa48("168"), "Deleting all tasks..."));
        await Task.deleteMany({});
        res.status(204).send();
      }
    } catch (error) {
      if (stryMutAct_9fa48("169")) {
        {}
      } else {
        stryCov_9fa48("169");
        console.error(stryMutAct_9fa48("170") ? "" : (stryCov_9fa48("170"), "Error deleting all tasks:"), stryMutAct_9fa48("173") ? error.message && error : stryMutAct_9fa48("172") ? false : stryMutAct_9fa48("171") ? true : (stryCov_9fa48("171", "172", "173"), error.message || error));
        res.status(500).json(stryMutAct_9fa48("174") ? {} : (stryCov_9fa48("174"), {
          error: stryMutAct_9fa48("175") ? "" : (stryCov_9fa48("175"), "Internal Server Error")
        }));
      }
    }
  }
};