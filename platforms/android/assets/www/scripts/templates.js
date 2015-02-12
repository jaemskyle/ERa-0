!function(module){try{module=angular.module("templates")}catch(err){module=angular.module("templates",[])}module.run(["$templateCache",function($templateCache){"use strict";$templateCache.put("modules/partial/forgot/forgot.html",'<ion-view view-title="Forgot password" hide-back-button="true">\n  <ion-content class="bg-login">\n      <div class="row responsive-sm">\n        <div class=" col-offset-33 col-33 col p-15">\n          <img src="assets/images/logo.png" class="w-100p">\n          <h4 class="color-white text-center">Please enter email to recieve a link to reset password</h4>\n          <input type="text" placeholder="Email" class="p-15">\n          <div class="row p-0">\n            <a class="button button-block col-50 button-m" href="#/a/home">cancel</a>\n            <a class="button button-block button-calm button-m w-100p" href="#/a/home">Send Reset</a>\n          </div>\n        </div>\n      </div>\n  </ion-content>\n</ion-view>\n')}])}(),function(module){try{module=angular.module("templates")}catch(err){module=angular.module("templates",[])}module.run(["$templateCache",function($templateCache){"use strict";$templateCache.put("modules/partial/form/form.html",'<ion-view title="{{$stateParams.formId}}"  hide-back-button="true">\n  <ion-nav-buttons side="left">\n    <button class="button button-clear button-icon" ng-click="goHome()">\n      Back\n    </button>\n  </ion-nav-buttons>\n  <ion-nav-buttons side="right">\n    <button class="button button-icon color-white" ng-click="print()">\n      Print\n    </button>\n    <button class="button button-calm" ng-click="save()">\n      Save\n    </button>\n  </ion-nav-buttons>\n  <ion-content>\n    <div id="form" class="content bg-login">\n        <style media="print">\n          form[name="ExaminationForm"] {\n            width: 50%;\n            height: 50%;\n            font-family: \'serif\';\n            float: left;\n            padding-left: 2%;\n            box-sizing: border-box;\n          }\n          form:first-of-type {\n            padding-right: 6%;\n          }\n          form:nth-of-type(3) {\n            padding-right: 6%;\n            height: 45%;\n          }\n          form:nth-of-type(2) {\n            padding-left: 6%;\n            padding-right: 3%;\n          }\n          form:nth-of-type(4) {\n            padding-left: 6%;\n            padding-right: 3%;\n            height: 45%;\n          }\n          input[type="text"] {\n            background-color: none;\n            background: transparent;\n            border: none;\n            outline:  none;\n            font-size: 14px;\n            width: 100%;\n          }\n          textarea {\n            font-size: 14px;\n            border: none;\n            outline: none;\n          }\n          ul {\n            margin: 0;\n            padding: 0;\n            list-style-type: none;\n          }\n          li, {\n            margin: 0;\n            padding: 0;\n          }\n\n          .print-align-right {\n            text-align: right;\n          }\n          .hidden-on-print {\n            display: none;\n          }\n          .item.item-divider {\n            display: inline;\n            font-weight: bold;\n          }\n          .item {\n            display: inline;\n          }\n          .print-textarea {\n            margin: 0;\n            font-size: 10px;\n            font-family: \'serif\'\n          }\n          .print-header {\n            margin: 10px 0 0 0;\n            font-size: 10px;\n            font-family: \'serif\'\n           }\n           .print-header.print-header--inline {\n               display: inline;\n           }\n           .print-hidden.hidden-on-print {\n             display: none;\n           }\n           .print-size {\n             font-size: 10px;\n             font-family: \'serif\'\n           }\n           .print-chart-card {\n             line-height: 10px;\n            }\n           .print-chart-card > li:not(\'hidden-on-print\'):nth-child(2){\n             display: inline;\n           }\n           .print-chart-card--inner {\n             display: inline;\n           }\n           .print-chart-card--inner *li {\n             display: inline;\n           }\n           .print-inline {\n             display: inline;\n             margin: 0;\n             padding: 0;\n             line-height: 10px;\n           }\n        </style>\n        <form name="ExaminationForm" erform novalidate class="p-20b">\n          <div class="row  responsive-sm">\n            <div class="col-50">\n              <section class="card">\n                <header class="item item-divider color-white bg-blue hidden-on-print print-hidden">Chart Info</header>\n                <p class="ng-hide print-date-time print-size">\n                  <b class="print-size">Patient Id: </b>{{chart.id}}\n                  &nbsp;\n                  <b class="print-size">Date: </b>{{chart.date}} \n                  &nbsp;\n                  <b class="print-size">Time: </b>{{chart.time}}\n                </p>\n                <div class="row hidden-on-print" >\n                  <div class="col">\n                    <label class="item item-input">\n                      <span class="input-label">Date</span>\n                      <input type="text" name="date" ng-disabled="true" ng-model="chart.date" ng-value="chart.date" />\n                    </label>\n                  </div>\n                  <div class="col">\n                    <label class="item item-input">\n                      <span class="input-label">Time</span>\n                      <input type="text" name="time" ng-disabled="true" ng-model="chart.time" ng-value="chart.time"/>\n                    </label>\n                  </div>\n                </div>\n                <div class="row hidden-on-print">\n                  <div class="col">\n                    <label class="item item-input">\n                      <span class="input-label">Patient ID</span>\n                      <input type="text" name="id" ng-model="chart.id" ng-value="chart.id" required />\n                    </label>\n                  </div>\n                </div>\n              </section>\n              <section class="card">\n                <h4 class="item item-divider hidden-on-print color-white bg-blue print-hidden">ER Card</h4>\n                <article class="card chart-card">\n                  <header class="item item-divider print-header print-header--inline">HPI<span class="ng-hide">:</span></header>\n                  <span class="ng-hide print-textarea">{{chart.hpi}}</span>\n                  <textarea class="hidden-on-print" rows="8" name="hpi" ng-model="chart.hpi" placeholder="start typing...">{{chart.hpi}}</textarea>\n                </article>\n                <article class="card chart-card">\n                  <header class="item item-divider print-header print-header--inline">PMHx<span class="ng-hide">:</span></header>\n                  <span class="ng-hide print-textarea">{{chart.pmhx || \'None\'}}</span>\n                  <textarea class="hidden-on-print" rows="8" name="pmhx" ng-model="chart.pmhx" placeholder="None">{{chart.pmhx}}</textarea>\n                </article>\n                <article class="card chart-card">\n                  <header class="item item-divider print-header print-header--inline">Medication<span class="ng-hide">:</span></header>\n                  <span class="ng-hide print-textarea">{{chart.medication || \'Refer to Pharmanet.\'}}</span>\n                  <textarea class="hidden-on-print" rows="8" name="medication" ng-model="chart.medication" placeholder="Refer to Pharmanet">{{chart.medication}}</textarea>\n                </article>\n                <article class="card chart-card">\n                  <header class="item item-divider print-header print-header--inline">Allergies<span class="ng-hide">:</span></header>\n                  <span class="ng-hide print-textarea">{{chart.allergies || \'None\'}}</span>\n                  <textarea class="hidden-on-print" rows="8" name="allergies" ng-model="chart.allergies" placeholder="None">{{chart.allergies}}</textarea>\n                </article>\n              </section>\n            </div>\n\n            <div class="col-50 m-0b">\n              <section class="card m-0b">\n                  <h4 class="item item-divider color-white bg-blue hidden-on-print print-hidden">Physical Exam</h4>\n                  <header class="item item-divider print-header ng-hide">Physical Exam</header>\n\n                  <ul class="list list-inset chart-card print-chart-card">\n                    <li class="item item-divider" ng-repeat-start="(title, module_contents) in physical_exam_modules track by $index">\n                      <span class="ng-hide print-header" ng-class="{\'hidden-on-print\': !chart[module_contents.cat_name][\'status\']}">{{title}}:&nbsp;</span>\n                       <section class="row hidden-on-print">\n                         <div class="col-25 line-h30">\n                          {{title}}\n                         </div>\n                         <div class="col-75 button-bar era-bar er-radio" ng-model="chart[module_contents.cat_name][\'status\']" bs-radio-group>\n                            <label class="button" ng-click="toggleNote(chart[module_contents.cat_name][\'status\'], module_contents.cat_name)" ng-repeat="state in options">\n                                <input name="{{module_contents.cat_name}}_status" type="radio" class="button" value="{{state.value}}">{{state.label}}\n                            </label>\n                          </div> \n                       </section>\n                    </li>\n                    <li ng-show="chart[module_contents.cat_name][\'status\'] === 1"  ng-class="{\'hidden-on-print\': !chart[module_contents.cat_name][\'status\'],\n                    \'print-inline\': chart[module_contents.cat_name][\'status\']}">\n                      <ul class="list print-chart-card--inner">\n                        <li class="item item-checkbox" ng-repeat="item in module_contents.fields">\n                        <span class="ng-hide print-size" ng-class="{\'hidden-on-print\': !chart[item.cat][item.model] && chart[module_contents.cat_name][\'status\'] === 1}">{{item.label}},&nbsp;</span>\n                          <label class="checkbox hidden-on-print">\n                            <input name="{{item.name}}" ng-model="chart[item.cat][item.model]" type="checkbox" />\n                          </label>\n                          <span class="hidden-on-print">{{item.label}}</span>\n                        </li>\n                      </ul>\n                    </li>\n                    <li ng-repeat-end ng-show="chart[module_contents.cat_name][\'status\'] === 1">\n                    <span class="ng-hide print-size">{{chart[module_contents.cat_name][module_contents.note.model]}}</span>\n                      <textarea class="hidden-on-print" name="{{module_contents.note.name}}" ng-model="chart[module_contents.cat_name][module_contents.note.model]" cols="40" placeholder="Start typing.."></textarea>\n                    </li>\n                  </ul>\n                  \n                  <div class="ng-hide" ng-class="{\'hidden-on-print\': (chart.notes === \'\' || !chart.notes)}">\n                    <h4 class="print-header">Notes</h4>\n                    <p class="print-textarea">{{chart.notes}}</p>\n                  </div>\n                  <article class="card chart-card hidden-on-print">\n                    <header class="item item-divider">Notes</header>\n                    <textarea rows="8" name="notes" ng-model="chart.notes" placeholder="start typing...">{{chart.notes}}</textarea>\n                  </article>\n              </section>\n            </div>\n          </div>\n\n          <div class="ng-hide">\n            <h4 class="print-header">Diagnosis</h4>\n            <p class="print-textarea">{{chart.diagnosis}}</p>\n            <h4 class="print-header">Discharge Instruction</h4>\n            <p class="print-textarea">{{chart.discharge_instruction}}</p>\n          </div>\n          <article class="card hidden-on-print">\n            <header class="item item-divider  color-white bg-blue">Diagnosis</header>\n            <textarea class="hidden-on-print resize p-10" rows="8" name="diagnosis" ng-model="chart.diagnosis" placeholder="start typing...">{{chart.diagnosis}}</textarea>\n          </article>\n          <article class="card m-0b hidden-on-print">\n            <header class="item item-divider color-white bg-blue">Discharge Instruction</header>\n            <textarea class="hidden-on-print resize p-10" rows="8" name="discharge_instruction" ng-model="chart.discharge_instruction" placeholder="start typing...">{{chart.discharge_instruction}}</textarea>\n          </article>\n          <p class="ng-hide print-align-right"><span class="print-size">Dr. A. Behboudi</span></p>\n        </form>\n    </div>\n\n  </ion-content>\n</ion-view>\n')}])}(),function(module){try{module=angular.module("templates")}catch(err){module=angular.module("templates",[])}module.run(["$templateCache",function($templateCache){"use strict";$templateCache.put("modules/partial/edit/edit.html",'<div class="col-md-12" ng-controller="EditCtrl">\n\n\n</div>\n')}])}(),function(module){try{module=angular.module("templates")}catch(err){module=angular.module("templates",[])}module.run(["$templateCache",function($templateCache){"use strict";$templateCache.put("modules/partial/home/home.html",'<ion-view view-title="ER App" hide-back-button="true">\n  <ion-nav-buttons side="left">\n    <button class="button button-icon button-clear ion-navicon" menu-toggle="left">\n    </button>\n  </ion-nav-buttons>\n  <ion-nav-buttons side="right">\n    <button class="button button-clear" ng-click="$state.go(\'root.form\')">New Form</button>\n  </ion-nav-buttons>\n  <ion-content class="bg-login">\n    <div class="row responsive-sm">\n      <div class=" col-offset-25 col-50 col">\n        <section class="row">\n          <h4 class="color-white w-100p text-center">Charts saved: {{forms.length || \'record\\\'s empty\'}}</h4>\n        </section>\n        <ion-list can-swipe="canSwipeList" show-delete="showListDelete">\n        <ion-item class="item item-icon-right" er-item-isprinted="{{form.printed}}" ng-repeat="form in forms" ng-click="editItem(form, $index)">\n            <h2 >Patient ID : {{form.id}}</h2>\n            <p>Created: {{form.date}} {{form.time}}</p>\n            <p>{{form.physical_exam.air_entry_equal_and_bilateral_note}}</p>\n            <i class="icon ion-ios7-arrow-forward"></i>\n            <ion-delete-button class="ion-minus-circled" ng-click="deleteItem(form, $index)">\n            </ion-delete-button>\n            <ion-option-button class="button-info button-positive"ng-click="deleteItem(form, $index)">\n              Delete\n            </ion-option-button>\n          </ion-item>\n        </ion-list>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n')}])}(),function(module){try{module=angular.module("templates")}catch(err){module=angular.module("templates",[])}module.run(["$templateCache",function($templateCache){"use strict";$templateCache.put("modules/partial/login/login.html",'<ion-view view-title="Login" hide-back-button="true">\n  <ion-content class="bg-login">\n    <div class="row responsive-sm">\n      <form class=" col-offset-33 col-33 col p-15" novalidate name="loginForm">\n        <img src="assets/images/logo.png" class="w-100p">\n        <input type="email" placeholder="Email" class="input-m" name="cred_email" ng-model="cred.email">\n        <input type="password" placeholder="Password" class="m-t10 input-m" name="cred_pass" ng-model="cred.pass">\n        <a class="button button-block button-calm button-m" ng-click="login()">Log in</a>\n      </form>\n    </div>\n    <div class="row responsive-sm">\n      <div class=" col-offset-33 col-33 col p-15">\n        <h5 class="color-white text-center m-b25"><a href="#/forgot" class="color-white text-center no-decoration">Forgot password</a></h5>\n        <a class="button button-block button-positive button-m" href="#/signup">Sign up</a>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n')}])}(),function(module){try{module=angular.module("templates")}catch(err){module=angular.module("templates",[])}module.run(["$templateCache",function($templateCache){"use strict";$templateCache.put("modules/partial/menu/menu.html",'<ion-side-menus enable-menu-with-back-views="false">\n  <ion-side-menu-content drag-content="false">\n    <ion-nav-bar class="bar-stable">\n      <ion-nav-back-button>\n      </ion-nav-back-button>\n\n      <!-- <ion-nav-buttons side="left"> -->\n      <!--   <button class="button button-icon button-clear ion-navicon" menu-toggle="left"> -->\n      <!--   </button> -->\n      <!-- </ion-nav-buttons> -->\n    </ion-nav-bar>\n    <ion-nav-view name="rootContent"></ion-nav-view>\n  </ion-side-menu-content>\n\n  <ion-side-menu side="left">\n    <ion-content>\n      <ion-list>\n        <ion-item nav-clear menu-close href="#/a/form">\n          New Chart\n        </ion-item>\n        <ion-item nav-clear menu-close href="#/a/home">\n          Saved Charts\n        </ion-item>\n        <ion-item nav-clear menu-close href="#/a/profile">\n          Saved billings\n        </ion-item>\n        <ion-item nav-clear menu-close href="#/a/settings">\n          Settings\n        </ion-item>\n        <ion-item nav-clear menu-close href="#/a/settings">\n          Privacy\n        </ion-item>\n        <ion-item nav-clear menu-close href="#/a/settings">\n          Terms\n        </ion-item>\n        <ion-item nav-clear menu-close ng-click="logout()">\n          Logout\n        </ion-item>\n      </ion-list>\n    </ion-content>\n  </ion-side-menu>\n</ion-side-menus>\n')}])}(),function(module){try{module=angular.module("templates")}catch(err){module=angular.module("templates",[])}module.run(["$templateCache",function($templateCache){"use strict";$templateCache.put("modules/partial/settings/settings.html",'<ion-view view-title="Settings" hide-back-button="true">\n  <ion-nav-buttons side="left">\n    <button class="button button-icon button-clear ion-navicon" menu-toggle="left">\n    </button>\n  </ion-nav-buttons>\n  <ion-nav-buttons side="right">\n    <button class="button button-icon button-clear" menu-toggle="right"> Save\n    </button>\n  </ion-nav-buttons>\n  <ion-content class="bg-login">\n    <div class="row responsive-sm">\n      <div class=" col-offset-33 col-33 col">\n        <div class="list bg-white">\n          <label class="item item-input item-stacked-label">\n              <span class="input-label">Name</span>\n              <input type="text" placeholder="Amir Behboudi">\n            </label>\n            <label class="item item-input item-stacked-label">\n              <span class="input-label">Hospital</span>\n              <input type="text" placeholder="Peace Arch Hospital">\n            </label>\n            <label class="item item-input item-stacked-label">\n              <span class="input-label">Email</span>\n              <input type="text" placeholder="john@suhr.com">\n          </label>\n          <label class="item item-input item-stacked-label">\n              <span class="input-label">Type new password</span>\n              <input type="text" placeholder="john@suhr.com">\n          </label>\n          <label class="item item-input item-select">\n            <div class="input-label">\n              Province\n            </div>\n            <select>\n              <option>Ontario</option>\n              <option selected>Britsh Columbia</option>\n              <option>Red</option>\n            </select>\n          </label>\n        </div>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n')}])}(),function(module){try{module=angular.module("templates")}catch(err){module=angular.module("templates",[])}module.run(["$templateCache",function($templateCache){"use strict";$templateCache.put("modules/partial/signup/signup.html",'<ion-view view-title="Settings" hide-back-button="true">\n  <ion-content class="bg-login">\n    <div class="row responsive-sm">\n      <div class=" col-offset-33 col-33 col">\n        <div class="list bg-white">\n          <label class="item item-input item-stacked-label">\n              <span class="input-label">Name</span>\n              <input type="text" placeholder="Amir Behboudi">\n            </label>\n            <label class="item item-input item-stacked-label">\n              <span class="input-label">Hospital</span>\n              <input type="text" placeholder="Peace Arch Hospital">\n            </label>\n            <label class="item item-input item-stacked-label">\n              <span class="input-label">Email</span>\n              <input type="text" placeholder="john@suhr.com">\n          </label>\n          <label class="item item-input item-stacked-label">\n              <span class="input-label">Type new password</span>\n              <input type="text" placeholder="john@suhr.com">\n          </label>\n          <label class="item item-input item-select">\n            <div class="input-label">\n              Province\n            </div>\n            <select>\n              <option>Ontario</option>\n              <option selected>Britsh Columbia</option>\n              <option>Red</option>\n            </select>\n          </label>\n        </div>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n')}])}();