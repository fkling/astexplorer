webpackJsonp([1],{

/***/ "./node_modules/codemirror/addon/hint/show-hint.js":
/***/ function(module, exports, __webpack_require__) {

	// CodeMirror, copyright (c) by Marijn Haverbeke and others
	// Distributed under an MIT license: http://codemirror.net/LICENSE
	
	(function(mod) {
	  if (true) // CommonJS
	    mod(__webpack_require__("./node_modules/codemirror/lib/codemirror.js"));
	  else if (typeof define == "function" && define.amd) // AMD
	    define(["../../lib/codemirror"], mod);
	  else // Plain browser env
	    mod(CodeMirror);
	})(function(CodeMirror) {
	  "use strict";
	
	  var HINT_ELEMENT_CLASS        = "CodeMirror-hint";
	  var ACTIVE_HINT_ELEMENT_CLASS = "CodeMirror-hint-active";
	
	  // This is the old interface, kept around for now to stay
	  // backwards-compatible.
	  CodeMirror.showHint = function(cm, getHints, options) {
	    if (!getHints) return cm.showHint(options);
	    if (options && options.async) getHints.async = true;
	    var newOpts = {hint: getHints};
	    if (options) for (var prop in options) newOpts[prop] = options[prop];
	    return cm.showHint(newOpts);
	  };
	
	  CodeMirror.defineExtension("showHint", function(options) {
	    options = parseOptions(this, this.getCursor("start"), options);
	    var selections = this.listSelections()
	    if (selections.length > 1) return;
	    // By default, don't allow completion when something is selected.
	    // A hint function can have a `supportsSelection` property to
	    // indicate that it can handle selections.
	    if (this.somethingSelected()) {
	      if (!options.hint.supportsSelection) return;
	      // Don't try with cross-line selections
	      for (var i = 0; i < selections.length; i++)
	        if (selections[i].head.line != selections[i].anchor.line) return;
	    }
	
	    if (this.state.completionActive) this.state.completionActive.close();
	    var completion = this.state.completionActive = new Completion(this, options);
	    if (!completion.options.hint) return;
	
	    CodeMirror.signal(this, "startCompletion", this);
	    completion.update(true);
	  });
	
	  function Completion(cm, options) {
	    this.cm = cm;
	    this.options = options;
	    this.widget = null;
	    this.debounce = 0;
	    this.tick = 0;
	    this.startPos = this.cm.getCursor("start");
	    this.startLen = this.cm.getLine(this.startPos.line).length - this.cm.getSelection().length;
	
	    var self = this;
	    cm.on("cursorActivity", this.activityFunc = function() { self.cursorActivity(); });
	  }
	
	  var requestAnimationFrame = window.requestAnimationFrame || function(fn) {
	    return setTimeout(fn, 1000/60);
	  };
	  var cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;
	
	  Completion.prototype = {
	    close: function() {
	      if (!this.active()) return;
	      this.cm.state.completionActive = null;
	      this.tick = null;
	      this.cm.off("cursorActivity", this.activityFunc);
	
	      if (this.widget && this.data) CodeMirror.signal(this.data, "close");
	      if (this.widget) this.widget.close();
	      CodeMirror.signal(this.cm, "endCompletion", this.cm);
	    },
	
	    active: function() {
	      return this.cm.state.completionActive == this;
	    },
	
	    pick: function(data, i) {
	      var completion = data.list[i];
	      if (completion.hint) completion.hint(this.cm, data, completion);
	      else this.cm.replaceRange(getText(completion), completion.from || data.from,
	                                completion.to || data.to, "complete");
	      CodeMirror.signal(data, "pick", completion);
	      this.close();
	    },
	
	    cursorActivity: function() {
	      if (this.debounce) {
	        cancelAnimationFrame(this.debounce);
	        this.debounce = 0;
	      }
	
	      var pos = this.cm.getCursor(), line = this.cm.getLine(pos.line);
	      if (pos.line != this.startPos.line || line.length - pos.ch != this.startLen - this.startPos.ch ||
	          pos.ch < this.startPos.ch || this.cm.somethingSelected() ||
	          (pos.ch && this.options.closeCharacters.test(line.charAt(pos.ch - 1)))) {
	        this.close();
	      } else {
	        var self = this;
	        this.debounce = requestAnimationFrame(function() {self.update();});
	        if (this.widget) this.widget.disable();
	      }
	    },
	
	    update: function(first) {
	      if (this.tick == null) return;
	      if (!this.options.hint.async) {
	        this.finishUpdate(this.options.hint(this.cm, this.options), first);
	      } else {
	        var myTick = ++this.tick, self = this;
	        this.options.hint(this.cm, function(data) {
	          if (self.tick == myTick) self.finishUpdate(data, first);
	        }, this.options);
	      }
	    },
	
	    finishUpdate: function(data, first) {
	      if (this.data) CodeMirror.signal(this.data, "update");
	      if (data && this.data && CodeMirror.cmpPos(data.from, this.data.from)) data = null;
	      this.data = data;
	
	      var picked = (this.widget && this.widget.picked) || (first && this.options.completeSingle);
	      if (this.widget) this.widget.close();
	      if (data && data.list.length) {
	        if (picked && data.list.length == 1) {
	          this.pick(data, 0);
	        } else {
	          this.widget = new Widget(this, data);
	          CodeMirror.signal(data, "shown");
	        }
	      }
	    }
	  };
	
	  function parseOptions(cm, pos, options) {
	    var editor = cm.options.hintOptions;
	    var out = {};
	    for (var prop in defaultOptions) out[prop] = defaultOptions[prop];
	    if (editor) for (var prop in editor)
	      if (editor[prop] !== undefined) out[prop] = editor[prop];
	    if (options) for (var prop in options)
	      if (options[prop] !== undefined) out[prop] = options[prop];
	    if (out.hint.resolve) out.hint = out.hint.resolve(cm, pos)
	    return out;
	  }
	
	  function getText(completion) {
	    if (typeof completion == "string") return completion;
	    else return completion.text;
	  }
	
	  function buildKeyMap(completion, handle) {
	    var baseMap = {
	      Up: function() {handle.moveFocus(-1);},
	      Down: function() {handle.moveFocus(1);},
	      PageUp: function() {handle.moveFocus(-handle.menuSize() + 1, true);},
	      PageDown: function() {handle.moveFocus(handle.menuSize() - 1, true);},
	      Home: function() {handle.setFocus(0);},
	      End: function() {handle.setFocus(handle.length - 1);},
	      Enter: handle.pick,
	      Tab: handle.pick,
	      Esc: handle.close
	    };
	    var custom = completion.options.customKeys;
	    var ourMap = custom ? {} : baseMap;
	    function addBinding(key, val) {
	      var bound;
	      if (typeof val != "string")
	        bound = function(cm) { return val(cm, handle); };
	      // This mechanism is deprecated
	      else if (baseMap.hasOwnProperty(val))
	        bound = baseMap[val];
	      else
	        bound = val;
	      ourMap[key] = bound;
	    }
	    if (custom)
	      for (var key in custom) if (custom.hasOwnProperty(key))
	        addBinding(key, custom[key]);
	    var extra = completion.options.extraKeys;
	    if (extra)
	      for (var key in extra) if (extra.hasOwnProperty(key))
	        addBinding(key, extra[key]);
	    return ourMap;
	  }
	
	  function getHintElement(hintsElement, el) {
	    while (el && el != hintsElement) {
	      if (el.nodeName.toUpperCase() === "LI" && el.parentNode == hintsElement) return el;
	      el = el.parentNode;
	    }
	  }
	
	  function Widget(completion, data) {
	    this.completion = completion;
	    this.data = data;
	    this.picked = false;
	    var widget = this, cm = completion.cm;
	
	    var hints = this.hints = document.createElement("ul");
	    hints.className = "CodeMirror-hints";
	    this.selectedHint = data.selectedHint || 0;
	
	    var completions = data.list;
	    for (var i = 0; i < completions.length; ++i) {
	      var elt = hints.appendChild(document.createElement("li")), cur = completions[i];
	      var className = HINT_ELEMENT_CLASS + (i != this.selectedHint ? "" : " " + ACTIVE_HINT_ELEMENT_CLASS);
	      if (cur.className != null) className = cur.className + " " + className;
	      elt.className = className;
	      if (cur.render) cur.render(elt, data, cur);
	      else elt.appendChild(document.createTextNode(cur.displayText || getText(cur)));
	      elt.hintId = i;
	    }
	
	    var pos = cm.cursorCoords(completion.options.alignWithWord ? data.from : null);
	    var left = pos.left, top = pos.bottom, below = true;
	    hints.style.left = left + "px";
	    hints.style.top = top + "px";
	    // If we're at the edge of the screen, then we want the menu to appear on the left of the cursor.
	    var winW = window.innerWidth || Math.max(document.body.offsetWidth, document.documentElement.offsetWidth);
	    var winH = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
	    (completion.options.container || document.body).appendChild(hints);
	    var box = hints.getBoundingClientRect(), overlapY = box.bottom - winH;
	    if (overlapY > 0) {
	      var height = box.bottom - box.top, curTop = pos.top - (pos.bottom - box.top);
	      if (curTop - height > 0) { // Fits above cursor
	        hints.style.top = (top = pos.top - height) + "px";
	        below = false;
	      } else if (height > winH) {
	        hints.style.height = (winH - 5) + "px";
	        hints.style.top = (top = pos.bottom - box.top) + "px";
	        var cursor = cm.getCursor();
	        if (data.from.ch != cursor.ch) {
	          pos = cm.cursorCoords(cursor);
	          hints.style.left = (left = pos.left) + "px";
	          box = hints.getBoundingClientRect();
	        }
	      }
	    }
	    var overlapX = box.right - winW;
	    if (overlapX > 0) {
	      if (box.right - box.left > winW) {
	        hints.style.width = (winW - 5) + "px";
	        overlapX -= (box.right - box.left) - winW;
	      }
	      hints.style.left = (left = pos.left - overlapX) + "px";
	    }
	
	    cm.addKeyMap(this.keyMap = buildKeyMap(completion, {
	      moveFocus: function(n, avoidWrap) { widget.changeActive(widget.selectedHint + n, avoidWrap); },
	      setFocus: function(n) { widget.changeActive(n); },
	      menuSize: function() { return widget.screenAmount(); },
	      length: completions.length,
	      close: function() { completion.close(); },
	      pick: function() { widget.pick(); },
	      data: data
	    }));
	
	    if (completion.options.closeOnUnfocus) {
	      var closingOnBlur;
	      cm.on("blur", this.onBlur = function() { closingOnBlur = setTimeout(function() { completion.close(); }, 100); });
	      cm.on("focus", this.onFocus = function() { clearTimeout(closingOnBlur); });
	    }
	
	    var startScroll = cm.getScrollInfo();
	    cm.on("scroll", this.onScroll = function() {
	      var curScroll = cm.getScrollInfo(), editor = cm.getWrapperElement().getBoundingClientRect();
	      var newTop = top + startScroll.top - curScroll.top;
	      var point = newTop - (window.pageYOffset || (document.documentElement || document.body).scrollTop);
	      if (!below) point += hints.offsetHeight;
	      if (point <= editor.top || point >= editor.bottom) return completion.close();
	      hints.style.top = newTop + "px";
	      hints.style.left = (left + startScroll.left - curScroll.left) + "px";
	    });
	
	    CodeMirror.on(hints, "dblclick", function(e) {
	      var t = getHintElement(hints, e.target || e.srcElement);
	      if (t && t.hintId != null) {widget.changeActive(t.hintId); widget.pick();}
	    });
	
	    CodeMirror.on(hints, "click", function(e) {
	      var t = getHintElement(hints, e.target || e.srcElement);
	      if (t && t.hintId != null) {
	        widget.changeActive(t.hintId);
	        if (completion.options.completeOnSingleClick) widget.pick();
	      }
	    });
	
	    CodeMirror.on(hints, "mousedown", function() {
	      setTimeout(function(){cm.focus();}, 20);
	    });
	
	    CodeMirror.signal(data, "select", completions[0], hints.firstChild);
	    return true;
	  }
	
	  Widget.prototype = {
	    close: function() {
	      if (this.completion.widget != this) return;
	      this.completion.widget = null;
	      this.hints.parentNode.removeChild(this.hints);
	      this.completion.cm.removeKeyMap(this.keyMap);
	
	      var cm = this.completion.cm;
	      if (this.completion.options.closeOnUnfocus) {
	        cm.off("blur", this.onBlur);
	        cm.off("focus", this.onFocus);
	      }
	      cm.off("scroll", this.onScroll);
	    },
	
	    disable: function() {
	      this.completion.cm.removeKeyMap(this.keyMap);
	      var widget = this;
	      this.keyMap = {Enter: function() { widget.picked = true; }};
	      this.completion.cm.addKeyMap(this.keyMap);
	    },
	
	    pick: function() {
	      this.completion.pick(this.data, this.selectedHint);
	    },
	
	    changeActive: function(i, avoidWrap) {
	      if (i >= this.data.list.length)
	        i = avoidWrap ? this.data.list.length - 1 : 0;
	      else if (i < 0)
	        i = avoidWrap ? 0  : this.data.list.length - 1;
	      if (this.selectedHint == i) return;
	      var node = this.hints.childNodes[this.selectedHint];
	      node.className = node.className.replace(" " + ACTIVE_HINT_ELEMENT_CLASS, "");
	      node = this.hints.childNodes[this.selectedHint = i];
	      node.className += " " + ACTIVE_HINT_ELEMENT_CLASS;
	      if (node.offsetTop < this.hints.scrollTop)
	        this.hints.scrollTop = node.offsetTop - 3;
	      else if (node.offsetTop + node.offsetHeight > this.hints.scrollTop + this.hints.clientHeight)
	        this.hints.scrollTop = node.offsetTop + node.offsetHeight - this.hints.clientHeight + 3;
	      CodeMirror.signal(this.data, "select", this.data.list[this.selectedHint], node);
	    },
	
	    screenAmount: function() {
	      return Math.floor(this.hints.clientHeight / this.hints.firstChild.offsetHeight) || 1;
	    }
	  };
	
	  function applicableHelpers(cm, helpers) {
	    if (!cm.somethingSelected()) return helpers
	    var result = []
	    for (var i = 0; i < helpers.length; i++)
	      if (helpers[i].supportsSelection) result.push(helpers[i])
	    return result
	  }
	
	  function resolveAutoHints(cm, pos) {
	    var helpers = cm.getHelpers(pos, "hint"), words
	    if (helpers.length) {
	      var async = false, resolved
	      for (var i = 0; i < helpers.length; i++) if (helpers[i].async) async = true
	      if (async) {
	        resolved = function(cm, callback, options) {
	          var app = applicableHelpers(cm, helpers)
	          function run(i, result) {
	            if (i == app.length) return callback(null)
	            var helper = app[i]
	            if (helper.async) {
	              helper(cm, function(result) {
	                if (result) callback(result)
	                else run(i + 1)
	              }, options)
	            } else {
	              var result = helper(cm, options)
	              if (result) callback(result)
	              else run(i + 1)
	            }
	          }
	          run(0)
	        }
	        resolved.async = true
	      } else {
	        resolved = function(cm, options) {
	          var app = applicableHelpers(cm, helpers)
	          for (var i = 0; i < app.length; i++) {
	            var cur = app[i](cm, options)
	            if (cur && cur.list.length) return cur
	          }
	        }
	      }
	      resolved.supportsSelection = true
	      return resolved
	    } else if (words = cm.getHelper(cm.getCursor(), "hintWords")) {
	      return function(cm) { return CodeMirror.hint.fromList(cm, {words: words}) }
	    } else if (CodeMirror.hint.anyword) {
	      return function(cm, options) { return CodeMirror.hint.anyword(cm, options) }
	    } else {
	      return function() {}
	    }
	  }
	
	  CodeMirror.registerHelper("hint", "auto", {
	    resolve: resolveAutoHints
	  });
	
	  CodeMirror.registerHelper("hint", "fromList", function(cm, options) {
	    var cur = cm.getCursor(), token = cm.getTokenAt(cur);
	    var to = CodeMirror.Pos(cur.line, token.end);
	    if (token.string && /\w/.test(token.string[token.string.length - 1])) {
	      var term = token.string, from = CodeMirror.Pos(cur.line, token.start);
	    } else {
	      var term = "", from = to;
	    }
	    var found = [];
	    for (var i = 0; i < options.words.length; i++) {
	      var word = options.words[i];
	      if (word.slice(0, term.length) == term)
	        found.push(word);
	    }
	
	    if (found.length) return {list: found, from: from, to: to};
	  });
	
	  CodeMirror.commands.autocomplete = CodeMirror.showHint;
	
	  var defaultOptions = {
	    hint: CodeMirror.hint.auto,
	    completeSingle: true,
	    alignWithWord: true,
	    closeCharacters: /[\s()\[\]{};:>,]/,
	    closeOnUnfocus: true,
	    completeOnSingleClick: true,
	    container: null,
	    customKeys: null,
	    extraKeys: null
	  };
	
	  CodeMirror.defineOption("hintOptions", null);
	});


/***/ },

/***/ "./node_modules/codemirror/addon/tern/tern.js":
/***/ function(module, exports, __webpack_require__) {

	// CodeMirror, copyright (c) by Marijn Haverbeke and others
	// Distributed under an MIT license: http://codemirror.net/LICENSE
	
	// Glue code between CodeMirror and Tern.
	//
	// Create a CodeMirror.TernServer to wrap an actual Tern server,
	// register open documents (CodeMirror.Doc instances) with it, and
	// call its methods to activate the assisting functions that Tern
	// provides.
	//
	// Options supported (all optional):
	// * defs: An array of JSON definition data structures.
	// * plugins: An object mapping plugin names to configuration
	//   options.
	// * getFile: A function(name, c) that can be used to access files in
	//   the project that haven't been loaded yet. Simply do c(null) to
	//   indicate that a file is not available.
	// * fileFilter: A function(value, docName, doc) that will be applied
	//   to documents before passing them on to Tern.
	// * switchToDoc: A function(name, doc) that should, when providing a
	//   multi-file view, switch the view or focus to the named file.
	// * showError: A function(editor, message) that can be used to
	//   override the way errors are displayed.
	// * completionTip: Customize the content in tooltips for completions.
	//   Is passed a single argument—the completion's data as returned by
	//   Tern—and may return a string, DOM node, or null to indicate that
	//   no tip should be shown. By default the docstring is shown.
	// * typeTip: Like completionTip, but for the tooltips shown for type
	//   queries.
	// * responseFilter: A function(doc, query, request, error, data) that
	//   will be applied to the Tern responses before treating them
	//
	//
	// It is possible to run the Tern server in a web worker by specifying
	// these additional options:
	// * useWorker: Set to true to enable web worker mode. You'll probably
	//   want to feature detect the actual value you use here, for example
	//   !!window.Worker.
	// * workerScript: The main script of the worker. Point this to
	//   wherever you are hosting worker.js from this directory.
	// * workerDeps: An array of paths pointing (relative to workerScript)
	//   to the Acorn and Tern libraries and any Tern plugins you want to
	//   load. Or, if you minified those into a single script and included
	//   them in the workerScript, simply leave this undefined.
	
	(function(mod) {
	  if (true) // CommonJS
	    mod(__webpack_require__("./node_modules/codemirror/lib/codemirror.js"));
	  else if (typeof define == "function" && define.amd) // AMD
	    define(["../../lib/codemirror"], mod);
	  else // Plain browser env
	    mod(CodeMirror);
	})(function(CodeMirror) {
	  "use strict";
	  // declare global: tern
	
	  CodeMirror.TernServer = function(options) {
	    var self = this;
	    this.options = options || {};
	    var plugins = this.options.plugins || (this.options.plugins = {});
	    if (!plugins.doc_comment) plugins.doc_comment = true;
	    this.docs = Object.create(null);
	    if (this.options.useWorker) {
	      this.server = new WorkerServer(this);
	    } else {
	      this.server = new tern.Server({
	        getFile: function(name, c) { return getFile(self, name, c); },
	        async: true,
	        defs: this.options.defs || [],
	        plugins: plugins
	      });
	    }
	    this.trackChange = function(doc, change) { trackChange(self, doc, change); };
	
	    this.cachedArgHints = null;
	    this.activeArgHints = null;
	    this.jumpStack = [];
	
	    this.getHint = function(cm, c) { return hint(self, cm, c); };
	    this.getHint.async = true;
	  };
	
	  CodeMirror.TernServer.prototype = {
	    addDoc: function(name, doc) {
	      var data = {doc: doc, name: name, changed: null};
	      this.server.addFile(name, docValue(this, data));
	      CodeMirror.on(doc, "change", this.trackChange);
	      return this.docs[name] = data;
	    },
	
	    delDoc: function(id) {
	      var found = resolveDoc(this, id);
	      if (!found) return;
	      CodeMirror.off(found.doc, "change", this.trackChange);
	      delete this.docs[found.name];
	      this.server.delFile(found.name);
	    },
	
	    hideDoc: function(id) {
	      closeArgHints(this);
	      var found = resolveDoc(this, id);
	      if (found && found.changed) sendDoc(this, found);
	    },
	
	    complete: function(cm) {
	      cm.showHint({hint: this.getHint});
	    },
	
	    showType: function(cm, pos, c) { showContextInfo(this, cm, pos, "type", c); },
	
	    showDocs: function(cm, pos, c) { showContextInfo(this, cm, pos, "documentation", c); },
	
	    updateArgHints: function(cm) { updateArgHints(this, cm); },
	
	    jumpToDef: function(cm) { jumpToDef(this, cm); },
	
	    jumpBack: function(cm) { jumpBack(this, cm); },
	
	    rename: function(cm) { rename(this, cm); },
	
	    selectName: function(cm) { selectName(this, cm); },
	
	    request: function (cm, query, c, pos) {
	      var self = this;
	      var doc = findDoc(this, cm.getDoc());
	      var request = buildRequest(this, doc, query, pos);
	      var extraOptions = request.query && this.options.queryOptions && this.options.queryOptions[request.query.type]
	      if (extraOptions) for (var prop in extraOptions) request.query[prop] = extraOptions[prop];
	
	      this.server.request(request, function (error, data) {
	        if (!error && self.options.responseFilter)
	          data = self.options.responseFilter(doc, query, request, error, data);
	        c(error, data);
	      });
	    },
	
	    destroy: function () {
	      closeArgHints(this)
	      if (this.worker) {
	        this.worker.terminate();
	        this.worker = null;
	      }
	    }
	  };
	
	  var Pos = CodeMirror.Pos;
	  var cls = "CodeMirror-Tern-";
	  var bigDoc = 250;
	
	  function getFile(ts, name, c) {
	    var buf = ts.docs[name];
	    if (buf)
	      c(docValue(ts, buf));
	    else if (ts.options.getFile)
	      ts.options.getFile(name, c);
	    else
	      c(null);
	  }
	
	  function findDoc(ts, doc, name) {
	    for (var n in ts.docs) {
	      var cur = ts.docs[n];
	      if (cur.doc == doc) return cur;
	    }
	    if (!name) for (var i = 0;; ++i) {
	      n = "[doc" + (i || "") + "]";
	      if (!ts.docs[n]) { name = n; break; }
	    }
	    return ts.addDoc(name, doc);
	  }
	
	  function resolveDoc(ts, id) {
	    if (typeof id == "string") return ts.docs[id];
	    if (id instanceof CodeMirror) id = id.getDoc();
	    if (id instanceof CodeMirror.Doc) return findDoc(ts, id);
	  }
	
	  function trackChange(ts, doc, change) {
	    var data = findDoc(ts, doc);
	
	    var argHints = ts.cachedArgHints;
	    if (argHints && argHints.doc == doc && cmpPos(argHints.start, change.to) <= 0)
	      ts.cachedArgHints = null;
	
	    var changed = data.changed;
	    if (changed == null)
	      data.changed = changed = {from: change.from.line, to: change.from.line};
	    var end = change.from.line + (change.text.length - 1);
	    if (change.from.line < changed.to) changed.to = changed.to - (change.to.line - end);
	    if (end >= changed.to) changed.to = end + 1;
	    if (changed.from > change.from.line) changed.from = change.from.line;
	
	    if (doc.lineCount() > bigDoc && change.to - changed.from > 100) setTimeout(function() {
	      if (data.changed && data.changed.to - data.changed.from > 100) sendDoc(ts, data);
	    }, 200);
	  }
	
	  function sendDoc(ts, doc) {
	    ts.server.request({files: [{type: "full", name: doc.name, text: docValue(ts, doc)}]}, function(error) {
	      if (error) window.console.error(error);
	      else doc.changed = null;
	    });
	  }
	
	  // Completion
	
	  function hint(ts, cm, c) {
	    ts.request(cm, {type: "completions", types: true, docs: true, urls: true}, function(error, data) {
	      if (error) return showError(ts, cm, error);
	      var completions = [], after = "";
	      var from = data.start, to = data.end;
	      if (cm.getRange(Pos(from.line, from.ch - 2), from) == "[\"" &&
	          cm.getRange(to, Pos(to.line, to.ch + 2)) != "\"]")
	        after = "\"]";
	
	      for (var i = 0; i < data.completions.length; ++i) {
	        var completion = data.completions[i], className = typeToIcon(completion.type);
	        if (data.guess) className += " " + cls + "guess";
	        completions.push({text: completion.name + after,
	                          displayText: completion.displayName || completion.name,
	                          className: className,
	                          data: completion});
	      }
	
	      var obj = {from: from, to: to, list: completions};
	      var tooltip = null;
	      CodeMirror.on(obj, "close", function() { remove(tooltip); });
	      CodeMirror.on(obj, "update", function() { remove(tooltip); });
	      CodeMirror.on(obj, "select", function(cur, node) {
	        remove(tooltip);
	        var content = ts.options.completionTip ? ts.options.completionTip(cur.data) : cur.data.doc;
	        if (content) {
	          tooltip = makeTooltip(node.parentNode.getBoundingClientRect().right + window.pageXOffset,
	                                node.getBoundingClientRect().top + window.pageYOffset, content);
	          tooltip.className += " " + cls + "hint-doc";
	        }
	      });
	      c(obj);
	    });
	  }
	
	  function typeToIcon(type) {
	    var suffix;
	    if (type == "?") suffix = "unknown";
	    else if (type == "number" || type == "string" || type == "bool") suffix = type;
	    else if (/^fn\(/.test(type)) suffix = "fn";
	    else if (/^\[/.test(type)) suffix = "array";
	    else suffix = "object";
	    return cls + "completion " + cls + "completion-" + suffix;
	  }
	
	  // Type queries
	
	  function showContextInfo(ts, cm, pos, queryName, c) {
	    ts.request(cm, queryName, function(error, data) {
	      if (error) return showError(ts, cm, error);
	      if (ts.options.typeTip) {
	        var tip = ts.options.typeTip(data);
	      } else {
	        var tip = elt("span", null, elt("strong", null, data.type || "not found"));
	        if (data.doc)
	          tip.appendChild(document.createTextNode(" — " + data.doc));
	        if (data.url) {
	          tip.appendChild(document.createTextNode(" "));
	          var child = tip.appendChild(elt("a", null, "[docs]"));
	          child.href = data.url;
	          child.target = "_blank";
	        }
	      }
	      tempTooltip(cm, tip, ts);
	      if (c) c();
	    }, pos);
	  }
	
	  // Maintaining argument hints
	
	  function updateArgHints(ts, cm) {
	    closeArgHints(ts);
	
	    if (cm.somethingSelected()) return;
	    var state = cm.getTokenAt(cm.getCursor()).state;
	    var inner = CodeMirror.innerMode(cm.getMode(), state);
	    if (inner.mode.name != "javascript") return;
	    var lex = inner.state.lexical;
	    if (lex.info != "call") return;
	
	    var ch, argPos = lex.pos || 0, tabSize = cm.getOption("tabSize");
	    for (var line = cm.getCursor().line, e = Math.max(0, line - 9), found = false; line >= e; --line) {
	      var str = cm.getLine(line), extra = 0;
	      for (var pos = 0;;) {
	        var tab = str.indexOf("\t", pos);
	        if (tab == -1) break;
	        extra += tabSize - (tab + extra) % tabSize - 1;
	        pos = tab + 1;
	      }
	      ch = lex.column - extra;
	      if (str.charAt(ch) == "(") {found = true; break;}
	    }
	    if (!found) return;
	
	    var start = Pos(line, ch);
	    var cache = ts.cachedArgHints;
	    if (cache && cache.doc == cm.getDoc() && cmpPos(start, cache.start) == 0)
	      return showArgHints(ts, cm, argPos);
	
	    ts.request(cm, {type: "type", preferFunction: true, end: start}, function(error, data) {
	      if (error || !data.type || !(/^fn\(/).test(data.type)) return;
	      ts.cachedArgHints = {
	        start: pos,
	        type: parseFnType(data.type),
	        name: data.exprName || data.name || "fn",
	        guess: data.guess,
	        doc: cm.getDoc()
	      };
	      showArgHints(ts, cm, argPos);
	    });
	  }
	
	  function showArgHints(ts, cm, pos) {
	    closeArgHints(ts);
	
	    var cache = ts.cachedArgHints, tp = cache.type;
	    var tip = elt("span", cache.guess ? cls + "fhint-guess" : null,
	                  elt("span", cls + "fname", cache.name), "(");
	    for (var i = 0; i < tp.args.length; ++i) {
	      if (i) tip.appendChild(document.createTextNode(", "));
	      var arg = tp.args[i];
	      tip.appendChild(elt("span", cls + "farg" + (i == pos ? " " + cls + "farg-current" : ""), arg.name || "?"));
	      if (arg.type != "?") {
	        tip.appendChild(document.createTextNode(":\u00a0"));
	        tip.appendChild(elt("span", cls + "type", arg.type));
	      }
	    }
	    tip.appendChild(document.createTextNode(tp.rettype ? ") ->\u00a0" : ")"));
	    if (tp.rettype) tip.appendChild(elt("span", cls + "type", tp.rettype));
	    var place = cm.cursorCoords(null, "page");
	    ts.activeArgHints = makeTooltip(place.right + 1, place.bottom, tip);
	  }
	
	  function parseFnType(text) {
	    var args = [], pos = 3;
	
	    function skipMatching(upto) {
	      var depth = 0, start = pos;
	      for (;;) {
	        var next = text.charAt(pos);
	        if (upto.test(next) && !depth) return text.slice(start, pos);
	        if (/[{\[\(]/.test(next)) ++depth;
	        else if (/[}\]\)]/.test(next)) --depth;
	        ++pos;
	      }
	    }
	
	    // Parse arguments
	    if (text.charAt(pos) != ")") for (;;) {
	      var name = text.slice(pos).match(/^([^, \(\[\{]+): /);
	      if (name) {
	        pos += name[0].length;
	        name = name[1];
	      }
	      args.push({name: name, type: skipMatching(/[\),]/)});
	      if (text.charAt(pos) == ")") break;
	      pos += 2;
	    }
	
	    var rettype = text.slice(pos).match(/^\) -> (.*)$/);
	
	    return {args: args, rettype: rettype && rettype[1]};
	  }
	
	  // Moving to the definition of something
	
	  function jumpToDef(ts, cm) {
	    function inner(varName) {
	      var req = {type: "definition", variable: varName || null};
	      var doc = findDoc(ts, cm.getDoc());
	      ts.server.request(buildRequest(ts, doc, req), function(error, data) {
	        if (error) return showError(ts, cm, error);
	        if (!data.file && data.url) { window.open(data.url); return; }
	
	        if (data.file) {
	          var localDoc = ts.docs[data.file], found;
	          if (localDoc && (found = findContext(localDoc.doc, data))) {
	            ts.jumpStack.push({file: doc.name,
	                               start: cm.getCursor("from"),
	                               end: cm.getCursor("to")});
	            moveTo(ts, doc, localDoc, found.start, found.end);
	            return;
	          }
	        }
	        showError(ts, cm, "Could not find a definition.");
	      });
	    }
	
	    if (!atInterestingExpression(cm))
	      dialog(cm, "Jump to variable", function(name) { if (name) inner(name); });
	    else
	      inner();
	  }
	
	  function jumpBack(ts, cm) {
	    var pos = ts.jumpStack.pop(), doc = pos && ts.docs[pos.file];
	    if (!doc) return;
	    moveTo(ts, findDoc(ts, cm.getDoc()), doc, pos.start, pos.end);
	  }
	
	  function moveTo(ts, curDoc, doc, start, end) {
	    doc.doc.setSelection(start, end);
	    if (curDoc != doc && ts.options.switchToDoc) {
	      closeArgHints(ts);
	      ts.options.switchToDoc(doc.name, doc.doc);
	    }
	  }
	
	  // The {line,ch} representation of positions makes this rather awkward.
	  function findContext(doc, data) {
	    var before = data.context.slice(0, data.contextOffset).split("\n");
	    var startLine = data.start.line - (before.length - 1);
	    var start = Pos(startLine, (before.length == 1 ? data.start.ch : doc.getLine(startLine).length) - before[0].length);
	
	    var text = doc.getLine(startLine).slice(start.ch);
	    for (var cur = startLine + 1; cur < doc.lineCount() && text.length < data.context.length; ++cur)
	      text += "\n" + doc.getLine(cur);
	    if (text.slice(0, data.context.length) == data.context) return data;
	
	    var cursor = doc.getSearchCursor(data.context, 0, false);
	    var nearest, nearestDist = Infinity;
	    while (cursor.findNext()) {
	      var from = cursor.from(), dist = Math.abs(from.line - start.line) * 10000;
	      if (!dist) dist = Math.abs(from.ch - start.ch);
	      if (dist < nearestDist) { nearest = from; nearestDist = dist; }
	    }
	    if (!nearest) return null;
	
	    if (before.length == 1)
	      nearest.ch += before[0].length;
	    else
	      nearest = Pos(nearest.line + (before.length - 1), before[before.length - 1].length);
	    if (data.start.line == data.end.line)
	      var end = Pos(nearest.line, nearest.ch + (data.end.ch - data.start.ch));
	    else
	      var end = Pos(nearest.line + (data.end.line - data.start.line), data.end.ch);
	    return {start: nearest, end: end};
	  }
	
	  function atInterestingExpression(cm) {
	    var pos = cm.getCursor("end"), tok = cm.getTokenAt(pos);
	    if (tok.start < pos.ch && tok.type == "comment") return false;
	    return /[\w)\]]/.test(cm.getLine(pos.line).slice(Math.max(pos.ch - 1, 0), pos.ch + 1));
	  }
	
	  // Variable renaming
	
	  function rename(ts, cm) {
	    var token = cm.getTokenAt(cm.getCursor());
	    if (!/\w/.test(token.string)) return showError(ts, cm, "Not at a variable");
	    dialog(cm, "New name for " + token.string, function(newName) {
	      ts.request(cm, {type: "rename", newName: newName, fullDocs: true}, function(error, data) {
	        if (error) return showError(ts, cm, error);
	        applyChanges(ts, data.changes);
	      });
	    });
	  }
	
	  function selectName(ts, cm) {
	    var name = findDoc(ts, cm.doc).name;
	    ts.request(cm, {type: "refs"}, function(error, data) {
	      if (error) return showError(ts, cm, error);
	      var ranges = [], cur = 0;
	      var curPos = cm.getCursor();
	      for (var i = 0; i < data.refs.length; i++) {
	        var ref = data.refs[i];
	        if (ref.file == name) {
	          ranges.push({anchor: ref.start, head: ref.end});
	          if (cmpPos(curPos, ref.start) >= 0 && cmpPos(curPos, ref.end) <= 0)
	            cur = ranges.length - 1;
	        }
	      }
	      cm.setSelections(ranges, cur);
	    });
	  }
	
	  var nextChangeOrig = 0;
	  function applyChanges(ts, changes) {
	    var perFile = Object.create(null);
	    for (var i = 0; i < changes.length; ++i) {
	      var ch = changes[i];
	      (perFile[ch.file] || (perFile[ch.file] = [])).push(ch);
	    }
	    for (var file in perFile) {
	      var known = ts.docs[file], chs = perFile[file];;
	      if (!known) continue;
	      chs.sort(function(a, b) { return cmpPos(b.start, a.start); });
	      var origin = "*rename" + (++nextChangeOrig);
	      for (var i = 0; i < chs.length; ++i) {
	        var ch = chs[i];
	        known.doc.replaceRange(ch.text, ch.start, ch.end, origin);
	      }
	    }
	  }
	
	  // Generic request-building helper
	
	  function buildRequest(ts, doc, query, pos) {
	    var files = [], offsetLines = 0, allowFragments = !query.fullDocs;
	    if (!allowFragments) delete query.fullDocs;
	    if (typeof query == "string") query = {type: query};
	    query.lineCharPositions = true;
	    if (query.end == null) {
	      query.end = pos || doc.doc.getCursor("end");
	      if (doc.doc.somethingSelected())
	        query.start = doc.doc.getCursor("start");
	    }
	    var startPos = query.start || query.end;
	
	    if (doc.changed) {
	      if (doc.doc.lineCount() > bigDoc && allowFragments !== false &&
	          doc.changed.to - doc.changed.from < 100 &&
	          doc.changed.from <= startPos.line && doc.changed.to > query.end.line) {
	        files.push(getFragmentAround(doc, startPos, query.end));
	        query.file = "#0";
	        var offsetLines = files[0].offsetLines;
	        if (query.start != null) query.start = Pos(query.start.line - -offsetLines, query.start.ch);
	        query.end = Pos(query.end.line - offsetLines, query.end.ch);
	      } else {
	        files.push({type: "full",
	                    name: doc.name,
	                    text: docValue(ts, doc)});
	        query.file = doc.name;
	        doc.changed = null;
	      }
	    } else {
	      query.file = doc.name;
	    }
	    for (var name in ts.docs) {
	      var cur = ts.docs[name];
	      if (cur.changed && cur != doc) {
	        files.push({type: "full", name: cur.name, text: docValue(ts, cur)});
	        cur.changed = null;
	      }
	    }
	
	    return {query: query, files: files};
	  }
	
	  function getFragmentAround(data, start, end) {
	    var doc = data.doc;
	    var minIndent = null, minLine = null, endLine, tabSize = 4;
	    for (var p = start.line - 1, min = Math.max(0, p - 50); p >= min; --p) {
	      var line = doc.getLine(p), fn = line.search(/\bfunction\b/);
	      if (fn < 0) continue;
	      var indent = CodeMirror.countColumn(line, null, tabSize);
	      if (minIndent != null && minIndent <= indent) continue;
	      minIndent = indent;
	      minLine = p;
	    }
	    if (minLine == null) minLine = min;
	    var max = Math.min(doc.lastLine(), end.line + 20);
	    if (minIndent == null || minIndent == CodeMirror.countColumn(doc.getLine(start.line), null, tabSize))
	      endLine = max;
	    else for (endLine = end.line + 1; endLine < max; ++endLine) {
	      var indent = CodeMirror.countColumn(doc.getLine(endLine), null, tabSize);
	      if (indent <= minIndent) break;
	    }
	    var from = Pos(minLine, 0);
	
	    return {type: "part",
	            name: data.name,
	            offsetLines: from.line,
	            text: doc.getRange(from, Pos(endLine, 0))};
	  }
	
	  // Generic utilities
	
	  var cmpPos = CodeMirror.cmpPos;
	
	  function elt(tagname, cls /*, ... elts*/) {
	    var e = document.createElement(tagname);
	    if (cls) e.className = cls;
	    for (var i = 2; i < arguments.length; ++i) {
	      var elt = arguments[i];
	      if (typeof elt == "string") elt = document.createTextNode(elt);
	      e.appendChild(elt);
	    }
	    return e;
	  }
	
	  function dialog(cm, text, f) {
	    if (cm.openDialog)
	      cm.openDialog(text + ": <input type=text>", f);
	    else
	      f(prompt(text, ""));
	  }
	
	  // Tooltips
	
	  function tempTooltip(cm, content, ts) {
	    if (cm.state.ternTooltip) remove(cm.state.ternTooltip);
	    var where = cm.cursorCoords();
	    var tip = cm.state.ternTooltip = makeTooltip(where.right + 1, where.bottom, content);
	    function maybeClear() {
	      old = true;
	      if (!mouseOnTip) clear();
	    }
	    function clear() {
	      cm.state.ternTooltip = null;
	      if (!tip.parentNode) return;
	      cm.off("cursorActivity", clear);
	      cm.off('blur', clear);
	      cm.off('scroll', clear);
	      fadeOut(tip);
	    }
	    var mouseOnTip = false, old = false;
	    CodeMirror.on(tip, "mousemove", function() { mouseOnTip = true; });
	    CodeMirror.on(tip, "mouseout", function(e) {
	      if (!CodeMirror.contains(tip, e.relatedTarget || e.toElement)) {
	        if (old) clear();
	        else mouseOnTip = false;
	      }
	    });
	    setTimeout(maybeClear, ts.options.hintDelay ? ts.options.hintDelay : 1700);
	    cm.on("cursorActivity", clear);
	    cm.on('blur', clear);
	    cm.on('scroll', clear);
	  }
	
	  function makeTooltip(x, y, content) {
	    var node = elt("div", cls + "tooltip", content);
	    node.style.left = x + "px";
	    node.style.top = y + "px";
	    document.body.appendChild(node);
	    return node;
	  }
	
	  function remove(node) {
	    var p = node && node.parentNode;
	    if (p) p.removeChild(node);
	  }
	
	  function fadeOut(tooltip) {
	    tooltip.style.opacity = "0";
	    setTimeout(function() { remove(tooltip); }, 1100);
	  }
	
	  function showError(ts, cm, msg) {
	    if (ts.options.showError)
	      ts.options.showError(cm, msg);
	    else
	      tempTooltip(cm, String(msg), ts);
	  }
	
	  function closeArgHints(ts) {
	    if (ts.activeArgHints) { remove(ts.activeArgHints); ts.activeArgHints = null; }
	  }
	
	  function docValue(ts, doc) {
	    var val = doc.doc.getValue();
	    if (ts.options.fileFilter) val = ts.options.fileFilter(val, doc.name, doc.doc);
	    return val;
	  }
	
	  // Worker wrapper
	
	  function WorkerServer(ts) {
	    var worker = ts.worker = new Worker(ts.options.workerScript);
	    worker.postMessage({type: "init",
	                        defs: ts.options.defs,
	                        plugins: ts.options.plugins,
	                        scripts: ts.options.workerDeps});
	    var msgId = 0, pending = {};
	
	    function send(data, c) {
	      if (c) {
	        data.id = ++msgId;
	        pending[msgId] = c;
	      }
	      worker.postMessage(data);
	    }
	    worker.onmessage = function(e) {
	      var data = e.data;
	      if (data.type == "getFile") {
	        getFile(ts, data.name, function(err, text) {
	          send({type: "getFile", err: String(err), text: text, id: data.id});
	        });
	      } else if (data.type == "debug") {
	        window.console.log(data.message);
	      } else if (data.id && pending[data.id]) {
	        pending[data.id](data.err, data.body);
	        delete pending[data.id];
	      }
	    };
	    worker.onerror = function(e) {
	      for (var id in pending) pending[id](e);
	      pending = {};
	    };
	
	    this.addFile = function(name, text) { send({type: "add", name: name, text: text}); };
	    this.delFile = function(name) { send({type: "del", name: name}); };
	    this.request = function(body, c) { send({type: "req", body: body}, c); };
	  }
	});


/***/ }

});